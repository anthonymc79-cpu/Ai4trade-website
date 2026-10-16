import styles from "../for-electricians/ForElectricians.module.css";
import PricingCards from "@/components/PricingCards";
import { pageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/client";
import { PRICING_PAGE_QUERY } from "@/lib/sanity/queries";
import { withFallback } from "@/lib/sanity/withFallback";

// Live site picks up published wording edits within about a minute.
export const revalidate = 60;

// Kept in sync with app.js's own MA_PLANS/ANNUAL_PRICES — that file is
// the source of truth for what each plan actually costs. GBP only — this
// is a UK-based business and app.js itself has no other currency.
// Deliberately NOT editable in Sanity, so the website can never show a
// different price from the one customers are charged.
const PRICES = { symbol: "£", proMonthly: 69, proAnnualMonthly: 59, proAnnualTotal: 708 };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ai4trade.co.uk";

// The current wording, used for anything not filled in in Sanity
// (and as a safety net if Sanity can't be reached).
const FALLBACK = {
  hero: {
    eyebrow: "Pricing",
    heading: "One subscription per business. Free for every customer.",
    subheading: "All prices in GBP. No hidden fees, cancel anytime.",
  },
  
  pro: {
    label: "TIER · PRO",
    name: "Pro",
    description:
      "Unlimited customer accounts, full webhook & CRM automation, CSV data export, and custom branding on your portal and certificates.",
    buttonLabel: "Get started →",
  },
  monthlyLabel: "Monthly",
  annualLabel: "Annual",
  trialNote: {
    before: "Not sure yet?",
    linkText: "Start a free 7-day trial",
    after: "— full access, no card required.",
  },
  footnote:
    "Every plan includes unlimited free customer accounts. Your customers never pay to use their booking portal.",
  seo: {
    title: "Pricing — Ai4Trade",
    description:
      "Simple monthly or annual pricing for electrical business job management, quoting, and EICR certification. Starter from £29/month, Pro from £59/month billed annually. Free for every customer who books through you.",
  },
};

async function getContent() {
  const data = await sanityFetch(PRICING_PAGE_QUERY);
  if (!data) console.warn("/pricing: nothing from Sanity, showing built-in wording");
  return withFallback(data, FALLBACK);
}

export async function generateMetadata() {
  const content = await getContent();
  return pageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/pricing",
  });
}

function pricingJsonLd(prices, content) {
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
        name: content.starter.name,
        price: String(prices.starter),
        priceCurrency: "GBP",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: `${content.pro.name} (monthly)`,
        price: String(prices.proMonthly),
        priceCurrency: "GBP",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: `${content.pro.name} (annual)`,
        price: String(prices.proAnnualTotal),
        priceCurrency: "GBP",
        billingDuration: "P1Y",
      },
    ],
  };
}

export default async function PricingPage() {
  const content = await getContent();
  const { hero } = content;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd(PRICES, content)) }}
      />
      <section className={styles.hero}>
        <div className="container">
          {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}
          <h1 className={styles.heroTitle}>{hero.heading}</h1>
          {hero.subheading && <p className={styles.heroLead}>{hero.subheading}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PricingCards prices={PRICES} content={content} />
        </div>
      </section>

      {content.footnote && (
        <section className="section--tight">
          <div className="container">
            <p style={{ color: "var(--wire)", fontSize: 13.5 }}>{content.footnote}</p>
          </div>
        </section>
      )}
    </>
  );
}
