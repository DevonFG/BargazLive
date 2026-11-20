import Link from "next/link";

const DOCUMENTS = [
  {
    name: "Privacy Policy",
    href: "/privacy",
    description:
      "How appearance settings, analytics, advertising, and personal data are handled.",
  },
  {
    name: "Terms of Service",
    href: "/terms",
    description:
      "Rules and conditions for using RandomWolf08.com and Bargaz™ services.",
  },
  {
    name: "License",
    href: "/license",
    description:
      "Copyright and licensing terms for RandomWolf08.com content, artwork, and website code.",
  },
];

export default function RandomWolfLegalHomeScreen() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Legal</h1>
        <p>
          Policies, terms, and licensing information for RandomWolf08.com,
          including its portfolio subdomains (photos, design, 3d, and other)
          and related creative content operated by Devon Finney-Gaitan.
        </p>
        <div className="hero-actions">
          <Link href="https://randomwolf08.com" className="button button-secondary">
            RandomWolf08.com
          </Link>
        </div>
      </section>

      <section>
        <h2>Policies &amp; terms</h2>
        <div className="card-grid">
          {DOCUMENTS.map((item) => (
            <article className="card" key={item.href}>
              <h3>
                <Link href={item.href}>{item.name}</Link>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Licensing &amp; intellectual property</h2>
        <div className="card-grid">
          <article className="card">
            <h3>
              <a href="https://legal.bargaz.app">Bargaz™ legal hub</a>
            </h3>
            <p>
              Full software licenses, logo usage terms, and trademarks for the
              shared Bargaz™ platform.
            </p>
          </article>
          <article className="card">
            <h3>
              <a href="https://bargaz.app">Bargaz.app</a>
            </h3>
            <p>Software, tools, and services built by Devon Finney-Gaitan.</p>
          </article>
        </div>
      </section>

      <section>
        <h2>Questions &amp; copyright notices</h2>
        <p>
          For legal questions, licensing permissions, or copyright inquiries,
          email <a href="mailto:finneygd@randomwolf08.com">finneygd@randomwolf08.com</a>{" "}
          or <a href="mailto:legal@bargaz.app">legal@bargaz.app</a>. You can also
          use the <Link href="https://randomwolf08.com/contact">Contact page</Link>.
        </p>
      </section>
    </main>
  );
}