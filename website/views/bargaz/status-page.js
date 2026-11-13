const HEALTH_URL = process.env.BARGAZ_HEALTH_URL || "http://127.0.0.1:3001";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Status | Bargaz",
  description: "Live status and raw monitoring data for the Bargaz host.",
};

const endpoints = [
  ["health", "Power source, battery level, and shutdown status."],
  ["diagnostics", "Component checks, storage availability, and detected storage errors."],
  ["versions", "Installed component versions."],
  ["backups", "Database backups and whether their integrity checks passed."],
  ["network", "Current network connection status."],
];

const statusLabels = {
  online: "Online",
  degraded: "Degraded",
  shutting_down: "Shutting down",
  unavailable: "Unavailable",
};

const powerLabels = {
  ac: "AC power",
  battery: "Battery",
};

async function getHealth() {
  try {
    const response = await fetch(`${HEALTH_URL}/endpoints/health`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    return await response.json();
  } catch {
    return null;
  }
}

function displayTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown";

  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

export default async function StatusPage() {
  const health = await getHealth();
  const status = health?.status;
  const battery = health?.battery_percent;

  return (
    <main>
      <h1>Status</h1>
      <p>
        This page shows the health of the Bargaz host, the Raspberry Pi
        that runs BargazBot, BargazLive, and the rest of the Bargaz
        services. It covers power, battery, storage, backups, and network
        reachability.
      </p>
      <p>
        The endpoints listed below return raw, unformatted JSON. They
        exist mainly for the host owner&apos;s own monitoring and
        automation. They are public in case anyone else finds them
        useful, but they are not intended as a general public API.
      </p>
      <h2>Current Health</h2>
      {health ? (
        <ul>
          <li><strong>Status:</strong> {statusLabels[status] || status || "Unknown"}</li>
          <li><strong>Power source:</strong> {powerLabels[health.power_source] || health.power_source || "Unknown"}</li>
          <li><strong>Battery:</strong> {battery === null || battery === undefined ? "Unknown" : `${battery}%`}</li>
          <li><strong>Shutdown pending:</strong> {health.shutdown_pending ? `Yes, ${health.shutdown_reason || "reason not provided"}` : "No"}</li>
          <li><strong>Last report:</strong> {displayTime(health.timestamp)}</li>
        </ul>
      ) : (
        <p>The health service is not responding right now, so no live data is available.</p>
      )}
      <h2>Endpoints</h2>
      <ul>
        {endpoints.map(([name, description]) => (
          <li key={name}>
            <a href={`/status/${name}`}>{`/${name}`}</a> — {description}
          </li>
        ))}
      </ul>
    </main>
  );
}
