import Link from "next/link";
import styles from "./tutorials.module.css";

export function Thumb({ tutorial }) {
  return (
    <div className={styles.thumb} aria-hidden="true">
      <span className={styles.play}>
        <svg viewBox="0 0 24 24">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
      {tutorial.tier === "pro" && <span className={styles.pro}>Pro</span>}
      <span className={styles.duration}>{tutorial.duration}</span>
    </div>
  );
}

export default function TutorialGrid({ tutorials, emptyText }) {
  if (!tutorials.length) {
    return (
      <p className={styles.empty}>{emptyText || "New tutorials are on the way. Check back soon."}</p>
    );
  }
  return (
    <ul className={styles.grid}>
      {tutorials.map((t) => (
        <li key={t.slug}>
          <Link href={`/tutorials/${t.slug}`} className={styles.card}>
            <Thumb tutorial={t} />
            <div className={styles.cardBody}>
              {t.category && <p className={styles.category}>{t.category}</p>}
              <h2 className={styles.title}>{t.title}</h2>
              <p className={styles.desc}>{t.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
