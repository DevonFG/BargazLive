// screens/randomwolf08/CategoryPortfolioScreen.js
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

export default function CategoryPortfolioScreen({ category, albums = [] }) {
  const info = CATEGORIES[category];

  return (
    <main className="page-container">
      <h1>{info.title}</h1>
      <p>{info.description}</p>

      {albums.length === 0 ? (
        <p>Albums coming soon.</p>
      ) : (
        <div className="album-grid">
          {albums.map((album) => (
            <Link key={album.slug} href={`/${album.slug}`}>
              <h2>{album.title}</h2>
              {album.description && <p>{album.description}</p>}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
