import { headers } from "next/headers";

const SITE_PATHS = {
  "bargaz.app": [
    "/",
    "/updates",
    "/about",
    "/feedback",
    "/contact",
    "/status",
    "/status/health",
    "/status/diagnostics",
    "/status/versions",
    "/status/backups",
    "/status/network",
  ],
  "bot.bargaz.app": [
    "/",
    "/features",
    "/setup",
    "/commands",
    "/updates",
    "/readme",
    "/changelog",
  ],
  "live.bargaz.app": [
    "/",
    "/features",
    "/setup",
    "/updates",
    "/readme",
    "/changelog",
  ],
  "base.bargaz.app": ["/", "/updates", "/readme", "/changelog"],
  "legal.bargaz.app": [
    "/",
    "/privacy",
    "/terms",
    "/trademarks",
    "/licensing",
    "/licensing/bargaz-code-product-license-v1.0",
    "/licensing/bargaz-logo-license-v1.0",
  ],
  "randomwolf08.com": ["/", "/platforms", "/portfolio", "/contact"],
  "photos.randomwolf08.com": ["/"],
  "design.randomwolf08.com": ["/"],
  "3d.randomwolf08.com": ["/"],
  "other.randomwolf08.com": ["/"],
  "legal.randomwolf08.com": ["/", "/privacy", "/terms", "/license"],
};

export default async function sitemap() {
  const h = await headers();
  const hostname = (
    h.get("x-bargaz-hostname") ||
    h.get("x-forwarded-host") ||
    h.get("host") ||
    ""
  )
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();

  const host = SITE_PATHS[hostname] ? hostname : "bargaz.app";
  const lastModified = new Date();

  return SITE_PATHS[host].map((path) => ({
    url: `https://${host}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
