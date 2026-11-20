"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bargaz-last-page";

const LABELS = {
  "bargaz.app": {
    "/": "Bargaz™",
    "/updates": "Updates",
    "/about": "About",
    "/feedback": "Feedback",
    "/contact": "Contact",
    "/links": "Links",
    "/status": "Status",
    "/status/health": "Health",
    "/status/diagnostics": "Diagnostics",
    "/status/versions": "Versions",
    "/status/backups": "Backups",
    "/status/network": "Network",
  },
  "bot.bargaz.app": {
    "/": "BargazBot™",
    "/features": "Features",
    "/setup": "Setup",
    "/commands": "Commands",
    "/updates": "Updates",
    "/readme": "README",
    "/changelog": "Changelog",
  },
  "live.bargaz.app": {
    "/": "BargazLive™",
    "/features": "Features",
    "/setup": "Setup",
    "/updates": "Updates",
    "/readme": "README",
    "/changelog": "Changelog",
  },
  "base.bargaz.app": {
    "/": "Bargaz Base",
    "/updates": "Updates",
    "/readme": "README",
    "/changelog": "Changelog",
  },
  "legal.bargaz.app": {
    "/": "Legal",
    "/privacy": "Privacy Policy",
    "/terms": "Terms of Service",
    "/licensing": "Licensing",
    "/licensing/bargaz-code-product-license-v1.0": "Code & Product License",
    "/licensing/bargaz-logo-license-v1.0": "Logo License",
    "/trademarks": "Trademarks",
  },
  "randomwolf08.com": {
    "/": "RandomWolf08",
    "/platforms": "Platforms",
    "/portfolio": "Portfolio",
    "/contact": "Contact",
  },
  "photos.randomwolf08.com": { "/": "Photography" },
  "design.randomwolf08.com": { "/": "Graphic Design" },
  "3d.randomwolf08.com": { "/": "3D Design" },
  "other.randomwolf08.com": { "/": "Other Works" },
  "legal.randomwolf08.com": {
    "/": "Legal",
    "/privacy": "Privacy Policy",
    "/terms": "Terms of Service",
    "/license": "License",
  },
};

const HOST_FALLBACKS = {
  "photos.randomwolf08.com": "Photograph",
  "design.randomwolf08.com": "Design",
  "3d.randomwolf08.com": "3D Work",
  "other.randomwolf08.com": "Work",
};

function normalizePath(path) {
  const clean = path.replace(/\/+$/, "");
  return clean || "/";
}

function labelFor(host, path) {
  const normalized = normalizePath(path);
  if (LABELS[host]?.[normalized]) return LABELS[host][normalized];

  const segment = normalized.split("/").filter(Boolean).pop();
  if (segment) {
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
  }
  return HOST_FALLBACKS[host] || "Page";
}

export default function BackLink() {
  const pathname = usePathname();
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const path = window.location.pathname;
    const normalized = normalizePath(path);

    if (normalized.endsWith("/raw")) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ key: `${host}${normalized}`, href: window.location.href })
      );
      setPrevious(null);
      return;
    }

    const currentKey = `${host}${normalized}`;
    const currentHref = window.location.href;
    const last = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");

    setPrevious(
      last && last.key !== currentKey
        ? { ...last, label: labelFor(last.host || host, last.path || "/") }
        : null
    );

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ key: currentKey, href: currentHref, host, path: normalized })
    );
  }, [pathname]);

  if (!previous) return null;

  return (
    <Link className="page-back" href={previous.href}>
      ← Back to {previous.label}
    </Link>
  );
}