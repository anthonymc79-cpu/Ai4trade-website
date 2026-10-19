"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import { PRICES, PRO_INCLUDED, TRIAL_HREF } from "@/lib/prices";


export default function PricingTeaser() {
  const [annual, setAnnual] = useState(false);
  const price = annual ? PRICES.proAnnualMonthly : PRICES.proMonthly;

  return (
    <section className={styles.pricing}>
      <div className="container">
        <header className={styles.sectionHead}>
          <h2 className={styles.h2}>One plan, with everything in it.</h2>
          <p className={styles.lead}>Try it free for {PRICES.trialDays} days. Your customers never pay.</p>
        </header>

        <div className={styles.priceCard}>
          <div className={styles.segmented} role="group" aria-label="Billing">
            <button
              type="button"
              aria-pressed={!annual}
              className={!annual ? styles.segOn : undefined}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={annual}
              className={annual ? styles.segOn : undefined}
              onClick={() => setAnnual(true)}
            >
              Yearly
            </button>
          </div>

          <p className={styles.price}>
            {PRICES.symbol}
            {price}
            <span>a month</span>
          </p>
          <p className={styles.priceNote}>
            {annual
              ? `Billed ${PRICES.symbol}${PRICES.proAnnualTotal} a year.`
              : "Billed monthly. Cancel any time."}
          </p>

          <ul className={styles.included}>
            {PRO_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.priceActions}>
            <Link href={TRIAL_HREF} className="btn btn--copper">
              Start your free {PRICES.trialDays}-day trial
            </Link>
            <Link href="/pricing" className="textLink">
              Pricing details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
