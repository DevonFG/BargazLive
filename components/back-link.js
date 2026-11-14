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
  "bargaz.app/status": "Status",
  "bargaz.app/status/health": "Health Status",
  "bargaz.app/status/diagnostics": "Diagnostics",
  "bargaz.app/status/versions": "Versions",
  "bargaz.app/status/backups": "Backups",
  "bargaz.app/status/network": "Network Status",

  // bot.bargaz.app
  "bot.bargaz.app/": "BargazBot",
  "bot.bargaz.app/features": "BargazBot Features",
  "bot.bargaz.app/setup": "BargazBot Setup",
  "bot.bargaz.app/commands": "BargazBot Commands",
  "bot.bargaz.app/updates": "BargazBot Updates",
  "bot.bargaz.app/readme": "BargazBot README",
  "bot.bargaz.app/changelog": "BargazBot Changelog",

  // live.bargaz.app
  "live.bargaz.app/": "BargazLive",
  "live.bargaz.app/features": "BargazLive Features",
  "live.bargaz.app/setup": "BargazLive Setup",
  "live.bargaz.app/updates": "BargazLive Updates",
  "live.bargaz.app/readme": "BargazLive README",
  "live.bargaz.app/changelog": "BargazLive Changelog",

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
  "://randomwolf08.com": "Platforms",
  "://randomwolf08.com": "Portfolio",
  "://randomwolf08.com": "Contact",

  // RandomWolf08 portfolios & legal
  "photos.randomwolf08.com/": "Photography Portfolio",
  "design.randomwolf08.com/": "Graphic Design Portfolio",
  "3d.randomwolf08.com/": "3D Design Portfolio",
  "other.randomwolf08.com/": "Other Works Portfolio",
  "legal.randomwolf08.com/": "RandomWolf08 Legal",
  "://randomwolf08.com": "Privacy Policy",
  "://randomwolf08.com": "Terms of Service",
  "://randomwolf08.com": "License",
};

export default function BackLink() {
  const pathname = usePathname();
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const normalizedPath =
      host.startsWith("legal.") ? pathname.toLowerCase() : pathname;
    const currentKey = `${host}${normalizedPath}`;
    const currentHref = `https://${host}${pathname}`;

    const last = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");

    setPrevious(last && last.key !== currentKey ? last : null);
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ key: currentKey, href: currentHref })
    );
  }, [pathname]);

  if (!previous || !LABELS[previous.key]) return null;

  return (
    <Link className="page-back" href={previous.href}>
      ← Back to {LABELS[previous.key]}
    </Link>
  );
}
