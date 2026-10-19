import h from "../home/home.module.css";
import styles from "./homeowners.module.css";

// Static recreations of what a homeowner sees in the app. Names and
// figures are examples.

const JOB_TYPES = [
  { name: "Electrical fault", note: "Something has stopped working or is unsafe", tone: "red" },
  { name: "Full house rewire", note: "Replace all the wiring", tone: "violet" },
  { name: "New circuits", note: "Kitchen, extension or outbuilding", tone: "blue" },
  { name: "EV charger", note: "Home charge point installation", tone: "green" },
  { name: "Safety inspection (EICR)", note: "For landlords and home sales", tone: "sky" },
  { name: "Something else", note: "Any other electrical work", tone: "grey" },
];

export function ChooseJobScreen() {
  return (
    <div className={h.screen}>
      <div className={h.scrTop}>
        <span className={h.scrBrand}>New request</span>
        <span className={h.scrMuted}>Step 1 of 3</span>
      </div>
      <p className={h.scrTitle}>What do you need help with?</p>
      <ul className={h.optionList}>
        {JOB_TYPES.map((o) => (
          <li
            key={o.name}
            className={`${h.option} ${o.name === "New circuits" ? h.optionActive : ""}`}
          >
            <span className={`${h.optionIcon} ${h[`tone_${o.tone}`] || styles.toneGrey}`} />
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

export function PlanAndPhotosScreen() {
  return (
    <div className={h.screen}>
      <div className={h.scrTop}>
        <span className={h.scrBrand}>Your kitchen</span>
        <span className={h.scrMuted}>Floor plan and photos</span>
      </div>
      <div className={styles.planPhotos}>
        <svg className={h.plan} viewBox="0 0 220 150" role="img" aria-label="A kitchen floor plan with new sockets and lights marked">
          <rect x="6" y="6" width="208" height="138" rx="3" fill="#fff" stroke="#0e1a2b" strokeWidth="3" />
          <rect x="12" y="12" width="140" height="18" fill="#eef2f6" />
          <rect x="170" y="12" width="38" height="56" fill="#eef2f6" />
          <text x="100" y="92" fontSize="11" textAnchor="middle" fill="#5b6b7c">Kitchen</text>
          {[34, 70, 106].map((x) => (
            <rect key={x} x={x - 7} y="34" width="14" height="8" rx="1.5" fill="#2f8fe0" />
          ))}
          {[60, 140].map((x) => (
            <circle key={x} cx={x} cy="116" r="7" fill="none" stroke="#f5821f" strokeWidth="2.5" />
          ))}
        </svg>
        <div className={styles.photoRow}>
          <span className={styles.photoThumb}>
            <svg viewBox="0 0 60 44" aria-hidden="true">
              <rect width="60" height="44" fill="#d6dee7" />
              <rect x="22" y="8" width="16" height="26" rx="2" fill="#f7f9fb" stroke="#9aa8b6" />
              <circle cx="30" cy="20" r="8" fill="none" stroke="#ff3b30" strokeWidth="2" />
            </svg>
          </span>
          <span className={styles.photoThumb}>
            <svg viewBox="0 0 60 44" aria-hidden="true">
              <rect width="60" height="44" fill="#e3e9d8" />
              <rect x="8" y="26" width="44" height="12" fill="#c5cfbb" />
              <path d="M40 8 L30 22" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className={`${styles.photoThumb} ${styles.photoAdd}`}>Add photo</span>
        </div>
      </div>
      <div className={h.scrFoot}>
        <span className={h.chip}>3 sockets, 2 lights marked</span>
        <span className={h.scrMuted}>Saved to your account</span>
      </div>
    </div>
  );
}

export function PriceScreen() {
  return (
    <div className={h.screen}>
      <div className={h.scrTop}>
        <span className={h.scrBrand}>Quote from Dave’s Electrics</span>
        <span className={`${h.chip}`}>New</span>
      </div>
      <div className={styles.estimate}>
        <span>Estimate from your floor plan</span>
        <strong>£1,180 inc VAT</strong>
      </div>
      <ul className={h.lines}>
        <li><span>Kitchen ring circuit</span><span>£420</span></li>
        <li><span>3 double sockets</span><span>£135</span></li>
        <li><span>2 ceiling lights</span><span>£160</span></li>
        <li><span>Consumer unit upgrade</span><span>£550</span></li>
        <li className={h.linesTotal}><span>Quote total</span><span>£1,265</span></li>
      </ul>
      <div className={styles.quoteBtns}>
        <span className={styles.accept}>Accept quote</span>
        <span className={styles.adjust}>Ask for changes</span>
      </div>
    </div>
  );
}

export function TrackScreen() {
  const steps = [
    { t: "Submitted", d: "Mon 08:30" },
    { t: "Quote sent", d: "Mon 16:05" },
    { t: "You accepted the quote", d: "Mon 19:40" },
    { t: "Booked in: Tue 14 Oct, 8:00", d: "Confirmed by Dave’s Electrics", now: true },
    { t: "Job complete", d: "" },
    { t: "Certificates sent", d: "" },
  ];
  return (
    <div className={h.screen}>
      <div className={h.scrTop}>
        <span className={h.scrBrand}>Kitchen circuits</span>
        <span className={`${h.chip} ${h.chipGreen}`}>Booked in</span>
      </div>
      <ol className={styles.track}>
        {steps.map((s, i) => {
          const state = s.now ? styles.trackNow : i < 3 ? styles.trackDone : styles.trackTodo;
          return (
            <li key={s.t} className={state}>
              <span className={styles.trackDot} />
              <span>
                <strong>{s.t}</strong>
                {s.d && <small>{s.d}</small>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function AccountScreen() {
  const docs = [
    { kind: "Quote", name: "Kitchen circuits", meta: "Accepted" },
    { kind: "Invoice", name: "INV-0142", meta: "Paid" },
    { kind: "Certificate", name: "Electrical Installation Certificate", meta: "PDF" },
    { kind: "Floor plan", name: "Kitchen", meta: "3 sockets, 2 lights" },
    { kind: "Photos", name: "Before the work", meta: "4 photos" },
  ];
  return (
    <div className={h.screen}>
      <div className={h.scrTop}>
        <span className={h.scrBrand}>My jobs</span>
        <span className={h.scrMuted}>Everything for your home</span>
      </div>
      <ul className={styles.docs}>
        {docs.map((d) => (
          <li key={d.kind}>
            <span className={styles.docIcon} aria-hidden="true" />
            <span className={styles.docText}>
              <small>{d.kind}</small>
              <strong>{d.name}</strong>
            </span>
            <span className={styles.docMeta}>{d.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
