import Link from "next/link";

export default function BargazLegalHomeScreen() {
  return (
    <main className="page-container">
      <h1>Bargaz Legal</h1>
      <p>
        Policies, terms of service, software and logo licenses, and trademark
        information for Bargaz, BargazBot, BargazLive, and related projects
        operated by Devon Finney-Gaitan.
      </p>

      <section>
        <h2>Policies &amp; Terms</h2>
        <ul>
          <li>
            <Link href="/privacy">Privacy Policy</Link> — How appearance
            settings, server logs, BargazBot identifiers, analytics, and
            advertising data are handled.
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link> — Rules, acceptable use,
            disclaimers, and conditions for using Bargaz sites and services.
          </li>
        </ul>
      </section>

      <section>
        <h2>Licensing</h2>
        <ul>
          <li>
            <Link href="/licensing">Licensing Overview</Link> — General
            licensing summary and third-party dependency notices.
          </li>
          <li>
            <Link href="/licensing/bargaz-code-product-license-v1.0">
              Bargaz Code &amp; Product License v1.0
            </Link>{" "}
            — Terms governing Bargaz software, website source code, and
            products.
          </li>
          <li>
            <Link href="/licensing/bargaz-logo-license-v1.0">
              Bargaz Logo License v1.0
            </Link>{" "}
            — Terms governing usage of Bargaz and RandomWolf08 logos and visual
            marks.
          </li>
        </ul>
      </section>

      <section>
        <h2>Trademarks &amp; Related Sites</h2>
        <ul>
          <li>
            <Link href="/trademarks">Bargaz Trademarks</Link> — Guidelines for
            referencing Bargaz, BargazBot, BargazLive, and third-party
            trademarks.
          </li>
          <li>
            <a href="https://randomwolf08.com">
              RandomWolf08.com Legal
            </a>{" "}
            — Policies and content licensing for RandomWolf08.com and portfolio
            subdomains.
          </li>
        </ul>
      </section>

      <section>
        <h2>Legal Inquiries &amp; Notices</h2>
        <p>
          For licensing permissions, copyright notices, or data deletion
          requests, contact{" "}
          <a href="mailto:devon6608@gmail.com">devon6608@gmail.com</a> or visit{" "}
          <a href="https://bargaz.app">bargaz.app/contact</a>.
        </p>
      </section>
    </main>
  );
}
