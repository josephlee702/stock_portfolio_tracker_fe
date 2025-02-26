import React, { useEffect, useState } from "react";
import api from "../services/api"; 
import { Link } from "react-router-dom";

const HomePage = ({ darkMode }) => {
  const [portfolios, setPortfolios] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2fQ.-XdcSMywrlroe_kS3juSFq7T1vD3c14XhaOgkQrCPMY";

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await api.get(`/portfolios`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolios(response.data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };
    fetchPortfolios();
  }, [token]);

  return (
    <div className="container mt-4">
      <h1 className={`display-4 ${darkMode ? "text-light" : "text-dark"}`}> Your Portfolios</h1>
      {portfolios.length > 0 ? (
        <ul className="list-group">
          {portfolios.map((portfolio) => (
            <li key={portfolio.id} className="list-group-item">
              <h2><Link to={`/portfolios/${portfolio.id}`}>{portfolio.name}</Link></h2>
              <p>Total Market Value: ${parseFloat(portfolio.total_market_value).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No portfolios found.</p>
      )}
    </div>
  );
};

export default HomePage;
