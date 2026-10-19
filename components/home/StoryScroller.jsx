"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

// Steps on the left; one device on the right that stays put while its
// screen changes to match the step in the middle of the window.
// Each step: { title, body, Screen }.
export default function StoryScroller({ id, title, lead, steps, tone = "grey" }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={`${styles.journey} ${tone === "white" ? styles.journeyWhite : ""}`}>
      <div className="container">
        <header className={styles.sectionHead}>
          <h2 className={styles.h2}>{title}</h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>

        <div className={styles.journeyGrid}>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => (stepRefs.current[i] = el)}
                data-index={i}
                className={`${styles.step} ${active === i ? styles.stepActive : ""}`}
              >
                <span className={styles.stepNum} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                <div className={styles.stepScreenInline}>
                  <div className={styles.device}>
                    <step.Screen />
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.stickyCol} aria-hidden="true">
            <div className={styles.sticky}>
              <div className={styles.device}>
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className={`${styles.deviceLayer} ${active === i ? styles.deviceLayerOn : ""}`}
                  >
                    <step.Screen />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
