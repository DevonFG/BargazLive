import { readFileSync } from "node:fs";
import path from "node:path";
function readVersion() {
  const candidates = [path.join(process.cwd(), "package.json"), path.join(process.cwd(), "..", "package.json"),];
  for (const candidate of candidates) {try {const data = JSON.parse(readFileSync(candidate, "utf8")); if (data.name === "bargazlive" && data.version) return data.version;} catch {}} return "";
}
const nextConfig = {env: {NEXT_PUBLIC_SITE_VERSION: readVersion(),},};
export default nextConfig;