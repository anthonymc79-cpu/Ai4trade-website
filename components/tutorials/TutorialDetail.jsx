import Link from "next/link";
import styles from "./tutorials.module.css";

// Layout for a single tutorial. `player` is the video player, passed in by
// the page only when the viewer is allowed to watch.
export default function TutorialDetail({ tutorial, isLocked, lockedMessage, player }) {
  return (
    <article className={styles.detail}>
      <div className={styles.detailInner}>
        {tutorial.audience === "homeowners" ? (
          <Link href="/tutorials/homeowners" className={styles.back}>
            All homeowner guides
          </Link>
        ) : (
          <Link href="/tutorials" className={styles.back}>
            All tutorials
          </Link>
        )}
        {tutorial.category && <p className={styles.detailCategory}>{tutorial.category}</p>}
        <h1 className={styles.detailTitle}>{tutorial.title}</h1>
        <p className={styles.detailDesc}>{tutorial.description}</p>

        {isLocked ? (
          <div className={styles.locked}>
            {lockedMessage.label && <p className={styles.lockedLabel}>{lockedMessage.label}</p>}
            <h2 className={styles.lockedTitle}>{lockedMessage.heading}</h2>
            <p className={styles.lockedText}>{lockedMessage.text}</p>
            <Link href="/pricing" className="btn btn--copper">
              {lockedMessage.buttonLabel}
            </Link>
          </div>
        ) : (
          <div className={styles.player}>{player}</div>
        )}
      </div>
    </article>
  );
}
