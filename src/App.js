import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <NavBar /> 
      <main className = "p-4">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/portfolios/:id" element={<PortfolioPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
