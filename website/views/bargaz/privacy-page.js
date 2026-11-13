import { getBargazFile } from "../../other/github-files.js";
import Markdown from "../../components/shared/markdown";

export default async function PrivacyPage() {
  let content;

  try {
    content = await getBargazFile("legal/privacy.md");
  } catch (error) {
    console.error("Failed to load Privacy Policy:", error);
    content = "Privacy Policy temporarily unavailable.";
  }

  return (
    <main>
      <Markdown content={content} />
    </main>
  );
}
