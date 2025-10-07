import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

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
              <Typography sx={{ mt: 2, mb: 2 }}>
                View in person: {artwork.source}
              </Typography>
              <a href={artwork.link} target="_blank" rel="noopener noreferrer">
                View More Online
              </a>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
