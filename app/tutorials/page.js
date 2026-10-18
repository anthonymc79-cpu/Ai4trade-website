import Link from "next/link";
import PageHero from "@/components/PageHero";
import TutorialGrid from "@/components/tutorials/TutorialGrid";
import { getTutorials, getTutorialsPageContent } from "@/lib/tutorials";
import { pageMetadata } from "@/lib/seo";

// Picks up new or edited tutorials within about a minute of publishing.
export const revalidate = 60;

export async function generateMetadata() {
  const { seo } = await getTutorialsPageContent();
  return pageMetadata({ title: seo.title, description: seo.description, path: "/tutorials" });
}

// Highlights every standalone "Pro" in the intro, matching the Pro badges.
function HighlightPro({ text }) {
  return text.split(/\b(Pro)\b/).map((part, i) =>
    part === "Pro" ? (
      <strong key={i} style={{ color: "var(--copper-dark, #a94900)" }}>
        Pro
      </strong>
    ) : (
      part
    )
  );
}

export default async function TutorialsPage() {
  const [tutorials, { hero }] = await Promise.all([
    getTutorials("electricians"),
    getTutorialsPageContent(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        actions={
          <Link href="/tutorials/homeowners" className="textLink">
            Booking work on your own home? See the homeowner guides
          </Link>
        }
      >
        {hero.subheading && <HighlightPro text={hero.subheading} />}
      </PageHero>
      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <TutorialGrid tutorials={tutorials} />
        </div>
      </section>
    </>
  );
}
