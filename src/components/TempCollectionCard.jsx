import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// ** This is each artwork card displayed in the temp collection gallery **

export default function TempCollectionCard({
  artwork,
  onViewDetails,
  onRemove,
  setSnackOpen,
}) {
  return (
    <div className="t-gallery">
      <img src={artwork.img} alt="Temp Collection Gallery Image" />
      <div>
        <p>"{artwork.title}"</p>
        <p>{artwork.artist}</p>
      </div>
      <ButtonGroup className="t-gallery-button">
        <Button
          variant="contained"
          onClick={() => onViewDetails(artwork)}
          sx={{fontSize: "0.7rem", }}
        >
          Quick View
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            onRemove();
            setSnackOpen(true);
          }}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
