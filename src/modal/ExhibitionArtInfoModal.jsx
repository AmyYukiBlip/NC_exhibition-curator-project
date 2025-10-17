import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #0044ffc7",
  boxShadow: 24,
  p: 3,
  maxHeight: "85vh",
  overflowY: "auto",
};

export default function ExhibitionArtInfoModal({ artwork, onClose }) {
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
              variant="h5"
              component="h2"
            >
              Artwork Details
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={(theme) => ({
                position: "absolute",
                right: 30,
                top: 30,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <div className="artinfo-desc" id="art-info-modal-description">
              <div>
                <img
                  className="artinfo-img"
                  src={artwork.img}
                  alt="Exhibition Gallery Image"
                />
              </div>
              <Typography sx={{ mt: 2 }}>
                <strong>Title:</strong> {artwork.title}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Artist:</strong> {artwork.artist}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Year:</strong> {artwork.year}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Medium:</strong> {artwork.medium}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                <strong>View in person:</strong> {artwork.source}
              </Typography>
              <a href={artwork.link} target="_blank" rel="noopener noreferrer">
                View at the museum online
              </a>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
