import api from "../services/api"; 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PortfolioPage = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [assets, setAssets] = useState([]);
  // figure out how to store this token in a Cookie later
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0fQ.MY_yPhuEQBUXpmbltv41F5CW9teX8HaUraw1msPTD3I";

  useEffect(() => {
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Portfolio {id}</h1>

      {portfolio ? (
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Portfolio Details</h2>
          <pre className="bg-gray-100 p-4 rounded-md text-gray-700">
            {JSON.stringify(portfolio, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-gray-600">Loading portfolio...</p>
      )}

      {assets.length > 0 ? (
        <div className="mt-6 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Assets</h2>
          <ul className="divide-y divide-gray-300">
            {assets.map((asset) => (
              <li key={asset.id} className="py-4 flex justify-between items-center">
                <p className="text-gray-700 font-medium">{asset.name}</p>
                <p className="text-gray-500">
                  Price: <span className="font-semibold">{asset.market_price || "N/A"}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">Loading assets...</p>
      )}
    </div>
  );
};

export default PortfolioPage;
