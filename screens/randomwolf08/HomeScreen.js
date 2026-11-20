import Link from "next/link";

const DISCORD_URL = "https://discord.gg/PvYFVshGrZ";

const PORTFOLIOS = [
  {
    name: "Photography",
    url: "https://photos.randomwolf08.com",
    description: "Nature, landscapes, events, and photo collections.",
  },
  {
    name: "Graphic Design",
    url: "https://design.randomwolf08.com",
    description: "Logos, branding, stream graphics, and visual identity.",
  },
  {
    name: "3D Design",
    url: "https://3d.randomwolf08.com",
    description: "CAD models, 3D prints, prototypes, and renders.",
  },
  {
    name: "Other Works",
    url: "https://other.randomwolf08.com",
    description: "Published articles, engineering projects, and miscellaneous works.",
  },
];

const CREATOR_LINKS = [
  {
    name: "YouTube (@RandomWolf08)",
    url: "https://www.youtube.com/channel/UCQX1SOkrN4GDPhCZJKtxZ8Q",
    description: "Videos, highlights, and gaming/creative content.",
  },
  {
    name: "Twitch (@randomwolf08)",
    url: "https://www.twitch.tv/randomwolf08",
    description: "Livestreams and community hangouts.",
  },
  {
    name: "VGen Commissions",
    url: "https://vgen.co/DevonFG",
    description: "Open commissions for graphic design and creative services.",
  },
  {
    name: "The Wolf Den Discord server",
    url: DISCORD_URL,
    description: "Community chat, stream updates, and Bargaz support.",
  },
];

const PROJECTS = [
  {
    name: "BargazBot™",
    url: "https://bot.bargaz.app",
    description:
      "Customizable Discord bot for YouTube, Twitch, and Kick creator notifications and server management.",
  },
  {
    name: "BargazLive™",
    url: "https://live.bargaz.app",
    description:
      "Website infrastructure and upcoming multi-platform tools for livestreamers.",
  },
];

export default function RandomWolfHomeScreen() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>RandomWolf08</h1>
        <p>
          Content Creator · Photographer · Graphic Designer · Civil Engineering
          Student at Oregon State University
        </p>
        <p>
          Welcome to my personal website! I&apos;m Devon Finney-Gaitan
          (RandomWolf08), based in Oregon. I create digital art, photography,
          3D models, live content, and creator-focused software tools.
        </p>
        <div className="hero-actions">
          <Link href="/portfolio" className="button">
            Explore portfolio
          </Link>
          <Link href="/links" className="button button-secondary">
            All links
          </Link>
        </div>
      </section>

      <section>
        <h2>Creative work &amp; portfolios</h2>
        <p>
          Browse my work across different mediums, or view everything together
          in the <Link href="/portfolio">combined portfolio</Link>.
        </p>
        <div className="card-grid">
          {PORTFOLIOS.map((item) => (
            <article className="card" key={item.name}>
              <h3>
                <a href={item.url}>{item.name}</a>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Content creation &amp; commissions</h2>
        <div className="card-grid">
          {CREATOR_LINKS.map((item) => (
            <article className="card" key={item.name}>
              <h3>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <p>
          Looking for TikTok, Kick, Rumble, Behance, Instagram, or X? See the
          full list on the <Link href="/links">Links page</Link>.
        </p>
      </section>

      <section>
        <h2>Engineering &amp; software</h2>
        <p>
          Alongside studying Civil Engineering at Oregon State University (with
          interests in transportation, infrastructure, and computer science), I
          develop tools for livestreamers and online communities under{" "}
          <a href="https://bargaz.app">Bargaz</a>:
        </p>
        <div className="card-grid">
          {PROJECTS.map((item) => (
            <article className="card" key={item.name}>
              <h3>
                <a href={item.url}>{item.name}</a>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Get in touch</h2>
        <p>
          Have a question, collaboration idea, or project inquiry? Visit the{" "}
          <Link href="/contact">Contact page</Link> or join{" "}
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            The Wolf Den on Discord
          </a>
          .
        </p>
      </section>
    </main>
  );
}