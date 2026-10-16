import Image from "next/image";
import styles from "./Footer.module.css";
import SmartLink from "./SmartLink";
import { getSiteSettings } from "@/lib/sanity/siteSettings";

export default async function Footer() {
  const { footerTagline, footerColumns, copyrightName, footerSlogan } = await getSiteSettings();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.brand}>
            <span className={styles.brandName}>
              <Image
                src="/logo.png"
                alt="Ai4Trade"
                width={32}
                height={32}
                className={styles.brandMark}
              />
              Ai4Trade
            </span>
            {footerTagline}
          </div>

          <div className={styles.cols}>
            {footerColumns.map((column) => (
              <div className={styles.col} key={column._key || column.heading}>
                <h4>{column.heading}</h4>
                <ul>
                  {column.links?.map((link) => (
                    <li key={link._key || link.href}>
                      <SmartLink href={link.href}>{link.label}</SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {copyrightName}
          </span>
          {footerSlogan && <span>{footerSlogan}</span>}
        </div>
      </div>
    </footer>
  );
}
