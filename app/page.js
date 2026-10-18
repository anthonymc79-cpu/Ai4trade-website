import Hero from "@/components/home/Hero";
import JobJourney from "@/components/home/JobJourney";
import PortalDemo from "@/components/home/PortalDemo";
import Certificates from "@/components/home/Certificates";
import Gallery from "@/components/home/Gallery";
import PricingTeaser from "@/components/home/PricingTeaser";
import ClosingCta from "@/components/home/ClosingCta";
import { pageMetadata } from "@/lib/seo";

// Redesigned homepage (Oct 2026). The wording lives in the components for
// now while the design settles; it moves back into Sanity once approved.
export const metadata = pageMetadata({
  title: "Ai4Trade: job management for electrical businesses",
  description:
    "Enquiries, quotes with floor plans, EIC and EICR certificates, invoices and accounts in one app for UK electricians. Free 30-day trial.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <JobJourney />
      <PortalDemo />
      <Certificates />
      <Gallery />
      <PricingTeaser />
      <ClosingCta />
    </>
  );
}
