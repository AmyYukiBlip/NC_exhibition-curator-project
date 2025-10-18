import { Link } from "react-router-dom";
import EC_Logo_transparent from "../assets/EC_Logo_transparent.png";

export default function Navbar() {
  return (
    <div className="nav-container">
      <Link to="/" className="nav-logo-link">
        <img src={EC_Logo_transparent} className="logo" alt="EC Logo" />
      </Link>
      <h1 className="orgname">Exhibition Curator</h1>
      <Link to="/exhibition" className="nav-link">
        Your Exhibition
      </Link>
    </div>
  );
}

