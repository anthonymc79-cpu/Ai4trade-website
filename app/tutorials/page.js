import Link from "next/link";
import styles from "../for-electricians/ForElectricians.module.css";
import { getTutorials } from "@/lib/tutorials";

export const metadata = {
  title: "Tutorials — Ai4Trade",
};

// Rebuild this listing at most once every hour, picking up new tutorials
// without a full site redeploy.
export const revalidate = 3600;

export default async function TutorialsPage() {
  const tutorials = await getTutorials();

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">Tutorials</span>
          <h1 className={styles.heroTitle}>Learn Ai4Trade by watching it work</h1>
          <p className={styles.heroLead}>
            Short videos covering everything from your first job to advanced
            quoting rules. Marked <strong style={{ color: "var(--copper-bright)" }}>Pro</strong> tutorials
            are for subscribed businesses.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {tutorials.map((t) => (
              <Link
                href={`/tutorials/${t.slug}`}
                key={t.slug}
                className="tag"
                style={{ display: "block" }}
              >
                <span className="tag__code">
                  {t.category.toUpperCase()} · {t.duration}
                  {t.tier === "pro" && (
                    <span style={{ color: "var(--copper-bright)" }}> · PRO</span>
                  )}
                </span>
                <h3 className="tag__title">{t.title}</h3>
                <p className="tag__body">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
