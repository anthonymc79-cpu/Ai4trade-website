import Link from "next/link";
import styles from "./Header.module.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.yourdomain.com";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.bar}>
          <Link href="/" className={styles.logo}>
            <svg
              className={styles.logoMark}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4v6a2 2 0 0 0 2 2h4M20 20v-6a2 2 0 0 0-2-2h-4"
                stroke="var(--copper-bright)"
                strokeWidth="1.6"
              />
              <circle cx="4" cy="4" r="1.6" fill="var(--trace)" />
              <circle cx="20" cy="20" r="1.6" fill="var(--trace)" />
            </svg>
            Voltro
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              <li>
                <Link href="/for-electricians">For electricians</Link>
              </li>
              <li>
                <Link href="/services">For homeowners</Link>
              </li>
              <li>
                <Link href="/tutorials">Tutorials</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
            <div className={styles.actions}>
              <a
                className="btn btn--ghost"
                href={`${APP_URL}/login`}
              >
                Log in
              </a>
              <a
                className="btn btn--copper"
                href="/signup/business"
              >
                Start subscription
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
