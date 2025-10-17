import TempCollectionCard from "./TempCollectionCard";
import { Button, Snackbar } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TempArtInfoModal from "../modal/TempArtInfoModal";

//  ** This component is rendering within the homepage as the temp collection component/gallery,
//     mapping over TempCollectionCards **

export default function AllTempArtwork({
  tempCollection,
  handleTempCollection,
  handleRemoveFromCollection,
}) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="t-gallery-container">
      {tempCollection.length === 0 ? (
        <p>
          Please add art from the main gallery to start your temporary
          collection. Once added, you can create your exhibition! 🖼️
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
          <Button
            variant="contained"
            sx={{ width: "100%", mt: 2 }}
            endIcon={<DoubleArrowIcon />}
            onClick={() => navigate("/exhibition")}
          >
            Create Exhibition
          </Button>
        </>
      )}
      {selectedArtwork && (
        <TempArtInfoModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          handleTempCollection={handleTempCollection}
        />
      )}
    </div>
  );
}
