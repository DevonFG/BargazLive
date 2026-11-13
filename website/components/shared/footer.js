import Link from "next/link";
import { SITE_VERSION } from "../../other/site-version";

const COPYRIGHT_HOLDER = "Devon Finney-Gaitan";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <nav className="footer-links" aria-label="Footer navigation">
        <div className="footer-column">
          <Link href="https://bargaz.app">Bargaz.app</Link>
          <Link href="https://bot.bargaz.app">BargazBot</Link>
          <Link href="https://live.bargaz.app">BargazLive</Link>
        </div>

        <div className="footer-column">
          <Link href="https://randomwolf08.com">RandomWolf08.com</Link>
          <Link href="https://linktr.ee/randomwolf08">Linktree</Link>
        </div>

        <div className="footer-column">
          <Link href="https://bargaz.app/contact">Contact Us</Link>
          <Link href="https://randomwolf08.com/about">About Me</Link>
          <Link href="https://bargaz.app/legal">Legal</Link>
          <Link href="https://bargaz.app/privacy">Privacy Policy</Link>
          <Link href="https://bargaz.app/terms">Terms of Service</Link>
        </div>
      </nav>

      <div className="footer-copyright">
        <p>© {year} {COPYRIGHT_HOLDER}. All rights reserved for Bargaz.app and RandomWolf08.com.</p>
        {SITE_VERSION && (<p className="footer-version">Version {SITE_VERSION}</p>)}
        <p>
          The website source code is governed by a custom license.{" "}
          <Link href="https://bargaz.app/legal">
            View Legal
          </Link>{" "}
          for details.
        </p>
      </div>
    </footer>
  );
}
