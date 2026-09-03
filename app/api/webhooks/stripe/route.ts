import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const subscription = await stripe.subscriptions.retrieve(session.subscription);

      await supabase.from('subscriptions').upsert({
        admin_id: session.client_reference_id,
        plan_id: session.metadata?.plan,
        billing_cycle: 'monthly',
        status: subscription.status,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        stripe_price_id: subscription.items.data[0]?.price.id,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      });
      break;
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as any;
      await supabase.from('subscriptions')
        .update({
          status: sub.status,
          current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          cancelled_at: sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : null,
        })
        .eq('stripe_subscription_id', sub.id);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as any;
      await supabase.from('subscriptions')
        .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}