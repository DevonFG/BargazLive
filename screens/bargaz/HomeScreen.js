import Link from "next/link";

export default function BargazHomeScreen() {
  return (
    <main className="page-container">
      {/* Hero / Intro */}
      <section className="hero-section">
        <h1>Welcome to Bargaz</h1>
        <p>
          Software, tools, and web infrastructure built by Devon Finney-Gaitan
          (RandomWolf08) for livestreamers, content creators, and online
          communities.
        </p>
        <div className="hero-actions">
          <Link href="/updates">Latest Updates</Link>{" "}
          <Link href="/status">System Status</Link>{" "}
          <Link href="/about">About Bargaz</Link>
        </div>
      </section>

      {/* Ecosystem Projects */}
      <section>
        <h2>Our Projects</h2>
        <ul>
          <li>
            <a href="https://bargaz.app">BargazBot</a> — Customizable
            multipurpose Discord bot with YouTube, Twitch, and Kick creator
            notifications, server configuration, and community management tools.
          </li>
          <li>
            <a href="https://bargaz.app">BargazLive</a> — Website hosting
            infrastructure for the Bargaz ecosystem and upcoming multi-platform
            tools for livestreamers.
          </li>
          <li>
            <a href="https://bargaz.app">Bargaz Base</a> — Shared core
            infrastructure providing host monitoring, diagnostics, database
            backups, and shutdown coordination.
          </li>
        </ul>
      </section>

      {/* Platform & Support */}
      <section>
        <h2>Resources &amp; Support</h2>
        <ul>
          <li>
            <Link href="/status">Host Status &amp; Diagnostics</Link> — Live
            Raspberry Pi server health, backups, and component versions.
          </li>
          <li>
            <a href="https://bargaz.app">Legal &amp; Licensing</a> —
            Privacy Policy, Terms of Service, trademarks, and Bargaz licenses.
          </li>
          <li>
            <Link href="/feedback">Feedback</Link> &amp;{" "}
            <Link href="/contact">Contact Us</Link> — Report bugs, suggest
            features, or join The Wolf Den Discord server.
          </li>
          <li>
            <a href="https://randomwolf08.com">RandomWolf08.com</a> — Creator
            profile, photography, graphic design, and 3D portfolios.
          </li>
        </ul>
      </section>
    </main>
  );
}
