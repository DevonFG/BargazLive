import Link from "next/link";
import { getBargazLiveFile } from "../../other/github-files.js";
import Markdown from "../../components/shared/markdown";
import { linkifyPlainUrls } from "../../other/markdown-links";

export default async function LiveChangelog() {
  let changelog;

  try {
    changelog = await getBargazLiveFile("CHANGELOG.md");
  } catch (error) {
    console.error("Failed to load BargazLive changelog:", error);
    changelog = "Changelog temporarily unavailable.";
  }

  return (
    <main>
      <Link className="page-back" href="https://live.bargaz.app">
        ← Back to BargazLive
      </Link>
      <Markdown content={linkifyPlainUrls(changelog)} />
    </main>
  );
}
