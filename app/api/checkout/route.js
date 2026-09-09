// app/api/checkout/route.js
//
// For an ALREADY-SIGNED-IN admin changing/starting a paid plan (e.g. a
// trial user upgrading from inside the app). New-visitor signup goes
// through /api/signup/business instead, which creates the account first.

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { planIdFor, priceIdFor } from "@/lib/plans";

export async function POST(req) {
  const { plan, billingCycle = "monthly" } = await req.json();

  const priceId = priceIdFor(plan, billingCycle);
  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan or billing cycle" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
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
      // Also stamped on the subscription itself so later
      // customer.subscription.updated/deleted webhook events carry admin_id
      // and plan without needing a DB lookup by stripe_subscription_id.
      subscription_data: { metadata },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
