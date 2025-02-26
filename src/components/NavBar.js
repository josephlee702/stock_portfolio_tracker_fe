import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ darkMode, setDarkMode }) => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }
 
  return (
    <nav className="navbar d-flex flex-row justify-content-start p-2 bg-dark text-white">
      <Link to="/">Home</Link>

      {token ? (
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login"> Log In </Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <div className="ms-auto">
        <button onClick={() => setDarkMode(!darkMode)} className="btn btn-primary">
        {darkMode ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
