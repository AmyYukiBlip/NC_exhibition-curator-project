import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ExhibitionPage from "./components/ExhibitionPage";
import { useState } from "react";

function App() {
  const [tempCollection, setTempCollection] = useState([]);

  return (
    <>
      <Navbar />
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
          element={<ExhibitionPage tempCollection={tempCollection} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
