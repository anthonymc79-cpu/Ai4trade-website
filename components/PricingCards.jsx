"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./PricingCards.module.css";
import { PRO_INCLUDED } from "@/lib/prices";

// Prices come from lib/prices.js (kept in sync with app.js).
// The wording (`content`) comes from Sanity's Pricing page document.
export default function PricingCards({ prices, content }) {
  const [billing, setBilling] = useState("monthly");
  const price = billing === "annual" ? prices.proAnnualMonthly : prices.proMonthly;

  // Worked out from the prices, so it can't drift: 1 - 708 / (69 × 12) ≈ 15%.
  const fullYear = prices.proMonthly * 12;
  const savePercent = Math.round((((fullYear - prices.proAnnualTotal) / fullYear) * 100) / 5) * 5;

  const { pro, trialNote } = content;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <h2 className={styles.name}>{pro.name}</h2>
          {pro.description && <p className={styles.desc}>{pro.description}</p>}
        </div>

        <div className={styles.priceBox}>
          <div className={styles.segmented} role="group" aria-label="Billing frequency">
            {["monthly", "annual"].map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setBilling(cycle)}
                aria-pressed={billing === cycle}
                className={billing === cycle ? styles.segOn : undefined}
              >
                {cycle === "monthly"
                  ? content.monthlyLabel
                  : `${content.annualLabel} (save ~${savePercent}%)`}
              </button>
            ))}
          </div>
          <p className={styles.price}>
            {prices.symbol}
            {price}
            <span>a month</span>
          </p>
          <p className={styles.billed}>
            {billing === "annual"
              ? `Billed ${prices.symbol}${prices.proAnnualTotal} a year`
              : "Billed monthly"}
          </p>
          <Link className="btn btn--copper" href={`/signup/business?plan=pro&billing=${billing}`}>
            {pro.buttonLabel}
          </Link>
          {trialNote.linkText && (
            <p className={styles.trial}>
              {trialNote.before}{" "}
              <Link href="/signup/business?plan=trial">{trialNote.linkText}</Link>{" "}
              {trialNote.after}
            </p>
          )}
        </div>
      </div>

      <div className={styles.includedWrap}>
        <h3 className={styles.includedTitle}>Everything included</h3>
        <ul className={styles.included}>
          {PRO_INCLUDED.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
