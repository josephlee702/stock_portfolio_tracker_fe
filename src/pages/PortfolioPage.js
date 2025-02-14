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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Portfolio {id}</h1>

        {portfolio ? (
          <div className="mb-6 p-4 bg-gray-50 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Portfolio Details</h2>
            <pre className="text-gray-600 bg-gray-200 p-3 rounded-lg overflow-x-auto">
              {JSON.stringify(portfolio, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-gray-500">Loading portfolio...</p>
        )}

        {assets.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Assets</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id} className="text-gray-600 hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{asset.name}</td>
                      <td className="py-2 px-4 border-b">
                        {asset.market_price && !isNaN(asset.market_price)
                        ? `$${Number(asset.market_price).toFixed(2)}`
                        : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Loading assets...</p>
        )}
      </div>
    </div>
  );
};


export default PortfolioPage;
