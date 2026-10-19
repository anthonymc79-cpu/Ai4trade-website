"use client";

import { useEffect, useState } from "react";
import styles from "./homeowners.module.css";
import { HOMEOWNER_QUOTE_HREF } from "@/lib/links";

// The statuses a homeowner actually sees in the app, in order.
const STATUSES = [
  { label: "Submitted", note: "Your electrician has your request" },
  { label: "Quote sent", note: "Ready for you to review" },
  { label: "Booked in", note: "Tue 14 Oct, 8:00" },
  { label: "Job complete", note: "Work finished and tested" },
  { label: "Certificates sent", note: "Saved in your account" },
];

export default function HomeownersHero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(STATUSES.length - 1);
      return;
    }
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= STATUSES.length - 1) clearInterval(timer);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} id="homeowners-hero">
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <p className={styles.heroEyebrow}>For homeowners</p>
          <h1 className={styles.heroTitle}>Electrical work, without the chasing.</h1>
          <p className={styles.heroLead}>
            Ask for a quote, show exactly what you need, and follow the job from first message
            to final certificate. Free for you, always.
          </p>
          <div className={styles.heroActions}>
            <a href={HOMEOWNER_QUOTE_HREF} className="btn btn--copper">
              Get a free quote
            </a>
            <a href="#how-it-works" className="textLink">
              See how it works
            </a>
          </div>
        </div>

        <div className={styles.phone} role="img" aria-label="A job tracker showing each stage of an electrical job">
          <div className={styles.phoneScreen}>
            <p className={styles.phoneJob}>Kitchen circuits</p>
            <p className={styles.phoneSub}>Dave’s Electrics</p>
            <ol className={styles.heroTrack}>
              {STATUSES.map((s, i) => (
                <li
                  key={s.label}
                  className={
                    i < step || step === STATUSES.length - 1
                      ? styles.htDone
                      : i === step
                        ? styles.htNow
                        : styles.htTodo
                  }
                >
                  <span className={styles.htDot} />
                  <span>
                    <strong>{s.label}</strong>
                    <small>{s.note}</small>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
