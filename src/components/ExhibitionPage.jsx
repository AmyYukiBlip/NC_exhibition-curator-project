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
  setUserTitleInput,
  setUserDescInput,
  userDescInput,
  userTitleInput,
  formSubmitted,
  setFormSubmitted,
}) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [successSnackOpen, setSuccessSnackOpen] = useState(false);
  const [emptyExpoSnackOpen, setEmptyExpoSnackOpen] = useState(false);

  const navigate = useNavigate();

  const handleViewDetails = (art) => {
    setSelectedArtwork(art);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempCollection.length === 0) {
      setEmptyExpoSnackOpen(true);
      return;
    }

    if (!userTitleInput.trim()) {
      setUserTitleInput("My Exhibition");
    }

    if (!userDescInput.trim()) {
      setUserDescInput("A collection of my favourite artwork...");
    }
    setSuccessSnackOpen(true);
    setFormSubmitted(true);
  };

  return (
    <>
      <div className="e-page-container">
        <div>
          {!formSubmitted ? (
            <Box component="form" onSubmit={handleSubmit}>
              <h1>Create your Exhibition!</h1>
              <h3>You're nearly there...</h3>
              <p>
                Please enter a title, a brief description and then press submit
                to see your exhibition!
              </p>
              <TextField
                label="Enter a exhibition title"
                placeholder="My Exhibition"
                variant="filled"
                value={userTitleInput}
                onChange={(e) => setUserTitleInput(e.target.value)}
                fullWidth
                sx={{ mt: 3 }}
              />

              <TextField
                label="Enter a description for your collection"
                placeholder="A collection of my favourite artwork..."
                variant="filled"
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
                padding={2}
              >
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Add More
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Stack>
            </Box>
          ) : (
            <>
              <Box sx={{ textAlign: "center", padding: 3 }}>
                <Typography variant="h3" sx={{ mt: 2, mb: 3 }}>
                  {userTitleInput}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                  {userDescInput}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 1,
                  padding: 2,
                }}
              >
                {tempCollection.map((art) => (
                  <ArtworkCard
                    key={art.id}
                    artwork={art}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </Box>
              {selectedArtwork && (
                <ExhibitionArtInfoModal
                  artwork={selectedArtwork}
                  onClose={() => setSelectedArtwork(null)}
                />
              )}
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
            open={successSnackOpen}
            autoHideDuration={3000}
            onClose={() => setSuccessSnackOpen(false)}
            message={"🖼️ Exhibition created successfully! 🖼️"}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />

          <Snackbar
            open={emptyExpoSnackOpen}
            autoHideDuration={3000}
            onClose={() => setEmptyExpoSnackOpen(false)}
            message={"Oops, your exhibition is empty, please Add More art!"}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </div>
      </div>
    </>
  );
}
