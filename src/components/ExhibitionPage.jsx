import { useState } from "react";
import ArtworkCard from "./ArtworkCard";
import ExhibitionArtInfoModal from "../modal/ExhibitionArtInfoModal";

export default function ExhibitionPage({ tempCollection, handleTempCollection }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

    const handleViewDetails = (art) => {
        setSelectedArtwork(art);
      };

  return (
    <div>
      <h1>Create your Exhibition!</h1>
      <div>
        <h2>Exhibition Title</h2>
        <p>Exhibition Description</p>
      </div>
      <div>
        {tempCollection.map((art) => (
          <ArtworkCard
            key={art.id}
            artwork={art}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
         {selectedArtwork && (
              <ExhibitionArtInfoModal
                artwork={selectedArtwork}
                onClose={() => setSelectedArtwork(null)}
              />
            )}
    </div>
  );
}
