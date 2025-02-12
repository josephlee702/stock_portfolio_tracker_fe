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
    const fetchPortfolio = async () => {
      try {
        const response = await api.get(`/portfolios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolio(response.data);

        const assetsResponse = await api.get(`/portfolios/${id}/assets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssets(assetsResponse.data);
      } catch (error) {
        console.error("Error fetching portfolio or assets:", error);
      }
    };

    fetchPortfolio();
  }, [id]);

  return (
    <div>
      <h1>Portfolio {id}</h1>
      {portfolio ? <pre>{JSON.stringify(portfolio, null, 2)}</pre> : <p>Loading portfolio...</p>}
      
      <h2>Assets</h2>
      {assets.length > 0 ? (
        <ul>
          {assets.map((asset) => (
            <li key={asset.id}>
              {asset.symbol}: {asset.quantity} at ${asset.market_price ? asset.market_price : "Price Not Available."}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading assets...</p>
      )}
    </div>
  );
};

export default PortfolioPage;
