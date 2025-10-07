import { useState } from "react";
import ArtworkCard from "./ArtworkCard";
import ExhibitionArtInfoModal from "../modal/ExhibitionArtInfoModal";
import {
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function ExhibitionPage({
  tempCollection,
  setTempCollection,
  setUserTitleInput,
  setUserDescInput,
  userDescInput,
  userTitleInput,
  formSubmitted,
  setFormSubmitted,
}) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [SuccessSnackOpen, setSuccessSnackOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (art) => {
    setSelectedArtwork(art);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessSnackOpen(true);
    setFormSubmitted(true);
  };

  return (
    <>
      <div className="page-container">
        <div >
          {!formSubmitted ? (
            <Box component="form" onSubmit={handleSubmit}>
              <h1>Create your Exhibition!</h1>
              <h3>You're nearly there...</h3>
              <p>
                Please enter a title, a brief description and then press submit
                to see your exhibition!
              </p>
              <TextField
                label="Enter Your Exhibition Title"
                placeholder="My Exhibition"
                variant="outlined"
                value={userTitleInput}
                // required
                onChange={(e) => setUserTitleInput(e.target.value)}
                fullWidth
                sx={{ mt: 3 }}
              />

              <TextField
                label="Enter a description for your collection"
                 placeholder="A collection of works by..."
                variant="outlined"
                value={userDescInput}
                onChange={(e) => setUserDescInput(e.target.value)}
                fullWidth
                multiline
                rows={3}
                sx={{ mt: 3 }}
              />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                padding={5}
              >
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  sx={{ mt: 3, mb: 3 }}
                  startIcon={<AddIcon />}
                >
                  Add More
                </Button>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3 }}>
                  Submit
                </Button>
              </Stack>
            </Box>
          ) : (
            <>
              <Box sx={{ flexDirection: "column", gap: 2, padding: 3 }}>
                <Typography variant="h3" sx={{ mt: 2, mb: 3 }}>
                  {userTitleInput}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                  {userDescInput}
                </Typography>

                {tempCollection.map((art) => (
                  <ArtworkCard
                    key={art.id}
                    artwork={art}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </Box>
              <Box sx={{ flexWrap: "Wrap", gap: 2 }}>
                {selectedArtwork && (
                  <ExhibitionArtInfoModal
                    artwork={selectedArtwork}
                    onClose={() => setSelectedArtwork(null)}
                  />
                )}
              </Box>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                padding={5}
              >
                {/* <Button
              variant="contained"
              endIcon={<SendIcon />}
              // onClick={() => {

              // }}
            >
              Share
            </Button> */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setUserTitleInput("");
                    setUserDescInput("");
                    setFormSubmitted(false);
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </>
          )}

          <Snackbar
            open={SuccessSnackOpen}
            autoHideDuration={3000}
            onClose={() => setSuccessSnackOpen(false)}
            message={"Exhibition created successfully!"}
            anchorOrigin={{ vertical: "bottom", horizontal: "middle" }}
          />
        </div>
      </div>
    </>
  );
}
