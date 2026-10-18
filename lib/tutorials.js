// lib/tutorials.js
//
// Tutorials now come from Sanity (the "Tutorials" list in the editor).
// The shape is unchanged, so the pages that use these functions didn't
// need rewriting. Who can watch what is still decided by Supabase
// (getCurrentUser) and middleware.js, never by Sanity.

import { sanityFetch } from "./sanity/client";
import { TUTORIALS_QUERY, TUTORIALS_PAGE_QUERY } from "./sanity/queries";
import { withFallback } from "./sanity/withFallback";

// The original list, used only if Sanity can't be reached.
const FALLBACK_TUTORIALS = [
  {
    slug: "getting-started",
    title: "Getting started with Ai4Trade",
    tier: "free",
    duration: "4:12",
    description:
      "Set up your business profile and take your first job from enquiry to invoice.",
    videoId: "ai4trade-demo-0001",
    category: "Onboarding",
  },
  {
    slug: "building-a-floorplan",
    title: "Building a floorplan from a site visit",
    tier: "free",
    duration: "6:48",
    description:
      "Sketch a property's circuits on site and turn it into a floorplan you can refer back to.",
    videoId: "ai4trade-demo-0002",
    category: "Floorplans",
  },
  {
    slug: "raising-an-eicr",
    title: "Raising an EICR and issuing the certificate",
    tier: "free",
    duration: "8:03",
    description:
      "Run through a full EICR inspection inside Ai4Trade, from observation codes to the signed certificate.",
    videoId: "ai4trade-demo-0003",
    category: "Certification",
  },
  {
    slug: "advanced-quoting-rules",
    title: "Advanced: automated quoting rules",
    tier: "pro",
    duration: "11:20",
    description:
      "Set pricing rules by job type and postcode so quotes generate themselves the moment a customer enquires.",
    videoId: "ai4trade-demo-0004",
    category: "Quoting",
  },
];

const FALLBACK_PAGE = {
  homeownersHero: {
    eyebrow: "Homeowner guides",
    heading: "Get the most from your free account",
    subheading:
      "Short guides on sending a request, drawing a floor plan, accepting a quote and finding your certificates.",
  },
  hero: {
    eyebrow: "Tutorials",
    heading: "Learn Ai4Trade by watching it work",
    subheading:
      "Short videos covering everything from your first job to advanced quoting rules. Marked Pro tutorials are for subscribed businesses.",
  },
  lockedMessage: {
    label: "PRO TUTORIAL",
    heading: "This one's for subscribed businesses",
    text: "Advanced tutorials like this are included with any Ai4Trade subscription — start one to unlock it.",
    buttonLabel: "See pricing →",
  },
  seo: {
    title: "Tutorials — Ai4Trade",
    description:
      "Learn Ai4Trade by watching it work — short videos from your first job to advanced quoting rules.",
  },
};

// All tutorials, or only those for one audience ("electricians" or
// "homeowners"). Tutorials without an audience count as electricians.
export async function getTutorials(audience) {
  let data = await sanityFetch(TUTORIALS_QUERY);
  if (!data) {
    console.warn("Tutorials: nothing from Sanity, showing built-in list");
    data = FALLBACK_TUTORIALS;
  }
  if (!audience) return data;
  return data.filter((t) => (t.audience || "electricians") === audience);
}

// Reuses the full list (Next.js shares the one request), so a single
// tutorial and the listing can never disagree.
export async function getTutorialBySlug(slug) {
  const tutorials = await getTutorials();
  return tutorials.find((t) => t.slug === slug) ?? null;
}

export async function getTutorialsPageContent() {
  const data = await sanityFetch(TUTORIALS_PAGE_QUERY);
  if (!data) console.warn("Tutorials page: nothing from Sanity, showing built-in wording");
  return withFallback(data, FALLBACK_PAGE);
}
