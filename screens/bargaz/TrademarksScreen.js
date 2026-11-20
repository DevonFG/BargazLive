import Link from "next/link";

const MARKS = [
  {
    name: "Bargaz™",
    description: "The Bargaz name and platform identity.",
  },
  {
    name: "BargazBot™",
    description: "The BargazBot name and Discord bot identity.",
  },
  {
    name: "BargazLive™",
    description: "The BargazLive name and web/streaming platform identity.",
  },
  {
    name: "Bargaz graphic design & logo",
    description: "The official Bargaz logo and associated graphic design marks.",
  },
];

export default function TrademarksScreen() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Bargaz™ trademarks</h1>
        <p>
          The names, branding, and visual marks associated with the Bargaz
          ecosystem are trademarks of Devon Finney-Gaitan. Full details,
          registration status, and brand usage guidelines will be shared on
          this page soon.
        </p>
        <div className="hero-actions">
          <a href="mailto:legal@bargaz.app" className="button">
            Request permission
          </a>
          <Link href="/" className="button button-secondary">
            Legal home
          </Link>
        </div>
      </section>

      <section>
        <h2>Protected names &amp; marks</h2>
        <div className="card-grid">
          {MARKS.map((mark) => (
            <article className="card" key={mark.name}>
              <h3>{mark.name}</h3>
              <p>{mark.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Usage &amp; licensing</h2>
        <p>
          Please do not use the Bargaz™, BargazBot™, or BargazLive™ names or
          logos in a way that implies endorsement, affiliation, or sponsorship
          without prior permission. For current logo usage terms, see the{" "}
          <Link href="/licensing/bargaz-logo-license-v1.0">
            Bargaz Logo License v1.0
          </Link>{" "}
          or return to <Link href="/">Bargaz Legal</Link>.
        </p>
        <p>
          Permission requests can be sent to{" "}
          <a href="mailto:legal@bargaz.app">legal@bargaz.app</a>.
        </p>
      </section>

      <section>
        <h2>Third-party trademarks</h2>
        <p>
          Discord, YouTube, Twitch, Kick, GitHub, Google, Cloudflare, and other
          product or service names mentioned across Bargaz sites are trademarks
          of their respective owners. Their use is for identification purposes
          only and does not imply endorsement or affiliation.
        </p>
      </section>
    </main>
  );
}