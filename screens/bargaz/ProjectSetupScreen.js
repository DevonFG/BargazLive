import Link from "next/link";
import { notFound } from "next/navigation";

const DISCORD_URL = "https://discord.gg/PvYFVshGrZ";

const SETUP_GUIDES = {
  bot: {
    name: "BargazBot™",
    intro:
      "Get BargazBot™ up and running in your Discord server in a few minutes. Server owners and administrators have full configuration access by default.",
    steps: [
      {
        title: "Invite BargazBot to your server",
        details:
          "Use the official BargazBot invite link on Top.gg or Discord to add the bot to your server with the required messaging and slash command permissions.",
      },
      {
        title: "Configure channels & permissions",
        details:
          "Set your destination channels for announcements, welcome/goodbye messages, server logs, status alerts, and project updates. Optionally grant command access to trusted moderator roles or users.",
      },
      {
        title: "Allocate notification capacity (/entitlement)",
        details:
          "Run /entitlement in your server to allocate creator notification capacity before configuring subscriptions (YouTube, Twitch, and Kick currently support unlimited capacity).",
      },
      {
        title: "Add creator notifications (/notification)",
        details:
          "Use /notification to subscribe to YouTube, Twitch, or Kick channels, choose the destination channel, set custom nicknames, and customize announcement messages.",
      },
    ],
    footerLinks: [
      { label: "View all commands", href: "/commands" },
      { label: "Explore features", href: "/features" },
      { label: "Read full README", href: "/readme" },
    ],
  },
  live: {
    name: "BargazLive™",
    intro:
      "BargazLive™ runs the Next.js multi-domain web application for Bargaz.app and RandomWolf08.com alongside upcoming livestreaming creator tools.",
    steps: [
      {
        title: "Directory & repository layout",
        details:
          "BargazLive runs inside the Bargaz ecosystem layout alongside Bargaz Base and BargazBot, keeping private environment files, credentials, and saved appearance records outside Git.",
      },
      {
        title: "Install dependencies & build",
        details:
          "Run npm ci and npm run build from the BargazLive repository root to compile the Next.js application and inject the package version.",
      },
      {
        title: "Configure environment overrides",
        details:
          "Set optional runtime variables in .env.local (such as BARGAZLIVE_DATA_DIR for appearance storage and BARGAZ_HEALTH_URL for the local health service).",
      },
      {
        title: "Run under PM2 & Cloudflare Tunnel",
        details:
          "Start the production server on 127.0.0.1:3100 via ecosystem.config.cjs under PM2, and route public domain and subdomain traffic through Cloudflare Tunnel.",
      },
    ],
    footerLinks: [
      { label: "Read full README", href: "/readme" },
      { label: "View changelog", href: "/changelog" },
    ],
  },
};

export default function ProjectSetupScreen({ project }) {
  const guide = SETUP_GUIDES[project];
  if (!guide) notFound();

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>{guide.name} setup guide</h1>
        <p>{guide.intro}</p>
        <div className="hero-actions">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            Get help on Discord
          </a>
        </div>
      </section>

      <section>
        <h2>Steps</h2>
        <div className="card-grid">
          {guide.steps.map((step, index) => (
            <article className="card" key={step.title}>
              <span className="badge">Step {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Additional resources</h2>
        <div className="link-grid">
          {guide.footerLinks.map((link) => (
            <article className="link-card" key={link.href}>
              <h3>
                <Link href={link.href}>{link.label}</Link>
              </h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}