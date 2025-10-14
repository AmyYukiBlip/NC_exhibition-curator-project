import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

// ** This is each artwork card displayed in the temp collection gallery **

export default function TempCollectionCard({
  artwork,
  onViewDetails,
  onRemove,
  setSnackOpen,
}) {
  return (
    <div className="t-gallery">
      <img src={artwork.img} alt="Temp Collection Gallery Image"/>
      <div>
        <p>"{artwork.title}"</p>
        <p>{artwork.artist}</p>
      </div>
      <div className="t-gallery-buttons">
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => onViewDetails(artwork)}>
            Quick View
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onRemove();
              setSnackOpen(true);
            }}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      </div>
    </div>
  );
}
