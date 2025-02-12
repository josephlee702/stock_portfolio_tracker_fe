import api from "../services/api"; 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PortfolioPage = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [ assets, setAssets] = useState([]); //assets will be stored here
  // figure out how to store this in localStorage later
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0fQ.MY_yPhuEQBUXpmbltv41F5CW9teX8HaUraw1msPTD3I";

  useEffect(() => {
    // fetch the portfolio data
    const fetchPortfolio = async () => {
      try {
        const response = await api.get(`/portfolios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    fetchPortfolio();
  }, [id]);

  // fetch assets for the portfolio
  useEffect(() => {
    if (portfolio) {
      const fetchAssets = async () => {
        try {
          const response = await api.get(`/portfolios/${id}/assets`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAssets(response.data);
        } catch (error) {
          console.error("Error fetching assets:", error);
        }
      };
      fetchAssets();
    }
  }, [id, portfolio]); 

  return (
    <div>
      <h1>Portfolio {id}</h1>
      {portfolio ? (
        <div>
          <h2>Portfolio Details</h2>
          <pre>{JSON.stringify(portfolio, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading portfolio...</p>
      )}

      {assets.length > 0 ? (
        <div>
          <h2>Assets</h2>
          <ul>
            {assets.map((asset) => (
              <li key={asset.id}>
                <p>{asset.name}</p>
                <p>Price: {asset.market_price || "Price not available"}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading assets...</p>
      )}
    </div>
  );
};

export default PortfolioPage;
