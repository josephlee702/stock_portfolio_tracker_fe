import React, {useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider, AuthContext } from "./context/Authcontext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { user, fetchUserData } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    // Apply dark theme class to body element
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Set dark mode in localStorage only when it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    localStorage.removeItem("expiry");
    localStorage.removeItem("token-type");
    fetchUserData();
    window.location.reload();
  }

  return (
    <AuthProvider>
      <Router>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/portfolios/:id" element={<PortfolioPage darkMode={darkMode} />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );  
};

export default App;
