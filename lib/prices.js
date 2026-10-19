// What Pro costs. Kept in sync with app.js (MA_PLANS / ANNUAL_PRICES), which
// is the source of truth for what customers are actually charged.
export const PRICES = {
  symbol: "£",
  proMonthly: 69,
  proAnnualMonthly: 59,
  proAnnualTotal: 708,
  trialDays: 30, // app.js TRIAL_DAYS
};

export const TRIAL_HREF = "/signup/business?plan=trial";

// What Pro includes, shown on the homepage and the pricing page.
export const PRO_INCLUDED = [
  "Unlimited customers and jobs",
  "Your own booking page",
  "Quotes with floor plans",
  "EIC, EICR and Minor Works certificates",
  "Invoices and automatic reminders",
  "Accounts, mileage and timesheets",
  "Your logo on portal and certificates",
  "CSV export for your accountant",
];
