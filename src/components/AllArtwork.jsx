import { useEffect, useState } from "react";
// import { artworks } from "../data/test_artworks";
import ArtworkCard from "./ArtworkCard";
import ArtInfoModal from "../modal/ArtInfoModal";
import { normaliseAIC, normaliseVA } from "../utils/NormaliseApiData";
import { Box, CircularProgress } from "@mui/material";

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
    setIsLoading(true);
    setError(false);

    const vaURL = `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&page_size=30&images_exist=1&responseFields=systemNumber,titles,_primaryMaker,_primaryDate,_primaryImageId,_images,objectType`;

    const aicURL = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&limit=30&fields=id,title,image_id,artist_title,date_display,artwork_type_title`;

    const fetchVA = fetch(vaURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("V&A raw records:", data.records);
        return (
          data.records?.map((item) => normaliseVA(item)).filter(Boolean) || []
        );
      });
    const fetchAIC = fetch(aicURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("AIC raw records:", data.data);
        return (
          data.data?.map((item) => normaliseAIC(item)).filter(Boolean) || []
        );
      });
    Promise.all([fetchVA, fetchAIC])
      .then(([vaArtworks, aicArtworks]) => {
        setArtwork([...vaArtworks, ...aicArtworks]);
        setIsLoading(false);
      })

      .catch((error) => {
        console.log("Error fetching artworks", error);
        setError(true);
        setIsLoading(false);
      });
  }, [searchTerm, location, medium]);

  const filteredArtworks = artwork.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = location === "" || art.source === location;

    const matchesMedium = medium === "" || art.medium === medium;

    return matchesSearch && matchesLocation && matchesMedium;
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>404 Not Found</p>;

  const handleViewDetails = (art) => {
    setSelectedArtwork(art);
  };

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
