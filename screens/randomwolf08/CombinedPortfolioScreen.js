import Link from "next/link";

const PORTFOLIO_SECTIONS = [
  {
    key: "photos",
    title: "Photography",
    description: "Nature, landscapes, events, and editorial photography.",
    subdomainUrl: "https://randomwolf08.com",
    viewAllLabel: "View Full Photography Portfolio",
    // Replace these placeholders with your actual featured albums
    featuredAlbums: [
      // { slug: "nature", title: "Nature & Landscapes", cover: "/portfolio/photos/nature.jpg" },
    ],
  },
  {
    key: "design",
    title: "Graphic Design",
    description: "Logos, brand identities, stream overlays, and digital graphics.",
    subdomainUrl: "https://randomwolf08.com",
    viewAllLabel: "View Full Graphic Design Portfolio",
    featuredAlbums: [
      // { slug: "branding", title: "Logos & Branding", cover: "/portfolio/design/branding.jpg" },
    ],
  },
  {
    key: "3d",
    title: "3D Design",
    description: "CAD models, 3D prints, prototypes, and renders.",
    subdomainUrl: "https://randomwolf08.com",
    viewAllLabel: "View Full 3D Design Portfolio",
    featuredAlbums: [
      // { slug: "cad-models", title: "CAD & 3D Prints", cover: "/portfolio/3d/cad.jpg" },
    ],
  },
  {
    key: "other",
    title: "Other Works",
    description: "Published articles, engineering projects, and miscellaneous creations.",
    subdomainUrl: "https://randomwolf08.com",
    viewAllLabel: "View All Other Works",
    featuredAlbums: [
      // { slug: "writing", title: "Published Articles", cover: "/portfolio/other/writing.jpg" },
    ],
  },
];

export default function CombinedPortfolioScreen() {
  return (
    <main className="page-container">
      <h1>Portfolio</h1>
      <p>
        Explore featured collections across Photography, Graphic Design, 3D
        Design, and Other Works, or jump into a specific category subdomain.
      </p>

      {/* Quick Category Jump Links */}
      <nav className="portfolio-jump-nav" aria-label="Portfolio categories">
        {PORTFOLIO_SECTIONS.map((section) => (
          <a key={section.key} href={`#${section.key}`}>
            {section.title}
          </a>
        ))}
      </nav>

      {/* Category Sections */}
      {PORTFOLIO_SECTIONS.map((section) => (
        <section key={section.key} id={section.key} className="portfolio-section">
          <div className="portfolio-section-header">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>

          {section.featuredAlbums.length > 0 ? (
            <div className="album-grid">
              {section.featuredAlbums.map((album) => (
                <a
                  key={album.slug}
                  href={`${section.subdomainUrl}/${album.slug}`}
                  className="album-card"
                >
                  {album.cover && (
                    <img src={album.cover} alt={album.title} loading="lazy" />
                  )}
                  <h3>{album.title}</h3>
                </a>
              ))}
            </div>
          ) : (
            <p className="portfolio-empty">
              Featured {section.title.toLowerCase()} albums coming soon.
            </p>
          )}

          <p>
            <a href={section.subdomainUrl}>{section.viewAllLabel} →</a>
          </p>
        </section>
      ))}

      {/* External Portfolio & Commission Links */}
      <section className="portfolio-external">
        <h2>External Portfolios & Commissions</h2>
        <ul>
          <li>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance
            </a>{" "}
            — Main design portfolio
          </li>
          <li>
            <a
              href="https://vgen.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              VGen
            </a>{" "}
            — Commissions & services
          </li>
          <li>
            <Link href="/platforms">View All Platforms</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
