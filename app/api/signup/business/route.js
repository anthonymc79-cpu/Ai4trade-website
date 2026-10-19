// app/api/signup/business/route.js
//
// Flow: create the Supabase auth user -> profiles row (role:'admin') ->
// admin_links row (their booking-portal slug) -> subscriptions row.
// Paid plans start the profile on plan:'trial'/plan_active:true (so an
// abandoned checkout still leaves a working trial account, never the paid
// tier itself) and only flip to the real plan once the Stripe webhook
// confirms payment — see app/api/webhooks/stripe/route.js. Trial signups
// need no Stripe step at all: no card required, and the trial length
// (TRIAL_DAYS in lib/plans.js) matches app.js's own 30-day trial.
//
// Note: `profiles` and `admin_links` are the tables app.js itself reads/
// writes (see admin_links.slug, profiles.plan/plan_active in app.js) —
// not the `businesses`/`customers` tables this route used to write to.

import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";
import { SELLABLE_PLANS, TRIAL_DAYS, planIdFor, priceIdFor } from "@/lib/plans";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(supabase, base) {
  let candidate = base || "electrician";
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data } = await supabase
      .from("admin_links")
      .select("admin_id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, password, plan, billingCycle = "monthly" } = body;

  if (!name || !email || !password) {
    return Response.json(
      { error: "name, email, and password are required" },
      { status: 400 }
    );
  }

  if (!SELLABLE_PLANS.includes(plan)) {
    return Response.json({ error: "Invalid plan selected" }, { status: 400 });
  }

  let priceId = null;
  if (plan !== "trial") {
    priceId = priceIdFor(plan, billingCycle);
    if (!priceId) {
      return Response.json(
        { error: "Invalid plan or billing cycle" },
        { status: 400 }
      );
    }
  }

  const supabase = createAdminClient();

  const { data: created, error: createUserError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (createUserError) {
    const status = createUserError.status === 422 ? 409 : 500;
    return Response.json(
      {
        error:
          createUserError.status === 422
            ? "An account with that email already exists"
            : "Could not create account",
      },
      { status }
    );
  }

  const userId = created.user.id;

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    name,
    username: email,
    role: "admin",
    plan: "trial",
    plan_active: true,
  });

  if (profileError) {
    await supabase.auth.admin.deleteUser(userId);
    return Response.json(
      { error: "Could not create account profile" },
      { status: 500 }
    );
  }

  const slug = await uniqueSlug(supabase, slugify(name) || slugify(email.split("@")[0]));
  await supabase.from("admin_links").upsert({ admin_id: userId, slug });

  const trialEnd = new Date(Date.now() + TRIAL_DAYS * 86400000).toISOString();
  await supabase.from("subscriptions").insert({
    admin_id: userId,
    plan_id: "trial",
    billing_cycle: "monthly",
    status: "trialing",
    trial_end: trialEnd,
  });

  if (plan === "trial") {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.ai4trade.co.uk";
    return Response.json({ url: `${appUrl}/login?welcome=1` });
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;
  const metadata = {
    admin_id: userId,
    plan: planIdFor(plan, billingCycle),
    billing_cycle: billingCycle,
  };

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    client_reference_id: userId,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata,
    subscription_data: { metadata },
    success_url: `${origin}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/signup/cancelled`,
  });

  return Response.json({ url: session.url });
}
