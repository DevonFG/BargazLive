import { NextResponse } from "next/server";
const CANONICAL_HOSTS = {"www.bargaz.app": "bargaz.app", "www.randomwolf08.com": "randomwolf08.com",};
const HOST_MAP = {
  "bargaz.app": "bargaz-main",            "bot.bargaz.app": "bargaz-bot",         "live.bargaz.app": "bargaz-live",
  "base.bargaz.app": "bargaz-base",       "legal.bargaz.app": "bargaz-legal",     "randomwolf08.com": "rw-main",
  "photos.randomwolf08.com": "rw-photos", "design.randomwolf08.com": "rw-design", "3d.randomwolf08.com": "rw-3d",
  "other.randomwolf08.com": "rw-other",   "legal.randomwolf08.com": "rw-legal",
};
export function proxy(request) {
  const rawHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || "bargaz.app";
  const hostname = rawHost.split(",")[0].trim().split(":")[0].toLowerCase();
  // 1. Canonical 308 redirects (www -> apex)
  const canonical = CANONICAL_HOSTS[hostname];
  if (canonical) {const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${canonical}`); return NextResponse.redirect(url, 308);}
  const pathname = request.nextUrl.pathname;
  // 2. Legacy path 308 redirects
  if (hostname === "bargaz.app" && (pathname === "/endpoints" || pathname.startsWith("/endpoints/"))) {const url = request.nextUrl.clone(); url.pathname = "/status" + pathname.slice("/endpoints".length); return NextResponse.redirect(url, 308);}
  if (hostname === "bargaz.app" && pathname === "/versions/raw")   {return NextResponse.redirect(new URL("/status/versions/raw", "https://bargaz.app"), 308);}
  if (pathname === "/license" || pathname.startsWith("/license/")) {
    const legalHost = hostname.endsWith("randomwolf08.com") ? "legal.randomwolf08.com" : "legal.bargaz.app";
    const subPath = pathname.slice("/license".length) || "/";
    return NextResponse.redirect(new URL(subPath + request.nextUrl.search, `https://${legalHost}`), 308);
  }
  // 3. Attach clean headers for layout.js, header.js, robots.js, and sitemap.js
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-bargaz-hostname", hostname);
  requestHeaders.set("x-bargaz-pathname", pathname);
  const options = { request: { headers: requestHeaders } };
  // 4. Let static assets, APIs, robots.txt, and sitemap.xml pass through
  if (
    pathname.startsWith("/_next/")        || pathname.startsWith("/api/") || pathname === "/bargaz-logo.png" ||
    pathname === "/randomwolf08-logo.png" || pathname === "/favicon.ico"  || pathname === "/robots.txt"      || pathname === "/sitemap.xml"
  ) {return NextResponse.next(options);}
  // 5. Rewrite domain/subdomain to its corresponding folder in app/
  const targetFolder = HOST_MAP[hostname] || "bargaz-main";
  const url = request.nextUrl.clone();
  if (targetFolder.endsWith("-legal")) {url.pathname = url.pathname.toLowerCase();}
  url.pathname = `/${targetFolder}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url, options);
}
export const config = {matcher: ["/((?!_next/static|_next/image|.*\\.png$|favicon.ico).*)"],};