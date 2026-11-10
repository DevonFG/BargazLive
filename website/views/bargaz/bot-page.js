import { getBargazBotFile } from "../../other/github-files.js";
import Markdown from "../../components/shared/markdown";
import { linkifyPlainUrls } from "../../other/markdown-links";

export default async function BotPage() {
  let readme;

  try {
    readme = await getBargazBotFile("README.md");
  } catch (error) {
    console.error("Failed to load BargazBot README:", error);
    readme = "Documentation temporarily unavailable.";
  }

  return (
    <main>
      <h1>BargazBot</h1>
      <p>Discord notifications and community management.</p>
      <h2>README</h2>
      <Markdown content={linkifyPlainUrls(readme)} />
    </main>
  );
}
