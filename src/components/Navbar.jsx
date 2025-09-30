import { React } from "react";
import { Link } from "react-router-dom";
import EC_Logo_transparent from "../assets/EC_Logo_transparent.png"

export default function Navbar() {
  return (
    <ul className="nav-container">
      <li className="nav-left-group">
        <Link to="/" className="nav-link-right">
          <img src={EC_Logo_transparent} className="logo app" alt="EC Logo" />
        </Link>
      </li>
      <li className="orgname">Exhibition Curator</li>

      <li>
        <Link to="/exhibition" className="nav-link-right">
          Exhibition
        </Link>
      </li>

      {/* <li>
        <Link to="/login" className="nav-link-right">
          Login
        </Link>
      </li> */}
    </ul>
  );
}
