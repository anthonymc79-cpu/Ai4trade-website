"use client";

import { useId, useState } from "react";
import styles from "./home.module.css";

// Same rules the app uses for subdomains: lowercase letters and numbers.
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 30);
}

const JOB_TYPES = [
  "Electrical fault",
  "Full house rewire",
  "New circuits",
  "EV charger",
  "EICR inspection",
  "Something else",
];

export default function PortalDemo() {
  const inputId = useId();
  const [name, setName] = useState("Dave’s Electrics");
  const shownName = name.trim() || "Your business";
  const slug = toSlug(name) || "yourbusiness";

  return (
    <section className={styles.portal}>
      <div className="container">
        <div className={styles.portalGrid}>
          <div className={styles.portalCopy}>
            <h2 className={styles.h2}>Your customers book on a page with your name on it.</h2>
            <p className={styles.lead}>
              Every business gets its own booking page. Customers use it free to send
              enquiries, follow their job and download their certificates.
            </p>
            <label htmlFor={inputId} className={styles.portalLabel}>
              Try your business name
            </label>
            <input
              id={inputId}
              className={styles.portalInput}
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              autoComplete="organization"
            />
            <p className={styles.portalHint}>
              Share it on your van, invoices and social media.
            </p>
          </div>

          <div className={styles.browser} aria-live="polite">
            <div className={styles.browserBar}>
              <span className={styles.browserDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.browserUrl}>
                <span className={styles.browserSlug}>{slug}</span>.ai4trade.co.uk
              </span>
            </div>
            <div className={styles.browserPage}>
              <p className={styles.portalBiz}>{shownName}</p>
              <p className={styles.portalAsk}>How can we help?</p>
              <ul className={styles.portalJobs}>
                {JOB_TYPES.map((j) => (
                  <li key={j}>{j}</li>
                ))}
              </ul>
              <p className={styles.portalTrack}>Already booked? Track your job</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
