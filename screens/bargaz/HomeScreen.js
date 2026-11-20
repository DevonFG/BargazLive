import Link from "next/link";

const PROJECTS = [
  {
    name: "BargazBot™",
    href: "https://bot.bargaz.app",
    description:
      "Customizable multipurpose Discord bot with YouTube, Twitch, and Kick creator notifications, server configuration, and community management tools.",
    badge: "Discord bot",
  },
  {
    name: "BargazLive™",
    href: "https://live.bargaz.app",
    description:
      "Website hosting infrastructure for the Bargaz ecosystem and upcoming multi-platform tools for livestreamers.",
    badge: "Web platform",
  },
  {
    name: "Bargaz Base",
    href: "https://base.bargaz.app",
    description:
      "Shared core infrastructure providing host monitoring, diagnostics, database backups, and shutdown coordination.",
    badge: "Core library",
  },
];

const RESOURCES = [
  {
    label: "Host status & diagnostics",
    href: "/status",
    description:
      "Live Raspberry Pi server health, backups, and component versions.",
  },
  {
    label: "Legal & licensing",
    href: "https://legal.bargaz.app",
    description:
      "Privacy Policy, Terms of Service, trademarks, and Bargaz licenses.",
  },
  {
    label: "Feedback & contact",
    href: "/feedback",
    description:
      "Report bugs, suggest features, or reach the team on Discord.",
  },
  {
    label: "RandomWolf08.com",
    href: "https://randomwolf08.com",
    description:
      "Creator profile, photography, graphic design, and 3D portfolios.",
  },
];

export default function BargazHomeScreen() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Welcome to Bargaz™</h1>
        <p>
          Software, tools, and web infrastructure built by Devon Finney-Gaitan
          (RandomWolf08) for livestreamers, content creators, and online
          communities.
        </p>
        <div className="hero-actions">
          <Link href="/updates">Latest updates</Link>
          <Link href="/status">System status</Link>
          <Link href="/about">About Bargaz</Link>
        </div>
      </section>

      <section>
        <h2>Our projects</h2>
        <div className="card-grid">
          {PROJECTS.map((project) => (
            <article className="card" key={project.name}>
              <span className="badge">{project.badge}</span>
              <h3>
                <Link href={project.href}>{project.name}</Link>
              </h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Resources &amp; support</h2>
        <div className="card-grid">
          {RESOURCES.map((resource) => (
            <article className="card" key={resource.label}>
              <h3>
                <Link href={resource.href}>{resource.label}</Link>
              </h3>
              <p>{resource.description}</p>
            </article>
          ))}
        </div>
        <p>
          You can also reach us through the <Link href="/contact">Contact
          page</Link> or join The Wolf Den Discord server.
        </p>
      </section>
    </main>
  );
}