import Link from "next/link";
import { headers } from "next/headers";

const SITE_VERSION = process.env.NEXT_PUBLIC_SITE_VERSION || null;
const COPYRIGHT_HOLDER = "Devon Finney-Gaitan";

export default async function Footer() {
  const year = new Date().getFullYear();
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

  const isRandomWolf =
    hostname === "randomwolf08.com" || hostname.endsWith(".randomwolf08.com");
  const legalBase = isRandomWolf
    ? "https://legal.randomwolf08.com"
    : "https://legal.bargaz.app";

  return (
    <footer className="site-footer">
      <nav className="footer-links" aria-label="Footer navigation">
        <div className="footer-column">
          <Link href="https://bargaz.app">Bargaz.app</Link>
          <Link href="https://bot.bargaz.app">BargazBot</Link>
          <Link href="https://live.bargaz.app">BargazLive</Link>
          <Link href="https://base.bargaz.app">Bargaz Base</Link>
        </div>

        <div className="footer-column">
          <Link href="https://randomwolf08.com">RandomWolf08.com</Link>
          <Link href="https://randomwolf08.com">Platforms</Link>
          <Link href="https://randomwolf08.com">Portfolio</Link>
          <Link href="https://linktr.ee/randomwolf08">Linktree</Link>
        </div>

        <div className="footer-column">
          <Link href={isRandomWolf ? "https://randomwolf08.com" : "https://bargaz.app/contact"}>
            Contact Us
          </Link>
          {!isRandomWolf && <Link href="https://bargaz.app">About</Link>}
          {!isRandomWolf && <Link href="https://bargaz.app">Feedback</Link>}
          <Link href={legalBase}>Legal</Link>
          <Link href={`${legalBase}/privacy`}>Privacy Policy</Link>
          <Link href={`${legalBase}/terms`}>Terms of Service</Link>
        </div>
      </nav>

      <div className="footer-copyright">
        <p>© {year} {COPYRIGHT_HOLDER}. All rights reserved for Bargaz.app and RandomWolf08.com.</p>
        {SITE_VERSION && (<p className="footer-version">Version {SITE_VERSION}</p>)}
        <p>
          The website source code is governed by a custom license.{" "}
          <Link href={isRandomWolf ? "https://randomwolf08.com" : "https://bargaz.app"}>
            View Legal
          </Link>{" "}
          for details.
        </p>
      </div>
    </footer>
  );
}
