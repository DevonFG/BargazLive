import { getBargazLiveFile } from "../../other/github-files.js";
import Markdown from "../../components/shared/markdown";
import { linkifyPlainUrls } from "../../other/markdown-links";
export const dynamic = "force-dynamic";
export const metadata = {title: "BargazLive | Bargaz",};
export default async function LivePage() {
  let readme;
  try {readme = await getBargazLiveFile("README.md");} catch (error) {console.error("Failed to load BargazLive README:", error); readme = "Documentation temporarily unavailable.";}
  return (<main><h1>BargazLive</h1><p>Websites, streaming tools, and creator services.</p><h2>README</h2><Markdown content={linkifyPlainUrls(readme)} /></main>);
}
