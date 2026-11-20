import Link from "next/link";

const CATEGORIES = {
  photos: {
    title: "Photography Portfolio",
    description: "Selected photography collections and shoots.",
  },
  design: {
    title: "Graphic Design Portfolio",
    description: "Branding, logos, and visual design projects.",
  },
  "3d": {
    title: "3D Design Portfolio",
    description: "3D models, CAD work, and renders.",
  },
  other: {
    title: "Other Works",
    description: "Miscellaneous creative and engineering projects.",
  },
};

const CATEGORY_LINKS = [
  { key: "photos", label: "Photography", url: "https://photos.randomwolf08.com" },
  { key: "design", label: "Graphic Design", url: "https://design.randomwolf08.com" },
  { key: "3d", label: "3D Design", url: "https://3d.randomwolf08.com" },
  { key: "other", label: "Other Works", url: "https://other.randomwolf08.com" },
];

export default function CategoryPortfolioScreen({ category = "photos", albums = [] }) {
  const info = CATEGORIES[category] ?? CATEGORIES.photos;
  const items = Array.isArray(albums) ? albums : [];

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>{info.title}</h1>
        <p>{info.description}</p>
        <div className="hero-actions">
          <Link href="https://randomwolf08.com/portfolio" className="button button-secondary">
            All portfolios
          </Link>
        </div>
      </section>

      <section>
        <h2>Albums</h2>
        {items.length === 0 ? (
          <div className="notice is-warning">
            <p>
              Albums are coming soon. The album system and private album login
              are planned for a future BargazLive™ update.
            </p>
          </div>
        ) : (
          <div className="card-grid">
            {items.map((album) => (
              <Link className="card" key={album.slug} href={`/${album.slug}`}>
                <h3>{album.title ?? album.slug}</h3>
                {album.description && <p>{album.description}</p>}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Other portfolios</h2>
        <div className="card-grid">
          {CATEGORY_LINKS.filter((item) => item.key !== category).map((item) => (
            <article className="card" key={item.key}>
              <h3>
                <a href={item.url}>{item.label}</a>
              </h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}