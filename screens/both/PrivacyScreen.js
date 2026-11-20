import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { getBargazFile } from "../../github-files";
import { linkifyPlainUrls } from "../../markdown-links";
import Markdown from "../../components/markdown";

async function loadPrivacyMarkdown() {
  // Check local parent Bargaz directory first (~/Bargaz/Privacy.md)
  const localCandidates = [
    path.join(process.cwd(), "..", "Privacy.md"),
    path.join(process.cwd(), "Privacy.md"),
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
    return await getBargazFile("Privacy.md");
  } catch {
    return null;
  }
}

export default async function PrivacyScreen() {
  const rawPrivacy = await loadPrivacyMarkdown();
  const content = rawPrivacy ? linkifyPlainUrls(rawPrivacy) : null;

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Privacy Policy</h1>
        <p>
          How Bargaz™ and RandomWolf08 sites handle appearance settings, logs,
          identifiers, analytics, and advertising data.
        </p>
      </section>

      {content ? (
        <Markdown content={content} />
      ) : (
        <div className="notice is-warning">
          The Privacy Policy is currently unavailable. Please email{" "}
          <a href="mailto:legal@bargaz.app">legal@bargaz.app</a> if you need a
          copy.
        </div>
      )}

      <section>
        <h2>Questions</h2>
        <p>
          For privacy or data deletion requests, use the{" "}
          <Link href="/contact">Contact page</Link> or email{" "}
          <a href="mailto:legal@bargaz.app">legal@bargaz.app</a>.
        </p>
      </section>
    </main>
  );
}