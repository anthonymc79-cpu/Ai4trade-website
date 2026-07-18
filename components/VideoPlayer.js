"use client";

import { useRef } from "react";

// Reports watch progress to /api/tutorials/[slug]/progress every 15s and on
// pause, so a signed-in subscriber's "completed" state stays up to date.
// Swap the videoId prop for a real Cloudflare Stream / Mux id in production —
// this renders a plain <video> tag as a stand-in for that embed.
export default function VideoPlayer({ slug, videoId, title }) {
  const lastReported = useRef(0);

  function reportProgress(seconds) {
    if (Math.abs(seconds - lastReported.current) < 15) return;
    lastReported.current = seconds;

    fetch(`/api/tutorials/${slug}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secondsWatched: Math.floor(seconds) }),
    }).catch(() => {
      // Non-critical — a failed progress ping shouldn't interrupt playback.
    });
  }

  return (
    <div
      style={{
        background: "var(--panel)",
        border: "1px solid var(--wire-line)",
        borderRadius: "3px",
        overflow: "hidden",
      }}
    >
      <video
        controls
        preload="metadata"
        style={{ width: "100%", display: "block", aspectRatio: "16 / 9" }}
        onTimeUpdate={(e) => reportProgress(e.currentTarget.currentTime)}
        onPause={(e) => reportProgress(e.currentTarget.currentTime)}
        poster={`/thumbnails/${videoId}.jpg`}
      >
        {/* Replace src with the real hosted file or Stream manifest URL */}
        <source src={`/videos/${videoId}.mp4`} type="video/mp4" />
        Your browser doesn&apos;t support embedded video. {title}
      </video>
    </div>
  );
}
