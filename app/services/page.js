import LandingPage from "@/components/sanity/LandingPage";
import { sanityFetch } from "@/lib/sanity/client";
import { LANDING_PAGE_QUERY } from "@/lib/sanity/queries";

// Live site picks up published edits within about a minute.
export const revalidate = 60;

const SLUG = "services";

// The current wording, used until this page is published in Sanity
// (and as a safety net if Sanity can't be reached).
const FALLBACK = {
  hero: {
    eyebrow: "For homeowners",
    heading: "Book electrical work, and actually know what's happening with it.",
    subheading:
      "Ai4Trade is free for you to use — your electrician's the one paying for the tools. Register, describe the job, and track it through to a signed certificate.",
  },
  sections: [
    {
      _key: "services",
      _type: "featureGrid",
      columns: 2,
      items: [
        { _key: "eicr", label: "SVC-01", title: "EICR — Electrical Installation Condition Report", description: "A full safety check of your property's wiring, required when selling, renting, or simply due for a check-up." },
        { _key: "faults", label: "SVC-02", title: "Fault finding and repairs", description: "Flickering lights, tripping circuits, or a socket that's stopped working — book a diagnosis with a local electrician." },
        { _key: "rewires", label: "SVC-03", title: "Rewires and consumer unit upgrades", description: "Full or partial rewiring, and replacing an old fuse box with a modern consumer unit." },
        { _key: "ev", label: "SVC-04", title: "EV charger installation", description: "Home charge point installation, quoted and scheduled through the same portal as any other job." },
      ],
    },
    {
      _key: "eicr-explained",
      _type: "textBlock",
      eyebrow: "EICR explained",
      heading: "What actually happens during an inspection",
      text: "An electrician checks your wiring, consumer unit, sockets, and earthing against current safety standards, notes anything that needs attention using standard observation codes, and issues a certificate confirming the result. Landlords typically need one every five years; homeowners often get one done when buying a property or after major work.",
      anchorId: "eicr",
    },
  ],
  seo: {
    title: "Get electrical work done — Ai4Trade",
    description:
      "Book a free enquiry with an electrician using Ai4Trade, track your job, and keep every certificate in one place.",
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

export default async function ServicesPage() {
  const page = await getPage();
  return <LandingPage page={page} fallback={FALLBACK} />;
}
