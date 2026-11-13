"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bargaz-last-page";

const LABELS = {
  "/": "Home",
  "/bot": "BargazBot",
  "/bot/changelog": "BargazBot Changelog",
  "/live": "BargazLive",
  "/live/changelog": "BargazLive Changelog",
  "/contact": "Contact Us",
  "/legal": "Legal",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/status": "Status",
  "/randomwolf08": "RandomWolf08",
  "/randomwolf08/about": "About Me",
};

export default function BackLink() {
  const pathname = usePathname();
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    const last = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");

    setPrevious(last && last.path !== pathname ? last : null);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ path: pathname }));
  }, [pathname]);

  if (pathname === "/" || !previous || !LABELS[previous.path]) return null;

  return (
    <Link className="page-back" href={previous.path}>
      ← Back to {LABELS[previous.path]}
    </Link>
  );
}
