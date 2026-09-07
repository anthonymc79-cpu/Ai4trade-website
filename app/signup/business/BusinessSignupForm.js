"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../../for-electricians/ForElectricians.module.css";

const PLANS = [
  { id: "trial", label: "7-day free trial — no card required" },
  { id: "starter", label: "Starter — £29/month" },
  { id: "pro", label: "Pro — from £59/month" },
];

export default function BusinessSignupForm() {
  const searchParams = useSearchParams();
  const initialPlan = PLANS.some((p) => p.id === searchParams.get("plan"))
    ? searchParams.get("plan")
    : "trial";
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

      // Trial signups go straight to the app; paid plans go to Stripe
      // Checkout first — either way the server tells us where to go.
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.hero}>
      <div className="container">
        <span className="eyebrow">Get started</span>
        <h1 className={styles.heroTitle}>Set up your account</h1>
        <p className={styles.heroLead}>
          Takes about a minute. Paid plans continue to Stripe's secure
          checkout next — the free trial needs no card at all.
        </p>

        <form onSubmit={handleSubmit} className="formCard">
          {error && <div className="formError">{error}</div>}

          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Dave Sparks"
            />
          </div>

          <div className="field">
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@sparkyltd.co.uk"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="plan">Plan</label>
            <select
              id="plan"
              value={form.plan}
              onChange={(e) => updateField("plan", e.target.value)}
              style={{
                width: "100%",
                background: "var(--panel)",
                border: "1px solid var(--wire-line)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 14px",
                color: "var(--paper)",
                fontFamily: "var(--font-body)",
                fontSize: "15px",
              }}
            >
              {PLANS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {form.plan === "pro" && (
            <div className="field">
              <label htmlFor="billingCycle">Billing</label>
              <select
                id="billingCycle"
                value={form.billingCycle}
                onChange={(e) => updateField("billingCycle", e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--panel)",
                  border: "1px solid var(--wire-line)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 14px",
                  color: "var(--paper)",
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                }}
              >
                <option value="monthly">Monthly — £69/month</option>
                <option value="annual">Annual — £708/year (£59/month, save ~15%)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="btn btn--copper"
            disabled={submitting}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {submitting
              ? "Setting up…"
              : form.plan === "trial"
              ? "Start free trial →"
              : "Continue to payment →"}
          </button>
        </form>
      </div>
    </section>
  );
}
