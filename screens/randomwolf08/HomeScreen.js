import Link from "next/link";

export default function RandomWolfHomeScreen() {
  return (
    <main className="page-container">
      {/* Hero / Intro */}
      <section className="hero-section">
        <h1>RandomWolf08</h1>
        <p className="hero-subtitle">
          Content Creator · Photographer · Graphic Designer · Civil Engineering
          Student at Oregon State University
        </p>
        <p>
          Welcome to my personal website! I&apos;m Devon Finney-Gaitan
          (RandomWolf08), based in Oregon. I create digital art, photography,
          3D models, live content, and creator-focused software tools.
        </p>
        <div className="hero-actions">
          <Link href="/portfolio">Explore Portfolio</Link>{" "}
          <Link href="/platforms">All Platforms</Link>{" "}
          <a
            href="https://linktr.ee"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Linktree
          </a>
        </div>
      </section>

      {/* Creative Portfolios */}
      <section>
        <h2>Creative Work &amp; Portfolios</h2>
        <p>
          Browse my work across different mediums, or view everything together
          in the <Link href="/portfolio">Combined Portfolio</Link>.
        </p>
        <ul>
          <li>
            <a href="https://randomwolf08.com">Photography</a> — Nature,
            landscapes, events, and photo collections.
          </li>
          <li>
            <a href="https://randomwolf08.com">Graphic Design</a> —
            Logos, branding, stream graphics, and visual identity.
          </li>
          <li>
            <a href="https://randomwolf08.com">3D Design</a> — CAD models,
            3D prints, prototypes, and renders.
          </li>
          <li>
            <a href="https://randomwolf08.com">Other Works</a> —
            Published articles, engineering projects, and miscellaneous works.
          </li>
        </ul>
      </section>

      {/* Content Creation & Commissions */}
      <section>
        <h2>Content Creation &amp; Commissions</h2>
        <ul>
          <li>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube (@RandomWolf08)
            </a>{" "}
            — Videos, highlights, and gaming/creative content.
          </li>
          <li>
            <a
              href="https://twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitch (RandomWolf08)
            </a>{" "}
            — Livestreams and community hangouts.
          </li>
          <li>
            <a
              href="https://vgen.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              VGen Commissions
            </a>{" "}
            — Open commissions for graphic design and creative services.
          </li>
          <li>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Wolf Den Discord Server
            </a>{" "}
            — Community chat, stream updates, and Bargaz project support.
          </li>
        </ul>
        <p>
          Looking for TikTok, Kick, Rumble, Behance, Instagram, or X? See the
          full list on <Link href="/platforms">Platforms</Link>.
        </p>
      </section>

      {/* Engineering & Software Projects */}
      <section>
        <h2>Engineering &amp; Software</h2>
        <p>
          Alongside studying Civil Engineering at Oregon State University (with
          interests in transportation, infrastructure, and computer science), I
          develop tools for livestreamers and online communities under{" "}
          <a href="https://bargaz.app">Bargaz</a>:
        </p>
        <ul>
          <li>
            <a href="https://bargaz.app">BargazBot</a> — Customizable
            Discord bot for YouTube, Twitch, and Kick creator notifications and
            server management.
          </li>
          <li>
            <a href="https://bargaz.app">BargazLive</a> — Website
            infrastructure and upcoming multi-platform tools for livestreamers.
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section>
        <h2>Get in Touch</h2>
        <p>
          Have a question, collaboration idea, or project inquiry? Visit the{" "}
          <Link href="/contact">Contact page</Link> or join{" "}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          .
        </p>
      </section>
    </main>
  );
}
