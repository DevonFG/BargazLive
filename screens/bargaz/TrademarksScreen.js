import Link from "next/link";

export default function TrademarksScreen() {
  return (
    <main className="page-container">
      <h1>Bargaz Trademarks</h1>
      <p>
        The names, branding, and visual marks associated with the Bargaz
        ecosystem are trademarks of Devon Finney-Gaitan. Full details,
        registration status, and brand usage guidelines will be shared on this
        page soon.
      </p>

      <section>
        <h2>Protected Names &amp; Marks</h2>
        <ul>
          <li>
            <strong>Bargaz</strong> — The Bargaz name and platform identity.
          </li>
          <li>
            <strong>BargazBot</strong> — The BargazBot name and Discord bot
            identity.
          </li>
          <li>
            <strong>BargazLive</strong> — The BargazLive name and web/streaming
            platform identity.
          </li>
          <li>
            <strong>Bargaz Graphic Design &amp; Logo</strong> — The official
            Bargaz logo and associated graphic design marks.
          </li>
        </ul>
      </section>

      <section>
        <h2>Usage &amp; Licensing</h2>
        <p>
          Please do not use the Bargaz, BargazBot, or BargazLive names or logos
          in a way that implies endorsement, affiliation, or sponsorship without
          prior permission. For current logo usage terms, see the{" "}
          <Link href="/licensing/bargaz-logo-license-v1.0">
            Bargaz Logo License v1.0
          </Link>{" "}
          or return to <Link href="/">Bargaz Legal</Link>.
        </p>
      </section>

      <section>
        <h2>Third-Party Trademarks</h2>
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
