// app/api/signup/customer/route.js
//
// Free signup — no Stripe involved. A customer always belongs to exactly
// one admin (electrician), resolved from the portal slug they signed up
// through (e.g. arriving via sparky-ltd.ai4trade.co.uk, or picking it from
// a list on the marketing site). Mirrors app.js's own resolveAdminBySlug +
// profiles.parent_admin model (admin_links.slug -> profiles.role:'customer').

import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { businessSlug, fullName, email, password } = body;

  if (!businessSlug || !email || !password) {
    return Response.json(
      { error: "businessSlug, email, and password are required" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: link, error: linkLookupError } = await supabase
    .from("admin_links")
    .select("admin_id")
    .eq("slug", businessSlug)
    .maybeSingle();

  if (linkLookupError || !link) {
    return Response.json(
      { error: "We couldn't find that business" },
      { status: 404 }
    );
  }

  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", link.admin_id)
    .maybeSingle();

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

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: created.user.id,
    name: fullName || null,
    username: email,
    role: "customer",
    parent_admin: link.admin_id,
  });

  if (profileError) {
    await supabase.auth.admin.deleteUser(created.user.id);
    return Response.json(
      { error: "Could not create customer record" },
      { status: 500 }
    );
  }

  return Response.json({ success: true, businessName: adminProfile?.name || "your electrician" });
}
