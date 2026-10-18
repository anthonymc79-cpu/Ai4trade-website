import { groq } from "next-sanity";

export const HOME_PAGE_QUERY = groq`*[_id == "homePage"][0]{
  hero{ eyebrow, heading, headingHighlight, subheading },
  audienceCards[]{ _key, label, heading, description, button{ label, href, style } },
  sections[]{
    _key,
    _type,
    _type == "featureGrid" => { eyebrow, heading, intro, columns, items[]{ _key, label, title, description } }
  },
  seo{ title, description }
}`;

// Any marketing page (e.g. /for-electricians, /services), looked up by its web address.
export const LANDING_PAGE_QUERY = groq`*[_type == "landingPage" && slug.current == $slug][0]{
  hero{ eyebrow, heading, headingHighlight, subheading, buttons[]{ _key, label, href, style } },
  sections[]{
    _key,
    _type,
    _type == "featureGrid" => { eyebrow, heading, intro, columns, items[]{ _key, label, title, description } },
    _type == "textBlock" => { eyebrow, heading, text, anchorId },
    _type == "calloutPanel" => { eyebrow, heading, text, highlight, sideText },
    _type == "ctaBanner" => { eyebrow, heading, text, button{ label, href, style } }
  },
  seo{ title, description }
}`;

// Header and footer content (the "Site settings" document).
export const SITE_SETTINGS_QUERY = groq`*[_id == "siteSettings"][0]{
  navigation[]{ _key, label, href, children[]{ _key, label, href } },
  headerButton{ label, href, style },
  footerTagline,
  footerColumns[]{ _key, heading, links[]{ _key, label, href } },
  copyrightName,
  footerSlogan
}`;

// /pricing wording. Prices themselves live in code (app/pricing/page.js).
export const PRICING_PAGE_QUERY = groq`*[_id == "pricingPage"][0]{
  hero{ eyebrow, heading, subheading },
  pro{ label, name, description, buttonLabel },
  monthlyLabel,
  annualLabel,
  trialNote{ before, linkText, after },
  footnote,
  seo{ title, description }
}`;

// Every tutorial, in display order, shaped like the old mock data.
export const TUTORIALS_QUERY = groq`*[_type == "tutorial" && defined(slug.current)]
  | order(coalesce(order, 9999) asc, title asc){
  "slug": slug.current,
  title,
  "audience": coalesce(audience, "electricians"),
  tier,
  duration,
  description,
  videoId,
  category
}`;

// Wording around the tutorials.
export const TUTORIALS_PAGE_QUERY = groq`*[_id == "tutorialsPage"][0]{
  hero{ eyebrow, heading, subheading },
  homeownersHero{ eyebrow, heading, subheading },
  lockedMessage{ label, heading, text, buttonLabel },
  seo{ title, description }
}`;
