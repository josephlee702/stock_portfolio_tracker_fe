import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, password });

      localStorage.setItem("token", response.data.token);
      setUser(email);
      navigate("/login");
    } catch (err) {
      console.error("Login error:", err)
      setError("Invalid email or password. Please try again.");
    }
  };

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
