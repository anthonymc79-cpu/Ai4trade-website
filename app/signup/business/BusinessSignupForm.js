"use client";

import { useState } from "react";
import styles from "../../for-electricians/ForElectricians.module.css";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BusinessSignupForm() {
  const [form, setForm] = useState({
    businessName: "",
    slug: "",
    email: "",
    password: "",
    plan: "starter",
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "businessName" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
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

      // Off to Stripe Checkout — the business becomes active once the
      // webhook confirms payment, not before.
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.hero}>
      <div className="container">
        <span className="eyebrow">Start your subscription</span>
        <h1 className={styles.heroTitle}>Set up your business</h1>
        <p className={styles.heroLead}>
          Takes about a minute. You'll pick a plan and enter payment details
          next, on Stripe's secure checkout.
        </p>

        <form onSubmit={handleSubmit} className="formCard">
          {error && <div className="formError">{error}</div>}

          <div className="field">
            <label htmlFor="businessName">Business name</label>
            <input
              id="businessName"
              type="text"
              required
              value={form.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              placeholder="Sparky Ltd"
            />
          </div>

          <div className="field">
            <label htmlFor="slug">Your portal address</label>
            <input
              id="slug"
              type="text"
              required
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                updateField("slug", slugify(e.target.value));
              }}
              placeholder="sparky-ltd"
            />
            <small>{form.slug || "sparky-ltd"}.voltro.app</small>
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
                background: "var(--ink)",
                border: "1px solid var(--wire-line)",
                borderRadius: "3px",
                padding: "12px 14px",
                color: "var(--paper)",
                fontFamily: "var(--font-body)",
                fontSize: "15px",
              }}
            >
              <option value="starter">Starter — £29/month</option>
              <option value="team">Team — £79/month</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn--copper"
            disabled={submitting}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {submitting ? "Setting up…" : "Continue to payment →"}
          </button>
        </form>
      </div>
    </section>
  );
}
