import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ArtInfoModal({
  artwork,
  onClose,
  handleTempCollection,
}) {
  const [snackOpen, setSnackOpen] = useState(false);

  return (
    <div>
      <Modal
        aria-labelledby="art-info-modal-title"
        aria-describedby="art-info-modal-description"
        open={artwork}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={artwork}>
          <Box sx={style}>
            <Typography
              className="artinfo-title"
              id="art-info-modal-title"
              variant="h6"
              component="h2"
            >
              Artwork Details
            </Typography>
            <div className="artinfo-desc" id="art-info-modal-description">
              <div>
                <img className="artinfo-img" src={artwork.img} />
              </div>
              <Typography sx={{ mt: 2 }}>Title: {artwork.title}</Typography>
              <Typography sx={{ mt: 2 }}>Artist: {artwork.artist}</Typography>
              <Typography sx={{ mt: 2 }}>Year: {artwork.year}</Typography>
              <Typography sx={{ mt: 2 }}>Medium: {artwork.medium}</Typography>
              <Typography sx={{ mt: 2 }}>
                View in person: {artwork.source}
              </Typography>
              <Link
                to={{
                  pathname: artwork.link,
                }}
              >View Online</Link>
            </div>

            <Button
              variant="contained"
              endIcon={<DoubleArrowIcon />}
              onClick={() => {
                handleTempCollection(artwork);
                setSnackOpen(true);
              }}
            >
              Add to Collection
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={`"${artwork.title}" added to collection`}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}
