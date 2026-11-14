import Link from "next/link";
import { notFound } from "next/navigation";

const HEALTH_URL = process.env.BARGAZ_HEALTH_URL || "http://127.0.0.1:3001";

const ENDPOINT_META = {
  health: {
    title: "Health Status",
    description: "Power source, battery level, and shutdown status.",
  },
  diagnostics: {
    title: "System Diagnostics",
    description: "Component checks, storage availability, and database health.",
  },
  versions: {
    title: "Component Versions",
    description: "Installed versions, Git commits, and sync state.",
  },
  backups: {
    title: "Database Backups",
    description: "Hourly, daily, and weekly database backup integrity.",
  },
  network: {
    title: "Network Status",
    description: "Active network connection, signal strength, and interfaces.",
  },
};

export default async function StatusEndpointScreen({ endpoint }) {
  const meta = ENDPOINT_META[endpoint];
  if (!meta) notFound();

  let data = null;
  let error = null;

  try {
    const res = await fetch(`${HEALTH_URL}/endpoints/${endpoint}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch {
    error = "Health service is currently unavailable.";
  }

  return (
    <main className="page-container">
      <h1>{meta.title}</h1>
      <p>{meta.description}</p>
      <p>
        <Link href={`/status/${endpoint}/raw`}>View Raw JSON</Link>
      </p>

      {error ? (
        <p>{error}</p>
      ) : (
        <pre className="json-block">{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
}
