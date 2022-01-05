import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="header">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <h1>CRYPTO</h1>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Portfolio tracker</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
