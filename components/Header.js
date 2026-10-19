import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import SmartLink from "./SmartLink";
import { getSiteSettings } from "@/lib/sanity/siteSettings";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.yourdomain.com";

const BUTTON_CLASS = {
  primary: "btn btn--copper",
  secondary: "btn btn--ghost",
};

function Chevron() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default async function Header() {
  const { navigation, headerButton } = await getSiteSettings();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.bar}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="Ai4Trade"
              width={100}
              height={100}
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
              {navigation.map((item) =>
                item.children?.length ? (
                  <li className={styles.hasMenu} key={item._key || item.label}>
                    <button type="button" className={styles.navBtn}>
                      {item.label}
                      <Chevron />
                    </button>
                    <div className={styles.dropdown}>
                      {item.children.map((child) => (
                        <SmartLink key={child._key || child.href} href={child.href}>
                          {child.label}
                        </SmartLink>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li key={item._key || item.label}>
                    <SmartLink href={item.href}>{item.label}</SmartLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a className="btn btn--ghost" href={`${APP_URL}/login`}>
              Log in
            </a>
            {headerButton?.href && (
              <SmartLink
                className={BUTTON_CLASS[headerButton.style] || BUTTON_CLASS.primary}
                href={headerButton.href}
              >
                {headerButton.label}
              </SmartLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
