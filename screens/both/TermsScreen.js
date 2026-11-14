import { readFileSync } from "node:fs";
import path from "node:path";
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
      {content ? (
        <Markdown content={content} />
      ) : (
        <>
          <h1>Terms of Service</h1>
          <p>
            The Terms of Service are currently unavailable. Please contact{" "}
            <a href="mailto:devon6608@gmail.com">devon6608@gmail.com</a> if you
            need a copy.
          </p>
        </>
      )}
    </main>
  );
}
