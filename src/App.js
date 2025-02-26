import React, {useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const storedTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(storedTheme === "dark");

  useEffect(() => {
    // Apply dark theme class to body element
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Set dark mode in localStorage only when it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Router>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route path="/portfolios/:id" element={<PortfolioPage darkMode={darkMode} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
