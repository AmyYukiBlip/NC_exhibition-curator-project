import { useState } from "react";
import { artworks } from "../data/test_artworks";
import TempCollectionCard from "./TempCollectionCard";
import { Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

//  ** This component is what is rendering within the homepage temp collection component **

export default function AllTempArtwork() {
  const [tempCollection, setTempCollection] = useState([]);

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
            <TempCollectionCard key={artworks.id} artwork={art} />
          ))}
          <Button variant="contained" endIcon={<DoubleArrowIcon />}>
            Create Exhibition
          </Button>
        </>
      )}
    </div>
  );
}
