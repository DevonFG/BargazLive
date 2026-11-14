import Link from "next/link";
import { notFound } from "next/navigation";

const SETUP_GUIDES = {
  bot: {
    name: "BargazBot",
    intro:
      "Get BargazBot up and running in your Discord server in a few minutes. Server owners and administrators have full configuration access by default.",
    steps: [
      {
        title: "1. Invite BargazBot to Your Server",
        details:
          "Use the official BargazBot invite link on Top.gg or Discord to add the bot to your server with the required messaging and slash command permissions.",
      },
      {
        title: "2. Configure Channels & Permissions",
        details:
          "Set your destination channels for announcements, welcome/goodbye messages, server logs, status alerts, and project updates. Optionally grant command access to trusted moderator roles or users.",
      },
      {
        title: "3. Allocate Notification Capacity (/entitlement)",
        details:
          "Run /entitlement in your server to allocate creator notification capacity before configuring subscriptions (YouTube, Twitch, and Kick currently support unlimited capacity).",
      },
      {
        title: "4. Add Creator Notifications (/notification)",
        details:
          "Use /notification to subscribe to YouTube, Twitch, or Kick channels, choose the destination channel, set custom nicknames, and customize announcement messages.",
      },
    ],
    footerLinks: [
      { label: "View All Commands", href: "/commands" },
      { label: "Explore Features", href: "/features" },
      { label: "Read Full README", href: "/readme" },
    ],
  },
  live: {
    name: "BargazLive",
    intro:
      "BargazLive runs the Next.js multi-domain web application for Bargaz.app and RandomWolf08.com alongside upcoming livestreaming creator tools.",
    steps: [
      {
        title: "1. Directory & Repository Layout",
        details:
          "BargazLive runs inside the Bargaz ecosystem layout alongside Bargaz Base and BargazBot, keeping private environment files, credentials, and saved appearance records outside Git.",
      },
      {
        title: "2. Install Dependencies & Build",
        details:
          "Run npm ci and npm run build from the BargazLive repository root to compile the Next.js application and inject the package version.",
      },
      {
        title: "3. Configure Environment Overrides",
        details:
          "Set optional runtime variables in .env.local (such as BARGAZLIVE_DATA_DIR for appearance storage and BARGAZ_HEALTH_URL for the local health service).",
      },
      {
        title: "4. Run Under PM2 & Cloudflare Tunnel",
        details:
          "Start the production server on 127.0.0.1:3100 via ecosystem.config.cjs under PM2, and route public domain and subdomain traffic through Cloudflare Tunnel.",
      },
    ],
    footerLinks: [
      { label: "Explore Features", href: "/features" },
      { label: "Read Full README", href: "/readme" },
      { label: "View Changelog", href: "/changelog" },
    ],
  },
};

export default function ProjectSetupScreen({ project }) {
  const guide = SETUP_GUIDES[project];
  if (!guide) notFound();

  return (
    <main className="page-container">
      <h1>{guide.name} Setup Guide</h1>
      <p>{guide.intro}</p>

      {guide.steps.map((step) => (
        <section key={step.title}>
          <h2>{step.title}</h2>
          <p>{step.details}</p>
        </section>
      ))}

      <section>
        <h2>Additional Resources</h2>
        <ul>
          {guide.footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Need Help? Join The Wolf Den Discord Server
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
