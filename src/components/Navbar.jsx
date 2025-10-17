import { Link } from "react-router-dom";
import EC_Logo_transparent from "../assets/EC_Logo_transparent.png";

export default function Navbar() {
  return (
    <ul className="nav-container">
      <li>
        <Link to="/" className="nav-link">
          <img src={EC_Logo_transparent} className="logo" alt="EC Logo" />
        </Link>
      </li>
      <li className="orgname">Exhibition Curator</li>
      <li>
        <Link to="/exhibition" className="nav-link">
          Your Exhibition
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
