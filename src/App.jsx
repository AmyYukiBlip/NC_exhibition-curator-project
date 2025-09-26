import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

// A use state (goes first under App() {....):
//     const [count, setCount] = useState(0)

// An image:
// Import it:
// import reactLogo from './assets/react.svg'

// <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>

// A button:
{
  /* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */
}
{
  /* </div> */
}
