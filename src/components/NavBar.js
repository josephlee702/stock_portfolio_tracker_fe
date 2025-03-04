import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import "./NavBar.css";

const NavBar = ({ darkMode, setDarkMode }) => {
  const { user, fetchUserData } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }
 
  return (
    <nav className="navbar d-flex flex-row justify-content-start p-2 bg-dark text-white">
      <Link to="/" className="ms-3">Home</Link>

      {user ? (
        <>
          <span className="ms-2">Welcome, {user.name}</span>
          <button onClick={handleLogout} className="btn btn-primary rounded-pill ms-2">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="ms-2">Log In</Link>
          <Link to="/signup" className="ms-2">Sign Up</Link>
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
