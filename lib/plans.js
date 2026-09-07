// lib/plans.js
//
// Sellable-plan config shared by the signup and checkout routes. Kept in
// sync with app.js's own MA_PLANS / ANNUAL_PRICES / HIDDEN_TIERS, which is
// the source of truth for plan ids, pricing, and what's actually sellable
// right now — pro_ai and agency are hidden while still being built.

export const TRIAL_DAYS = 7;
export const SELLABLE_PLANS = ["trial", "starter", "pro"];

export const STRIPE_PRICE_IDS = {
  starter: { monthly: process.env.STRIPE_PRICE_STARTER },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
    annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
  },
};

// The plan id app.js's planCan()/PLAN_FEATURES actually store/read off
// `profiles.plan` — Pro billed annually is the literal string 'annual',
// not 'pro_annual'. Starter has no annual variant in app.js.
export function planIdFor(plan, billingCycle) {
  if (plan === "pro" && billingCycle === "annual") return "annual";
  return plan;
}

export function priceIdFor(plan, billingCycle) {
  return STRIPE_PRICE_IDS[plan]?.[billingCycle] || null;
}
