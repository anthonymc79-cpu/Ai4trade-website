import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.yourdomain.com";

const PRODUCT_LINKS = [
  { href: "/services", label: "Quoting & job management" },
  { href: "/for-electricians", label: "EICR certification" },
  { href: "/tutorials", label: "Customer portal" },
];

const RESOURCE_LINKS = [
  { href: "/tutorials", label: "Tutorials" },
  { href: "/pricing", label: "Pricing FAQs" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.bar}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="Ai4Trade"
              width={48}
              height={48}
              className={styles.logoMark}
              priority
            />
            <span className={styles.logoWordmark}>
              <span className={styles.logoAi}>Ai</span>
              <span className={styles.logoNum}>4</span>
              <span className={styles.logoTrade}>Trade</span>
            </span>
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              <li className={styles.hasMenu}>
                <button type="button" className={styles.navBtn}>
                  Product
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
                <div className={styles.dropdown}>
                  {PRODUCT_LINKS.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </li>
              <li>
                <Link href="/for-electricians">For trades</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li className={styles.hasMenu}>
                <button type="button" className={styles.navBtn}>
                  Resources
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
                <div className={styles.dropdown}>
                  {RESOURCE_LINKS.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <a className="btn btn--ghost" href={`${APP_URL}/login`}>
              Log in
            </a>
            <a className="btn btn--copper" href="/signup/business">
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
