import { notFound } from "next/navigation";
import { getTutorialBySlug, getTutorials, getTutorialsPageContent } from "@/lib/tutorials";
import { getCurrentUser } from "@/lib/auth";
import VideoPlayer from "@/components/VideoPlayer";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import { pageMetadata } from "@/lib/seo";

// Picks up edits (new video, corrected wording) within about a minute.
// Tutorials added after a deploy still work: they're built on first visit.
export const revalidate = 60;

export async function generateStaticParams() {
  const tutorials = await getTutorials();
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) return {};
  return pageMetadata({
    title: `${tutorial.title} — Ai4Trade tutorials`,
    description: tutorial.description,
    path: `/tutorials/${slug}`,
  });
}

export default async function TutorialPage({ params }) {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) notFound();

  // Reads the real Supabase session + the business's live subscription
  // status — the same source of truth middleware.js uses to redirect
  // /tutorials/advanced-* routes before this page even renders.
  const { isSubscriber } = await getCurrentUser();
  const isLocked = tutorial.tier === "pro" && !isSubscriber;

  const { lockedMessage } = isLocked ? await getTutorialsPageContent() : {};

  return (
    <TutorialDetail
      tutorial={tutorial}
      isLocked={isLocked}
      lockedMessage={lockedMessage}
      player={
        !isLocked && (
          <VideoPlayer slug={tutorial.slug} videoId={tutorial.videoId} title={tutorial.title} />
        )
      }
    />
  );
}
