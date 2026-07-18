import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorialBySlug, getTutorials } from "@/lib/tutorials";
import { getCurrentUser } from "@/lib/auth";
import VideoPlayer from "@/components/VideoPlayer";

// Rebuild each tutorial page at most once an hour — picks up edits (new
// video, corrected steps) without a full site rebuild.
export const revalidate = 3600;

export async function generateStaticParams() {
  const tutorials = await getTutorials();
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const tutorial = await getTutorialBySlug(params.slug);
  if (!tutorial) return {};
  return {
    title: `${tutorial.title} — Voltro tutorials`,
    description: tutorial.description,
  };
}

export default async function TutorialPage({ params }) {
  const tutorial = await getTutorialBySlug(params.slug);
  if (!tutorial) notFound();

  // Reads the real Supabase session + the business's live subscription
  // status — the same source of truth middleware.js uses (there, via the
  // subscription_status cookie, since middleware can't hit the database
  // directly) to redirect /tutorials/advanced-* routes.
  const { isSubscriber } = await getCurrentUser();
  const isLocked = tutorial.tier === "pro" && !isSubscriber;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="eyebrow">{tutorial.category}</span>
        <h1 style={{ fontSize: 32, margin: "16px 0 10px" }}>{tutorial.title}</h1>
        <p style={{ color: "var(--paper-dim)", marginBottom: 28 }}>
          {tutorial.description}
        </p>

        {isLocked ? (
          <div
            className="tag"
            style={{ padding: "40px 32px", textAlign: "center" }}
          >
            <span className="tag__code">PRO TUTORIAL</span>
            <h3 className="tag__title">
              This one's for subscribed businesses
            </h3>
            <p className="tag__body" style={{ margin: "0 auto 20px", maxWidth: 380 }}>
              Advanced tutorials like this are included with any Voltro
              subscription — start one to unlock it.
            </p>
            <Link href="/pricing" className="btn btn--copper">
              See pricing →
            </Link>
          </div>
        ) : (
          <VideoPlayer
            slug={tutorial.slug}
            videoId={tutorial.videoId}
            title={tutorial.title}
          />
        )}

        <div style={{ marginTop: 32 }}>
          <Link href="/tutorials" className="btn btn--ghost">
            ← Back to all tutorials
          </Link>
        </div>
      </div>
    </section>
  );
}
