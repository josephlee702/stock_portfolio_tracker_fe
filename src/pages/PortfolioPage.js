import api from "../services/api"; 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PortfolioPage = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  // figure out how to store this in localStorage later
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.Ky4xfgQ62uwhoS1U06_b7oC2mmGHHXC6s5RCN64P9-E";

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

  return (
    <div>
      <h1>Portfolio {id}</h1>
      {portfolio ? <pre>{JSON.stringify(portfolio, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default PortfolioPage;
