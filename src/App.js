import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar /> 
      <main className = "p-4">
        <Routes>
          <Route path="/" element={<h1>Welcome to the Stock Portfolio Tracker!</h1>} />
          <Route path="/portfolios/:id" element={<PortfolioPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
