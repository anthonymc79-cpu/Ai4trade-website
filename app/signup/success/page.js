import styles from "../../for-electricians/ForElectricians.module.css";

export const metadata = {
  title: "Subscription started — Voltro",
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.yourdomain.com";

export default function SignupSuccessPage() {
  // Stripe redirects here with ?session_id=... — the webhook has usually
  // already flipped the business to 'active' by the time this renders,
  // but it can lag by a second or two, so this doesn't try to verify it
  // synchronously. If you want a firmer confirmation, fetch the session
  // server-side here via stripe.checkout.sessions.retrieve(session_id).
  return (
    <section className={styles.hero}>
      <div className="container">
        <span className="eyebrow">You're subscribed</span>
        <h1 className={styles.heroTitle}>Payment confirmed</h1>
        <p className={styles.heroLead}>
          Your account is being activated — this usually takes a few
          seconds. Log in to start setting up your team and your first job.
        </p>
        <a className="btn btn--copper" href={`${APP_URL}/login`}>
          Log in to Voltro →
        </a>
      </div>
    </section>
  );
}
