import { headers } from "next/headers";
import Header from "../components/shared/header";
import SiteControls from "../components/shared/site-controls";
import "./globals.css";
import Footer from "../components/shared/footer";
export const metadata = {title: "Bargaz", description: "Bargaz software, services, and projects",};
export async function generateMetadata() {
  const h = await headers();
  const hostname = (h.get("x-bargaz-hostname") || h.get("x-forwarded-host") || h.get("host") || "").split(",")[0].trim().split(":")[0].toLowerCase();
  const isRandomWolf = hostname === "randomwolf08.com" || hostname === "www.randomwolf08.com";
  const favicon = isRandomWolf ? "/logos/randomwolf08-logo.png" : "/logos/bargaz-logo.png";
  return {title: isRandomWolf ? "RandomWolf08" : "Bargaz", icons: {icon: [{url: favicon, type: "image/png",},], shortcut: favicon,},};
}


export default function RootLayout({ children }) {return (
<html lang="en" suppressHydrationWarning>
  <head>
    <script
      dangerouslySetInnerHTML={{__html: `(function () {try {
        var root = document.documentElement;
        var theme = localStorage.getItem("bargaz-theme");
        var contrast = localStorage.getItem("bargaz-high-contrast");
        var colorblind = localStorage.getItem("bargaz-colorblind");

        if (theme !== "light" && theme !== "dark") {theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";}
        root.dataset.theme = theme;
        root.dataset.contrast = contrast === "true" ? "high" : "normal";
        root.dataset.colorblind = colorblind === "true" ? "on" : "off";
      } catch (error) { /*Fall back to the browser's preferred theme*/ }})();`,}}
    />
  </head>
  <body>
    <Header /><SiteControls /><div className="site-content">{children}</div>
  </body><Footer /></html>);}
