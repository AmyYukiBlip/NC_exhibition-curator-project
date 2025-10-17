import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// ** This is each artwork card displayed in the temp collection gallery **

export default function TempCollectionCard({
  artwork,
  onViewDetails,
  onRemove,
}) {
  return (
    <div className="t-gallery">
      <div className="t-image-wrapper">
        <img src={artwork.img} alt="Temp Collection Gallery Image" />
      </div>
      <div className="t-description">
        <p>"{artwork.title}"</p>
        <p>By {artwork.artist}</p>
      </div>
      <ButtonGroup className="t-gallery-button">
        <Button
          variant="contained"
          onClick={() => onViewDetails(artwork)}
          sx={{ fontSize: "0.7rem" }}
        >
          Quick View
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={onRemove}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
