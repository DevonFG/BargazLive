import Link        from "next/link";
import { headers } from "next/headers";
export default async function Header() {
  const h                = await headers();
  const hostname         = (h.get("x-bargaz-hostname") || h.get("x-forwarded-host") || h.get("host") || "").split(",")[0].trim().split(":")[0].toLowerCase();
  const isRandomWolf     = hostname === "randomwolf08.com" || hostname === "www.randomwolf08.com";
  const isBot            = hostname === "bot.bargaz.app";
  const isLive           = hostname === "live.bargaz.app";
  const title            = isRandomWolf ? "RandomWolf08" : "Bargaz";
  const bargazNavigation = [
    ["Home",             "https://bargaz.app"],
    ["BargazBot",        "https://bot.bargaz.app"],
    ["BargazLive",       "https://live.bargaz.app"],
    ["Contact Us",       "https://bargaz.app/contact"],
    ["Legal",         "https://bargaz.app/legal"],
    ["Status",           "https://bargaz.app/status"],
    ["About Me",         "https://randomwolf08.com/about"],
    ["RandomWolf08.com", "https://randomwolf08.com"],
  ];
  let navigation = bargazNavigation;
  if (isBot)               {navigation = bargazNavigation.filter(([label]) => label !== "BargazBot");
  } else if (isLive)       {navigation = bargazNavigation.filter(([label]) => label !== "BargazLive");
  } else if (isRandomWolf) {navigation = [
    ["Home",       "https://randomwolf08.com"],
    ["About Me",   "https://randomwolf08.com/about"],
    ["Linktree",   "https://linktr.ee/randomwolf08"],
    ["Contact Us", "https://bargaz.app/contact"],
    ["Legal",   "https://bargaz.app/legal"],
    ["Status",           "https://bargaz.app/status"],
    ["Bargaz.app", "https://bargaz.app"],
  ];}
  let secondaryNavigation = [];
  if (isBot) {secondaryNavigation = [
    ["Changelog",        "https://bot.bargaz.app/changelog"],
    ["Privacy Policy",   "https://bargaz.app/privacy"],
    ["Terms of Service", "https://bargaz.app/terms"],
  ];} else if (isLive) {secondaryNavigation = [["Changelog", "https://live.bargaz.app/changelog"],];}
  return (
    <header className={`site-header ${isRandomWolf ? "site-wolf" : "site-bargaz"}`}>
      <div  className="brand-header">
        <Link href="https://randomwolf08.com" className="brand-logo-link" aria-label="RandomWolf08 homepage">
          <img src="/logos/randomwolf08-logo.png" alt="RandomWolf08 logo" className="brand-logo brand-logo-wolf"/>
        </Link>
        <Link href={isRandomWolf ? "https://randomwolf08.com" : "https://bargaz.app"} className="brand-title">{title}</Link>
        <Link href="https://bargaz.app"       className="brand-logo-link" aria-label="Bargaz homepage">
          <img src="/logos/bargaz-logo.png"       alt="Bargaz logo"       className="brand-logo"/>
        </Link>
      </div>
      <nav className="site-nav" aria-label="Main navigation">{navigation.map(([label, href]) => (<Link key={label + href} href={href}>{label}</Link>))}</nav>
      {secondaryNavigation.length > 0 && (<nav className="site-nav site-nav-secondary" aria-label="Project navigation">{secondaryNavigation.map(([label, href]) => (<Link key={label + href} href={href}>{label}</Link>))}</nav>)}
    </header>
  );
}
