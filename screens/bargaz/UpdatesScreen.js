import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import {
  getBargazBotFile,
  getBargazLiveFile,
  getBargazFile,
} from "../../github-files";
import { linkifyPlainUrls } from "../../markdown-links";
import Markdown from "../../components/markdown";

const REPOS = {
  bot: {
    name: "BargazBot",
    url: "https://bargaz.app",
    localDir: path.join(process.cwd(), "..", "BargazBot"),
    fetchRemote: getBargazBotFile,
  },
  live: {
    name: "BargazLive",
    url: "https://bargaz.app",
    localDir: process.cwd(),
    fetchRemote: getBargazLiveFile,
  },
  base: {
    name: "Bargaz Base",
    url: "https://bargaz.app",
    localDir: path.join(process.cwd(), ".."),
    fetchRemote: getBargazFile,
  },
};

async function loadChangelog(repo) {
  try {
    return readFileSync(path.join(repo.localDir, "CHANGELOG.md"), "utf8");
  } catch {
    // Fallback to GitHub if local file isn't present
  }

  try {
    return await repo.fetchRemote("CHANGELOG.md");
  } catch {
    return null;
  }
}

export default async function UpdatesScreen({ project = "all" }) {
  const isEcosystemView = project === "all";
  const targetKeys = isEcosystemView ? ["bot", "live", "base"] : [project];

  const entries = await Promise.all(
    targetKeys.map(async (key) => {
      const repo = REPOS[key];
      if (!repo) return null;
      const raw = await loadChangelog(repo);
      return {
        key,
        ...repo,
        content: raw ? linkifyPlainUrls(raw) : null,
      };
    })
  );

  const validEntries = entries.filter(Boolean);
  const pageTitle = isEcosystemView
    ? "Bargaz Ecosystem Updates"
    : `${validEntries[0]?.name ?? "Project"} Updates`;

  return (
    <main className="page-container">
      <h1>{pageTitle}</h1>
      <p>
        {isEcosystemView
          ? "Recent releases, feature additions, and infrastructure updates across BargazBot, BargazLive, and Bargaz Base."
          : `Release announcements, feature updates, and version history for ${validEntries[0]?.name}.`}
      </p>

      {validEntries.map((item) => (
        <section key={item.key}>
          {isEcosystemView && (
            <h2>
              <a href={item.url}>{item.name}</a>
            </h2>
          )}

          {item.content ? (
            <Markdown content={item.content} />
          ) : (
            <p>
              No updates are currently available for {item.name}. Check{" "}
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Wolf Den Discord Server
              </a>{" "}
              for live announcements.
            </p>
          )}

          {!isEcosystemView && (
            <p>
              <Link href="/changelog">View Full Changelog</Link>
            </p>
          )}
        </section>
      ))}
    </main>
  );
}
