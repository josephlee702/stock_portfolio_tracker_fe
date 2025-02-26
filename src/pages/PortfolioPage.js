import api from "../services/api"; 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssetForm from "../components/AssetForm";
import AssetList from "../components/AssetList";

const PortfolioPage = ({ darkMode }) => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [assets, setAssets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2fQ.-XdcSMywrlroe_kS3juSFq7T1vD3c14XhaOgkQrCPMY";

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
          console.error("Error fetching assets", error);
        }
      };
      fetchAssets();
    }
  }, [id, portfolio]); 

  const handleCreateAsset = async (newAsset) => {
    setErrorMessage("");

    try {
      const response = await api.post(`/portfolios/${id}/assets`, newAsset, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAssets([...assets, response.data]);
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.errors || "Error creating asset.";
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage("Error creating asset.");
      }
    }
  };

  const handleDeleteAsset = async (assetId) => {
    try {
      const response = await api.delete(`/portfolios/${id}/assets/${assetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setAssets(assets.filter((asset) => asset.id !== assetId));
  
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className={`display-4 ${darkMode ? "text-light" : "text-dark"}`}>
        {portfolio ? portfolio.name : "Portfolio does not exist."}
      </h1>

      <AssetForm
        handleCreateAsset={handleCreateAsset}
        errorMessage={errorMessage}
      />

      <AssetList assets={assets} handleDeleteAsset={handleDeleteAsset} />
    </div>
  );
};

export default PortfolioPage;