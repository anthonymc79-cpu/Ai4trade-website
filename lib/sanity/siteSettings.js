import { sanityFetch } from "./client";
import { SITE_SETTINGS_QUERY } from "./queries";

// The current header and footer, used for anything not yet filled in
// in Sanity (and as a safety net if Sanity can't be reached).
const FALLBACK = {
  navigation: [
    { _key: "electricians", label: "For electricians", href: "/for-electricians" },
    { _key: "homeowners", label: "Homeowners", href: "/homeowners" },
    { _key: "pricing", label: "Pricing", href: "/pricing" },
    { _key: "tutorials", label: "Tutorials", href: "/tutorials" },
  ],
  headerButton: { label: "Start a free trial", href: "/signup/business?plan=trial", style: "primary" },
  footerTagline:
    "Job management, quoting, and certification for electrical businesses — built by people who've stood in a fuse cupboard at 5pm on a Friday.",
  footerColumns: [
    {
      _key: "product",
      heading: "Product",
      links: [
        { _key: "electricians", label: "For electricians", href: "/for-electricians" },
        { _key: "pricing", label: "Pricing", href: "/pricing" },
        { _key: "tutorials", label: "Tutorials", href: "/tutorials" },
      ],
    },
    {
      _key: "homeowners",
      heading: "Homeowners",
      links: [
        { _key: "how", label: "How it works", href: "/homeowners" },
        { _key: "guides", label: "Homeowner guides", href: "/tutorials/homeowners" },
      ],
    },
    {
      _key: "company",
      heading: "Company",
      links: [
        { _key: "contact", label: "Contact", href: "mailto:hello@ai4trade.example" },
        { _key: "demo", label: "Start a free trial", href: "/signup/business?plan=trial" },
      ],
    },
  ],
  copyrightName: "Ai4Trade Ltd.",
  footerSlogan: "Wired for the trade.",
};

// The header and footer both call this; Next.js shares the one request.
export async function getSiteSettings() {
  const data = await sanityFetch(SITE_SETTINGS_QUERY);
  if (!data) console.warn("Site settings: nothing from Sanity, showing built-in header and footer");

  // Field by field, so a blank field in Sanity never empties the header or footer.
  const pick = (key) => {
    const value = data?.[key];
    if (Array.isArray(value)) return value.length ? value : FALLBACK[key];
    return value || FALLBACK[key];
  };

  return {
    navigation: pick("navigation"),
    headerButton: pick("headerButton"),
    footerTagline: pick("footerTagline"),
    footerColumns: pick("footerColumns"),
    copyrightName: pick("copyrightName"),
    footerSlogan: pick("footerSlogan"),
  };
}
