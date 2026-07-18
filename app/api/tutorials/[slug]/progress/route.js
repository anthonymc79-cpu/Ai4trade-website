// app/api/tutorials/[slug]/progress/route.js
//
// Called by the VideoPlayer client component every ~15s of playback.
// Replace the body with a real write to Supabase (or wherever watch
// progress should live) — this stub just validates and echoes back.

export async function POST(request, { params }) {
  const { slug } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { secondsWatched } = body;
  if (typeof secondsWatched !== "number") {
    return Response.json(
      { error: "secondsWatched must be a number" },
      { status: 400 }
    );
  }

  // TODO: replace with something like:
  // await supabase.from('tutorial_progress').upsert({
  //   user_id: userId,        // from an auth cookie/session, not the client
  //   tutorial_slug: slug,
  //   seconds_watched: secondsWatched,
  // });

  return Response.json({ slug, secondsWatched, recorded: true });
}
