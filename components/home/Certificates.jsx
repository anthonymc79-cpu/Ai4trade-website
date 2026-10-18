"use client";

import { useState } from "react";
import styles from "./home.module.css";

const CERTS = [
  {
    id: "eicr",
    tab: "EICR",
    name: "Electrical Installation Condition Report",
    when: "Periodic inspections for landlords, sales and insurers.",
    fields: ["Reason for the report", "Extent and limitations", "Overall assessment"],
    codes: [["C1", 0], ["C2", 1], ["C3", 3], ["FI", 0]],
    points: [
      "Observations coded C1, C2, C3 and FI",
      "Full schedule of inspections",
      "Remedial notes recorded against each observation",
    ],
  },
  {
    id: "eic",
    tab: "EIC",
    name: "Electrical Installation Certificate",
    when: "New installations, rewires and new circuits.",
    fields: ["Design", "Construction", "Inspection and testing"],
    points: [
      "Design, construction and inspection sign-off",
      "Schedule of test results for every circuit",
      "Linked to the job, the quote and the invoice",
    ],
  },
  {
    id: "meiwc",
    tab: "Minor Works",
    name: "Minor Electrical Installation Works Certificate",
    when: "Additions and alterations that don’t need a new circuit.",
    fields: ["Description of the work", "Circuit altered", "Protective device"],
    points: [
      "A short form for small jobs",
      "Test results for the altered circuit",
      "Emailed to the customer when you finish",
    ],
  },
];

const TESTERS = [
  "Fluke DMS",
  "Megger Certsuite",
  "Kewtech FreeFast",
  "Martindale ET-Link",
  "Metrel ESM",
  "Di-Log",
];

export default function Certificates() {
  const [current, setCurrent] = useState(CERTS[0].id);
  const cert = CERTS.find((c) => c.id === current);

  return (
    <section className={styles.certs}>
      <div className="container">
        <header className={styles.sectionHead}>
          <h2 className={styles.h2}>Certificates that match the real forms.</h2>
          <p className={styles.lead}>
            Laid out to BS 7671:2018+A2:2022, filled in on site, and sent before you’ve
            packed the van.
          </p>
        </header>

        <div className={styles.segmented} role="tablist" aria-label="Certificate type">
          {CERTS.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={current === c.id}
              aria-controls="cert-panel"
              className={current === c.id ? styles.segOn : undefined}
              onClick={() => setCurrent(c.id)}
            >
              {c.tab}
            </button>
          ))}
        </div>

        <div
          id="cert-panel"
          role="tabpanel"
          aria-labelledby={`tab-${cert.id}`}
          className={styles.certPanel}
        >
          <div className={styles.paper} key={cert.id}>
            <p className={styles.paperStd}>BS 7671:2018+A2:2022</p>
            <p className={styles.paperName}>{cert.name}</p>
            <dl className={styles.paperFields} aria-hidden="true">
              {cert.fields.map((f) => (
                <div key={f}>
                  <dt>{f}</dt>
                  <dd />
                </div>
              ))}
            </dl>
            {cert.codes ? (
              <div className={styles.paperCodes} aria-hidden="true">
                {cert.codes.map(([code, n]) => (
                  <span key={code} className={styles[`code_${code}`]}>
                    <b>{code}</b>
                    {n}
                  </span>
                ))}
              </div>
            ) : (
              <div className={styles.paperGrid} aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            )}
            <div className={styles.paperSign} aria-hidden="true">
              <span>Inspected by</span>
              <span>Signed</span>
            </div>
          </div>
          <div className={styles.certFacts}>
            <h3 className={styles.certName}>{cert.name}</h3>
            <p className={styles.certWhen}>{cert.when}</p>
            <ul className={styles.ticks}>
              {cert.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.testers}>
          <p className={styles.testersTitle}>Import results straight from your tester’s software</p>
          <ul className={styles.testerList}>
            {TESTERS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className={styles.testersNote}>
            Calibration reminders for your test kit at 90, 30 and 7 days before it’s due.
          </p>
        </div>
      </div>
    </section>
  );
}
