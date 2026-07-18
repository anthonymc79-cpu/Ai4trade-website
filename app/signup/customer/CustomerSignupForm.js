"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../../for-electricians/ForElectricians.module.css";

export default function CustomerSignupForm() {
  const searchParams = useSearchParams();
  const prefilledBusiness = searchParams.get("business") || "";

  const [form, setForm] = useState({
    businessSlug: prefilledBusiness,
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/signup/customer", {
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

      setSuccess(data.businessName);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.yourdomain.com";

  if (success) {
    return (
      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">You're in</span>
          <h1 className={styles.heroTitle}>Registered with {success}</h1>
          <p className={styles.heroLead}>
            You can log in now to book a job and track it through to a
            signed certificate.
          </p>
          <a className="btn btn--copper" href={`${appUrl}/login`}>
            Log in →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <div className="container">
        <span className="eyebrow">Free for customers</span>
        <h1 className={styles.heroTitle}>Register with your electrician</h1>
        <p className={styles.heroLead}>
          Free, always. You'll need to know which business's portal you're
          joining — if you arrived here from their website or van signage,
          it's already filled in below.
        </p>

        <form onSubmit={handleSubmit} className="formCard">
          {error && <div className="formError">{error}</div>}

          <div className="field">
            <label htmlFor="businessSlug">Business portal address</label>
            <input
              id="businessSlug"
              type="text"
              required
              value={form.businessSlug}
              onChange={(e) => updateField("businessSlug", e.target.value)}
              placeholder="sparky-ltd"
            />
            <small>Found on their invoice, van, or website</small>
          </div>

          <div className="field">
            <label htmlFor="fullName">Your name</label>
            <input
              id="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
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

          <button
            type="submit"
            className="btn btn--copper"
            disabled={submitting}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {submitting ? "Registering…" : "Register for free →"}
          </button>
        </form>
      </div>
    </section>
  );
}
