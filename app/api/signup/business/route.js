// app/api/signup/business/route.js
//
// Flow: create the Supabase auth user -> create the business row
// (subscription_status: 'pending') -> create a Stripe Checkout session ->
// return the session URL for the client to redirect to. The business only
// flips to 'active' once the webhook (app/api/stripe/webhook/route.js)
// confirms payment — never set it to 'active' directly here.

import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";

const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER,
  team: process.env.STRIPE_PRICE_TEAM,
};

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { businessName, slug, email, password, plan } = body;

  if (!businessName || !slug || !email || !password) {
    return Response.json(
      { error: "businessName, slug, email, and password are required" },
      { status: 400 }
    );
  }

  if (!SLUG_PATTERN.test(slug)) {
    return Response.json(
      {
        error:
          "Portal address can only contain lowercase letters, numbers, and single hyphens",
      },
      { status: 400 }
    );
  }

  const priceId = PRICE_IDS[plan] || PRICE_IDS.starter;
  if (!priceId) {
    return Response.json(
      { error: "No Stripe price configured for this plan" },
      { status: 500 }
    );
  }

  const supabase = createAdminClient();

  // Slug must be unique — it becomes {slug}.yourdomain.com.
  const { data: existing } = await supabase
    .from("businesses")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    return Response.json(
      { error: "That portal address is already taken" },
      { status: 409 }
    );
  }

  // Create the auth user. email_confirm: true skips the confirmation email
  // since Stripe Checkout's own email acts as a second verification step —
  // switch this to false if you'd rather require email confirmation first.
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

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .insert({
      name: businessName,
      slug,
      owner_user_id: userId,
      subscription_status: "pending",
    })
    .select()
    .single();

  if (businessError) {
    // Roll back the auth user so a failed signup doesn't leave an orphaned
    // account with no business attached.
    await supabase.auth.admin.deleteUser(userId);
    return Response.json(
      { error: "Could not create business record" },
      { status: 500 }
    );
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { business_id: business.id },
    success_url: `${origin}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/signup/cancelled`,
  });

  return Response.json({ url: session.url });
}
