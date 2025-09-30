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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AllTempArtwork from "./AllTempArtwork";

export default function Home({ tempCollection, setTempCollection }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [medium, setMedium] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleMediumChange = (event) => {
    setMedium(event.target.value);
  };

  const handleTempCollection = (art) => {
    setTempCollection((prev) => [...prev, art]);
    setLoading(true);
  };

  const handleRemoveFromCollection = (artId) => {
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
              <MenuItem value="The Met">The Met</MenuItem>
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
              <MenuItem value="Oil on canvas">Oil on canvas</MenuItem>
              <MenuItem value="Woodblock print">Woodblock print</MenuItem>
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
      </main>
    </div>
  );
}
