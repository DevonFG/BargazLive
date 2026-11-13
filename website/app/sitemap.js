import { headers } from "next/headers";

const SITE_PATHS = {
  "bargaz.app": ["/", "/bot", "/live", "/contact", "/legal", "/privacy", "/terms", "/status"],
  "bot.bargaz.app": ["/", "/changelog"],
  "live.bargaz.app": ["/", "/changelog"],
  "randomwolf08.com": ["/", "/about"],
};

export default async function sitemap() {
  const h = await headers();
  const hostname = (h.get("x-bargaz-hostname") || h.get("x-forwarded-host") || h.get("host") || "").split(",")[0].trim().split(":")[0].toLowerCase();
  const host = SITE_PATHS[hostname] ? hostname : "bargaz.app";
  const lastModified = new Date();

  return SITE_PATHS[host].map((path) => ({
    url: `https://${host}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
