import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ darkMode, setDarkMode }) => {
 
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="ms-3">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/settings">Settings</Link>
      </div>
      
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀" : "☾"}
      </button>
    </nav>
  );
};

export default NavBar;
