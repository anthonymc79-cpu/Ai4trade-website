import Link from "next/link";
import styles from "./ForElectricians.module.css";

export const metadata = {
  title: "Ai4Trade for electrical businesses",
  description:
    "Job management, quoting, EICR certification, and a free branded customer portal — for electrical businesses of any size.",
};

const FEATURES = [
  {
    code: "JOB-01",
    title: "One board for every job",
    body: "Track enquiries, quotes, scheduled work, and completed jobs across your whole team — no spreadsheets, no missed callbacks.",
  },
  {
    code: "QUO-02",
    title: "Automated quoting rules",
    body: "Set pricing by job type and postcode once. Every new enquiry gets a quote back in minutes, not after you've finished today's jobs.",
  },
  {
    code: "CER-03",
    title: "EICR certificates, start to finish",
    body: "Run the inspection, log observation codes, and issue a signed certificate — all inside the same job record.",
  },
  {
    code: "FLR-04",
    title: "Floorplans from the site visit",
    body: "Sketch circuits on site on a tablet, and turn them into a floorplan the whole team can reference on the next visit.",
  },
  {
    code: "TEA-05",
    title: "Team roles and permissions",
    body: "Control what each engineer, office admin, or subcontractor can see and edit as your team grows past two people.",
  },
  {
    code: "SUB-06",
    title: "One subscription, unlimited free customers",
    body: "You pay one subscription. Every homeowner who books through your portal uses it for free — always.",
  },
];

export default function ForElectriciansPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">For electrical businesses</span>
          <h1 className={styles.heroTitle}>
            Run the business side, so you can get back to the job side.
          </h1>
          <p className={styles.heroLead}>
            Ai4Trade replaces the spreadsheet, the paper EICR pad, and the
            group chat with your office — one subscription per business,
            free for every customer who books through you.
          </p>
          <div className={styles.heroActions}>
            <Link className="btn btn--copper" href="/signup/business">
              Start your subscription
            </Link>
            <Link className="btn btn--ghost" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">What's inside</span>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {FEATURES.map((f) => (
              <div className="tag" key={f.code}>
                <span className="tag__code">{f.code}</span>
                <h3 className="tag__title">{f.title}</h3>
                <p className="tag__body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className={styles.portalCallout}>
            <div>
              <span className="eyebrow">Your branded portal</span>
              <h2 style={{ fontSize: 26, margin: "14px 0 10px" }}>
                Your customers book through a page with your name on it
              </h2>
              <p style={{ color: "var(--paper-dim)", fontSize: 14.5 }}>
                Every subscribing business gets its own web address —
                shareable on invoices, your van, or your own website.
              </p>
              <span className={styles.portalUrl}>sparky-ltd.ai4trade.app</span>
            </div>
            <div>
              <p style={{ color: "var(--paper-dim)", fontSize: 14.5 }}>
                Homeowners who book through your portal register for free —
                they're your customers, not ours. You never see another
                business's jobs, and no one sees yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <span className="eyebrow">See it in action</span>
          <h2 style={{ fontSize: 26, margin: "14px 0 18px" }}>
            Watch a job go from enquiry to signed certificate
          </h2>
          <Link className="btn btn--ghost" href="/tutorials">
            Browse the tutorial library →
          </Link>
        </div>
      </section>
    </>
  );
}
