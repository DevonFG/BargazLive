import { readFileSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
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
    localDir: path.join(process.cwd(), "..", "BargazBot"),
    fetchRemote: getBargazBotFile,
  },
  live: {
    name: "BargazLive",
    localDir: process.cwd(),
    fetchRemote: getBargazLiveFile,
  },
  base: {
    name: "Bargaz",
    localDir: path.join(process.cwd(), ".."),
    fetchRemote: getBargazFile,
  },
};

const DOC_TYPES = {
  readme: { label: "README", filename: "README.md" },
  changelog: { label: "Changelog", filename: "CHANGELOG.md" },
};

async function loadRepoMarkdown(repo, filename) {
  // 1. Try reading directly from the local Raspberry Pi repository directory
  try {
    return readFileSync(path.join(repo.localDir, filename), "utf8");
  } catch {
    // Fall back to GitHub if local file isn't present
  }

  // 2. Fallback to GitHub raw file fetcher
  try {
    return await repo.fetchRemote(filename);
  } catch {
    return null;
  }
}

export default async function RepoMarkdownScreen({ project, docType }) {
  const repo = REPOS[project];
  const doc = DOC_TYPES[docType];

  if (!repo || !doc) notFound();

  const rawMarkdown = await loadRepoMarkdown(repo, doc.filename);
  const content = rawMarkdown ? linkifyPlainUrls(rawMarkdown) : null;

  return (
    <main className="page-container">
      <h1>
        {repo.name} {doc.label}
      </h1>

      {content ? (
        <Markdown content={content} />
      ) : (
        <p>
          Unable to load {repo.name} {doc.label} right now. Please try again
          later.
        </p>
      )}
    </main>
  );
}
