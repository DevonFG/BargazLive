import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { getBargazFile } from "../../github-files";
import { linkifyPlainUrls } from "../../markdown-links";
import Markdown from "../../components/markdown";

async function loadTermsMarkdown() {
  // Check local parent Bargaz directory first (~/Bargaz/Terms.md)
  const localCandidates = [
    path.join(process.cwd(), "..", "Terms.md"),
    path.join(process.cwd(), "Terms.md"),
  ];

  for (const candidate of localCandidates) {
    try {
      return readFileSync(candidate, "utf8");
    } catch {
      // Try next candidate
    }
  }

  // Fallback to GitHub if running without the local parent folder
  try {
    return await getBargazFile("Terms.md");
  } catch {
    return null;
  }
}

export default async function TermsScreen() {
  const rawTerms = await loadTermsMarkdown();
  const content = rawTerms ? linkifyPlainUrls(rawTerms) : null;

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Terms of Service</h1>
        <p>
          Rules, acceptable use, disclaimers, and conditions for using Bargaz™
          and RandomWolf08 sites and services.
        </p>
      </section>

      {content ? (
        <Markdown content={content} />
      ) : (
        <div className="notice is-warning">
          The Terms of Service are currently unavailable. Please email{" "}
          <a href="mailto:legal@bargaz.app">legal@bargaz.app</a> if you need a
          copy.
        </div>
      )}

      <section>
        <h2>Questions</h2>
        <p>
          For terms questions, use the{" "}
          <Link href="/contact">Contact page</Link> or email{" "}
          <a href="mailto:legal@bargaz.app">legal@bargaz.app</a>.
        </p>
      </section>
    </main>
  );
}