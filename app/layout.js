import { headers } from "next/headers";
import Header from "../components/header";
import Footer from "../components/footer";
import BackLink from "../components/back-link";
import SiteControls from "../components/site-controls";
import SidebarToggle from "../components/sidebar-toggle";
import "./globals.css";

const SITE_LABELS = {
  "bargaz.app": "Bargaz",
  "bot.bargaz.app": "BargazBot",
  "live.bargaz.app": "BargazLive",
  "base.bargaz.app": "Bargaz Base",
  "legal.bargaz.app": "Legal",
  "randomwolf08.com": "RandomWolf08",
  "photos.randomwolf08.com": "Photography",
  "design.randomwolf08.com": "Graphic Design",
  "3d.randomwolf08.com": "3D Design",
  "other.randomwolf08.com": "Other Works",
  "legal.randomwolf08.com": "Legal",
};

export async function generateMetadata() {
  const h = await headers();
  const hostname = (h.get("x-bargaz-hostname") || h.get("x-forwarded-host") || h.get("host") || "")
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();
  const pathname = h.get("x-bargaz-pathname") || "/";
  const isRandomWolf = hostname === "randomwolf08.com" || hostname.endsWith(".randomwolf08.com");
  const favicon = isRandomWolf ? "/randomwolf08-logo.png" : "/bargaz-logo.png";
  const origin = "https://" + (hostname || (isRandomWolf ? "randomwolf08.com" : "bargaz.app"));
  return {
    metadataBase: new URL(origin),
    title: isRandomWolf ? "RandomWolf08" : "Bargaz",
    description: "Bargaz software, services, and projects",
    alternates: { canonical: pathname },
    icons: { icon: [{ url: favicon, type: "image/png" }], shortcut: favicon },
  };
}

export default async function RootLayout({ children }) {
  const h = await headers();
  const hostname = (h.get("x-bargaz-hostname") || h.get("x-forwarded-host") || h.get("host") || "")
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: `(function () {try {
        var root = document.documentElement;
        var theme = localStorage.getItem("bargaz-theme");
        var contrast = localStorage.getItem("bargaz-high-contrast");
        var colorblind = localStorage.getItem("bargaz-colorblind");

        if (theme !== "light" && theme !== "dark") {theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";}
        root.dataset.theme = theme;
        root.dataset.contrast = contrast === "true" ? "high" : "normal";
        root.dataset.colorblind = colorblind === "true" ? "on" : "off";
      } catch (error) { /*Fall back to the browser's preferred theme*/ }})();`, }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="app-shell">
          <Header />
          <div className="sidebar-backdrop" aria-hidden="true" />
          <div className="main-area">
            <div className="topbar">
              <SidebarToggle />
              <span className="topbar-title">{SITE_LABELS[hostname] || "Bargaz"}</span>
            </div>
            <div id="main-content" className="site-content">
              <BackLink />
              {children}
            </div>
            <Footer />
          </div>
          <SiteControls />
        </div>
      </body>
    </html>
  );
}