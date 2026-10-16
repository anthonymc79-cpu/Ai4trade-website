import Link from "next/link";
import styles from "@/app/for-electricians/ForElectricians.module.css";

// Shared layout for Sanity "Page" documents (/for-electricians, /services, ...).

const BUTTON_CLASS = {
  primary: "btn btn--copper",
  secondary: "btn btn--ghost",
};

const MUTED = { color: "var(--paper-dim)", fontSize: 14.5 };

export function SanityButton({ button }) {
  if (!button?.href) return null;
  return (
    <Link className={BUTTON_CLASS[button.style] || BUTTON_CLASS.primary} href={button.href}>
      {button.label}
    </Link>
  );
}

function Hero({ hero }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}
        <h1 className={styles.heroTitle}>{hero.heading}</h1>
        {hero.subheading && <p className={styles.heroLead}>{hero.subheading}</p>}
        {hero.buttons?.length > 0 && (
          <div className={styles.heroActions}>
            {hero.buttons.map((button) => (
              <SanityButton key={button._key} button={button} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeatureGrid({ section }) {
  const hasHeader = section.eyebrow || section.heading || section.intro;
  return (
    <section className="section">
      <div className="container">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        {section.heading && (
          <h2 style={{ fontSize: 26, margin: "14px 0 10px" }}>{section.heading}</h2>
        )}
        {section.intro && <p style={MUTED}>{section.intro}</p>}
        <div
          className={section.columns === 2 ? "grid-2" : "grid-3"}
          style={hasHeader ? { marginTop: 24 } : undefined}
        >
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

function TextBlock({ section }) {
  const paragraphs = (section.text || "").split(/\n\s*\n/).filter((p) => p.trim());
  return (
    <section className="section--tight" id={section.anchorId || undefined}>
      <div className="container">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        <h2 style={{ fontSize: 26, margin: "14px 0 12px" }}>{section.heading}</h2>
        {paragraphs.map((text, i) => (
          <p
            key={i}
            style={{ color: "var(--paper-dim)", maxWidth: 640, fontSize: 15, marginTop: i ? 12 : 0 }}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}

function CalloutPanel({ section }) {
  return (
    <section className="section--tight">
      <div className="container">
        <div className={styles.portalCallout}>
          <div>
            {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
            <h2 style={{ fontSize: 26, margin: "14px 0 10px" }}>{section.heading}</h2>
            {section.text && <p style={MUTED}>{section.text}</p>}
            {section.highlight && <span className={styles.portalUrl}>{section.highlight}</span>}
          </div>
          <div>{section.sideText && <p style={MUTED}>{section.sideText}</p>}</div>
        </div>
      </div>
    </section>
  );
}

function CtaBanner({ section }) {
  return (
    <section className="section--tight">
      <div className="container">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        <h2 style={{ fontSize: 26, margin: "14px 0 18px" }}>{section.heading}</h2>
        {section.text && <p style={{ ...MUTED, marginBottom: 18 }}>{section.text}</p>}
        <SanityButton button={section.button} />
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
  return (
    <>
      <Hero hero={page.hero ?? fallback.hero} />
      {page.sections?.map((section) => {
        const Section = SECTION_COMPONENTS[section._type];
        return Section ? <Section key={section._key} section={section} /> : null;
      })}
    </>
  );
}
