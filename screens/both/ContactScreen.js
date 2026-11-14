import Link from "next/link";

export default function ContactScreen({ domain = "bargaz" }) {
  const isRandomWolf = domain === "randomwolf08";

  return (
    <main className="page-container">
      <h1>Contact Us</h1>
      <p>
        Have a question, need support, or want to share feedback? Reach out
        using any of the options below.
      </p>

      <section>
        <h2>Email</h2>
        <p>
          <a href="mailto:devon6608@gmail.com">devon6608@gmail.com</a>
        </p>
      </section>

      <section>
        <h2>Discord</h2>
        <p>
          For BargazBot support, bug reports, community chat, and project
          updates, join The Wolf Den Discord server.
        </p>
        <p>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join The Wolf Den Discord Server
          </a>
        </p>
      </section>

      {isRandomWolf && (
        <section>
          <h2>Socials & Commissions</h2>
          <p>
            Find all creator profiles and commission links on{" "}
            <a
              href="https://linktr.ee"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linktree
            </a>{" "}
            or visit <Link href="/platforms">Platforms</Link>.
          </p>
        </section>
      )}
    </main>
  );
}
