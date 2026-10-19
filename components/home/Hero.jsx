"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";
import { PRICES, TRIAL_HREF } from "@/lib/prices";

const COLUMNS = ["New enquiry", "Quoted", "Booked in", "Certified", "Paid"];

// Other jobs already on the board (examples).
const JOBS = [
  [
    { name: "Sarah Mills", job: "EV charger", meta: "5 min ago" },
    { name: "Tom Bradley", job: "Tripping circuit", meta: "18 min ago" },
  ],
  [{ name: "Alex Reed", job: "Full rewire", meta: "£4,800" }],
  [{ name: "Lisa Young", job: "EICR, 3 bed", meta: "Tue 10:00" }],
  [{ name: "Mark Stevens", job: "Minor works", meta: "Cert sent" }],
  [{ name: "Priya Shah", job: "EICR, 2 bed", meta: "£120" }],
];

// The one job we watch move across the board.
const FEATURED = {
  name: "James Porter",
  job: "Kitchen circuits",
  meta: ["Just now", "£1,240", "Tue 14 Oct, 8:00", "EICR satisfactory", "£1,240 paid"],
};

export default function Hero() {
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);
  const colsRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(COLUMNS.length - 1);
      return;
    }
    setStep(0);
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= COLUMNS.length - 1) clearInterval(timer);
    }, 1300);
    return () => clearInterval(timer);
  }, [runId]);

  // On narrow screens the board scrolls sideways: keep the moving job in view.
  useEffect(() => {
    const el = colsRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const col = el.children[step];
    if (col) el.scrollTo({ left: col.offsetLeft - 8, behavior: "smooth" });
  }, [step]);

  const finished = step === COLUMNS.length - 1;

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroBrand}>
          <Image
            src="/logo.png"
            alt="Ai4Trade"
            width={320}
            height={320}
            className={styles.heroLogo}
            priority
          />
          <h1 className={styles.heroTitle}>From first call to final payment.</h1>
        </div>
        <p className={styles.heroLead}>
          Ai4Trade runs the paperwork side of an electrical business. Enquiries, quotes,
          certificates, invoices and accounts, in one app that works on site and in the office.
        </p>
        <div className={styles.heroActions}>
          <Link href={TRIAL_HREF} className="btn btn--copper">
            Start your free {PRICES.trialDays}-day trial
          </Link>
          <a href="#how-it-works" className="textLink">
            See how a job flows
          </a>
        </div>

        <div className={styles.board} aria-label="Example job board" role="img">
          <div className={styles.boardBar}>
            <span className={styles.boardTitle}>Jobs this week</span>
            <span
              className={styles.boardProgress}
              style={{ "--progress": step / (COLUMNS.length - 1) }}
              aria-hidden="true"
            />
          </div>
          <div className={styles.boardCols} ref={colsRef}>
            {COLUMNS.map((col, i) => (
              <div key={col} className={styles.boardCol}>
                <div className={styles.boardColHead}>
                  <span>{col}</span>
                  <span className={styles.boardCount}>
                    {JOBS[i].length + (step === i ? 1 : 0)}
                  </span>
                </div>
                {step === i && (
                  <div key={`${runId}-${i}`} className={`${styles.jobCard} ${styles.jobCardLive}`}>
                    <strong>{FEATURED.name}</strong>
                    <span>{FEATURED.job}</span>
                    <small>{FEATURED.meta[i]}</small>
                  </div>
                )}
                {JOBS[i].map((j) => (
                  <div key={j.name} className={styles.jobCard}>
                    <strong>{j.name}</strong>
                    <span>{j.job}</span>
                    <small>{j.meta}</small>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.replayRow}>
          <button
            type="button"
            className={styles.replay}
            onClick={() => setRunId((n) => n + 1)}
            disabled={!finished}
          >
            Watch that again
          </button>
        </div>
      </div>
    </section>
  );
}
