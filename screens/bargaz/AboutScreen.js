import Link from "next/link";

const PROJECTS = [
  {
    name: "Bargaz Base",
    href: "https://base.bargaz.app",
    description:
      "The shared core library providing logging, health monitoring, diagnostics, database backups, and graceful shutdown coordination across the entire host.",
    badge: "Core library",
  },
  {
    name: "BargazBot™",
    href: "https://bot.bargaz.app",
    description:
      "A multipurpose Discord bot delivering creator notifications for YouTube, Twitch, and Kick alongside configurable server management and moderation tools.",
    badge: "Discord bot",
  },
  {
    name: "BargazLive™",
    href: "https://live.bargaz.app",
    description:
      "The web hosting platform powering Bargaz.app, RandomWolf08.com, and their subdomains, plus upcoming livestreaming tools and multi-platform chat utilities.",
    badge: "Web platform",
  },
];

export default function BargazAboutScreen() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>About Bargaz™</h1>
        <p>
          Bargaz™ is a software and web infrastructure ecosystem created by
          Devon Finney-Gaitan (RandomWolf08). Built to support livestreamers,
          content creators, and online communities, it combines Discord
          automation, web hosting, and shared server diagnostics into one
          platform.
        </p>
        <div className="hero-actions">
          <Link href="/status" className="button">
            View system status
          </Link>
          <Link href="/contact" className="button button-secondary">
            Get in touch
          </Link>
        </div>
      </section>

      <section>
        <h2>The ecosystem</h2>
        <p>
          Bargaz is split into three interconnected projects that run together
          on shared host infrastructure:
        </p>
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
        <h2>Architecture &amp; infrastructure</h2>
        <p>
          All Bargaz services run on a dedicated Raspberry Pi host managed by
          PM2 and exposed securely through Cloudflare Tunnel. Each project
          keeps its own repository and runtime isolation while sharing
          standardized health checks, automated hourly/daily/weekly database
          backups, and real-time status reporting.
        </p>
        <p>
          You can inspect live host metrics, component versions, and service
          diagnostics anytime on the <Link href="/status">Status page</Link>.
        </p>
      </section>

      <section>
        <h2>About the creator</h2>
        <p>
          Bargaz is developed and maintained by Devon Finney-Gaitan
          (RandomWolf08), a Civil Engineering student at Oregon State
          University, photographer, graphic designer, and content creator based
          in Oregon.
        </p>
        <p>
          Learn more about my creative and engineering work at{" "}
          <Link href="https://randomwolf08.com">RandomWolf08.com</Link>, view
          source repositories on{" "}
          <a
            href="https://github.com/DevonFG"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          , or reach out via the <Link href="/contact">Contact page</Link>.
        </p>
      </section>
    </main>
  );
}