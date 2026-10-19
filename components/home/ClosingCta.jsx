import Link from "next/link";
import styles from "./home.module.css";
import { PRICES, TRIAL_HREF } from "@/lib/prices";

export default function ClosingCta() {
  return (
    <section className={styles.closing}>
      <div className="container">
        <h2 className={styles.closingTitle}>Get your evenings back.</h2>
        <p className={styles.closingLead}>
          Try everything free for {PRICES.trialDays} days.
        </p>
        <Link href={TRIAL_HREF} className="btn btn--copper">
          Start your free trial
        </Link>
      </div>
    </section>
  );
}
