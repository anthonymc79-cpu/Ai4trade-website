/* ═══════════════════════════════════════════════════════════════════════════
   AI4TRADE — SERVER-SIDE PAYMENTS API (deploy on Railway)

   Why this exists:
   • The Stripe SECRET key must never be in the browser. This service reads
     each admin's Stripe secret from the integration_secrets table using the
     Supabase SERVICE ROLE key (server-only, bypasses RLS).
   • The AMOUNT is computed server-side from the submission/invoice row.
     The browser only sends IDs — so nobody can edit a request and pay £1
     for a £4,000 rewire.
   • Stripe webhooks are signature-verified before being trusted.

   Setup on Railway → Variables (never in code, never in git):
     SUPABASE_URL              = https://YOURPROJECT.supabase.co
     SUPABASE_SERVICE_ROLE_KEY = eyJ...   (Settings → API → service_role)
     ALLOWED_ORIGINS           = https://ai4trade.co.uk,https://daveselectrics.ai4trade.co.uk
     PORT                      = provided by Railway automatically

   Install:  npm i express stripe @supabase/supabase-js helmet express-rate-limit cors
   Start:    node payments-server.js
   ═══════════════════════════════════════════════════════════════════════════ */

const express   = require('express');
const helmet    = require('helmet');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');
const Stripe    = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.set('trust proxy', 1); // behind Railway/Cloudflare proxy

// ── Supabase admin client (service role — server only) ─────────────────────
const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// ── Security middleware ─────────────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin(origin, cb) {
    // Allow same-origin/no-origin (webhooks, curl health checks)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Origin not allowed'));
  },
}));

// Global rate limit + stricter limit on payment creation
app.use(rateLimit({ windowMs: 60_000, max: 120, standardHeaders: true }));
const payLimiter = rateLimit({ windowMs: 60_000, max: 10, standardHeaders: true });

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Load one admin's secret credentials from integration_secrets (server-only). */
async function getAdminSecrets(adminId) {
  const { data, error } = await sb
    .from('integration_secrets')
    .select('secrets')
    .eq('admin_id', adminId)
    .maybeSingle();
  if (error) throw new Error('secrets lookup failed: ' + error.message);
  return data?.secrets || {};
}

/** Verify the caller's Supabase JWT and return the user (or null). */
async function getCaller(req) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const { data, error } = await sb.auth.getUser(token);
  if (error) return null;
  return data.user;
}

/** SERVER-SIDE price: derive the amount due from the database row.
    Never trust an amount sent by the browser. */
async function computeAmountDue(submissionId, kind /* 'deposit' | 'final' */) {
  const { data: sub, error } = await sb
    .from('submissions')
    .select('id, admin_id, status, invoice, job_details, customer_email, customer_name')
    .eq('id', submissionId)
    .maybeSingle();
  if (error || !sub) throw new Error('Submission not found');

  // Adjust this to your real pricing fields. Priority: explicit invoice
  // totals, then fixed price captured at qualification time.
  const inv = sub.invoice || {};
  let pounds = null;
  if (kind === 'deposit' && inv.depositAmount != null) pounds = Number(inv.depositAmount);
  else if (kind === 'final' && inv.balanceDue  != null) pounds = Number(inv.balanceDue);
  else if (inv.total != null)                           pounds = Number(inv.total);
  else if (sub.job_details?.fixedPrice != null)         pounds = Number(sub.job_details.fixedPrice);

  if (!pounds || !isFinite(pounds) || pounds <= 0 || pounds > 100000) {
    throw new Error('No valid amount is recorded for this job — set the invoice first.');
  }
  return { sub, amountPence: Math.round(pounds * 100) };
}

// ── Routes ──────────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => res.json({ ok: true }));

/**
 * POST /api/pay/create-intent   (JSON)
 * Body: { submissionId: "EQ-123456", kind: "deposit" | "final" }
 * Auth: Supabase JWT of the paying customer (or the admin taking payment).
 * Returns: { clientSecret, publishableKey } for Stripe.js on the frontend.
 */
app.post('/api/pay/create-intent', payLimiter, express.json({ limit: '10kb' }), async (req, res) => {
  try {
    const caller = await getCaller(req);
    if (!caller) return res.status(401).json({ error: 'Sign in required' });

    const { submissionId, kind } = req.body || {};
    if (typeof submissionId !== 'string' || !/^[A-Za-z0-9_-]{4,64}$/.test(submissionId))
      return res.status(400).json({ error: 'Invalid submission id' });
    if (!['deposit', 'final'].includes(kind))
      return res.status(400).json({ error: 'Invalid payment kind' });

    const { sub, amountPence } = await computeAmountDue(submissionId, kind);

    const secrets = await getAdminSecrets(sub.admin_id);
    if (!secrets.stripeSecretKey)
      return res.status(409).json({ error: 'This business has not connected Stripe yet.' });

    // Also fetch the admin's PUBLISHABLE key (non-secret, in app_settings).
    const { data: cfg } = await sb
      .from('app_settings').select('integration_keys')
      .eq('admin_id', sub.admin_id).maybeSingle();
    const publishableKey = cfg?.integration_keys?.stripePublishableKey || '';

    const stripe = new Stripe(secrets.stripeSecretKey);
    const intent = await stripe.paymentIntents.create({
      amount: amountPence,
      currency: 'gbp',
      receipt_email: sub.customer_email || undefined,
      metadata: { submissionId: sub.id, kind, adminId: sub.admin_id, callerId: caller.id },
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: intent.client_secret, publishableKey, amountPence });
  } catch (e) {
    console.error('[create-intent]', e.message);
    res.status(400).json({ error: e.message });
  }
});

/**
 * POST /api/stripe/webhook/:adminId
 * Configure in each admin's Stripe dashboard:
 *   https://YOUR-RAILWAY-APP.up.railway.app/api/stripe/webhook/<their admin uuid>
 * Raw body is REQUIRED for signature verification — do not JSON-parse first.
 */
app.post('/api/stripe/webhook/:adminId',
  express.raw({ type: 'application/json', limit: '1mb' }),
  async (req, res) => {
    try {
      const adminId = req.params.adminId;
      if (!/^[0-9a-f-]{36}$/i.test(adminId)) return res.status(400).send('bad id');

      const secrets = await getAdminSecrets(adminId);
      if (!secrets.stripeSecretKey || !secrets.stripeWebhookSecret)
        return res.status(409).send('stripe not configured');

      const stripe = new Stripe(secrets.stripeSecretKey);
      // Throws if the signature is invalid — forged webhooks are rejected here.
      const event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        secrets.stripeWebhookSecret
      );

      if (event.type === 'payment_intent.succeeded') {
        const pi = event.data.object;
        const { submissionId, kind } = pi.metadata || {};
        if (submissionId) {
          const newStatus = kind === 'final' ? 'final_paid' : 'deposit_paid';
          await sb.from('submissions')
            .update({ status: newStatus, updated_at: new Date().toISOString() })
            .eq('id', submissionId)
            .eq('admin_id', adminId); // never cross-account
          console.log(`[webhook] ${submissionId} → ${newStatus} (£${(pi.amount_received/100).toFixed(2)})`);
        }
      }

      res.json({ received: true });
    } catch (e) {
      console.error('[webhook]', e.message);
      res.status(400).send(`Webhook error: ${e.message}`);
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Payments API listening on :${port}`));
