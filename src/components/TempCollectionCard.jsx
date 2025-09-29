import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

// ** This is each artwork displayed in the temp collection gallery **

// TODO:  more info and remove buttons need to be linked up 

export default function TempCollectionCard({ artwork }) {
  return (
    <div className="t-gallery">
      <img src={artwork.image} />
      <div>
        <p>"{artwork.title}"</p>
        <p>{artwork.artist}</p>
      </div>
      <div className="t-gallery-buttons">
        <Stack direction="row" spacing={1}>
          <Button variant="contained">Info</Button>
          <Button variant="contained" color="error">
            {" "}
            <DeleteIcon />
          </Button>
        </Stack>
      </div>
    </div>
  );
}
