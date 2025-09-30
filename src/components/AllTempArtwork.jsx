import TempCollectionCard from "./TempCollectionCard";
import { Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ArtInfoModal from "../modal/ArtInfoModal";
import { useState } from "react";

//  ** This component is rendering within the homepage as the temp collection component **

export default function AllTempArtwork({
  tempCollection,
  handleTempCollection,
  handleRemoveFromCollection 
}) {

  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <div className="t-gallery-container">
      {tempCollection.length === 0 ? (
        <p>
          Please add art from the main gallery to start your temporary
          collection
        </p>
      ) : (
        <>
          {tempCollection.map((art) => (
            <TempCollectionCard
              key={art.id}
              artwork={art}
              onViewDetails={setSelectedArtwork}
              onRemove={() => handleRemoveFromCollection(art.id)} 
            />
          ))}
          <Button variant="contained" endIcon={<DoubleArrowIcon />}>
            Create Exhibition
          </Button>
        </>
      )}
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
