import { getBargazBotFile } from "../../bargazbot.js";
export const dynamic = "force-dynamic";
export default async function BotPage() {
  let readme;
  try {readme = await getBargazBotFile("README.md");} catch (error) {console.error("Failed to load BargazBot README:", error); readme = "Documentation temporarily unavailable.";}
  return(
    <main>
      <h1>BargazBot</h1>
      <p>Discord notifications and community management.</p>
      <h2>GitHub README</h2>
      <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
        {readme}
      </pre>
    </main>
  );
}
