
import Link from "next/link";

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
          <Link href="https://bargaz.app/license">Licenses</Link>
        </div>
      </nav>

      <div className="footer-copyright">
        <p>© {year} Devon Finney-Gaitan. All right reserved for Bargaz.app and RandomWolf08.com.</p>
        <p>
          The website source code is governed by a custom license.{" "}
          <Link href="https://bargaz.app/license">
            View Licenses
          </Link>{" "}
          for details.
        </p>
      </div>
    </footer>
  );
}
