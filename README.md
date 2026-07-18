# Voltro marketing site

Next.js (App Router) marketing site: homepage splitter, the B2B pitch
(`/for-electricians`), the homeowner-facing page (`/services`), pricing,
and a video tutorial library — built from the plan discussed for Voltro,
the electrical-business SaaS platform.

## What's demonstrated where

| Concept | File |
|---|---|
| Server-side rendering + a per-request gate | `app/tutorials/[slug]/page.js` (checks live subscription status before rendering) |
| Static generation + ISR | `app/pricing/page.js`, `app/tutorials/page.js`, `app/tutorials/[slug]/page.js` (`revalidate = 3600`) |
| API routes | `app/api/tutorials/[slug]/progress/route.js`, `app/api/signup/**`, `app/api/stripe/webhook/route.js` |
| Personalization via middleware | `middleware.js` (region-based pricing currency, gating `/tutorials/advanced-*`) |
| Video tutorials | `components/VideoPlayer.js` (client component, reports progress to the API route) |
| Business signup + Stripe Checkout | `app/signup/business/` + `app/api/signup/business/route.js` |
| Free customer signup | `app/signup/customer/` + `app/api/signup/customer/route.js` |
| Subscription activation | `app/api/stripe/webhook/route.js` — the only place `subscription_status` is set to `active` |

Tutorial data still comes from `lib/tutorials.js` (mock array) — swap that
for a real Supabase query whenever the video library is ready. Everything
else (`lib/auth.js`, the signup routes, the webhook) is wired to real
Supabase and Stripe calls, not stubs.

## Setting up Supabase

1. Create a Supabase project (or use your existing one).
2. Run `supabase/schema.sql` in the SQL editor — creates `businesses` and
   `customers` tables with RLS policies scoped so a business admin only
   ever sees their own business's customers.
3. Copy your project URL, anon key, and **service role key** into
   `.env.local` (see `.env.example`). The service role key is what lets
   the signup API routes create users and insert rows — never expose it
   to the browser (no `NEXT_PUBLIC_` prefix, and it's only imported from
   `lib/supabase/admin.js`, which is server-only code).

### Shared session across subdomains

`lib/supabase/server.js` sets the auth cookie's domain to
`AUTH_COOKIE_DOMAIN` (e.g. `.yourdomain.com`) rather than leaving it
scoped to whichever subdomain issued it. That means once this is deployed
for real, a session started on `www.yourdomain.com` is readable by
`app.yourdomain.com` too — useful if you ever want the marketing site to
know someone's already logged in, without a separate SSO step. This only
works if both sites use the **same** Supabase project and sit under the
same root domain.

## Setting up Stripe

1. Create two Prices in the Stripe dashboard (or via the API) — one for
   Starter, one for Team — and put their IDs in `STRIPE_PRICE_STARTER` /
   `STRIPE_PRICE_TEAM`.
2. Add a webhook endpoint pointing at
   `https://www.yourdomain.com/api/stripe/webhook`, listening for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
3. Copy the webhook's signing secret into `STRIPE_WEBHOOK_SECRET`.
4. For local testing, use the Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

**Why the webhook, not the signup route, activates a subscription:** the
signup route creates the business with `subscription_status: 'pending'`
and only redirects to Stripe Checkout — it never marks the business
active itself. That guarantees a business can't get access without Stripe
actually confirming payment, even if someone closes the tab mid-checkout
or the browser request never completes.

## Running it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

Set the app URL (used by every "Log in" / "Start subscription" button) in
a `.env.local` file:

```
NEXT_PUBLIC_APP_URL=https://app.yourdomain.com
```

If unset, it defaults to `https://app.yourdomain.com` already, so the site
works out of the box — just update it once your real app domain is live.

## Deploying

### Option A — Cloudflare, via OpenNext (recommended)

Cloudflare deprecated `@cloudflare/next-on-pages` in favour of **OpenNext for
Cloudflare Workers**, which fully supports the Next.js 15 features this
site uses (Route Handlers, ISR, Server Components, middleware) rather than
being limited to the Edge runtime. This replaces the earlier "Cloudflare
Pages" deploy path from the setup guide — same domain, same DNS-on-Cloudflare
approach, different underlying product (Workers instead of Pages).

```bash
npm install
npm run deploy
```

That runs `npm run build:worker` (which calls `opennextjs-cloudflare build`,
producing `.open-next/worker.js`) and then `wrangler deploy`. Doing these
as two separate scripts matters if you connect the repo to Cloudflare's
dashboard rather than deploying from the CLI — Cloudflare's Git-connected
Workers builds run **your configured build command**, then run `wrangler
deploy` themselves afterward. If the build command isn't set to actually
produce `.open-next/worker.js` first, `wrangler deploy` fails with
`The entry-point file at ".open-next/worker.js" was not found` — deploy
step ran before there was anything to deploy.

If deploying via the Cloudflare dashboard's Git integration, set:
- **Build command:** `npm run build:worker`
- **Deploy command:** leave as Cloudflare's default (it runs `wrangler deploy` for you)

First-time setup either way:

1. `npx wrangler login` to authenticate with your Cloudflare account.
2. Add your environment variables (Supabase keys, Stripe keys, etc. from
   `.env.example`) as Worker secrets: `npx wrangler secret put STRIPE_SECRET_KEY`
   (repeat per secret — anything server-only shouldn't go in `wrangler.jsonc`
   directly).
3. After deploying, attach your custom domain (`www.yourdomain.com`) to the
   Worker from the Cloudflare dashboard under **Workers & Pages → your
   Worker → Settings → Domains & Routes**.

Use `npm run preview` to test the Workers build locally before deploying.

### Option B — Vercel

Since this is a Next.js site, Vercel needs zero configuration — connect
the repo and deploy. Sidesteps any Cloudflare-adapter question entirely,
at the cost of having your marketing site and app on two different
platforms (Vercel + Railway) rather than Cloudflare + Railway.

## Replacing the placeholder video files

`VideoPlayer.js` currently points at `/videos/{videoId}.mp4` and
`/thumbnails/{videoId}.jpg` as stand-ins. For real tutorial content, the
recommended path (mentioned in the earlier discussion) is **Cloudflare
Stream** — swap the `<video>` tag for a Stream iframe embed and pass
through the same `videoId` you already have in `lib/tutorials.js`.

## Next steps worth doing before this goes live

- Wire `lib/tutorials.js` and `lib/auth.js` up to Supabase.
- Replace the placeholder logo mark and favicon in `public/`.
- Decide how the subscription cookie actually gets set — most likely a
  redirect back from `app.yourdomain.com` after checkout, or a shared
  session if you put both behind the same root domain.
- Fill in real page copy for `/for-electricians` and `/services` — the
  content here is a working draft, not final marketing copy.
