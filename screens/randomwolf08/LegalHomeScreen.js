import Link from "next/link";

export default function RandomWolfLegalHomeScreen() {
  return (
    <main className="page-container">
      <h1>Legal</h1>
      <p>
        Policies, terms, and licensing information for RandomWolf08.com,
        including its portfolio subdomains (photos, design, 3d, and other) and
        related creative content operated by Devon Finney-Gaitan.
      </p>

      <section>
        <h2>Policies &amp; Terms</h2>
        <ul>
          <li>
            <Link href="/privacy">Privacy Policy</Link> — How appearance
            settings, analytics, advertising, and personal data are handled.
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link> — Rules and conditions
            for using RandomWolf08.com and Bargaz services.
          </li>
        </ul>
      </section>

      <section>
        <h2>Licensing &amp; Intellectual Property</h2>
        <ul>
          <li>
            <Link href="/license">License</Link> — Copyright and licensing
            terms for RandomWolf08.com content, artwork, and website code.
          </li>
          <li>
            <a href="https://bargaz.app">Bargaz Legal Hub</a> — Full
            software licenses, logo usage terms, and trademarks for the shared
            Bargaz platform.
          </li>
        </ul>
      </section>

      <section>
        <h2>Questions &amp; Copyright Notices</h2>
        <p>
          For legal questions, licensing permissions, or copyright inquiries,
          contact{" "}
          <a href="mailto:devon6608@gmail.com">devon6608@gmail.com</a> or visit{" "}
          <a href="https://randomwolf08.com">
            ://randomwolf08.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
