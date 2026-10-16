"use client";

import { useState } from "react";
import Link from "next/link";

// Prices come from app.js's own MA_PLANS/ANNUAL_PRICES — the single
// source of truth for what a plan actually costs and includes. Starter
// has no annual option there, so it never gets a billing toggle.
// The wording (`content`) comes from Sanity's Pricing page document.
export default function PricingCards({ prices, content }) {
  const [billing, setBilling] = useState("monthly");
  const proPrice = billing === "annual" ? prices.proAnnualMonthly : prices.proMonthly;

  // Worked out from the prices, so it can't drift: 1 - 708 / (69 × 12) ≈ 15%.
  const fullYear = prices.proMonthly * 12;
  const savePercent = Math.round((((fullYear - prices.proAnnualTotal) / fullYear) * 100) / 5) * 5;

  const { starter, pro, trialNote } = content;

  return (
    <>
      <div className="grid-2">
        <div className="tag">
          {starter.label && <span className="tag__code">{starter.label}</span>}
          <h3 className="tag__title">{starter.name}</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 32, margin: "8px 0 14px" }}>
            {prices.symbol}
            {prices.starter}
            <span style={{ fontSize: 14, color: "var(--wire)" }}>/month</span>
          </p>
          {starter.description && <p className="tag__body">{starter.description}</p>}
          <Link className="btn btn--copper" href="/signup/business?plan=starter">
            {starter.buttonLabel}
          </Link>
        </div>

        <div className="tag">
          {pro.label && <span className="tag__code">{pro.label}</span>}
          <h3 className="tag__title">{pro.name}</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 32, margin: "8px 0 14px" }}>
            {prices.symbol}
            {proPrice}
            <span style={{ fontSize: 14, color: "var(--wire)" }}>/month</span>
          </p>
          {billing === "annual" && (
            <p style={{ fontSize: 12, color: "var(--wire)", margin: "-8px 0 14px" }}>
              Billed {prices.symbol}
              {prices.proAnnualTotal}/year · save ~{savePercent}%
            </p>
          )}
          {pro.description && <p className="tag__body">{pro.description}</p>}

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
                {cycle === "monthly"
                  ? content.monthlyLabel
                  : `${content.annualLabel} (save ~${savePercent}%)`}
              </button>
            ))}
          </div>

          <div>
            <Link
              className="btn btn--copper"
              href={`/signup/business?plan=pro&billing=${billing}`}
            >
              {pro.buttonLabel}
            </Link>
          </div>
        </div>
      </div>

      {trialNote.linkText && (
        <p style={{ color: "var(--wire)", fontSize: 13.5, marginTop: 24, textAlign: "center" }}>
          {trialNote.before}{" "}
          <Link href="/signup/business?plan=trial" style={{ color: "inherit", textDecoration: "underline" }}>
            {trialNote.linkText}
          </Link>{" "}
          {trialNote.after}
        </p>
      )}
    </>
  );
}
