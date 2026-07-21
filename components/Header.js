import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.yourdomain.com";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.bar}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="Ai4Trade"
              width={38}
              height={38}
              className={styles.logoMark}
              priority
            />
            Ai4Trade
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
