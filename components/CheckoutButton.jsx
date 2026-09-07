"use client";
import { useState } from "react";

// For an already-signed-in admin starting/changing a paid plan. A fresh
// marketing-site visitor has no session yet, so pricing-page CTAs for new
// signups link to /signup/business instead — see app/pricing/page.js.
export function CheckoutButton({ plan, billingCycle = "monthly", children, className }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billingCycle }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? "Redirecting…" : children || "Subscribe"}
    </button>
  );
}
