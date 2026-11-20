import Link from "next/link";

const CATEGORIES = {
  photos: {
    label: "Photography",
    description: "Photo albums and shoots by RandomWolf08 (Devon Finney-Gaitan).",
  },
  design: {
    label: "Graphic Design",
    description: "Graphic design albums, stream assets, and commissioned work.",
  },
  "3d": {
    label: "3D Design",
    description: "3D models, CAD projects, and renders.",
  },
  other: {
    label: "Other Work",
    description: "Miscellaneous projects that do not fit the other portfolios.",
  },
};

function displayName(value) {
  if (!value) return "Album";
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep the raw value if it is not valid URI encoding.
  }
  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function AlbumScreen({ category = "photos", album }) {
  const info = CATEGORIES[category] ?? CATEGORIES.photos;
  const title = displayName(album);

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>{title}</h1>
        <p>
          {info.description} This album is part of the {info.label} portfolio.
        </p>
        <div className="hero-actions">
          <Link href="/" className="button">
            Back to {info.label}
          </Link>
          <Link href="https://randomwolf08.com/links" className="button button-secondary">
            All links
          </Link>
        </div>
      </section>

      <section>
        <h2>Album details</h2>
        <div className="card-grid">
          <article className="card">
            <h3>Category</h3>
            <p>{info.label}</p>
          </article>
          <article className="card">
            <h3>Album</h3>
            <p>{title}</p>
          </article>
        </div>
      </section>

      <section>
        <div className="notice is-warning">
          <p>
            This album is a placeholder. Media, captions, and access controls
            will be added once the album system and private album login are
            finalized.
          </p>
        </div>
      </section>
    </main>
  );
}