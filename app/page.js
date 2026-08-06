import Link from "next/link";
import DashboardPreview from "@/components/DashboardPreview";
import styles from "./Home.module.css";

export const metadata = {
  title: "Ai4Trade — AI-powered job management for trade businesses",
};

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Reply instantly",
    body: "AI replies to new enquiries in seconds—day or night.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M9 18h7M8 18c1.4 0 2-1 2-2.3v-3M8 12.7h4M9.7 12.7c-1 0-1.7-.9-1.7-2.2 0-2 1.6-3.5 3.6-3.5 1 0 1.9.4 2.6 1.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Quote faster",
    body: "Create accurate quotes in minutes, not hours.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12.5a8 8 0 1 1 2.6 5.9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M4 17v-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m10 12 2 2 3.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Chase automatically",
    body: "Smart follow-ups keep quotes moving.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 17V9M9.5 17v-5M15 17V7M20 17v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Know what's next",
    body: "Clear next actions so you always stay on top.",
  },
];

const BEFORE_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M7 4.5c1 0 1.9.6 2.2 1.6l.6 1.8a2 2 0 0 1-.5 2.1l-.8.8a12 12 0 0 0 5.6 5.6l.8-.8a2 2 0 0 1 2.1-.5l1.8.6c1 .3 1.6 1.2 1.6 2.2v1.6c0 1.3-1.1 2.3-2.4 2.1-9-1.3-13.6-8-14.5-14.7C3.3 6 4.3 4.7 5.6 4.7H7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Missed enquiries",
    body: "Calls and messages go unanswered.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12.5" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8.5v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Late follow-ups",
    body: "Leads go cold and jobs are lost.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="6" y="5" width="12" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9h6M9 12.5h6M9 16h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: "Scattered notes",
    body: "Info is everywhere, nothing's clear.",
  },
];

const WITH_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="10.5" r="0.9" fill="currentColor" />
        <circle cx="12" cy="10.5" r="0.9" fill="currentColor" />
        <circle cx="15" cy="10.5" r="0.9" fill="currentColor" />
      </svg>
    ),
    title: "Instant replies",
    body: "AI responds 24/7 so you never miss a job.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="m4 12 16-8-6 16-2.5-6.5L4 12Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Automated chasing",
    body: "Smart follow-ups keep quotes moving.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="6" y="5" width="12" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="m9 12 2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Clear next action",
    body: "One place to see what to do next.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <svg className={styles.heroDecoration} viewBox="0 0 220 140" fill="none" aria-hidden="true">
          <path
            d="M2 120h40l16-16h50l18-18h60"
            stroke="var(--wire-line)"
            strokeWidth="1.5"
          />
          <circle cx="42" cy="120" r="3" fill="var(--wire-line)" />
          <circle cx="108" cy="104" r="3" fill="var(--wire-line)" />
          <circle cx="176" cy="86" r="3" fill="var(--trace)" opacity="0.5" />
        </svg>

        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Spend less time on admin. Win more jobs.
              </h1>
              <p className={styles.heroLead}>
                AI-powered automation for trade businesses—from the first
                enquiry to the final invoice.
              </p>
              <div className={styles.heroActions}>
                <Link href="/signup/business" className="btn btn--copper">
                  Book a demo
                </Link>
                <Link href="/for-electricians" className="btn btn--ghost">
                  See how it works
                </Link>
              </div>
            </div>

            <div className={styles.heroDashboard}>
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div className={styles.featureCard} key={f.title}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.compareSection}>
        <div className="container">
          <h2 className={styles.compareHeading}>
            A simpler day for your trade business
          </h2>

          <div className={styles.compareGrid}>
            <div className={styles.comparePanel}>
              <span className={styles.comparePanelLabel}>Before</span>
              <p className={styles.comparePanelLead}>
                Missed calls, late quote follow-ups, scattered notes.
              </p>
              <div className={styles.compareItems}>
                {BEFORE_ITEMS.map((item) => (
                  <div className={styles.compareItem} key={item.title}>
                    <div className={styles.compareItemIcon}>{item.icon}</div>
                    <div>
                      <h4 className={styles.compareItemTitle}>{item.title}</h4>
                      <p className={styles.compareItemBody}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.compareArrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className={`${styles.comparePanel} ${styles.comparePanelAccent}`}>
              <span className={`${styles.comparePanelLabel} ${styles.comparePanelLabelAccent}`}>
                With AI 4 Trade
              </span>
              <p className={styles.comparePanelLead}>
                Instant replies, automated chasing, a clear next action.
              </p>
              <div className={styles.compareItems}>
                {WITH_ITEMS.map((item) => (
                  <div className={styles.compareItem} key={item.title}>
                    <div className={`${styles.compareItemIcon} ${styles.compareItemIconAccent}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={styles.compareItemTitle}>{item.title}</h4>
                      <p className={styles.compareItemBody}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
