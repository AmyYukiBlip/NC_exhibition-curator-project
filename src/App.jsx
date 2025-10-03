import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ExhibitionPage from "./components/ExhibitionPage";
import { useState } from "react";
import { Box, display, flexDirection } from "@mui/system";

function App() {
  const [tempCollection, setTempCollection] = useState([]);
  const [userTitleInput, setUserTitleInput] = useState("");
  const [userDescInput, setUserDescInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <>
    <Box sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Navbar />
      <Box sx={{flexGrow: 1}}>
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
    </>
  );
}

export default App;
