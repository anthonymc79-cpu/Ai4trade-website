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
