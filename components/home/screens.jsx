import styles from "./home.module.css";

// Small, static recreations of real Ai4Trade screens, used in the
// "follow one job" story. Names and figures are examples.

export function BookingScreen() {
  const options = [
    { name: "Electrical fault", note: "Something has stopped working or is unsafe", tone: "red" },
    { name: "Full house rewire", note: "Replace all the wiring", tone: "violet" },
    { name: "New circuits", note: "Kitchen, extension or outbuilding", tone: "blue", on: true },
    { name: "EV charger", note: "Home charge point installation", tone: "green" },
    { name: "Safety inspection (EICR)", note: "For landlords and home sales", tone: "sky" },
  ];
  return (
    <div className={styles.screen}>
      <div className={styles.scrTop}>
        <span className={styles.scrBrand}>Dave’s Electrics</span>
        <span className={styles.scrMuted}>daveselectrics.ai4trade.co.uk</span>
      </div>
      <p className={styles.scrTitle}>What do you need help with?</p>
      <ul className={styles.optionList}>
        {options.map((o) => (
          <li key={o.name} className={`${styles.option} ${o.on ? styles.optionActive : ""}`}>
            <span className={`${styles.optionIcon} ${styles[`tone_${o.tone}`]}`} />
            <span>
              <strong>{o.name}</strong>
              <small>{o.note}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QuoteScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.scrTop}>
        <span className={styles.scrBrand}>Quote Q-0217</span>
        <span className={styles.scrMuted}>James Porter, kitchen</span>
      </div>
      <div className={styles.quoteGrid}>
        <svg className={styles.plan} viewBox="0 0 220 160" role="img" aria-label="Floor plan of a kitchen with sockets and lights marked">
          <rect x="6" y="6" width="208" height="148" rx="3" fill="#fff" stroke="#0e1a2b" strokeWidth="3" />
          <line x1="130" y1="6" x2="130" y2="96" stroke="#0e1a2b" strokeWidth="3" />
          <line x1="130" y1="96" x2="214" y2="96" stroke="#0e1a2b" strokeWidth="3" />
          <rect x="12" y="12" width="112" height="16" fill="#eef2f6" />
          <text x="66" y="84" fontSize="10" textAnchor="middle" fill="#5b6b7c">Kitchen</text>
          <text x="172" y="56" fontSize="10" textAnchor="middle" fill="#5b6b7c">Utility</text>
          {[30, 62, 94].map((x) => (
            <g key={x}>
              <rect x={x - 6} y="30" width="12" height="7" rx="1.5" fill="#2f8fe0" />
            </g>
          ))}
          {[40, 92].map((x) => (
            <circle key={x} cx={x} cy="112" r="6" fill="none" stroke="#f5821f" strokeWidth="2.5" />
          ))}
          <circle cx="172" cy="124" r="6" fill="none" stroke="#f5821f" strokeWidth="2.5" />
          <rect x="190" y="60" width="16" height="22" rx="2" fill="#0e1a2b" />
        </svg>
        <ul className={styles.lines}>
          <li><span>Kitchen ring circuit</span><span>£420</span></li>
          <li><span>6 double sockets</span><span>£270</span></li>
          <li><span>Consumer unit upgrade</span><span>£550</span></li>
          <li className={styles.linesTotal}><span>Total</span><span>£1,240</span></li>
        </ul>
      </div>
      <div className={styles.scrFoot}>
        <span className={styles.chip}>Sent to customer</span>
        <span className={styles.scrMuted}>Viewed 2 minutes ago</span>
      </div>
    </div>
  );
}

export function ScheduleScreen() {
  const events = [
    { t: "Quote accepted", d: "Mon 09:12", done: true },
    { t: "Deposit of £250 requested", d: "Mon 09:12", done: true },
    { t: "Reminder sent automatically", d: "Wed 18:00", done: true },
    { t: "Deposit received", d: "Thu 07:41", done: true },
    { t: "Booked in: Tue 14 Oct, 8:00", d: "Customer notified", done: false },
  ];
  return (
    <div className={styles.screen}>
      <div className={styles.scrTop}>
        <span className={styles.scrBrand}>James Porter</span>
        <span className={`${styles.chip} ${styles.chipGreen}`}>Booked in</span>
      </div>
      <ol className={styles.timeline}>
        {events.map((e) => (
          <li key={e.t} className={e.done ? styles.tlDone : styles.tlNext}>
            <span className={styles.tlDot} />
            <span>
              <strong>{e.t}</strong>
              <small>{e.d}</small>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CertificateScreen() {
  const rows = [
    ["1", "Ring final, kitchen", "B32", "0.41", ">200"],
    ["2", "Lighting, ground floor", "B6", "0.88", ">200"],
    ["3", "Cooker", "B40", "0.36", ">200"],
    ["4", "Sockets, first floor", "B32", "0.52", "180"],
    ["5", "Immersion heater", "B16", "0.64", ">200"],
  ];
  return (
    <div className={styles.screen}>
      <div className={styles.scrTop}>
        <span className={styles.scrBrand}>Condition report (EICR)</span>
        <span className={styles.scrMuted}>BS 7671:2018+A2:2022</span>
      </div>
      <table className={styles.certTable}>
        <thead>
          <tr>
            <th>Circuit</th>
            <th>Description</th>
            <th>Device</th>
            <th>Zs (Ω)</th>
            <th>IR (MΩ)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.scrFoot}>
        <span className={styles.chip}>Imported from Megger Certsuite</span>
        <span className={`${styles.chip} ${styles.chipGreen}`}>Satisfactory</span>
      </div>
    </div>
  );
}

export function InvoiceScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.scrTop}>
        <span className={styles.scrBrand}>Invoice INV-0142</span>
        <span className={`${styles.chip} ${styles.chipGreen}`}>Paid</span>
      </div>
      <ul className={styles.lines}>
        <li><span>Kitchen ring circuit</span><span>£420</span></li>
        <li><span>6 double sockets</span><span>£270</span></li>
        <li><span>Consumer unit upgrade</span><span>£550</span></li>
        <li><span>Less deposit</span><span>−£250</span></li>
        <li className={styles.linesTotal}><span>Balance paid</span><span>£990</span></li>
      </ul>
      <div className={styles.ledger}>
        <span>Added to your accounts</span>
        <strong>Income, October 2026</strong>
        <span className={styles.scrMuted}>Certificates emailed to the customer</span>
      </div>
    </div>
  );
}
