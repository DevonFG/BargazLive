import Link from "next/link";
import { getBargazBotFile } from "../../other/github-files.js";
import Markdown from "../../components/shared/markdown";
import { linkifyPlainUrls } from "../../other/markdown-links";

export default async function BotChangelogPage() {
  let changelog;

  try {
    changelog = await getBargazBotFile("CHANGELOG.md");
  } catch (error) {
    console.error("Failed to load BargazBot changelog:", error);
    changelog = "Changelog temporarily unavailable.";
  }

  return (
    <main>
      <Link className="page-back" href="https://bot.bargaz.app">
        ← Back to BargazBot
      </Link>
      <Markdown content={linkifyPlainUrls(changelog)} />
    </main>
  );
}
