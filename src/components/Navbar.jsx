import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useWindowWidth } from "../hooks/useWindowWidth";

const menuLinks = [
  { path: "/", text: "Home" },
  { path: "/tracker", text: "Portfolio tracker" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [navigate]);

  return (
    <nav className="header">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <h1>
            <Link to="/" style={{ textDecoration: "none" }}>
              cpt.
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
        style={
          isOpen && windowWidth <= 960
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {menuLinks.map((link) => (
          <Link
            to={link.path}
            key={link.path}
            onClick={() => setIsOpen(!isOpen)}
          >
            <li>{link.text}</li>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
