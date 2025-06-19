import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import './navbar.css';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <div className="navbar-logo" >
          <h1>Allwin's Portfolio</h1>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? (
            <FontAwesomeIcon icon={faX} className="menu-icon-close" size="2xl" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="menu-icon-bars" size="2xl" />
          )}
        </div>
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          <li>
            <HashLink to="/#Home" className="navbar-link" smooth onClick={closeMenu}>Home</HashLink>
          </li>
          <li>
            <HashLink to="/#About" className="navbar-link" smooth onClick={closeMenu}>About</HashLink>
          </li>
          <li>
            <Link to="/projects" className="navbar-link" onClick={closeMenu}>Projects</Link>
          </li>
          <li>
            <Link to="/achievements" className="navbar-link" onClick={closeMenu}>Achievements</Link>
          </li>
          <li>
            <HashLink to="/#Contact" className="navbar-link" smooth onClick={closeMenu}>Contact me</HashLink>
          </li>
          {/* <li> <input type="checkbox" className="theme-checkbox" onChange={handleThemeToggle} /></li> */}
        </ul>
      </nav>
    </>
  )
}
export default Navbar;