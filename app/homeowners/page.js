import HomeownersHero from "@/components/homeowners/HomeownersHero";
import HomeownerJourney from "@/components/homeowners/HomeownerJourney";
import QuoteDock from "@/components/homeowners/QuoteDock";
import {
  JobTypes,
  Promises,
  GuidesTeaser,
  HomeownerClosing,
} from "@/components/homeowners/HomeownerSections";
import { pageMetadata } from "@/lib/seo";

// Wording lives in the components for now, like the homepage; it moves
// into Sanity once the design is settled.
export const metadata = pageMetadata({
  title: "Get electrical work done, without the chasing — Ai4Trade",
  description:
    "Ask for a free quote, draw a floor plan, add photos and follow your electrical job from start to finish. Quotes, invoices and certificates kept in one free account.",
  path: "/homeowners",
});

export default function HomeownersPage() {
  return (
    <>
      <HomeownersHero />
      <HomeownerJourney />
      <JobTypes />
      <Promises />
      <GuidesTeaser />
      <HomeownerClosing id="homeowners-closing" />
      <QuoteDock heroId="homeowners-hero" closingId="homeowners-closing" />
    </>
  );
}
