import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const menuLinks = [
  { path: "/", text: "Home" },
  { path: "/tracker", text: "Portfolio tracker" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="header">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <h1>
            <Link to="/" style={{ textDecoration: "none" }}>
              CRYPTO
            </Link>
          </h1>
        </div>
        <div className="nav-links">
          <ul>
            {menuLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
        </div>
      </div>
      <div
        className="mobile-nav-links"
        style={isOpen ? { display: "block" } : { display: "none" }}
      >
        {menuLinks.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.text}</Link>
          </li>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
