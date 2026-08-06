import styles from "./DashboardPreview.module.css";

/* Small stroke-style icons, drawn inline so the dashboard mockup has no
   external image dependencies. All inherit color from their wrapper. */
const icon = {
  chat: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4l1.4 4.6L18 10l-4.6 1.4L12 16l-1.4-4.6L6 10l4.6-1.4L12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M19 14.5l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2Z" fill="currentColor" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M7 4h7l4 4v12H7V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 12h6M10 15.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="m4 12 16-8-6 16-2.5-6.5L4 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  checkCircle: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m8.5 12.3 2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="var(--success-bg)" />
      <path d="m8 12.3 2.3 2.3 5.2-5.6" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pound: (
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
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="6" y="5" width="12" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12.5" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8.5v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 17V9M9.5 17v-5M15 17V7M20 17v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  chevron: (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  filter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M7.5 12h9M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  arrowUp: (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
      <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrowDown: (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const metrics = [
  { icon: icon.pound, label: "Revenue booked", value: "£12,450", delta: "18% vs last week", dir: "up" },
  { icon: icon.clipboard, label: "Quotes sent", value: "8", delta: "14% vs last week", dir: "up" },
  { icon: icon.clock, label: "Avg. response time", value: "1m 42s", delta: "38% vs last week", dir: "down" },
  { icon: icon.trend, label: "Jobs booked", value: "5", delta: "18% vs last week", dir: "up" },
];

export default function DashboardPreview() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.cardHead}>
        <h3 className={styles.cardTitle}>Trade Workflow Command Centre</h3>
        <div className={styles.headControls}>
          <button type="button" className={styles.pill}>
            This week {icon.chevron}
          </button>
          <button type="button" className={styles.pill}>
            {icon.filter} Filters
          </button>
        </div>
      </div>

      <div className={styles.stages}>
        {/* 1. New enquiry */}
        <div className={styles.stage}>
          <div className={styles.stageIcon}>{icon.chat}</div>
          <span className={styles.stageTitle}>New enquiry</span>
          <div className={styles.stageNumber}>14</div>
          <span className={styles.stageSub}>new enquiries</span>
          <div className={styles.stageList}>
            <span className={styles.listLabel}>Latest enquiries</span>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>James Porter</div>
                <div className={styles.listSub}>Kitchen lights</div>
              </div>
              <span className={styles.listTime}>5m ago</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Sarah Mills</div>
                <div className={styles.listSub}>Rewire</div>
              </div>
              <span className={styles.listTime}>18m ago</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Tom Bradley</div>
                <div className={styles.listSub}>EV charger</div>
              </div>
              <span className={styles.listTime}>32m ago</span>
            </div>
            <a className={styles.viewAll} href="#">View all enquiries</a>
          </div>
        </div>

        <div className={styles.connector} />

        {/* 2. AI replies instantly */}
        <div className={styles.stage}>
          <div className={`${styles.stageIcon} ${styles.stageIconAccent}`}>{icon.sparkle}</div>
          <span className={`${styles.stageTitle} ${styles.stageTitleAccent}`}>AI replies instantly</span>
          <div className={styles.stageNumber}>14</div>
          <span className={styles.stageSub}>replied</span>
          <span className={styles.stageTag}>100% response rate</span>
          <div className={styles.stageList}>
            <span className={styles.listLabel}>Recent replies</span>
            <div className={styles.listItem}>
              {icon.check}
              <div>
                <div className={styles.listName}>James Porter</div>
                <div className={styles.listSub}>Replied 5m ago</div>
              </div>
            </div>
            <div className={styles.listItem}>
              {icon.check}
              <div>
                <div className={styles.listName}>Sarah Mills</div>
                <div className={styles.listSub}>Replied 18m ago</div>
              </div>
            </div>
            <div className={styles.listItem}>
              {icon.check}
              <div>
                <div className={styles.listName}>Tom Bradley</div>
                <div className={styles.listSub}>Replied 32m ago</div>
              </div>
            </div>
            <a className={styles.viewAll} href="#">View all replies</a>
          </div>
        </div>

        <div className={styles.connector} />

        {/* 3. Site visit */}
        <div className={styles.stage}>
          <div className={styles.stageIcon}>{icon.calendar}</div>
          <span className={styles.stageTitle}>Site visit</span>
          <div className={styles.stageNumber}>6</div>
          <span className={styles.stageSub}>scheduled</span>
          <div className={styles.stageList}>
            <span className={styles.listLabel}>Upcoming visits</span>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Today, 10:00</div>
                <div className={styles.listSub}>James Porter</div>
              </div>
            </div>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Today, 14:00</div>
                <div className={styles.listSub}>Alex Reed</div>
              </div>
            </div>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Tomorrow, 09:00</div>
                <div className={styles.listSub}>Sam Khan</div>
              </div>
            </div>
            <a className={styles.viewAll} href="#">View calendar</a>
          </div>
        </div>

        <div className={styles.connector} />

        {/* 4. Quote sent */}
        <div className={styles.stage}>
          <div className={styles.stageIcon}>{icon.doc}</div>
          <span className={styles.stageTitle}>Quote sent</span>
          <div className={styles.stageNumber}>8</div>
          <span className={styles.stageSub}>quotes sent</span>
          <div className={styles.stageList}>
            <span className={styles.listLabel}>Quote status</span>
            <div className={styles.statusRow}>
              <span className={`${styles.dot} ${styles.dotBlue}`} />
              <span className={styles.statusCount}>4</span>
              <span className={styles.statusLabel}>Viewed</span>
            </div>
            <div className={styles.statusRow}>
              <span className={`${styles.dot} ${styles.dotOrange}`} />
              <span className={styles.statusCount}>2</span>
              <span className={styles.statusLabel}>Awaiting reply</span>
            </div>
            <div className={styles.statusRow}>
              <span className={`${styles.dot} ${styles.dotGrey}`} />
              <span className={styles.statusCount}>2</span>
              <span className={styles.statusLabel}>Draft</span>
            </div>
            <a className={styles.viewAll} href="#">View all quotes</a>
          </div>
        </div>

        <div className={styles.connector} />

        {/* 5. Follow-up */}
        <div className={styles.stage}>
          <div className={styles.stageIcon}>{icon.send}</div>
          <span className={styles.stageTitle}>Follow-up</span>
          <div className={styles.stageNumber}>6</div>
          <span className={styles.stageSub}>due</span>
          <div className={styles.stageList}>
            <span className={styles.listLabel}>Due to follow up</span>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Alex Reed</div>
              </div>
              <span className={styles.listTime}>Today</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Mark Stevens</div>
              </div>
              <span className={styles.listTime}>Tomorrow</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <div className={styles.listName}>Lisa Young</div>
              </div>
              <span className={styles.listTime}>Tomorrow</span>
            </div>
            <a className={styles.viewAll} href="#">View follow-ups</a>
          </div>
        </div>

        <div className={styles.connector} />

        {/* 6. Job booked */}
        <div className={`${styles.stage} ${styles.stageHighlight}`}>
          <div className={`${styles.stageIcon} ${styles.stageIconHighlight}`}>{icon.checkCircle}</div>
          <span className={styles.stageTitleHighlight}>Job booked</span>
          <div className={`${styles.stageNumber} ${styles.stageNumberHighlight}`}>5</div>
          <span className={styles.stageSubHighlight}>booked this week</span>
          <div className={styles.stageList}>
            <span className={styles.listLabel}>Revenue booked</span>
            <div className={styles.revenueValue}>£12,450</div>
            <span className={styles.revenueDelta}>{icon.arrowUp} 18% vs last week</span>
            <div className={styles.callout}>Great work! 5 jobs booked 🎉</div>
          </div>
        </div>
      </div>

      <div className={styles.metrics}>
        {metrics.map((m) => (
          <div className={styles.metric} key={m.label}>
            <div className={styles.metricIcon}>{m.icon}</div>
            <div>
              <span className={styles.metricLabel}>{m.label}</span>
              <div className={styles.metricValue}>{m.value}</div>
              <span className={styles.metricDelta}>
                {m.dir === "up" ? icon.arrowUp : icon.arrowDown} {m.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
