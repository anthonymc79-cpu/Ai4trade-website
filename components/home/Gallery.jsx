"use client";

import { useRef } from "react";
import styles from "./home.module.css";

function Bars() {
  const months = [
    ["May", 62, 30],
    ["Jun", 74, 34],
    ["Jul", 58, 28],
    ["Aug", 81, 36],
    ["Sep", 90, 41],
    ["Oct", 70, 31],
  ];
  return (
    <div className={styles.bars} aria-hidden="true">
      {months.map(([m, inc, exp]) => (
        <div key={m} className={styles.barCol}>
          <span className={styles.barIn} style={{ height: `${inc}%` }} />
          <span className={styles.barOut} style={{ height: `${exp}%` }} />
          <small>{m}</small>
        </div>
      ))}
    </div>
  );
}

const CARDS = [
  {
    title: "Accounts that keep up",
    body: "Income and expenses fill in as jobs are paid and receipts are added, ready for your accountant at the end of the tax year.",
    visual: <Bars />,
  },
  {
    title: "Mileage, worked out",
    body: "Log trips against each van. HMRC’s approved rates are applied for you: 45p a mile for the first 10,000 miles, 25p after.",
    visual: <p className={styles.bigFigure}>45p</p>,
  },
  {
    title: "Timesheets per job",
    body: "Record hours against each customer, so you know which jobs actually made money.",
    visual: (
      <ul className={styles.miniRows} aria-hidden="true">
        <li><span>Porter, kitchen</span><b>14.5 h</b></li>
        <li><span>Reed, rewire</span><b>31 h</b></li>
        <li><span>Young, EICR</span><b>3 h</b></li>
      </ul>
    ),
  },
  {
    title: "Stock and test kit",
    body: "Keep track of materials in the van and get a warning before any instrument’s calibration runs out.",
    visual: (
      <div className={styles.calib} aria-hidden="true">
        <b>30</b>
        <span>days until your multifunction tester’s calibration is due</span>
      </div>
    ),
  },
  {
    title: "Mark up site photos",
    body: "Draw arrows, circles and notes on photos, then attach them to the job.",
    visual: (
      <svg className={styles.photo} viewBox="0 0 200 120" aria-hidden="true">
        <rect width="200" height="120" rx="10" fill="#d9e1ea" />
        <rect x="70" y="22" width="60" height="76" rx="4" fill="#f7f9fb" stroke="#9aa8b6" />
        {[36, 50, 64, 78].map((y) => (
          <rect key={y} x="80" y={y} width="40" height="6" rx="1" fill="#c3ccd6" />
        ))}
        <circle cx="100" cy="53" r="17" fill="none" stroke="#ff3b30" strokeWidth="3" />
        <path d="M150 20 L118 45" stroke="#ff3b30" strokeWidth="3" strokeLinecap="round" />
        <path d="M118 45 l4 -12 M118 45 l12 -3" stroke="#ff3b30" strokeWidth="3" strokeLinecap="round" />
        <text x="152" y="18" fontSize="11" fill="#ff3b30" fontWeight="700">Scorched</text>
      </svg>
    ),
  },
  {
    title: "Every job on a map",
    body: "See where your active customers are and plan the week’s visits around them.",
    visual: (
      <div className={styles.map} aria-hidden="true">
        {[
          [22, 30],
          [48, 58],
          [70, 26],
          [62, 74],
          [34, 70],
        ].map(([x, y]) => (
          <i key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
      </div>
    ),
  },
  {
    title: "Sign in with Face ID",
    body: "Face ID, Touch ID or your fingerprint instead of typing a password on site.",
    visual: (
      <svg className={styles.faceId} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M6 20V12a6 6 0 0 1 6-6h8M44 6h8a6 6 0 0 1 6 6v8M58 44v8a6 6 0 0 1-6 6h-8M20 58h-8a6 6 0 0 1-6-6v-8" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M22 24v5M42 24v5M32 24v12h-3M24 44c4 4 12 4 16 0" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Gallery() {
  const track = useRef(null);

  function scroll(direction) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 360;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className={styles.gallery}>
      <div className="container">
        <div className={styles.galleryHead}>
          <h2 className={styles.h2}>And everything else the office used&nbsp;to&nbsp;do.</h2>
          <div className={styles.galleryNav}>
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
      <ul className={styles.galleryTrack} ref={track}>
        {CARDS.map((c) => (
          <li key={c.title} className={styles.galleryCard}>
            <div className={styles.galleryVisual}>{c.visual}</div>
            <h3 className={styles.galleryTitle}>{c.title}</h3>
            <p className={styles.galleryBody}>{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
