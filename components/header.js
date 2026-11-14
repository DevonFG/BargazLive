import Link from "next/link";
import { headers } from "next/headers";

export default async function Header() {
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
  const isBot = hostname === "bot.bargaz.app";
  const isLive = hostname === "live.bargaz.app";
  const isBase = hostname === "base.bargaz.app";

  const title = isRandomWolf ? "RandomWolf08" : "Bargaz";

  const bargazNavigation = [
    ["Home", "https://bargaz.app"],
    ["BargazBot", "https://bot.bargaz.app"],
    ["BargazLive", "https://live.bargaz.app"],
    ["Bargaz Base", "https://base.bargaz.app"],
    ["About", "https://bargaz.app"],
    ["Contact Us", "https://bargaz.app/contact"],
    ["Legal", "https://legal.bargaz.app"],
    ["Status", "https://bargaz.app/status"],
    ["RandomWolf08.com", "https://randomwolf08.com"],
  ];

  let navigation = bargazNavigation;

  if (isBot) {
    navigation = bargazNavigation.filter(([label]) => label !== "BargazBot");
  } else if (isLive) {
    navigation = bargazNavigation.filter(([label]) => label !== "BargazLive");
  } else if (isBase) {
    navigation = bargazNavigation.filter(([label]) => label !== "Bargaz Base");
  } else if (isRandomWolf) {
    navigation = [
      ["Home", "https://randomwolf08.com"],
      ["Portfolio", "https://randomwolf08.com"],
      ["Platforms", "https://randomwolf08.com"],
      ["Linktree", "https://linktr.ee/randomwolf08"],
      ["Contact", "https://randomwolf08.com"],
      ["Legal", "https://legal.randomwolf08.com"],
      ["Status", "https://bargaz.app/status"],
      ["Bargaz.app", "https://bargaz.app"],
    ];
  }

  let secondaryNavigation = [];

  if (isBot) {
    secondaryNavigation = [
      ["Features", "https://bargaz.app"],
      ["Setup", "https://bargaz.app"],
      ["Commands", "https://bargaz.app"],
      ["Updates", "https://bargaz.app"],
      ["README", "https://bargaz.app"],
      ["Changelog", "https://bot.bargaz.app/changelog"],
    ];
  } else if (isLive) {
    secondaryNavigation = [
      ["Features", "https://bargaz.app"],
      ["Setup", "https://bargaz.app"],
      ["Updates", "https://bargaz.app"],
      ["README", "https://bargaz.app"],
      ["Changelog", "https://live.bargaz.app/changelog"],
    ];
  } else if (isBase) {
    secondaryNavigation = [
      ["Updates", "https://bargaz.app"],
      ["README", "https://bargaz.app"],
      ["Changelog", "https://base.bargaz.app/changelog"],
    ];
  } else if (isRandomWolf) {
    secondaryNavigation = [
      ["All Works", "https://randomwolf08.com"],
      ["Photos", "https://photos.randomwolf08.com"],
      ["Graphic Design", "https://design.randomwolf08.com"],
      ["3D Design", "https://3d.randomwolf08.com"],
      ["Other Works", "https://other.randomwolf08.com"],
    ];
  }

  return (
    <header className={`site-header ${isRandomWolf ? "site-wolf" : "site-bargaz"}`}>
      <div className="brand-header">
        <Link href="https://randomwolf08.com" className="brand-logo-link" aria-label="RandomWolf08 homepage">
          <img src="/randomwolf08-logo.png" alt="RandomWolf08 logo" className="brand-logo brand-logo-wolf" />
        </Link>
        <Link href={isRandomWolf ? "https://randomwolf08.com" : "https://bargaz.app"} className="brand-title">
          {title}
        </Link>
        <Link href="https://bargaz.app" className="brand-logo-link" aria-label="Bargaz homepage">
          <img src="/bargaz-logo.png" alt="Bargaz logo" className="brand-logo" />
        </Link>
      </div>
      <nav className="site-nav" aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <Link key={label + href} href={href}>{label}</Link>
        ))}
      </nav>
      {secondaryNavigation.length > 0 && (
        <nav className="site-nav site-nav-secondary" aria-label="Project navigation">
          {secondaryNavigation.map(([label, href]) => (
            <Link key={label + href} href={href}>{label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
