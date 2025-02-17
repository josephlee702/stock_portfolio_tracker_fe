import api from "../services/api"; 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PortfolioPage = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({ symbol: "", name: "", quantity: "", asset_type: "" });
  
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prevAsset) => {
      const updatedAsset = {
        ...prevAsset,
        [name]: value,
      }
      return updatedAsset;
    });
  };

  const handleCreateAsset = async (e) => {
    // prevents the page from reloading when the form is submitted
    e.preventDefault();

    try {
      const response = await api.post(`/portfolios/${id}/assets`, newAsset, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAssets([...assets, response.data]);

      setNewAsset({ symbol: "", name: "", quantity: "", asset_type: "" });
    } catch (error) {
      console.error("Error creating asset:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800"> { portfolio ? portfolio.name : "Portfolio does not exist." } </h1>

    <div className="my-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700">Add New Asset</h2>
      <form onSubmit={handleCreateAsset} className="mt-4 space-y-4">
      <input
          type="text"
          name="symbol"
          value={newAsset.symbol}
          onChange={handleInputChange}
          placeholder="Asset Symbol"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="name"
          value={newAsset.name}
          onChange={handleInputChange}
          placeholder="Asset Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newAsset.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          name="asset_type"
          value={newAsset.asset_type}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Asset Type</option>
          <option value="stock">stock</option>
          <option value="crypto">crypto</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Asset
        </button>
      </form>
    </div>

    <div className="my-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700">Assets</h2>
      {assets.length > 0 ? (
        <ul className="space-y-4">
          {assets.map((asset) => (
            <li key={asset.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-lg font-semibold">{asset.symbol}</p>
              <p className="text-lg font-semibold">{asset.name}</p>
              <p className="text-gray-700">Price: ${Number(asset.market_price).toFixed(2) || "N/A"}</p>
            </li>
          ))}
        </ul>
      ) : assets.length === 0 ? (
        // Optional blank state if no assets exist
        <p className="text-gray-600">Wow. So empty. </p>
      ) : (
        <p className="text-gray-600">Loading assets...</p>
      )}
    </div>
  </div> 
  );
};

export default PortfolioPage;
