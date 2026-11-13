import { getBargazFile } from "../../other/github-files.js";
import Markdown from "../../components/shared/markdown";

export default async function TermsPage() {
  let content;

  try {
    content = await getBargazFile("legal/terms.md");
  } catch (error) {
    console.error("Failed to load Terms of Service:", error);
    content = "Terms of Service temporarily unavailable.";
  }

  return (
    <main>
      <Markdown content={content} />
    </main>
  );
}
