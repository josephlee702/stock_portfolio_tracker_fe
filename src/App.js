import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Stock Portfolio Tracker!</h1>} />
          <Route path="/portfolios/:id" element={<PortfolioPage />} />
        </Routes>
    </Router>
  );
};

export default App;
