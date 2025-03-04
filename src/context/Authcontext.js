import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({
  user: null,
  fetchUserData: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!accessToken || !client || !uid) {
      setUser(null);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/v1/auth/validate_token", {
        headers: {
          "access-token": accessToken,
          "client": client,
          "uid": uid,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
        localStorage.clear();
      }
    } catch (error) {
      console.error("Could not fetch user data", error);
      setUser(null);
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      fetchUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
