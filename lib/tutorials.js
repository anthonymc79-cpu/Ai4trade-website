// lib/tutorials.js
//
// Mock data layer. In production, swap these functions out for real
// queries against Supabase (or wherever tutorial content actually lives).
// Keeping the shape consistent means the pages above don't need to change.

const TUTORIALS = [
  {
    slug: "getting-started",
    title: "Getting started with Ai4Trade",
    tier: "free",
    duration: "4:12",
    description:
      "Set up your business profile, invite your team, and take your first job from enquiry to invoice.",
    videoId: "ai4trade-demo-0001",
    category: "Onboarding",
  },
  {
    slug: "building-a-floorplan",
    title: "Building a floorplan from a site visit",
    tier: "free",
    duration: "6:48",
    description:
      "Sketch a property's circuits on site and turn it into a floorplan your whole team can reference.",
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
  {
    slug: "advanced-team-permissions",
    title: "Advanced: team roles and permissions",
    tier: "pro",
    duration: "7:35",
    description:
      "Control exactly what each engineer, office admin, and subcontractor can see and edit.",
    videoId: "ai4trade-demo-0005",
    category: "Team management",
  },
];

export async function getTutorials() {
  // Simulates an async data fetch (e.g. Supabase query).
  return TUTORIALS;
}

export async function getTutorialBySlug(slug) {
  return TUTORIALS.find((t) => t.slug === slug) ?? null;
}
