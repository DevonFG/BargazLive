import { NextResponse } from "next/server";
export function proxy(request) {
  const hostname = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const pathname = request.nextUrl.pathname;

  // Keep Next.js assets and API requests unchanged.
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname === "/favicon.ico") {return NextResponse.next();}

  // Route each subdomain to its corresponding page.
  const routes = {"bot.bargaz.app": "/bot","live.bargaz.app": "/live",};
  const prefix = routes[hostname];
  if (prefix) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search,"http://127.0.0.1:3100");
    // Avoid adding the prefix twice.
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {return NextResponse.next();}
    url.pathname = prefix + (pathname === "/" ? "" : pathname);
    return NextResponse.rewrite(url);
  } return NextResponse.next();
}
