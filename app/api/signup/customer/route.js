// app/api/signup/customer/route.js
//
// Free signup — no Stripe involved. A customer always belongs to exactly
// one business, identified by the portal slug they signed up through
// (e.g. arriving via sparky-ltd.yourdomain.com, or picking it from a list
// on the marketing site).

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

  const { data: business, error: businessLookupError } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("slug", businessSlug)
    .maybeSingle();

  if (businessLookupError || !business) {
    return Response.json(
      { error: "We couldn't find that business" },
      { status: 404 }
    );
  }

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

  const { error: customerError } = await supabase.from("customers").insert({
    business_id: business.id,
    user_id: created.user.id,
    full_name: fullName || null,
  });

  if (customerError) {
    await supabase.auth.admin.deleteUser(created.user.id);
    return Response.json(
      { error: "Could not create customer record" },
      { status: 500 }
    );
  }

  return Response.json({ success: true, businessName: business.name });
}
