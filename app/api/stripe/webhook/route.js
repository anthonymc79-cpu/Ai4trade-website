// app/api/stripe/webhook/route.js
//
// Register this endpoint's URL (https://www.yourdomain.com/api/stripe/webhook)
// in the Stripe dashboard, listening for at least: checkout.session.completed,
// customer.subscription.updated, customer.subscription.deleted.
//
// This is the ONLY place subscription_status should ever be set to
// 'active' — never do it directly in the signup route, since that would
// grant access before payment is actually confirmed.

import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return Response.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const businessId = session.metadata?.business_id;
      if (businessId) {
        await supabase
          .from("businesses")
          .update({
            subscription_status: "active",
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
          })
          .eq("id", businessId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const status = subscription.status === "active" ? "active" : "past_due";
      await supabase
        .from("businesses")
        .update({ subscription_status: status })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      await supabase
        .from("businesses")
        .update({ subscription_status: "cancelled" })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    default:
      // Unhandled event types are fine to ignore.
      break;
  }

  return Response.json({ received: true });
}
