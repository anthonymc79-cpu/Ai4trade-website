import PageHero from "@/components/PageHero";
import { PRICES } from "@/lib/prices";
import PricingCards from "@/components/PricingCards";
import { pageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/client";
import { PRICING_PAGE_QUERY } from "@/lib/sanity/queries";
import { withFallback } from "@/lib/sanity/withFallback";

// Live site picks up published wording edits within about a minute.
export const revalidate = 60;

// Prices live in lib/prices.js (shared with the homepage), kept in sync with
// app.js. Deliberately NOT editable in Sanity, so the website can never show
// a different price from the one customers are charged.

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
      "Unlimited jobs, quoting, and EICR certificates, plus unlimited customer accounts, full webhook & CRM automation, CSV data export, and custom branding on your portal and certificates.",
    buttonLabel: "Get started →",
  },
  monthlyLabel: "Monthly",
  annualLabel: "Annual",
  trialNote: {
    before: "Not sure yet?",
    linkText: "Start a free 30-day trial",
    after: "— full access, no card required.",
  },
  footnote:
    "Every plan includes unlimited free customer accounts. Your customers never pay to use their booking portal.",
  seo: {
    title: "Pricing — Ai4Trade",
    description:
      "Simple monthly or annual pricing for electrical business job management, quoting, and EICR certification. Pro from £59/month billed annually. Free for every customer who books through you.",
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
        name: `${content.pro?.name || "Pro"} (monthly)`,
        price: String(prices.proMonthly),
        priceCurrency: "GBP",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: `${content.pro?.name || "Pro"} (annual)`,
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
      <PageHero eyebrow={hero.eyebrow} heading={hero.heading}>
        {hero.subheading}
      </PageHero>

      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <PricingCards prices={PRICES} content={content} />
          {content.footnote && (
            <p
              style={{
                maxWidth: 560,
                margin: "40px auto 0",
                textAlign: "center",
                fontSize: 15,
                color: "var(--paper-dim)",
              }}
            >
              {content.footnote}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
