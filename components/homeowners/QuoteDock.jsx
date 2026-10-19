"use client";

import { useEffect, useState } from "react";
import styles from "./homeowners.module.css";
import { HOMEOWNER_QUOTE_HREF } from "@/lib/links";

// A "Get a free quote" button that follows you down the page. It appears
// once the hero's own button has scrolled away, and steps aside when the
// closing section (which has its own button) is on screen.
export default function QuoteDock({ heroId, closingId }) {
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const closing = document.getElementById(closingId);
    const observers = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), {
        rootMargin: "0px 0px -60% 0px",
      });
      o.observe(hero);
      observers.push(o);
    }
    if (closing) {
      const o = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting));
      o.observe(closing);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [heroId, closingId]);

  const visible = pastHero && !atEnd;

  return (
    <div className={`${styles.dock} ${visible ? styles.dockOn : ""}`} aria-hidden={!visible}>
      <p className={styles.dockText}>
        <strong>Need electrical work?</strong>
        <span>Free quotes, no chasing.</span>
      </p>
      <a href={HOMEOWNER_QUOTE_HREF} className="btn btn--copper" tabIndex={visible ? 0 : -1}>
        Get a free quote
      </a>
    </div>
  );
}
