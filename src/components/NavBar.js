import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const storedTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(storedTheme === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/settings">Settings</Link>
      </div>
      
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default NavBar;
