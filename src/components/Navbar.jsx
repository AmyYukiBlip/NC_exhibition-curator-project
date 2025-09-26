import { useContext, React } from "react";
import { Link } from "react-router-dom";
import eclogo from "../assets/eclogo.png";

export default function Navbar() {
  return (
    <ul className="nav-container">
      <li className="nav-left-group">
        <img src={eclogo} className="logo react" alt="EC Logo" />
      </li>
      <li className="orgname">Exhibition Curator</li>

      <li>
        <Link to="/exhibition" className="nav-link-right">
          Exhibition
        </Link>
      </li>

      <li>
        <Link to="/login" className="nav-link-right">
          Login
        </Link>
      </li>
    </ul>
  );
}
