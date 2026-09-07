import styles from "../for-electricians/ForElectricians.module.css";
import PricingCards from "@/components/PricingCards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing — Ai4Trade",
  description:
    "Simple monthly or annual pricing for electrical business job management, quoting, and EICR certification. Starter from £29/month, Pro from £59/month billed annually. Free for every customer who books through you.",
  path: "/pricing",
});

// Rebuilt at most once an hour — pricing rarely changes, so this avoids a
// full redeploy while still staying static and fast the rest of the time.
export const revalidate = 3600;

// Kept in sync with app.js's own MA_PLANS/ANNUAL_PRICES — that file is
// the source of truth for what each plan actually costs. GBP only — this
// is a UK-based business and app.js itself has no other currency.
const PRICES = { symbol: "£", starter: 29, proMonthly: 69, proAnnualMonthly: 59, proAnnualTotal: 708 };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ai4trade.co.uk";

function pricingJsonLd(prices) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ai4Trade",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/pricing`,
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: String(prices.starter),
        priceCurrency: "GBP",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: "Pro (monthly)",
        price: String(prices.proMonthly),
        priceCurrency: "GBP",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: "Pro (annual)",
        price: String(prices.proAnnualTotal),
        priceCurrency: "GBP",
        billingDuration: "P1Y",
      },
    ],
  };
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd(PRICES)) }}
      />
      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1 className={styles.heroTitle}>
            One subscription per business. Free for every customer.
          </h1>
          <p className={styles.heroLead}>
            All prices in GBP. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PricingCards prices={PRICES} />
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
