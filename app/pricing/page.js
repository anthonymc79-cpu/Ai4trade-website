import styles from "../for-electricians/ForElectricians.module.css";

export const metadata = {
  title: "Pricing — Voltro",
};

// Rebuilt at most once an hour — pricing rarely changes, so this avoids a
// full redeploy while still staying static and fast the rest of the time.
export const revalidate = 3600;

const PRICES = {
  GBP: { symbol: "£", starter: 29, team: 79 },
  USD: { symbol: "$", starter: 35, team: 95 },
};

export default function PricingPage({ searchParams }) {
  const currency = searchParams?.currency === "USD" ? "USD" : "GBP";
  const p = PRICES[currency];

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1 className={styles.heroTitle}>
            One subscription per business. Free for every customer.
          </h1>
          <p className={styles.heroLead}>
            Prices shown in {currency === "GBP" ? "GBP" : "USD"} based on
            your location — switch anytime after signing up.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="tag">
              <span className="tag__code">TIER · STARTER</span>
              <h3 className="tag__title">Starter</h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 32, margin: "8px 0 14px" }}>
                {p.symbol}
                {p.starter}
                <span style={{ fontSize: 14, color: "var(--wire)" }}>/month</span>
              </p>
              <p className="tag__body">
                For a single electrician or a small team just getting off
                paper and spreadsheets. Unlimited jobs, quoting, EICR
                certificates, and your own branded portal.
              </p>
            </div>

            <div className="tag">
              <span className="tag__code">TIER · TEAM</span>
              <h3 className="tag__title">Team</h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 32, margin: "8px 0 14px" }}>
                {p.symbol}
                {p.team}
                <span style={{ fontSize: 14, color: "var(--wire)" }}>/month</span>
              </p>
              <p className="tag__body">
                Everything in Starter, plus team roles and permissions,
                automated quoting rules, and priority support — for
                businesses with more than one engineer on the road.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <p style={{ color: "var(--wire)", fontSize: 13.5 }}>
            Every plan includes unlimited free customer accounts. Your
            customers never pay to use their booking portal.
          </p>
        </div>
      </section>
    </>
  );
}
