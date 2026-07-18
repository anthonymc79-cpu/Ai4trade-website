// app/robots.js
//
// Next.js's built-in convention for generating /robots.txt. Mirrors the
// same NEXT_PUBLIC_SITE_IS_LIVE flag used in layout.js's `robots` metadata
// — while it's not "true", this blocks crawling outright rather than just
// asking crawlers not to index what they find.

export default function robots() {
  const isLive = process.env.NEXT_PUBLIC_SITE_IS_LIVE === "true";

  if (!isLive) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/sitemap.xml`,
  };
}
