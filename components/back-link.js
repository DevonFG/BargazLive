"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bargaz-last-page";

const LABELS = {
  // bargaz.app
  "bargaz.app/": "Bargaz Home",
  "bargaz.app/updates": "Bargaz Updates",
  "bargaz.app/about": "About",
  "bargaz.app/feedback": "Feedback",
  "bargaz.app/contact": "Contact Us",
  "bargaz.app/links": "Links",
  "bargaz.app/status": "Status",
  "bargaz.app/status/health": "Health Status",
  "bargaz.app/status/diagnostics": "Diagnostics",
  "bargaz.app/status/versions": "Versions",
  "bargaz.app/status/backups": "Backups",
  "bargaz.app/status/network": "Network Status",

  // bot.bargaz.app
  "bot.bargaz.app/": "BargazBot™",
  "bot.bargaz.app/commands": "BargazBot™ Commands",
  "bot.bargaz.app/updates": "BargazBot™ Updates",
  "bot.bargaz.app/readme": "BargazBot™ README",
  "bot.bargaz.app/changelog": "BargazBot™ Changelog",

  // live.bargaz.app
  "live.bargaz.app/": "BargazLive™",
  "live.bargaz.app/updates": "BargazLive™ Updates",
  "live.bargaz.app/readme": "BargazLive™ README",
  "live.bargaz.app/changelog": "BargazLive™ Changelog",

  // base.bargaz.app
  "base.bargaz.app/": "Bargaz Base",
  "base.bargaz.app/updates": "Bargaz Base Updates",
  "base.bargaz.app/readme": "Bargaz Base README",
  "base.bargaz.app/changelog": "Bargaz Base Changelog",

  // legal.bargaz.app
  "legal.bargaz.app/": "Bargaz Legal",
  "legal.bargaz.app/privacy": "Privacy Policy",
  "legal.bargaz.app/terms": "Terms of Service",
  "legal.bargaz.app/trademarks": "Trademarks",
  "legal.bargaz.app/licensing": "Licensing",
  "legal.bargaz.app/licensing/bargaz-code-product-license-v1.0": "Code & Product License",
  "legal.bargaz.app/licensing/bargaz-logo-license-v1.0": "Logo License",

  // randomwolf08.com
  "randomwolf08.com/": "RandomWolf08",
  "randomwolf08.com/links": "Links",
  "randomwolf08.com/portfolio": "Portfolio",
  "randomwolf08.com/contact": "Contact",

  // RandomWolf08 portfolios & legal
  "photos.randomwolf08.com/": "Photography Portfolio",
  "design.randomwolf08.com/": "Graphic Design Portfolio",
  "3d.randomwolf08.com/": "3D Design Portfolio",
  "other.randomwolf08.com/": "Other Works Portfolio",
  "legal.randomwolf08.com/": "RandomWolf08 Legal",
  "legal.randomwolf08.com/privacy": "Privacy Policy",
  "legal.randomwolf08.com/terms": "Terms of Service",
  "legal.randomwolf08.com/license": "License",
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