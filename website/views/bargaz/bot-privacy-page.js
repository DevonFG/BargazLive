import Link from "next/link";
import { getBargazBotFile } from "../../other/github-files.js";
import LegalDocument from "../../components/shared/legal-document";

export default async function BotPrivacyPage() {
  let html;

  try {
    html = await getBargazBotFile("docs/privacy.html");
  } catch (error) {
    console.error("Failed to load BargazBot Privacy Policy:", error);
    html = "<p>Privacy Policy temporarily unavailable.</p>";
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
