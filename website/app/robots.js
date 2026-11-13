import { headers } from "next/headers";

const HOSTS = ["bargaz.app", "bot.bargaz.app", "live.bargaz.app", "randomwolf08.com"];

export default async function robots() {
  const h = await headers();
  const hostname = (h.get("x-bargaz-hostname") || h.get("x-forwarded-host") || h.get("host") || "").split(",")[0].trim().split(":")[0].toLowerCase();
  const host = HOSTS.includes(hostname) ? hostname : "bargaz.app";

  return {
    rules: {userAgent: "*", allow: "/"},
    sitemap: `https://${host}/sitemap.xml`,
  };
}
