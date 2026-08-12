import styles from "./Health.module.css";

/**
 * SECURITY NOTE — read this before changing STATUS_API_URL below.
 *
 * This page calls the status Worker's public `/api/status` endpoint.
 * That endpoint deliberately requires no auth and returns no secrets —
 * it's the same design as the Worker's own public status page. Do NOT:
 *   - call Supabase directly from this page (would require exposing a
 *     key to do so, and this page has no legitimate need for one)
 *   - call the Worker's `/admin?key=...` route from here
 *   - add any API key, service-role key, or admin key to this file or
 *     to a NEXT_PUBLIC_* env var (those are bundled into client-visible
 *     output — anything prefixed NEXT_PUBLIC_ should be treated as public)
 *
 * If you ever need this page to show more detail than the public
 * endpoint provides, add a new *public, read-only* field to the
 * Worker's /api/status response rather than reaching for the admin
 * route or a database credential here.
 */
const STATUS_API_URL = "https://ai4trade-status.ai4trade.workers.dev/api/status";

export const metadata = {
  title: "System Status — Ai4Trade",
  description: "Live status of every service Ai4Trade depends on.",
  robots: { index: false, follow: false }, // status pages don't need to rank in search
};

// Always fetch fresh — never serve a cached/stale status page.
export const dynamic = "force-dynamic";

async function getStatuses() {
  try {
    const res = await fetch(STATUS_API_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { ok: false, services: [] };
    const services = await res.json();
    return { ok: true, services: Array.isArray(services) ? services : [] };
  } catch {
    // Network error, timeout, or the status Worker itself is down —
    // fail gracefully rather than crashing this page.
    return { ok: false, services: [] };
  }
}

function timeAgo(ts) {
  if (!ts) return "never";
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.round(mins / 60)}h ago`;
}

function statusLabel(status) {
  if (status === "green") return "Operational";
  if (status === "amber") return "Degraded";
  if (status === "red") return "Down";
  return "Unknown";
}

export default async function HealthPage() {
  const { ok, services } = await getStatuses();

  const overallStatus = !ok
    ? "unknown"
    : services.some((s) => s.status === "red")
    ? "red"
    : services.some((s) => s.status === "amber")
    ? "amber"
    : "green";

  const overallText = {
    green: "All systems operational",
    amber: "Minor issues detected",
    red: "Some systems are experiencing issues",
    unknown: "Status temporarily unavailable",
  }[overallStatus];

  return (
    <section className={styles.wrap}>
      <div className="container">
        <span className="eyebrow">System Status</span>
        <h1 className={styles.title}>Ai4Trade — Service Status</h1>
        <p className={styles.lead}>
          Live status of every service Ai4Trade depends on, checked every
          couple of minutes.
        </p>

        <div className={`${styles.banner} ${styles[overallStatus]}`}>
          <span className={styles.dot} />
          <strong>{overallText}</strong>
        </div>

        {!ok && (
          <p className={styles.notice}>
            We couldn&apos;t reach the status service just now. This page
            itself doesn&apos;t depend on the rest of Ai4Trade&apos;s
            infrastructure, so this is likely a temporary blip — try
            refreshing in a minute.
          </p>
        )}

        {ok && services.length > 0 && (
          <div className={styles.list}>
            {services.map((s) => (
              <div key={s.key} className={styles.row}>
                <span className={`${styles.dot} ${styles[s.status] || styles.unknown}`} />
                <span className={styles.label}>{s.label}</span>
                <span className={styles.state}>{statusLabel(s.status)}</span>
                <span className={styles.meta}>checked {timeAgo(s.lastCheckedAt)}</span>
              </div>
            ))}
          </div>
        )}

        <p className={styles.footnote}>
          This page updates automatically — no need to refresh. Having
          trouble with something not listed here? Get in touch and we&apos;ll
          take a look.
        </p>
      </div>
    </section>
  );
}
