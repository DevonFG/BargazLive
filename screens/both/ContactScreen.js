import Link from "next/link";

const DISCORD_URL = "https://discord.gg/PvYFVshGrZ";

function ContactCard({ title, children }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export default function ContactScreen({ domain = "bargaz" }) {
  const isRandomWolf = domain === "randomwolf08";

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Contact {isRandomWolf ? "RandomWolf08" : "Bargaz™"}</h1>
        <p>
          Have a question, need support, or want to share feedback? Reach out
          using any of the options below.
        </p>
        <div className="hero-actions">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Join The Wolf Den on Discord
          </a>
        </div>
      </section>

      <section>
        <h2>Email</h2>
        <div className="card-grid">
          {isRandomWolf ? (
            <ContactCard title="General & commissions">
              <p>
                <a href="mailto:finneygd@randomwolf08.com">
                  finneygd@randomwolf08.com
                </a>
              </p>
            </ContactCard>
          ) : (
            <>
              <ContactCard title="Support">
                <p>
                  <a href="mailto:support@bargaz.app">
                    support@bargaz.app
                  </a>
                </p>
                <p>
                  For help with Bargaz™, BargazBot™, BargazLive™, or the
                  websites.
                </p>
              </ContactCard>
              <ContactCard title="Legal">
                <p>
                  <a href="mailto:legal@bargaz.app">legal@bargaz.app</a>
                </p>
                <p>
                  For licensing, trademarks, copyright notices, and data
                  requests.
                </p>
              </ContactCard>
              <ContactCard title="Personal">
                <p>
                  <a href="mailto:finneygd@bargaz.app">
                    finneygd@bargaz.app
                  </a>
                </p>
              </ContactCard>
            </>
          )}
        </div>
      </section>

      <section>
        <h2>Discord</h2>
        <p>
          For support, bug reports, community chat, and project updates, join
          The Wolf Den Discord server.
        </p>
        <p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join The Wolf Den Discord Server
          </a>
        </p>
      </section>

      {isRandomWolf ? (
        <section>
          <h2>Socials &amp; commissions</h2>
          <p>
            Find creator profiles and commission information on the{" "}
            <Link href="/links">Links page</Link>, or browse the{" "}
            <Link href="/portfolio">Portfolio</Link>.
          </p>
        </section>
      ) : (
        <section>
          <h2>Feedback</h2>
          <p>
            Feature requests, bug reports, and suggestions can be submitted on
            the <Link href="/feedback">Feedback page</Link>. You can also find
            every official link on the <Link href="/links">Links page</Link>.
          </p>
        </section>
      )}
    </main>
  );
}