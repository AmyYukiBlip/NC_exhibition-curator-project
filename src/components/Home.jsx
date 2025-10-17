import { useState } from "react";
import AllArtwork from "../components/AllArtwork";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AllTempArtwork from "./AllTempArtwork";

export default function Home({ tempCollection, setTempCollection }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [medium, setMedium] = useState("");
  const [removedSnackOpen, setRemovedSnackOpen] = useState(false);
  const [duplicateSnackOpen, setDuplicateSnackOpen] = useState(false);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleMediumChange = (event) => {
    setMedium(event.target.value);
  };

  const handleTempCollection = (art) => {
    const alreadyAdded = tempCollection.some((item) => item.id === art.id);
    if (alreadyAdded) {
      setRemovedSnackOpen(false);
      setDuplicateSnackOpen(true);
      return false;
    }
    setTempCollection((prev) => [...prev, art]);
    return true
  };

  const handleRemoveFromCollection = (artId) => {
    setDuplicateSnackOpen(false);
    setRemovedSnackOpen(true);
    setTempCollection((prev) => prev.filter((art) => art.id !== artId));
  };

  return (
    <div className="main-content">
      {/* ____LEFT PANE - TEMP COLLECTION____ */}
      <div className="left-pane">
        <h2>My Temp Collection</h2>
        <AllTempArtwork
          tempCollection={tempCollection}
          handleTempCollection={handleTempCollection}
          handleRemoveFromCollection={handleRemoveFromCollection}
        />
      </div>

      {/* ____RIGHT PANE - MAIN CONTENT____ */}
      <main className="right-pane">
        <h1>Welcome to The Gallery</h1>
        <p>
          Search and browse the collection below, filter your results, and add
          to your temporary collection!
        </p>
        {/* ** SEARCH BAR ** */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            marginTop: 5,
            marginBottom: 3,
            width: "100%",
            maxWidth: "800px",
            marginX: "auto", // centers the box horizontally
          }}
        >
          <TextField
            label="Search by artist or title..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "grey.600" }} />
                </InputAdornment>
              ),
            }}
          />
          {/* Location Filter */}
          <FormControl sx={{ flex: 1, minWidth: 200 }}>
            <InputLabel id="location-select-label">Filter by Museum</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={location}
              label="Filter by Museum"
              onChange={handleLocationChange}
            >
              <MenuItem value="">All Museums</MenuItem>
              <MenuItem value="Victoria & Albert Museum">
                Victoria & Albert Museum
              </MenuItem>
              <MenuItem value="The Art Institute of Chicago">
                The Art Institute of Chicago
              </MenuItem>
            </Select>
          </FormControl>

          {/* Medium Filter */}
          <FormControl sx={{ flex: 1, minWidth: 200 }}>
            <InputLabel id="medium-select-label">Filter by Medium</InputLabel>
            <Select
              labelId="medium-select-label"
              id="medium-select"
              value={medium}
              label="Filter by Medium"
              onChange={handleMediumChange}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Painting">Painting</MenuItem>
              <MenuItem value="Watercolour drawing">
                Watercolour drawing
              </MenuItem>
              <MenuItem value="Print">Print</MenuItem>
              <MenuItem value="Sculpture">Sculpture</MenuItem>
            </Select>
          </FormControl>

          {/* Clear filters button */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setLocation("");
              setMedium("");
              setSearchTerm("");
            }}
            sx={{ alignSelf: "center", whiteSpace: "nowrap" }}
          >
            Clear
          </Button>
        </Box>

        {/* ** The Gallery ** */}
        <div>
          <AllArtwork
            searchTerm={searchTerm}
            location={location}
            medium={medium}
            handleTempCollection={handleTempCollection}
          />
        </div>

        <Snackbar
          open={removedSnackOpen}
          autoHideDuration={2000}
          onClose={() => setRemovedSnackOpen(false)}
          message="Removed from collection ❌"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />

        <Snackbar
          open={duplicateSnackOpen}
          autoHideDuration={3000}
          onClose={() => setDuplicateSnackOpen(false)}
          message="You've already added this one 🙂"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </main>
    </div>
  );
}
