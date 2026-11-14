import Link from "next/link";

const HEALTH_URL = process.env.BARGAZ_HEALTH_URL || "http://127.0.0.1:3001";

const ENDPOINT_LINKS = [
  {
    slug: "health",
    label: "/health",
    description: "Power source, battery level, and shutdown status.",
  },
  {
    slug: "diagnostics",
    label: "/diagnostics",
    description:
      "Component checks, storage availability, and detected storage errors.",
  },
  {
    slug: "versions",
    label: "/versions",
    description: "Installed component versions.",
  },
  {
    slug: "backups",
    label: "/backups",
    description: "Database backups and whether their integrity checks passed.",
  },
  {
    slug: "network",
    label: "/network",
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
      <h1>Status</h1>
      <p>
        This page shows the health of the Bargaz host, the Raspberry Pi that
        runs BargazBot, BargazLive, and the rest of the Bargaz services. It
        covers power, battery, storage, backups, and network reachability.
      </p>
      <p>
        Each endpoint below has both a formatted status page and a{" "}
        <code>/raw</code> endpoint returning unformatted JSON. They exist
        mainly for the host owner&apos;s own monitoring and automation, and are
        public in case anyone else finds them useful.
      </p>

      <section>
        <h2>Current Health</h2>
        <ul>
          <li>
            <strong>Status:</strong> {statusText}
          </li>
          <li>
            <strong>Power source:</strong> {powerSource}
          </li>
          <li>
            <strong>Battery:</strong> {battery}
          </li>
          <li>
            <strong>Shutdown pending:</strong> {shutdownPending}
          </li>
          <li>
            <strong>Last report:</strong> {lastReport}
          </li>
        </ul>
      </section>

      <section>
        <h2>Endpoints</h2>
        <ul>
          {ENDPOINT_LINKS.map((item) => (
            <li key={item.slug}>
              <Link href={`/status/${item.slug}`}>{item.label}</Link> (
              <a href={`/status/${item.slug}/raw`}>raw</a>) — {item.description}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
