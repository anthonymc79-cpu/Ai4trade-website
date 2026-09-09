"use client";

import { useState } from "react";
import Link from "next/link";

// Prices come from app.js's own MA_PLANS/ANNUAL_PRICES — the single
// source of truth for what a plan actually costs and includes. Starter
// has no annual option there, so it never gets a billing toggle.
export default function PricingCards({ prices }) {
  const [billing, setBilling] = useState("monthly");
  const proPrice = billing === "annual" ? prices.proAnnualMonthly : prices.proMonthly;

  return (
    <>
      <div className="grid-2">
        <div className="tag">
          <span className="tag__code">TIER · STARTER</span>
          <h2 className="tag__title">Starter</h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 32, margin: "8px 0 14px" }}>
            {prices.symbol}
            {prices.starter}
            <span style={{ fontSize: 14, color: "var(--wire)" }}>/month</span>
          </p>
          <p className="tag__body">
            For a single electrician just getting off paper and
            spreadsheets. Unlimited jobs, quoting, EICR certificates,
            and your own booking portal for up to 25 customers.
          </p>
          <Link className="btn btn--copper" href="/signup/business?plan=starter">
            Get started →
          </Link>
        </div>

        <div className="tag">
          <span className="tag__code">TIER · PRO</span>
          <h2 className="tag__title">Pro</h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 32, margin: "8px 0 14px" }}>
            {prices.symbol}
            {proPrice}
            <span style={{ fontSize: 14, color: "var(--wire)" }}>/month</span>
          </p>
          {billing === "annual" && (
            <p style={{ fontSize: 12, color: "var(--wire)", margin: "-8px 0 14px" }}>
              Billed {prices.symbol}
              {prices.proAnnualTotal}/year · save ~15%
            </p>
          )}
          <p className="tag__body">
            Everything in Starter, plus unlimited customer accounts,
            full webhook &amp; CRM automation, CSV data export, and
            custom branding on your portal and certificates.
          </p>

          <div
            role="group"
            aria-label="Billing frequency"
            style={{ display: "inline-flex", border: "1px solid var(--wire-line)", borderRadius: 8, padding: 3, margin: "0 0 14px" }}
          >
            {["monthly", "annual"].map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setBilling(cycle)}
                aria-pressed={billing === cycle}
                style={{
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 12.5,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  background: billing === cycle ? "var(--copper-bright, #c96a3f)" : "transparent",
                  color: billing === cycle ? "#0D1B2A" : "var(--paper-dim)",
                }}
              >
                {cycle === "monthly" ? "Monthly" : "Annual (save ~15%)"}
              </button>
            ))}
          </div>

          <div>
            <Link
              className="btn btn--copper"
              href={`/signup/business?plan=pro&billing=${billing}`}
            >
              Get started →
            </Link>
          </div>
        </div>
      </div>

      <p style={{ color: "var(--wire)", fontSize: 13.5, marginTop: 24, textAlign: "center" }}>
        Not sure yet?{" "}
        <Link href="/signup/business?plan=trial" style={{ color: "inherit", textDecoration: "underline" }}>
          Start a free 7-day trial
        </Link>{" "}
        — full access, no card required.
      </p>
    </>
  );
}
