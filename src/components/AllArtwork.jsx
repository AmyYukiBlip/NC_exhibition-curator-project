import { useEffect, useState } from "react";
import { normaliseMet, normaliseAIC } from "../utils/NormaliseApiData";
import ArtworkCard from "./ArtworkCard";
import ArtInfoModal from "../modal/ArtInfoModal";
import { CircularProgress, Box } from "@mui/material";

//  ** This component is what is rendering as the homepage gallery component **

export default function AllArtwork({
  searchTerm,
  location,
  medium,
  handleTempCollection,
}) {
  const [artwork, setArtwork] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If no search term, clear results and stop early
    if (!searchTerm || searchTerm.trim() === "") {
      setArtwork([]);
      setIsLoading(false);
      setError(false);
      return;
    }

    setIsLoading(true);
    setError(false);

    const metSearchUrl = `/.netlify/functions/metSearch?q=${searchTerm}`;
    const aicSearchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&limit=30&fields=id,title,image_id,artist_title,artwork_type_title`;

    const fetchMet = fetch(metSearchUrl)
      .then((res) => res.json())
      .then((data) => {
        const ids = data.objectIDs?.slice(0, 30) || [];
        return Promise.allSettled(
          ids.map((id) =>
            fetch(`/.netlify/functions/met?id=${id}`)
              .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch Met ID ${id}`);
                return res.json();
              })
              .then((item) => normaliseMet(item))
              .catch((err) => {
                console.warn(`Skipping Met ID ${id}:`, err.message);
                return null;
              })
          )
        );
      });

    const fetchAIC = fetch(aicSearchUrl)
      .then((res) => res.json())
      .then((data) => data.data?.map((item) => normaliseAIC(item)) || []);

    Promise.all([fetchMet, fetchAIC])
      .then(([metResults, aicArtworks]) => {
        const metArtworks = metResults
          .filter((res) => res.status === "fulfilled" && res.value !== null)
          .map((res) => res.value)
          .filter((art) => art && art.source);

        const validAIC = aicArtworks.filter((art) => art && art.source);

        setArtwork([...metArtworks, ...validAIC]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("error fetching artwork:", err);
        setError(true);
        setIsLoading(false);
      });
  }, [searchTerm, location, medium]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>404 Not Found</p>;

  const handleViewDetails = (art) => {
    setSelectedArtwork(art.id);
  };

  const filteredArtworks = artwork.filter((art) => {
    console.log(
      "Artwork sources in state:",
      artwork.map((a) => a?.source)
    );
    console.log("Current location filter value:", location);
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = location === "" || art.source === location;
    const matchesMedium = medium === "" || art.medium === medium;

    return matchesSearch && matchesLocation && matchesMedium;
  });

  return (
    <div className="gallery-container">
      {filteredArtworks.map((art) => (
        <ArtworkCard
          key={art.id}
          artwork={art}
          onViewDetails={handleViewDetails}
        />
      ))}

      {selectedArtwork && (
        <ArtInfoModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          handleTempCollection={handleTempCollection}
        />
      )}
    </div>
  );
}
