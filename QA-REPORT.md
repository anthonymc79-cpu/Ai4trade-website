# AI4Trade Website — QA Report

**Date:** 2026-09-09
**Live site tested:** https://ai4tradewebsite.ai4trade.workers.dev/
**Repo:** anthonymc79-cpu/Ai4trade-website
**Branch:** `fix/qa-pass-2026-09-09` (PR against `main`)

## What was tested and how

The site is a Next.js 16 (App Router) marketing/signup site for Ai4Trade, a job-management SaaS
for electrical trade businesses, deployed to Cloudflare Workers via OpenNext. It is **not** a
trading/finance product — the "risk disclosure / not financial advice" compliance check in the
original brief doesn't apply here.

Because this sandbox has no GUI and Chromium's default sandbox needs a kernel feature this
container doesn't have, the bundled Playwright MCP browser couldn't launch. Instead, Chromium was
driven directly via `playwright-core` (`--no-sandbox`) through small scripts that navigated every
page, at 375×812 (mobile), 768×1024 (tablet), and 1440×900 (desktop), and captured:

- console errors/warnings, uncaught page errors, failed network requests, and any HTTP ≥400 response
- full-page screenshots for visual review
- the DOM: links, image alt text, heading tags in order, form fields and their labels, meta/OG tags, canonical URL, favicon presence, horizontal-scroll detection
- computed-style contrast ratios for the main text/button combinations against WCAG AA thresholds
- for the two signup forms: empty-submit and invalid-email validation behavior, then a full submit with valid dummy data, capturing the actual API response

This was run against both the live Cloudflare Worker and a local `npm run dev` instance (used to
confirm fixes and to get server-side stack traces the live site doesn't expose). `npm run build`
was re-run after every fix to make sure nothing broke.

## Issues found

| Severity | Issue | Location | Status |
|---|---|---|---|
| **Critical** | Every tutorial page returned HTTP 500 (`This page couldn't load`) for every visitor. Root cause: `getCurrentUser()` threw synchronously when Supabase env vars are unset, crashing the whole page render instead of just the "not a subscriber" check. Same failure mode existed in `proxy.js`'s advanced-tutorial gate. | `/tutorials/*` (all 5 listed tutorials, on both live and local) | **Fixed** — both now fail closed to "not a subscriber" instead of throwing |
| **Critical** | Business and customer signup forms fail with a raw empty-body 500 on submit (reproduced live with real form-fill + submit). Root cause is missing Supabase/Stripe credentials on the Worker deployment (can't fix without those credentials — see "Couldn't fix" below), but the API routes also had no top-level error handling, so any unexpected failure surfaced as an empty 500 instead of the JSON error shape the client expects. | `/api/signup/business`, `/api/signup/customer`, `/api/checkout`, `/api/checkout/redirect` | **Partially fixed** — routes now always return a graceful JSON error (or redirect) on failure. The underlying 500 will keep happening until Supabase/Stripe secrets are configured on the Worker (needs site owner) |
| **Major** | "Log in" (header, on every page) and the post-registration "Log in" link pointed at `https://app.yourdomain.com/login` — a non-existent placeholder domain — because 3 of the 4 places that build this URL had the wrong fallback while a 4th (`/api/signup/business`) already used the real `app.ai4trade.co.uk` domain. | Header, `/signup/success`, `/signup/customer` success state | **Fixed** — all four now agree on `app.ai4trade.co.uk` as the fallback (still overridable via `NEXT_PUBLIC_APP_URL`) |
| **Major** | Primary CTA buttons ("Book a demo", "Start free trial →", "Continue to payment →", etc. — the main conversion buttons on every page) used white text on the brand orange, measuring 2.6:1 contrast — fails WCAG AA's 4.5:1 minimum for normal-size text. | Every page, `.btn--copper` | **Fixed** — switched button text to the same dark navy used for body copy elsewhere (7.0:1 against the unchanged orange, and 8.6:1 on the hover shade) — no brand color changed |
| **Major** | `logo.png` (used at 32×32px in the header/footer) was a raw, uncompressed 1024×1024 PNG at 1.26MB — 94% of the homepage's total page weight. The exact same 1.26MB file was also served unprocessed as `app/icon.png`, the site's favicon, downloaded on every page load before anything else. | Header/Footer logo, favicon | **Fixed** — both re-encoded at 256×256 (still generous for retina at the display size), 1.26MB → 41KB each, ~30x smaller |
| **Moderate** | Heading hierarchy skipped levels on every single page: H1 followed directly by H3 (no H2 in between) for feature/tutorial/pricing card titles, and a further H2→H4 skip for the homepage "Before/After" comparison items. On pages with no other headings (e.g. `/health`), the shared Footer's hardcoded `<h4>` column labels created an H1→H4 skip. | All pages | **Fixed** — bumped the card-title headings to H2 (and homepage comparison items to H3), and changed the Footer's column labels from `<h4>` to plain styled text (they're link-group labels, not document headings) |
| **Moderate** | The homepage's "Trade Workflow Command Centre" dashboard mockup has a horizontally-scrolling stage strip that's wider than its container **at every viewport size, including desktop** — the rightmost "Job booked / revenue" panel is silently cut off with no visible scrollbar or fade to indicate more content exists. Confirmed via `scrollWidth` vs `clientWidth` at all three breakpoints. | Homepage dashboard preview | **Fixed** — added a visible edge-fade and an always-visible thin scrollbar so the cut-off reads as "scrollable," not "broken" |
| **Minor** | The 7 interactive elements (2 filter buttons, 5 "View all …" links) inside the `aria-hidden="true"` dashboard mockup were still keyboard-focusable, so a sighted keyboard user could tab into controls that do nothing and aren't announced to screen readers. | Homepage dashboard preview | **Fixed** — added `tabIndex={-1}` to all of them |
| **Minor** | Footer "Contact" link uses `mailto:hello@ai4trade.example` — `.example` is an IANA-reserved placeholder domain (RFC 2606), not a real, receivable address. | Footer, every page | **Needs manual review** — I don't know the real support inbox; swapping in a guessed address would be worse than leaving it |
| **Info** | Two leftover files in `lib/` (`stripe.ts`, `supabase/admin.ts`, `supabase/server.ts`) duplicated the `.js` files actually imported everywhere, and `middleware.js` used a file convention Next.js 16 deprecated in favor of `proxy.js` (the build was emitting a warning about this). Neither affected runtime, but both were cleaned up while in the codebase. | `lib/`, project root | **Fixed** |
| **Info** | `robots.txt` currently blocks all crawlers (`Disallow: /`). This is **intentional**, gated by `NEXT_PUBLIC_SITE_IS_LIVE`, and appropriate while the site sits on a `workers.dev` staging URL with placeholder content — not a bug. | `/robots.txt` | **No action** — flagging so it isn't forgotten: this needs to flip to `"true"` once the site is on its real domain (`www.ai4trade.co.uk`, per the canonical/OG URLs already in the code) and ready for indexing |

## Areas checked with no issues found

- All internal nav links, footer links, and query-param signup links resolve with 200 (no dead links besides the mailto above)
- No horizontal page-level scroll or clipped text at 375px / 768px / 1440px on any page
- Client-side form validation works correctly: empty required fields and a malformed email both block submission with a clear native browser message, and no API call fires until the form is valid
- All images have alt text; single H1 per page; viewport meta, lang attribute, canonical URL, and Open Graph tags are all present and sensible; favicon exists; sitemap.xml lists all real pages with reasonable priorities
- No lorem-ipsum or obviously placeholder body copy
- No console errors on any static marketing page (only on the tutorial pages, from the bug above)

## Couldn't fix automatically

- **Supabase/Stripe not configured on the live Worker** — this is why signup/checkout return 500 even after the error-handling fix. I have no Cloudflare or Supabase/Stripe credentials in this environment (confirmed via `wrangler whoami` — not authenticated) and can't deploy or set Worker secrets. The repo's own `README.md` documents the required secrets (`STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, etc.) — someone with dashboard access needs to set these via `wrangler secret put`.
- **Real contact email** — `hello@ai4trade.example` needs a real inbox; I didn't want to guess one.
- **`robots.txt` / `NEXT_PUBLIC_SITE_IS_LIVE`** — flip this when the site is ready to be indexed on its real domain; not something to change during a QA pass.
- **Placeholder tutorial video files** (`/videos/*.mp4`, `/thumbnails/*.jpg` all 404) — already documented as a known placeholder in the README, awaiting a real video host (Cloudflare Stream is recommended there). Left as-is since it's a content/vendor decision, not a bug.
- **I could not deploy any of these fixes to the live Worker** (no Wrangler auth) — everything above is fixed in the repo and needs a `npm run deploy` (or a merge that triggers Cloudflare's Git-connected build) to actually reach https://ai4tradewebsite.ai4trade.workers.dev/.

## Pull request

Branch `fix/qa-pass-2026-09-09` was pushed and a PR opened against `main` with the 9 commits above.
