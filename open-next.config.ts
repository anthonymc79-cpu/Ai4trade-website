// open-next.config.ts
//
// Pages refresh their Sanity content every 60 seconds (`revalidate = 60`).
// On Cloudflare that needs somewhere to keep the cached pages (an R2
// bucket) and a way to rebuild them in the background (the queue).
// Without these, the live site would keep showing whatever existed at
// deploy time and edits in the Sanity editor would never appear.
// Docs: https://opennext.js.org/cloudflare/caching

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: memoryQueue,
});
