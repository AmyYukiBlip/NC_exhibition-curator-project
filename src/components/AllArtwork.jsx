// import { ncNewsApi } from "../api";
import { useState } from "react";
import { artworks } from "../data/test_artworks";
import ArtworkCard from "./ArtworkCard";
import ArtInfoModal from "../modal/ArtInfoModal"

//  ** This component is what is rendering as the homepage gallery component **

export default function AllArtwork({ searchTerm, location, medium, handleTempCollection }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleViewDetails = (art) => {
    setSelectedArtwork(art);
  };

  const filteredArtworks = artworks.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = location === "" || art.location === location;

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
