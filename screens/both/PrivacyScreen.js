import { readFileSync } from "node:fs";
import path from "node:path";
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
      {content ? (
        <Markdown content={content} />
      ) : (
        <>
          <h1>Privacy Policy</h1>
          <p>
            The Privacy Policy is currently unavailable. Please contact{" "}
            <a href="mailto:devon6608@gmail.com">devon6608@gmail.com</a> if you
            need a copy.
          </p>
        </>
      )}
    </main>
  );
}
