import Link from "next/link";
import { getBargazFile } from "../../other/github-files.js";
import Markdown from "../../components/shared/markdown";

export const metadata = {
  title: "Legal | Bargaz",
  description: "Licenses, terms, and privacy information for Bargaz and RandomWolf08.",
};

export default async function LegalPage() {
  let content;

  try {
    content = await getBargazFile("legal/licenses.md");
  } catch (error) {
    console.error("Failed to load Licenses:", error);
    content = "Licenses temporarily unavailable.";
  }

  return (
    <main>
      <Markdown content={content} />
      <h2>Privacy and Terms</h2>
      <ul>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms of Service</Link></li>
      </ul>
    </main>
  );
}
