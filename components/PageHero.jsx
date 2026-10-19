import styles from "./PageHero.module.css";

// The big centred opening used at the top of every page except the homepage.
export default function PageHero({ eyebrow, heading, children, actions, tone = "light" }) {
  return (
    <section className={`${styles.hero} ${tone === "grey" ? styles.grey : ""}`}>
      <div className="container">
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{heading}</h1>
        {children && <div className={styles.lead}>{children}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
}
