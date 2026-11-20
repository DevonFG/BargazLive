import Link from "next/link";
import { notFound } from "next/navigation";

const HEALTH_URL = process.env.BARGAZ_HEALTH_URL || "http://127.0.0.1:3001";

const ENDPOINT_META = {
  health: {
    title: "Health status",
    description: "Power source, battery level, and shutdown status.",
  },
  diagnostics: {
    title: "System diagnostics",
    description: "Component checks, storage availability, and database health.",
  },
  versions: {
    title: "Component versions",
    description: "Installed versions, Git commits, and sync state.",
  },
  backups: {
    title: "Database backups",
    description: "Hourly, daily, and weekly database backup integrity.",
  },
  network: {
    title: "Network status",
    description: "Active network connection, signal strength, and interfaces.",
  },
};

function labelFor(key) {
  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function Scalar({ value }) {
  if (value === null || typeof value === "undefined") {
    return <span>—</span>;
  }
  if (typeof value === "boolean") {
    return <span className="badge">{value ? "Yes" : "No"}</span>;
  }
  return <>{String(value)}</>;
}

function DataRows({ value }) {
  if (Array.isArray(value)) {
    return (
      <table className="data-table">
        <tbody>
          {value.map((item, index) => (
            <tr key={index}>
              <td>
                {item && typeof item === "object" ? (
                  <DataRows value={item} />
                ) : (
                  <Scalar value={item} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (value && typeof value === "object") {
    return (
      <table className="data-table">
        <tbody>
          {Object.entries(value).map(([key, item]) => (
            <tr key={key}>
              <th scope="row">{labelFor(key)}</th>
              <td>
                {item && typeof item === "object" ? (
                  <DataRows value={item} />
                ) : (
                  <Scalar value={item} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return <Scalar value={value} />;
}

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
      <section className="hero-section">
        <h1>{meta.title}</h1>
        <p>{meta.description}</p>
        <div className="hero-actions">
          <a href={`/status/${endpoint}/raw`} className="button">
            View raw JSON
          </a>
          <Link href="/status" className="button button-secondary">
            All status pages
          </Link>
        </div>
      </section>

      {error ? (
        <div className="notice is-warning">{error}</div>
      ) : (
        <>
          <section>
            <h2>Current data</h2>
            <DataRows value={data} />
          </section>

          {data && typeof data.status === "string" && (
            <div className="notice">Reported status: {data.status}</div>
          )}
        </>
      )}

      <section>
        <h2>Other endpoints</h2>
        <div className="link-grid">
          {Object.entries(ENDPOINT_META)
            .filter(([key]) => key !== endpoint)
            .map(([key, item]) => (
              <article className="link-card" key={key}>
                <h3>
                  <Link href={`/status/${key}`}>{item.title}</Link>
                </h3>
                <p>{item.description}</p>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}