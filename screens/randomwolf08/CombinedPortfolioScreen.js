const PORTFOLIO_SECTIONS = [
  {
    key: "photos",
    title: "Photography",
    description: "Nature, landscapes, events, and editorial photography.",
    url: "https://photos.randomwolf08.com",
    viewAllLabel: "View full photography portfolio",
  },
  {
    key: "design",
    title: "Graphic Design",
    description: "Logos, brand identities, stream overlays, and digital graphics.",
    url: "https://design.randomwolf08.com",
    viewAllLabel: "View full graphic design portfolio",
  },
  {
    key: "3d",
    title: "3D Design",
    description: "CAD models, 3D prints, prototypes, and renders.",
    url: "https://3d.randomwolf08.com",
    viewAllLabel: "View full 3D design portfolio",
  },
  {
    key: "other",
    title: "Other Works",
    description: "Published articles, engineering projects, and miscellaneous creations.",
    url: "https://other.randomwolf08.com",
    viewAllLabel: "View all other works",
  },
];

const EXTERNAL_LINKS = [
  {
    name: "Behance",
    url: "https://www.behance.net/theranddevon",
    description: "Main design portfolio.",
  },
  {
    name: "VGen",
    url: "https://vgen.co/DevonFG",
    description: "Commissions and services.",
  },
  {
    name: "Bark",
    url: "https://www.bark.com/en/us/company/devon-finney-gaitan/wJzNEE",
    description: "Photography portfolio.",
  },
];

export default function CombinedPortfolioScreen() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Portfolio</h1>
        <p>
          Explore featured collections across Photography, Graphic Design, 3D
          Design, and Other Works, or jump into a specific category subdomain.
        </p>
      </section>

      <nav aria-label="Portfolio categories">
        <p>
          {PORTFOLIO_SECTIONS.map((section, index) => (
            <span key={section.key}>
              {index > 0 && " · "}
              <a href={`#${section.key}`}>{section.title}</a>
            </span>
          ))}
        </p>
      </nav>

      {PORTFOLIO_SECTIONS.map((section) => (
        <section key={section.key} id={section.key}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <div className="notice is-warning">
            <p>
              Featured {section.title.toLowerCase()} albums are coming soon.
              The album system is planned for a future BargazLive™ update.
            </p>
          </div>
          <p>
            <a href={section.url}>{section.viewAllLabel}</a>
          </p>
        </section>
      ))}

      <section>
        <h2>External portfolios &amp; commissions</h2>
        <div className="card-grid">
          {EXTERNAL_LINKS.map((item) => (
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
          <a href="https://randomwolf08.com/links">View all links</a>
        </p>
      </section>
    </main>
  );
}