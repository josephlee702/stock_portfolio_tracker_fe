import React, { useEffect, useState, useContext } from "react";
import api from "../services/api"; 
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const HomePage = ({ darkMode }) => {
  const {user} = useContext(AuthContext);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user) return;

      try {
        const response = await api.get("/api/v1/portfolios", {
          headers: {
            "access-token": localStorage.getItem("access-token"),
            "client": localStorage.getItem("client"),
            "uid": localStorage.getItem("uid"),
          },
        });
        setPortfolios(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };
    fetchPortfolios();
  }, [user]);

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
