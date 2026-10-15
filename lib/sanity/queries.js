import { groq } from "next-sanity";

export const HOME_PAGE_QUERY = groq`*[_id == "homePage"][0]{
  hero{ eyebrow, heading, headingHighlight, subheading },
  audienceCards[]{ _key, label, heading, description, button{ label, href, style } },
  sections[]{
    _key,
    _type,
    _type == "featureGrid" => { eyebrow, heading, intro, items[]{ _key, label, title, description } }
  },
  seo{ title, description }
}`;
