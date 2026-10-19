import Link from "next/link";
import PageHero from "@/components/PageHero";
import styles from "./landing.module.css";

// Shared layout for Sanity "Page" documents (/for-electricians, /services,
// and any page created in the editor).

export function SanityButton({ button }) {
  if (!button?.href) return null;
  // Main actions are orange buttons; secondary actions are plain blue links.
  const className = button.style === "secondary" ? "textLink" : "btn btn--copper";
  return (
    <Link className={className} href={button.href}>
      {button.label}
    </Link>
  );
}

function SectionHead({ eyebrow, heading, intro }) {
  if (!eyebrow && !heading && !intro) return null;
  return (
    <header className={styles.head}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {heading && <h2 className={styles.h2}>{heading}</h2>}
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}

function FeatureGrid({ section }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHead eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <ul className={`${styles.grid} ${section.columns === 2 ? styles.grid2 : styles.grid3}`}>
          {section.items?.map((item) => (
            <li className={styles.card} key={item._key}>
              {item.label && <p className={styles.cardLabel}>{item.label}</p>}
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.description && <p className={styles.cardBody}>{item.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TextBlock({ section }) {
  const paragraphs = (section.text || "").split(/\n\s*\n/).filter((p) => p.trim());
  return (
    <section className={`${styles.section} ${styles.grey}`} id={section.anchorId || undefined}>
      <div className="container">
        <div className={styles.prose}>
          {section.eyebrow && <p className={styles.eyebrow}>{section.eyebrow}</p>}
          <h2 className={styles.h2}>{section.heading}</h2>
          {paragraphs.map((text, i) => (
            <p key={i} className={styles.proseText}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalloutPanel({ section }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.callout}>
          <div>
            {section.eyebrow && <p className={styles.calloutEyebrow}>{section.eyebrow}</p>}
            <h2 className={styles.calloutTitle}>{section.heading}</h2>
            {section.text && <p className={styles.calloutText}>{section.text}</p>}
            {section.highlight && <p className={styles.calloutPill}>{section.highlight}</p>}
          </div>
          {section.sideText && <p className={styles.calloutSide}>{section.sideText}</p>}
        </div>
      </div>
    </section>
  );
}

function CtaBanner({ section }) {
  return (
    <section className={`${styles.section} ${styles.cta}`}>
      <div className="container">
        {section.eyebrow && <p className={styles.eyebrow}>{section.eyebrow}</p>}
        <h2 className={styles.ctaTitle}>{section.heading}</h2>
        {section.text && <p className={styles.intro}>{section.text}</p>}
        {section.button?.href && (
          <div className={styles.ctaAction}>
            <SanityButton button={{ ...section.button, style: "primary" }} />
          </div>
        )}
      </div>
    </section>
  );
}

const SECTION_COMPONENTS = {
  featureGrid: FeatureGrid,
  textBlock: TextBlock,
  calloutPanel: CalloutPanel,
  ctaBanner: CtaBanner,
};

export default function LandingPage({ page, fallback }) {
  const hero = page.hero ?? fallback.hero;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        actions={
          hero.buttons?.length > 0 &&
          hero.buttons.map((button) => <SanityButton key={button._key} button={button} />)
        }
      >
        {hero.subheading}
      </PageHero>
      {page.sections?.map((section) => {
        const Section = SECTION_COMPONENTS[section._type];
        return Section ? <Section key={section._key} section={section} /> : null;
      })}
    </>
  );
}
