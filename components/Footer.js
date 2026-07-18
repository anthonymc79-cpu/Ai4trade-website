import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.brand}>
            <span className={styles.brandName}>Voltro</span>
            Job management, quoting, and certification for electrical
            businesses — built by people who've stood in a fuse cupboard
            at 5pm on a Friday.
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h4>Product</h4>
              <ul>
                <li>
                  <Link href="/for-electricians">For electricians</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/tutorials">Tutorials</Link>
                </li>
              </ul>
            </div>
            <div className={styles.col}>
              <h4>Homeowners</h4>
              <ul>
                <li>
                  <Link href="/services">Get a quote</Link>
                </li>
                <li>
                  <Link href="/services#eicr">EICR explained</Link>
                </li>
              </ul>
            </div>
            <div className={styles.col}>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="mailto:hello@voltro.example">Contact</a>
                </li>
                <li>
                  <Link href="/pricing">Book a demo</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Voltro Ltd.</span>
          <span>Wired for the trade.</span>
        </div>
      </div>
    </footer>
  );
}
