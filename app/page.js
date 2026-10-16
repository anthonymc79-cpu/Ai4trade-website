import Link from "next/link";
import styles from "./Home.module.css";
import { sanityFetch } from "@/lib/sanity/client";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries";

// Live site picks up published edits within about a minute.
export const revalidate = 60;

// The current wording, used until the homepage is published in Sanity
// (and as a safety net if Sanity can't be reached).
const FALLBACK = {
  hero: {
    eyebrow: "Two ways in",
    heading:
      "One board for every job. Every certificate. Every customer who's waiting on you.",
    headingHighlight: "Every certificate.",
    subheading:
      "Ai4Trade is job management, quoting, and EICR certification built for electrical businesses — with a free booking portal your own customers use to reach you.",
  },
  audienceCards: [
    {
      _key: "business",
      label: "Run a business",
      heading: "I'm an electrician or business owner",
      description:
        "Manage jobs, quotes, floorplans, and certificates in one place — and give your customers a branded portal of their own.",
      button: { label: "See how it works →", href: "/for-electricians", style: "primary" },
    },
    {
      _key: "homeowner",
      label: "Need work done",
      heading: "I need electrical work doing",
      description:
        "Book a free enquiry with your electrician, track your job, and keep every certificate in one place — no charge, ever.",
      button: { label: "Get a free quote →", href: "/services", style: "secondary" },
    },
  ],
  sections: [
    {
      _key: "trade",
      _type: "featureGrid",
      eyebrow: "Built for the trade",
      items: [
        {
          _key: "quoting",
          label: "01 · QUOTING",
          title: "Quote in minutes, not evenings",
          description:
            "Job type and postcode generate a quote automatically, ready to send before you've left the driveway.",
        },
        {
          _key: "cert",
          label: "02 · CERTIFICATION",
          title: "EICRs that sign themselves off",
          description:
            "Observation codes, remedial notes, and a signed certificate — without a second piece of software.",
        },
        {
          _key: "portal",
          label: "03 · CUSTOMER PORTAL",
          title: "Your own branded booking page",
          description:
            "Every subscriber gets a portal at their own web address — free for their customers to use.",
        },
      ],
    },
  ],
  seo: { title: "Ai4Trade — job management for electrical businesses" },
};

async function getHomePage() {
  const data = await sanityFetch(HOME_PAGE_QUERY);
  if (!data) console.warn("Homepage: nothing from Sanity, showing built-in wording");
  return data ?? FALLBACK;
}

export async function generateMetadata() {
  const page = await getHomePage();
  return {
    title: page.seo?.title || FALLBACK.seo.title,
    description: page.seo?.description || undefined,
  };
}

const BUTTON_CLASS = {
  primary: "btn btn--copper",
  secondary: "btn btn--ghost",
};

function HighlightedHeading({ text = "", highlight }) {
  if (!highlight || !text.includes(highlight)) return text;
  const index = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, index)}
      <em>{highlight}</em>
      {text.slice(index + highlight.length)}
    </>
  );
}

function FeatureGrid({ section }) {
  return (
    <section className="section--tight">
      <div className="container">
        {(section.eyebrow || section.heading) && (
          <div className={styles.stripHead}>
            {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
            {section.heading && <h2>{section.heading}</h2>}
            {section.intro && <p>{section.intro}</p>}
          </div>
        )}
        <div className={section.columns === 2 ? "grid-2" : "grid-3"}>
          {section.items?.map((item) => (
            <div className="tag" key={item._key}>
              {item.label && <span className="tag__code">{item.label}</span>}
              <h3 className="tag__title">{item.title}</h3>
              {item.description && <p className="tag__body">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const page = await getHomePage();
  const hero = page.hero ?? FALLBACK.hero;

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}
          <h1 className={styles.heroTitle}>
            <HighlightedHeading text={hero.heading} highlight={hero.headingHighlight} />
          </h1>
          {hero.subheading && <p className={styles.heroLead}>{hero.subheading}</p>}

          {page.audienceCards?.length > 0 && (
            <div className={styles.split}>
              {page.audienceCards.map((card) => (
                <div className={styles.splitPane} key={card._key}>
                  {card.label && <span className={styles.splitLabel}>{card.label}</span>}
                  <h2 className={styles.splitTitle}>{card.heading}</h2>
                  {card.description && <p className={styles.splitBody}>{card.description}</p>}
                  {card.button?.href && (
                    <Link
                      href={card.button.href}
                      className={BUTTON_CLASS[card.button.style] || BUTTON_CLASS.primary}
                    >
                      {card.button.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {page.sections?.map((section) => {
        if (section._type === "featureGrid") {
          return <FeatureGrid key={section._key} section={section} />;
        }
        // Other section types get their own components as other pages are converted.
        return null;
      })}
    </>
  );
}
