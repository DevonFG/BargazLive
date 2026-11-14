import Link from "next/link";

export default function BargazAboutScreen() {
  return (
    <main className="page-container">
      <h1>About Bargaz</h1>
      <p>
        Bargaz is a software and web infrastructure ecosystem created by Devon
        Finney-Gaitan (RandomWolf08). Built to support livestreamers, content
        creators, and online communities, Bargaz combines Discord automation,
        web hosting, and shared server diagnostics into a unified platform.
      </p>

      <section>
        <h2>The Ecosystem</h2>
        <p>
          Bargaz is split into three interconnected projects that run together
          on shared host infrastructure:
        </p>
        <ul>
          <li>
            <a href="https://bargaz.app">Bargaz (Base)</a> — The shared
            core library providing logging, health monitoring, diagnostics,
            database backups, and graceful shutdown coordination across the
            entire host.
          </li>
          <li>
            <a href="https://bargaz.app">BargazBot</a> — A multipurpose
            Discord bot delivering creator notifications for YouTube, Twitch,
            and Kick alongside configurable server management and moderation
            tools.
          </li>
          <li>
            <a href="https://bargaz.app">BargazLive</a> — The web hosting
            platform powering Bargaz.app, RandomWolf08.com, and their
            subdomains, as well as the foundation for upcoming livestreaming
            tools and multi-platform chat utilities.
          </li>
        </ul>
      </section>

      <section>
        <h2>Architecture &amp; Infrastructure</h2>
        <p>
          All Bargaz services run on a dedicated Raspberry Pi host managed by
          PM2 and exposed securely through Cloudflare Tunnel. Each project
          maintains its own repository and runtime isolation while sharing
          standardized health checks, automated hourly/daily/weekly database
          backups, and real-time status reporting.
        </p>
        <p>
          You can inspect live host metrics, component versions, and service
          diagnostics anytime on the <Link href="/status">Status page</Link>.
        </p>
      </section>

      <section>
        <h2>About the Creator</h2>
        <p>
          Bargaz is developed and maintained by Devon Finney-Gaitan
          (RandomWolf08), a Civil Engineering student at Oregon State
          University, photographer, graphic designer, and content creator based
          in Oregon.
        </p>
        <p>
          Learn more about my creative and engineering work at{" "}
          <a href="https://randomwolf08.com">RandomWolf08.com</a>, view source
          repositories on{" "}
          <a
            href="https://github.com"
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
