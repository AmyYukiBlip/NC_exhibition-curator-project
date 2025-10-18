import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ExhibitionPage from "./components/ExhibitionPage";
import { useMemo, useState } from "react";
import { Box } from "@mui/system";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

function App() {
  const [tempCollection, setTempCollection] = useState([]);
  const [userTitleInput, setUserTitleInput] = useState("");
  const [userDescInput, setUserDescInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // MUI components dark mode styling
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
         sx={{ maxWidth: '1280px', mx: 'auto', px: 2 }}
        >
          <Navbar />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    tempCollection={tempCollection}
                    setTempCollection={setTempCollection}
                  />
                }
              />
              <Route
                path="/exhibition"
                element={
                  <ExhibitionPage
                    tempCollection={tempCollection}
                    setTempCollection={setTempCollection}
                    userTitleInput={userTitleInput}
                    setUserTitleInput={setUserTitleInput}
                    userDescInput={userDescInput}
                    setUserDescInput={setUserDescInput}
                    formSubmitted={formSubmitted}
                    setFormSubmitted={setFormSubmitted}
                  />
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
