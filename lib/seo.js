// lib/seo.js
//
// One place to build a consistent metadata object (title, description,
// canonical, Open Graph, Twitter card) for every page under app/, instead
// of repeating the same OG/Twitter boilerplate on each page.js.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ai4trade.co.uk";
const SITE_NAME = "Ai4Trade";

export function pageMetadata({ title, description, path = "/", noindex = false, ogTitle }) {
  const url = `${SITE_URL}${path}`;
  const metadata = {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle || title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: ogTitle || title,
      description,
    },
  };

  if (noindex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}
