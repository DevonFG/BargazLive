import Link from "next/link";
import { notFound } from "next/navigation";

const PROJECT_FEATURES = {
  bot: {
    name: "BargazBot",
    intro:
      "BargazBot is a multipurpose Discord bot designed to help livestreamers, content creators, and community moderators automate announcements and manage servers.",
    sections: [
      {
        title: "Creator Notifications",
        description:
          "Keep your Discord community updated automatically whenever creators go live or publish new content.",
        items: [
          "Multi-platform support for YouTube, Twitch, and Kick.",
          "Unlimited notification capacity across all three supported platforms.",
          "Configurable destination channels, custom creator nicknames, and personalized announcement messages.",
          "Duplicate-post tracking to prevent repeat alerts.",
        ],
      },
      {
        title: "Server Configuration & Permissions",
        description:
          "Fine-grained control over where messages go and who can configure the bot in your server.",
        items: [
          "Dedicated channel routing for announcements, welcome/goodbye messages, server logs, status alerts, and project updates.",
          "Role-based and user-specific command permissions managed by server owners and administrators.",
          "Command and configuration change logging for server transparency.",
        ],
      },
      {
        title: "Privacy & Data Controls",
        description:
          "Built with minimal data storage and straightforward cleanup tools.",
        items: [
          "On-demand data removal via the /data delete command.",
          "Automatic daily cleanup of server records after BargazBot leaves a server.",
          "No storage of Discord message contents, email addresses, or payment details.",
        ],
      },
    ],
    actions: [
      { label: "View Setup Guide", href: "/setup" },
      { label: "Browse Commands", href: "/commands" },
    ],
  },
  live: {
    name: "BargazLive",
    intro:
      "BargazLive provides the web infrastructure for the Bargaz ecosystem alongside tools and services built for livestreamers and content creators.",
    sections: [
      {
        title: "Multi-Domain Web Platform",
        description:
          "Powers the websites and subdomains across Bargaz.app and RandomWolf08.com from a unified Next.js architecture.",
        items: [
          "Hosts Bargaz.app, BargazBot, BargazLive, Bargaz Base, Legal hubs, and RandomWolf08.com portfolios.",
          "Live repository documentation sync for README and Changelog pages.",
          "Integrated host status pages and raw JSON endpoint proxies.",
        ],
      },
      {
        title: "Synced Appearance & Accessibility",
        description:
          "Customizable display preferences that follow visitors across Bargaz and RandomWolf08 sites.",
        items: [
          "Light and dark theme support with automatic system preference detection.",
          "High-contrast mode and colorblind-friendly palette options.",
          "Account-free cross-site preference syncing via anonymous random IDs.",
        ],
      },
      {
        title: "Livestreaming Tools (In Development)",
        description:
          "Upcoming creator utilities planned for future BargazLive releases.",
        items: [
          "Multi-platform livestreaming chatbot supporting multiple streaming services.",
          "Creator dashboard and stream-focused community integrations.",
        ],
      },
    ],
    actions: [
      { label: "View Setup & Self-Hosting", href: "/setup" },
      { label: "Latest Updates", href: "/updates" },
    ],
  },
};

export default function ProjectFeaturesScreen({ project }) {
  const data = PROJECT_FEATURES[project];
  if (!data) notFound();

  return (
    <main className="page-container">
      <h1>{data.name} Features</h1>
      <p>{data.intro}</p>

      {data.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <section>
        <h2>Next Steps</h2>
        <ul>
          {data.actions.map((action) => (
            <li key={action.href}>
              <Link href={action.href}>{action.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/readme">Read Full README</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
