import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// One family for the whole site. Archivo is a grotesque with a width axis:
// headings use its wider cuts, body text the normal width.
const sansFont = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans-var",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-var",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ai4trade.co.uk";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ai4Trade — job management for electrical businesses",
    template: "%s",
  },
  description:
    "Quoting, EICR certification, floorplans, and job management for electrical businesses — with a free booking portal for their customers.",
  // Keeps the site out of Google while it's still being tested. Set
  // NEXT_PUBLIC_SITE_IS_LIVE=true (as a Plain text variable in Cloudflare)
  // once you're ready for it to be publicly discoverable, then redeploy —
  // this reads at build time, so a fresh deploy is required either way.
  robots:
    process.env.NEXT_PUBLIC_SITE_IS_LIVE === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ai4Trade",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Job management, quoting, EICR certification, and a free customer booking portal for electrical businesses.",
};

export default function RootLayout({ children }) {
  return (
    // The font classes live on <html> (not <body>) so that globals.css,
    // which defines --font-display / --font-body on :root, can see them.
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
