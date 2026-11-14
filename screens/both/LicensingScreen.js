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
      <h1>{isRandomWolf ? "License" : "Licensing"}</h1>

      {!isRandomWolf && (
        <section>
          <h2>Specific Bargaz Licenses</h2>
          <ul>
            <li>
              <Link href="/licensing/bargaz-code-product-license-v1.0">
                Bargaz Code & Product License v1.0
              </Link>{" "}
              — Covers Bargaz software, website source code, and products.
            </li>
            <li>
              <Link href="/licensing/bargaz-logo-license-v1.0">
                Bargaz Logo License v1.0
              </Link>{" "}
              — Covers usage terms for Bargaz and RandomWolf08 logos.
            </li>
          </ul>
        </section>
      )}

      <section>
        {content ? (
          <Markdown content={content} />
        ) : (
          <p>
            License text is currently unavailable. View full licensing details
            at{" "}
            <a href="https://bargaz.app">
              legal.bargaz.app/licensing
            </a>
            .
          </p>
        )}
      </section>
    </main>
  );
}
