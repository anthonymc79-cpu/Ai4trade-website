import LandingPage from "@/components/sanity/LandingPage";
import { sanityFetch } from "@/lib/sanity/client";
import { LANDING_PAGE_QUERY } from "@/lib/sanity/queries";

// Live site picks up published edits within about a minute.
export const revalidate = 60;

const SLUG = "for-electricians";

// The current wording, used until this page is published in Sanity
// (and as a safety net if Sanity can't be reached).
const FALLBACK = {
  hero: {
    eyebrow: "For electrical businesses",
    heading: "Run the business side, so you can get back to the job side.",
    subheading:
      "Ai4Trade replaces the spreadsheet, the paper EICR pad, and the group chat with your office — one subscription per business, free for every customer who books through you.",
    buttons: [
      { _key: "start", label: "Start your subscription", href: "/signup/business", style: "primary" },
      { _key: "pricing", label: "See pricing", href: "/pricing", style: "secondary" },
    ],
  },
  sections: [
    {
      _key: "features",
      _type: "featureGrid",
      eyebrow: "What's inside",
      items: [
        { _key: "job", label: "JOB-01", title: "One board for every job", description: "Track enquiries, quotes, scheduled work, and completed jobs across your whole team — no spreadsheets, no missed callbacks." },
        { _key: "quo", label: "QUO-02", title: "Automated quoting rules", description: "Set pricing by job type and postcode once. Every new enquiry gets a quote back in minutes, not after you've finished today's jobs." },
        { _key: "cer", label: "CER-03", title: "EICR certificates, start to finish", description: "Run the inspection, log observation codes, and issue a signed certificate — all inside the same job record." },
        { _key: "flr", label: "FLR-04", title: "Floorplans from the site visit", description: "Sketch circuits on site on a tablet, and turn them into a floorplan the whole team can reference on the next visit." },
        { _key: "tea", label: "TEA-05", title: "Team roles and permissions", description: "Control what each engineer, office admin, or subcontractor can see and edit as your team grows past two people." },
        { _key: "sub", label: "SUB-06", title: "One subscription, unlimited free customers", description: "You pay one subscription. Every homeowner who books through your portal uses it for free — always." },
      ],
    },
    {
      _key: "portal",
      _type: "calloutPanel",
      eyebrow: "Your branded portal",
      heading: "Your customers book through a page with your name on it",
      text: "Every subscribing business gets its own web address — shareable on invoices, your van, or your own website.",
      highlight: "sparky-ltd.ai4trade.app",
      sideText:
        "Homeowners who book through your portal register for free — they're your customers, not ours. You never see another business's jobs, and no one sees yours.",
    },
    {
      _key: "tutorials",
      _type: "ctaBanner",
      eyebrow: "See it in action",
      heading: "Watch a job go from enquiry to signed certificate",
      button: { label: "Browse the tutorial library →", href: "/tutorials", style: "secondary" },
    },
  ],
  seo: {
    title: "Ai4Trade for electrical businesses",
    description:
      "Job management, quoting, EICR certification, and a free branded customer portal — for electrical businesses of any size.",
  },
};

async function getPage() {
  const data = await sanityFetch(LANDING_PAGE_QUERY, { slug: SLUG });
  if (!data) console.warn(`/${SLUG}: nothing from Sanity, showing built-in wording`);
  return data ?? FALLBACK;
}

export async function generateMetadata() {
  const page = await getPage();
  return {
    title: page.seo?.title || FALLBACK.seo.title,
    description: page.seo?.description || FALLBACK.seo.description,
  };
}

export default async function ForElectriciansPage() {
  const page = await getPage();
  return <LandingPage page={page} fallback={FALLBACK} />;
}
