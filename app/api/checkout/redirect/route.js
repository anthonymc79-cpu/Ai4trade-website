// app/api/checkout/redirect/route.js
//
// GET variant of /api/checkout, meant to be linked to directly from
// app.js (a different subdomain — app.ai4trade.co.uk vs
// www.ai4trade.co.uk) as a plain top-level navigation:
//   window.location.href = `${MARKETING_SITE_URL}/api/checkout/redirect?plan=pro&billingCycle=annual`
//
// A top-level navigation like that sends the shared auth cookie
// automatically (both sites share AUTH_COOKIE_DOMAIN=.ai4trade.co.uk)
// without needing CORS, unlike a cross-origin fetch() from app.js to the
// POST /api/checkout route would.

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { planIdFor, priceIdFor } from "@/lib/plans";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");
  const billingCycle = searchParams.get("billingCycle") || "monthly";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const priceId = priceIdFor(plan, billingCycle);
  if (!priceId) {
    return NextResponse.redirect(`${siteUrl}/pricing?error=invalid-plan`);
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(`${siteUrl}/signup/business?plan=${plan}&billing=${billingCycle}`);
    }

    const metadata = {
      admin_id: user.id,
      plan: planIdFor(plan, billingCycle),
      billing_cycle: billingCycle,
    };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata,
      subscription_data: { metadata },
      success_url: `${siteUrl}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?canceled=true`,
    });

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    console.error("checkout/redirect failed:", err);
    return NextResponse.redirect(`${siteUrl}/pricing?error=server`);
  }
}
