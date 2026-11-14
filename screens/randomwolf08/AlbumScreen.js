// screens/randomwolf08/AlbumScreen.js
export default function AlbumScreen({ category, album }) {
  return (
    <main className="page-container">
      <h1>{album}</h1>
      <p>Category: {category}</p>
      {/* Render album media grid here */}
    </main>
  );
}
