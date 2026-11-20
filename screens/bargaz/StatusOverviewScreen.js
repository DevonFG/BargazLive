import Link from "next/link";

const HEALTH_URL = process.env.BARGAZ_HEALTH_URL || "http://127.0.0.1:3001";

const ENDPOINT_LINKS = [
  {
    slug: "health",
    label: "Health",
    description: "Power source, battery level, and shutdown status.",
  },
  {
    slug: "diagnostics",
    label: "Diagnostics",
    description:
      "Component checks, storage availability, and detected storage errors.",
  },
  {
    slug: "versions",
    label: "Versions",
    description: "Installed component versions across the host.",
  },
  {
    slug: "backups",
    label: "Backups",
    description: "Database backups and whether their integrity checks passed.",
  },
  {
    slug: "network",
    label: "Network",
    description: "Current network connection status.",
  },
];

function formatTimestamp(isoString) {
  if (!isoString) return "Unknown";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Los_Angeles",
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

function statusClass(status) {
  const value = String(status || "").toLowerCase();
  if (["ok", "online", "healthy", "normal"].includes(value)) return "is-online";
  if (["degraded", "warning", "partial"].includes(value)) return "is-degraded";
  if (["offline", "down", "error", "failed", "unavailable"].includes(value)) {
    return "is-offline";
  }
  return "";
}

async function getHealthSummary() {
  try {
    const res = await fetch(`${HEALTH_URL}/endpoints/health`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function StatusOverviewScreen() {
  const health = await getHealthSummary();

  const statusText = health?.status
    ? health.status.charAt(0).toUpperCase() + health.status.slice(1)
    : "Unavailable";
  const powerSource = health?.power_source ?? health?.powerSource ?? "Unknown";
  const battery =
    typeof health?.battery === "number"
      ? `${health.battery}%`
      : health?.battery_percent != null
        ? `${health.battery_percent}%`
        : "Unknown";
  const shutdownPending =
    health?.shutdown_pending === true || health?.shutdownPending === true
      ? "Yes"
      : health
        ? "No"
        : "Unknown";
  const lastReport = formatTimestamp(health?.timestamp);

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Status</h1>
        <p>
          Live health of the Bargaz host — the Raspberry Pi that runs
          BargazBot™, BargazLive™, and the rest of the Bargaz services. It
          covers power, battery, storage, backups, and network reachability.
        </p>
        <div className="hero-actions">
          <Link href="/status/diagnostics" className="button">
            View diagnostics
          </Link>
          <a
            href="https://bargaz.app/status/health/raw"
            className="button button-secondary"
          >
            Raw health JSON
          </a>
        </div>
      </section>

      <section>
        <h2>Current health</h2>
        <div className="stat-grid">
          <article className={`status-card ${statusClass(health?.status)}`}>
            <span className="status-indicator">Overall</span>
            <span className="stat-value">{statusText}</span>
            <span className="stat-label">Reported status</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{powerSource}</span>
            <span className="stat-label">Power source</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{battery}</span>
            <span className="stat-label">Battery</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{shutdownPending}</span>
            <span className="stat-label">Shutdown pending</span>
          </article>
        </div>
        <p>Last report: {lastReport}</p>
      </section>

      <section>
        <h2>Endpoints</h2>
        <div className="status-grid">
          {ENDPOINT_LINKS.map((item) => (
            <article className="status-card" key={item.slug}>
              <h3>
                <Link href={`/status/${item.slug}`}>{item.label}</Link>
              </h3>
              <p>{item.description}</p>
              <p>
                <a href={`/status/${item.slug}/raw`}>View raw JSON</a>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Services</h2>
        <p>
          Component checks for Bargaz.app, BargazBot™, BargazLive™, and
          dependent services such as Cloudflare, Discord, SQLite, and npm are
          reported in <Link href="/status/diagnostics">Diagnostics</Link> and{" "}
          <Link href="/status/versions">Versions</Link>.
        </p>
        <p>
          These endpoints exist mainly for the host owner&apos;s monitoring and
          automation, and are public in case anyone else finds them useful.
        </p>
      </section>
    </main>
  );
}