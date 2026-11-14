import Link from "next/link";
import { notFound } from "next/navigation";

const PROJECTS = {
  bot: {
    name: "BargazBot",
    tagline: "Discord notifications and community management.",
    description:
      "BargazBot is a customizable, multipurpose Discord bot built to support content creators and their communities with automated stream/upload alerts, channel routing, and granular permission controls.",
    highlights: [
      "Automated creator notifications for YouTube, Twitch, and Kick.",
      "Custom destination channels, creator nicknames, and announcement messages.",
      "Role- and user-based command permissions with server audit logging.",
      "Built-in privacy controls with /data delete and automatic server cleanup.",
    ],
    quickLinks: [
      { label: "Features", href: "/features" },
      { label: "Setup Guide", href: "/setup" },
      { label: "Commands", href: "/commands" },
      { label: "Updates", href: "/updates" },
      { label: "README", href: "/readme" },
      { label: "Changelog", href: "/changelog" },
    ],
    externalLinks: [
      {
        label: "BargazBot on Top.gg",
        url: "https://top.gg",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com",
      },
      {
        label: "The Wolf Den Discord Server",
        url: "https://discord.gg",
      },
    ],
  },
  live: {
    name: "BargazLive",
    tagline: "Websites, streaming tools, and creator services.",
    description:
      "BargazLive powers the multi-domain web infrastructure for Bargaz.app and RandomWolf08.com while serving as the foundation for upcoming livestreaming tools and multi-platform creator utilities.",
    highlights: [
      "Unified multi-domain Next.js web platform across Bargaz.app and RandomWolf08.com.",
      "Cross-site synced appearance settings (light/dark theme, high contrast, colorblind modes).",
      "Live host health reporting and repository documentation integration.",
      "Planned multi-platform livestreaming chatbot and creator integrations.",
    ],
    quickLinks: [
      { label: "Features", href: "/features" },
      { label: "Setup & Hosting", href: "/setup" },
      { label: "Updates", href: "/updates" },
      { label: "README", href: "/readme" },
      { label: "Changelog", href: "/changelog" },
    ],
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com",
      },
      {
        label: "The Wolf Den Discord Server",
        url: "https://discord.gg",
      },
    ],
  },
  base: {
    name: "Bargaz Base",
    tagline: "Shared core infrastructure, monitoring, and host management.",
    description:
      "Bargaz Base provides the shared backend utilities, health diagnostics, database backup automation, and graceful shutdown coordination used across BargazBot, BargazLive, and the Raspberry Pi host.",
    highlights: [
      "Centralized logging, system health checks, and diagnostics endpoints.",
      "Automated hourly, daily, and weekly SQLite database backup management.",
      "Coordinated process startup and graceful shutdown hooks for PM2 services.",
      "Shared core dependency powering BargazBot and BargazLive.",
    ],
    quickLinks: [
      { label: "Updates", href: "/updates" },
      { label: "README", href: "/readme" },
      { label: "Changelog", href: "/changelog" },
    ],
    externalLinks: [
      {
        label: "Live Host Status",
        url: "https://bargaz.app",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com",
      },
    ],
  },
};

export default function ProjectHomeScreen({ project }) {
  const data = PROJECTS[project];
  if (!data) notFound();

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>{data.name}</h1>
        <p className="hero-subtitle">{data.tagline}</p>
        <p>{data.description}</p>
      </section>

      <section>
        <h2>Key Highlights</h2>
        <ul>
          {data.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Documentation &amp; Pages</h2>
        <ul>
          {data.quickLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Related Links</h2>
        <ul>
          {data.externalLinks.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
