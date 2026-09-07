// app/sitemap.js
//
// Next.js App Router convention — generates /sitemap.xml. Excludes pages
// marked noindex in lib/seo.js calls (signup success/cancelled, health)
// since there's no point listing pages we've told crawlers not to index.

import { getTutorials } from "@/lib/tutorials";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ai4trade.co.uk";

export default async function sitemap() {
  const tutorials = await getTutorials();

  const staticRoutes = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/for-electricians", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
    { path: "/signup", changeFrequency: "monthly", priority: 0.6 },
    { path: "/signup/business", changeFrequency: "monthly", priority: 0.7 },
    { path: "/signup/customer", changeFrequency: "monthly", priority: 0.6 },
    { path: "/tutorials", changeFrequency: "weekly", priority: 0.6 },
  ];

  const tutorialRoutes = tutorials.map((t) => ({
    path: `/tutorials/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...tutorialRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
