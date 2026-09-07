// app/api/webhooks/stripe/route.js
//
// Register this endpoint (https://www.ai4trade.co.uk/api/webhooks/stripe)
// in the Stripe dashboard for: checkout.session.completed,
// customer.subscription.updated, customer.subscription.deleted.
//
// This writes to TWO places on purpose:
//   - `subscriptions` — the Stripe billing record/audit trail (plan_id,
//     billing_cycle, current_period_end, etc).
//   - `profiles.plan` / `profiles.plan_active` — because app.js's own
//     planCan()/PLAN_FEATURES gating reads a plan straight off `profiles`
//     at login, not from `subscriptions`. Skipping this mirror means a
//     paid plan would show correctly on the marketing site but the app
//     itself would keep treating the account as whatever `profiles.plan`
//     last said.
//
// Note: app.js's own account-lock/expiry state machine (accountLocked /
// accountExpired / grace period) isn't wired to Supabase yet — see the
// app.js patch notes. Until that lands, `plan_active:false` is the only
// signal the app can act on for a lapsed subscription.

import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const ACTIVE_STATUSES = new Set(["active", "trialing"]);
const GRACE_PERIOD_DAYS = 30; // matches app.js's own 30-day grace window

async function findSubscriptionRow(supabase, { adminId, stripeSubscriptionId }) {
  if (stripeSubscriptionId) {
    const { data } = await supabase
      .from("subscriptions")
      .select("id, admin_id")
      .eq("stripe_subscription_id", stripeSubscriptionId)
      .maybeSingle();
    if (data) return data;
  }
  if (adminId) {
    const { data } = await supabase
      .from("subscriptions")
      .select("id, admin_id")
      .eq("admin_id", adminId)
      .maybeSingle();
    if (data) return data;
  }
  return null;
}

async function upsertSubscription(supabase, adminId, fields) {
  const existing = await findSubscriptionRow(supabase, {
    adminId,
    stripeSubscriptionId: fields.stripe_subscription_id,
  });

  if (existing) {
    await supabase.from("subscriptions").update(fields).eq("id", existing.id);
  } else {
    await supabase.from("subscriptions").insert({ admin_id: adminId, ...fields });
  }
}

async function syncProfilePlan(supabase, adminId, { plan, active }) {
  if (!adminId) return;
  const patch = { plan_active: active };
  if (plan) patch.plan = plan;
  await supabase.from("profiles").update(patch).eq("id", adminId);
}

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
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
      const adminId = session.client_reference_id || session.metadata?.admin_id;
      if (!adminId || !session.subscription) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      const planId = session.metadata?.plan || subscription.metadata?.plan || null;
      const billingCycle = session.metadata?.billing_cycle || subscription.metadata?.billing_cycle || "monthly";

      await upsertSubscription(supabase, adminId, {
        plan_id: planId,
        billing_cycle: billingCycle,
        status: subscription.status,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        stripe_price_id: subscription.items.data[0]?.price?.id || null,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelled_at: null,
        grace_period_end: null,
      });

      await syncProfilePlan(supabase, adminId, {
        plan: planId,
        active: ACTIVE_STATUSES.has(subscription.status),
      });
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object;
      const existing = await findSubscriptionRow(supabase, { stripeSubscriptionId: sub.id });
      const adminId = sub.metadata?.admin_id || existing?.admin_id || null;
      const planId = sub.metadata?.plan || null;
      const isPastDue = sub.status === "past_due" || sub.status === "unpaid";

      await supabase
        .from("subscriptions")
        .update({
          status: sub.status,
          ...(planId ? { plan_id: planId } : {}),
          current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          cancelled_at: sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : null,
          grace_period_end: isPastDue
            ? new Date(Date.now() + GRACE_PERIOD_DAYS * 86400000).toISOString()
            : null,
        })
        .eq("stripe_subscription_id", sub.id);

      await syncProfilePlan(supabase, adminId, {
        plan: planId,
        active: ACTIVE_STATUSES.has(sub.status),
      });
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const existing = await findSubscriptionRow(supabase, { stripeSubscriptionId: sub.id });
      const adminId = sub.metadata?.admin_id || existing?.admin_id || null;

      await supabase
        .from("subscriptions")
        .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
        .eq("stripe_subscription_id", sub.id);

      await syncProfilePlan(supabase, adminId, { active: false });
      break;
    }

    default:
      // Unhandled event types are fine to ignore.
      break;
  }

  return Response.json({ received: true });
}
