import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import api from "../services/api"; 

const Login = ({ setUser }) => {
  const { fetchUserData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/sign_in", { email, password });

      const { "access-token": accessToken, client, uid, "token-type": tokenType, expiry } = response.headers;

      if (accessToken && client && uid) {
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
        localStorage.setItem("expiry", expiry);
        localStorage.setItem("token-type", tokenType);
      } else {
        console.error("Tokens missing in response headers");
      }

      if (!user) {
      await fetchUserData();
    }

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mt-2"
          required
        />
        <button type="submit" className="btn btn-primary mt-3">Log In</button>
      </form>
    </div>
  );
};

export default Login;
