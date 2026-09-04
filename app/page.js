import Link from "next/link";
import styles from "./Home.module.css";

export const metadata = {
  title: "Ai4Trade — job management for electrical businesses",
};

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">Two ways in</span>
          <h1 className={styles.heroTitle}>
            One board for every job. <em>Every certificate.</em> Every
            customer who's waiting on you.
          </h1>
          <p className={styles.heroLead}>
            Ai4Trade is job management, quoting, and EICR certification built
            for electrical businesses — with a free booking portal your own
            customers use to reach you.
          </p>

          <div className={styles.split}>
            <div className={styles.splitPane}>
              <span className={styles.splitLabel}>Run a business</span>
              <h2 className={styles.splitTitle}>
                I'm an electrician or business owner
              </h2>
              <p className={styles.splitBody}>
                Manage jobs, quotes, floorplans, and certificates in one
                place — and give your customers a branded portal of their
                own.
              </p>
              <Link href="/for-electricians" className="btn btn--copper">
                See how it works →
              </Link>
            </div>

            <div className={styles.splitPane}>
              <span className={styles.splitLabel}>Need work done</span>
              <h2 className={styles.splitTitle}>
                I need electrical work doing
              </h2>
              <p className={styles.splitBody}>
                Book a free enquiry with your electrician, track your job,
                and keep every certificate in one place — no charge, ever.
              </p>
              <Link href="/services" className="btn btn--ghost">
                Get a free quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className={styles.stripHead}>
            <span className="eyebrow">Built for the trade</span>
          </div>
          <div className="grid-3">
            <div className="tag">
              <span className="tag__code">01 · QUOTING</span>
              <h3 className="tag__title">Quote in minutes, not evenings</h3>
              <p className="tag__body">
                Job type and postcode generate a quote automatically, ready
                to send before you've left the driveway.
              </p>
            </div>
            <div className="tag">
              <span className="tag__code">02 · CERTIFICATION</span>
              <h3 className="tag__title">EICRs that sign themselves off</h3>
              <p className="tag__body">
                Observation codes, remedial notes, and a signed certificate —
                without a second piece of software.
              </p>
            </div>
            <div className="tag">
              <span className="tag__code">03 · CUSTOMER PORTAL</span>
              <h3 className="tag__title">Your own branded booking page</h3>
              <p className="tag__body">
                Every subscriber gets a portal at their own web address —
                free for their customers to use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
