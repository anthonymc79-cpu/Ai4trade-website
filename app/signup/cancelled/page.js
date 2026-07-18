import Link from "next/link";
import styles from "../../for-electricians/ForElectricians.module.css";

export const metadata = {
  title: "Checkout cancelled — Voltro",
};

export default function SignupCancelledPage() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <span className="eyebrow">No charge made</span>
        <h1 className={styles.heroTitle}>Checkout cancelled</h1>
        <p className={styles.heroLead}>
          Your account was created but no payment was taken, so your
          subscription hasn't started. You can pick up where you left off
          whenever you're ready.
        </p>
        <Link className="btn btn--copper" href="/signup/business">
          Try again →
        </Link>
      </div>
    </section>
  );
}
