// open-next.config.ts
//
// defineCloudflareConfig() fills in the required `default` server config
// (incremental cache, queue, etc. all left as Cloudflare's defaults here)
// — a bare `export default {}` fails validation because it has no
// `default` key at all, which is what "config.default cannot be empty"
// actually means: the field was missing, not literally empty.
// See https://opennext.js.org/cloudflare for overriding the cache/queue
// implementations (e.g. R2-backed ISR cache) if this site grows into
// needing them.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
