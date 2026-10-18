"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./signup.module.css";
import { PRICES, PRO_INCLUDED } from "@/lib/prices";

// Starter is discontinued: old links with ?plan=starter fall back to the trial.
const PLAN_IDS = ["trial", "pro"];

export default function BusinessSignupForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("plan");
  const initialPlan = PLAN_IDS.includes(requested) ? requested : "trial";
  const initialBilling = searchParams.get("billing") === "annual" ? "annual" : "monthly";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    plan: initialPlan,
    billingCycle: initialBilling,
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/signup/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // Trial signups go straight to the app; Pro goes to Stripe Checkout
      // first. Either way the server tells us where to go.
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const isTrial = form.plan === "trial";
  const proPrice =
    form.billingCycle === "annual" ? PRICES.proAnnualMonthly : PRICES.proMonthly;

  return (
    <section className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>For electrical businesses</p>
          <h1 className={styles.title}>
            {isTrial ? `Start your free ${PRICES.trialDays}-day trial.` : "Set up your Pro account."}
          </h1>
          <p className={styles.lead}>
            {isTrial
              ? `Everything in Pro, free for ${PRICES.trialDays} days. No card needed, and it takes about a minute.`
              : "Create your account, then pay securely through Stripe."}
          </p>
          <ul className={styles.included}>
            {PRO_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className={styles.card} noValidate={false}>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <fieldset className={styles.plans}>
            <legend className={styles.label}>How would you like to start?</legend>
            <label className={`${styles.plan} ${isTrial ? styles.planOn : ""}`}>
              <input
                type="radio"
                name="plan"
                value="trial"
                checked={isTrial}
                onChange={() => updateField("plan", "trial")}
              />
              <span>
                <strong>Free {PRICES.trialDays}-day trial</strong>
                <small>No card needed</small>
              </span>
            </label>
            <label className={`${styles.plan} ${!isTrial ? styles.planOn : ""}`}>
              <input
                type="radio"
                name="plan"
                value="pro"
                checked={!isTrial}
                onChange={() => updateField("plan", "pro")}
              />
              <span>
                <strong>Start on Pro</strong>
                <small>
                  {PRICES.symbol}
                  {proPrice} a month
                </small>
              </span>
            </label>
          </fieldset>

          {!isTrial && (
            <fieldset className={styles.billing}>
              <legend className={styles.label}>Billing</legend>
              <div className={styles.segmented}>
                {[
                  ["monthly", `Monthly, ${PRICES.symbol}${PRICES.proMonthly}`],
                  ["annual", `Yearly, ${PRICES.symbol}${PRICES.proAnnualTotal}`],
                ].map(([id, text]) => (
                  <label key={id} className={form.billingCycle === id ? styles.segOn : undefined}>
                    <input
                      type="radio"
                      name="billingCycle"
                      value={id}
                      checked={form.billingCycle === id}
                      onChange={() => updateField("billingCycle", id)}
                    />
                    {text}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Your name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Work email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              aria-describedby="password-hint"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
            <small id="password-hint" className={styles.hint}>
              At least 8 characters.
            </small>
          </div>

          <button type="submit" className={`btn btn--copper ${styles.submit}`} disabled={submitting}>
            {submitting
              ? "Setting up your account…"
              : isTrial
                ? "Start free trial"
                : "Continue to payment"}
          </button>

          <p className={styles.small}>
            {isTrial
              ? `After ${PRICES.trialDays} days you can choose to continue on Pro.`
              : "You’ll pay on Stripe’s secure checkout next."}
          </p>
        </form>
      </div>
    </section>
  );
}
