import Link from "next/link";
import PageHero from "@/components/PageHero";
import TutorialGrid from "@/components/tutorials/TutorialGrid";
import { getTutorials, getTutorialsPageContent } from "@/lib/tutorials";
import { pageMetadata } from "@/lib/seo";

// Guides for homeowners. Add one in the editor under Tutorials and set
// "Who is it for" to Homeowners.
export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Homeowner guides — Ai4Trade",
  description:
    "How to request a quote, draw a floor plan, accept a quote and find your certificates in your free Ai4Trade account.",
  path: "/tutorials/homeowners",
});

export default async function HomeownerTutorialsPage() {
  const [tutorials, { homeownersHero: hero }] = await Promise.all([
    getTutorials("homeowners"),
    getTutorialsPageContent(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        actions={
          <Link href="/homeowners" className="textLink">
            How Ai4Trade works for homeowners
          </Link>
        }
      >
        {hero.subheading}
      </PageHero>
      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <TutorialGrid
            tutorials={tutorials}
            emptyText="Homeowner guides are on the way. In the meantime, your electrician can help with anything in your account."
          />
        </div>
      </section>
    </>
  );
}
