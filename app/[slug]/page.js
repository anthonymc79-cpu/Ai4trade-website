import { notFound } from "next/navigation";
import LandingPage from "@/components/sanity/LandingPage";
import { sanityFetch } from "@/lib/sanity/client";
import { LANDING_PAGE_QUERY } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo";

// Any "Page" created in the Sanity editor appears at /[its web address].
// Pages built in code (/pricing, /tutorials, /for-electricians, /services ...)
// always take priority over this route, so nothing existing can be replaced.

// New and edited pages show up within about a minute of publishing.
export const revalidate = 60;

async function getPage(slug) {
  // Only simple addresses ("landlords", "eicr-for-landlords") can be Sanity pages.
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null;
  return sanityFetch(LANDING_PAGE_QUERY, { slug });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.seo?.title || `${page.hero?.heading || "Ai4Trade"} — Ai4Trade`,
    description: page.seo?.description || page.hero?.subheading || undefined,
    path: `/${slug}`,
  });
}

export default async function SanityPage({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return <LandingPage page={page} fallback={{ hero: { heading: "" } }} />;
}
