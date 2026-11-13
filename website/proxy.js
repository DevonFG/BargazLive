import { NextResponse } from "next/server";

const CANONICAL_HOSTS = {
  "www.bargaz.app": "bargaz.app",
  "www.randomwolf08.com": "randomwolf08.com",
};

export function proxy(request) {
  const hostname = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(",")[0].trim().split(":")[0].toLowerCase();
  const canonical = CANONICAL_HOSTS[hostname];

  if (canonical) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${canonical}`);
    return NextResponse.redirect(url, 308);
  }

  const pathname = request.nextUrl.pathname;
  if (pathname === "/endpoints" || pathname.startsWith("/endpoints/")) {const url = request.nextUrl.clone(); url.pathname = "/status" + pathname.slice("/endpoints".length); return NextResponse.redirect(url, 308);}
  if (pathname === "/endpoints" || pathname.startsWith("/endpoints/")) {const url = request.nextUrl.clone(); url.pathname = "/status" + pathname.slice("/endpoints".length); 
  return NextResponse.redirect(url, 308);}
  if (pathname.startsWith("/api/appearance")) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-bargaz-hostname", hostname);
  const options = {request: { headers: requestHeaders }};

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname.startsWith("/logos/") || pathname === "/favicon.ico") {
    return NextResponse.next(options);
  }

  const routes = {
    "bot.bargaz.app": "/bot",
    "live.bargaz.app": "/live",
    "randomwolf08.com": "/randomwolf08",
  };

  const prefix = routes[hostname];

  if (!prefix) {
    return NextResponse.next(options);
  }

  if (pathname === prefix || pathname.startsWith(prefix + "/")) {
    return NextResponse.next(options);
  }

  const url = new URL(pathname + request.nextUrl.search, "http://127.0.0.1:3100");
  url.pathname = prefix + (pathname === "/" ? "" : pathname);
  return NextResponse.rewrite(url, options);
}
