import { useEffect, useState } from 'react';

function MangaList() {
  const [mangaList, setMangaList] = useState([]);  // Store manga data
  const [loading, setLoading] = useState(true);     // Loading state
  const [error, setError] = useState(null);         // Error state

  useEffect(() => {
    fetch("/api/manga")  // This will call the /api/manga route from your backend
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch manga");
        }
        return res.json();
      })
      .then((data) => {
        setMangaList(data.data || []); // Assuming manga data is in data.data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);         // Catch any errors
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;  // Show the error message
  }

  return (
    <div>
      <h1>Manga List</h1>
      <ul>
        {mangaList.length > 0 ? (
          mangaList.map((manga) => (
            <li key={manga.id}>{manga.attributes?.title?.en || "Untitled"}</li>
          ))
        ) : (
          <li>No manga found.</li>
        )}
      </ul>
    </div>
  );
}

export default MangaList;
