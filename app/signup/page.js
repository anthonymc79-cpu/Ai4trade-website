import Link from "next/link";
import styles from "../for-electricians/ForElectricians.module.css";

export const metadata = {
  title: "Sign up — Ai4Trade",
};

export default function SignupChooserPage() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <span className="eyebrow">Get started</span>
        <h1 className={styles.heroTitle}>Which one are you?</h1>

        <div className="grid-2" style={{ marginTop: 32, maxWidth: 760 }}>
          <Link href="/signup/business" className="tag" style={{ display: "block" }}>
            <span className="tag__code">SUBSCRIBE</span>
            <h3 className="tag__title">I run an electrical business</h3>
            <p className="tag__body">
              Start a subscription, get your own branded portal, and manage
              jobs, quotes, and certificates in one place.
            </p>
          </Link>

          <Link href="/signup/customer" className="tag" style={{ display: "block" }}>
            <span className="tag__code">FREE</span>
            <h3 className="tag__title">I need electrical work doing</h3>
            <p className="tag__body">
              Register for free with your electrician's portal to book and
              track a job.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
