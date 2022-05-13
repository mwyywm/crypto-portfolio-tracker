import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { NavbarSearch } from "./DropdownCombobox";
import SearchIcon from "../images/SearchIcon";

const menuLinks = [
  { path: "/", text: "Home" },
  { path: "/tracker", text: "Portfolio tracker" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const ref = useRef();
  useOnClickOutside(ref, () => {
    // close both search and menu when clicking outside of them
    setIsOpen(false);
    setShowSearch(false);
  });

  useEffect(() => {
    // whenever we navigate to a new page, we close mobile search & mobile menu
    if (isOpen) {
      setIsOpen(false);
    } else if (showSearch) {
      setShowSearch(false);
    }
  }, [navigate]);

  return (
    <nav className="header" ref={ref}>
      <div className="nav-wrapper">
        <div className="nav-logo">
          <h1>
            <Link to="/" style={{ textDecoration: "none" }}>
              cpt.
            </Link>
          </h1>
        </div>
        <div className="nav-links">
          <div>
            <NavbarSearch />
          </div>
          <ul className="links">
            {menuLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="link">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="btn-mobile-menu">
          <div className="search-mobile">
            <SearchIcon
              onClick={() => {
                setIsOpen(false); // closing the menu when we show search
                setShowSearch(!showSearch);
              }}
            />
          </div>
          <div
            className="hamburger"
            onClick={() => {
              setShowSearch(false); // close search when we show the links
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
          </div>
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
      <div
        className="mobile-search-div"
        style={
          showSearch && windowWidth <= 960
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {showSearch && (
          <div style={{ padding: "10px 0" }}>
            <NavbarSearch
              inputWidth="95%"
              resultsWidth="95%"
              setShowSearch={(boolean) => setShowSearch(boolean)}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
