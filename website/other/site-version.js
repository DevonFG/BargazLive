import { readFileSync } from "node:fs";
import path from "node:path";

function readVersion() {
  const candidates = [
    path.join(process.cwd(), "package.json"),
    path.join(process.cwd(), "..", "package.json"),
  ];

  for (const candidate of candidates) {
    try {
      const data = JSON.parse(readFileSync(candidate, "utf8"));

      if (data.name === "bargazlive" && data.version) return data.version;
    } catch {
      // Try the next location.
    }
  }

  return null;
}

export const SITE_VERSION = readVersion();
