import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { getBargazFile } from "../../github-files";
import { linkifyPlainUrls } from "../../markdown-links";
import Markdown from "../../components/markdown";

async function loadLicenseMarkdown() {
  // Check local parent Bargaz directory first (~/Bargaz/LICENSE.md)
  const localCandidates = [
    path.join(process.cwd(), "..", "LICENSE.md"),
    path.join(process.cwd(), "LICENSE.md"),
  ];

  for (const candidate of localCandidates) {
    try {
      return readFileSync(candidate, "utf8");
    } catch {
      // Try next candidate
    }
  }

  // Fallback to GitHub if running in an environment without the parent folder
  try {
    return await getBargazFile("LICENSE.md");
  } catch {
    return null;
  }
}

export default async function LicensingScreen({ domain = "bargaz" }) {
  const isRandomWolf = domain === "randomwolf08";
  const rawLicense = await loadLicenseMarkdown();
  const content = rawLicense ? linkifyPlainUrls(rawLicense) : null;

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>{isRandomWolf ? "License" : "Licensing"}</h1>
        <p>
          {isRandomWolf
            ? "Terms governing the source code and content published on RandomWolf08.com and its portfolio subdomains."
            : "Licensing terms for Bargaz™ software, website source code, products, and visual marks."}
        </p>
        <div className="hero-actions">
          <a
            href="mailto:legal@bargaz.app"
            className="button button-secondary"
          >
            Licensing questions
          </a>
        </div>
      </section>

      {!isRandomWolf && (
        <section>
          <h2>Specific Bargaz licenses</h2>
          <div className="card-grid">
            <article className="card">
              <h3>
                <Link href="/licensing/bargaz-code-product-license-v1.0">
                  Code &amp; Product License v1.0
                </Link>
              </h3>
              <p>
                Covers Bargaz™ software, website source code, and products.
              </p>
            </article>
            <article className="card">
              <h3>
                <Link href="/licensing/bargaz-logo-license-v1.0">
                  Logo License v1.0
                </Link>
              </h3>
              <p>
                Covers usage terms for Bargaz™ and RandomWolf08 logos.
              </p>
            </article>
          </div>
        </section>
      )}

      <section>
        <h2>Full license text</h2>
        {content ? (
          <Markdown content={content} />
        ) : (
          <div className="notice is-warning">
            License text is currently unavailable. View full licensing details
            at{" "}
            <a href="https://legal.bargaz.app/licensing">
              legal.bargaz.app/licensing
            </a>
            .
          </div>
        )}
      </section>
    </main>
  );
}