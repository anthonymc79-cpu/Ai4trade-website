// lib/plans.js
//
// Sellable-plan config shared by the signup and checkout routes. Kept in
// sync with app.js's own MA_PLANS / ANNUAL_PRICES / HIDDEN_TIERS, which is
// the source of truth for plan ids, pricing, and what's actually sellable
// right now. Starter is discontinued; pro_ai and agency are hidden while
// still being built.

import { PRICES } from "./prices";

// One number for the whole site: app.js uses TRIAL_DAYS = 30.
export const TRIAL_DAYS = PRICES.trialDays;
export const SELLABLE_PLANS = ["trial", "pro"];

export const STRIPE_PRICE_IDS = {
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
    annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
  },
};

// The plan id app.js's planCan()/PLAN_FEATURES actually store/read off
// `profiles.plan` — Pro billed annually is the literal string 'annual',
// not 'pro_annual'.
export function planIdFor(plan, billingCycle) {
  if (plan === "pro" && billingCycle === "annual") return "annual";
  return plan;
}

export function priceIdFor(plan, billingCycle) {
  return STRIPE_PRICE_IDS[plan]?.[billingCycle] || null;
}
