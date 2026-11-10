import Link from "next/link";
import { getBargazBotFile } from "../../other/github-files.js";
import LegalDocument from "../../components/shared/legal-document";

export default async function BotTermsPage() {
  let html;

  try {
    html = await getBargazBotFile("docs/tos.html");
  } catch (error) {
    console.error("Failed to load BargazBot Terms of Service:", error);
    html = "<p>Terms of Service temporarily unavailable.</p>";
  }

  return (
    <main>
      <Link className="page-back" href="https://bot.bargaz.app">
        ← Back to BargazBot
      </Link>
      <LegalDocument html={html} />
    </main>
  );
}
