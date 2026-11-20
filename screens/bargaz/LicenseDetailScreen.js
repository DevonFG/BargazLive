import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBargazFile } from "../../github-files";
import { linkifyPlainUrls } from "../../markdown-links";
import Markdown from "../../components/markdown";

const LICENSES = {
  "bargaz-code-product-license-v1.0": {
    title: "Bargaz Code & Product License v1.0",
    filenames: [
      "bargaz-code-product-license-v1.0.md",
      "licenses/bargaz-code-product-license-v1.0.md",
    ],
  },
  "bargaz-logo-license-v1.0": {
    title: "Bargaz Logo License v1.0",
    filenames: [
      "bargaz-logo-license-v1.0.md",
      "licenses/bargaz-logo-license-v1.0.md",
    ],
  },
};

async function loadLicenseDocument(filenames) {
  // 1. Check local parent Bargaz directory first (~/Bargaz/...)
  for (const relPath of filenames) {
    const localCandidates = [
      path.join(process.cwd(), "..", relPath),
      path.join(process.cwd(), relPath),
    ];

    for (const candidate of localCandidates) {
      try {
        return readFileSync(candidate, "utf8");
      } catch {
        // Try next candidate
      }
    }
  }

  // 2. Fallback to GitHub if running without the local parent folder
  for (const relPath of filenames) {
    try {
      return await getBargazFile(relPath);
    } catch {
      // Try next candidate
    }
  }

  return null;
}

export default async function LicenseDetailScreen({ license }) {
  const entry = LICENSES[license];
  if (!entry) notFound();

  const rawMarkdown = await loadLicenseDocument(entry.filenames);
  const content = rawMarkdown ? linkifyPlainUrls(rawMarkdown) : null;

  return (
    <main className="page-container">
      {content ? (
        <section className="hero-section">
          <h1>{entry.title}</h1>
          <p>
            The official license text for Bargaz™ software, products, and
            visual marks.
          </p>
        </section>
      ) : (
        <section className="hero-section">
          <h1>{entry.title}</h1>
          <div className="notice is-warning">
            The full text for this license is currently unavailable. Email{" "}
            <a href="mailto:legal@bargaz.app">legal@bargaz.app</a> for a copy or
            licensing permission.
          </div>
        </section>
      )}

      {content && <Markdown content={content} />}

      <section>
        <h2>Related documents</h2>
        <p>
          See the <Link href="/licensing">Licensing overview</Link> for all
          Bargaz licenses, or the{" "}
          <Link href="/trademarks">Trademarks page</Link> for brand usage
          guidance.
        </p>
      </section>
    </main>
  );
}