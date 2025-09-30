import TempCollectionCard from "./TempCollectionCard";
import { Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

//  ** This component is rendering within the homepage as the temp collection component **

export default function AllTempArtwork({ tempCollection }) {
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
            <TempCollectionCard key={art.id} artwork={art} />
          ))}
          <Button variant="contained" endIcon={<DoubleArrowIcon />}>
            Create Exhibition
          </Button>
        </>
      )}
    </div>
  );
}
