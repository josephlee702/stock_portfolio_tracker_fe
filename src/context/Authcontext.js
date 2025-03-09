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
      if (user) setUser(null);
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
        if (!user || user.id !== response.data.data.id) {
          setUser(response.data.data);
        }
      } else {
        if (user) setUser(null);
        localStorage.clear();
      }
    } catch (error) {
      console.error("Could not fetch user data", error);
      if (user) setUser(null);
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (!user && localStorage.getItem("access-token")) {
      fetchUserData();
    }
  }, [user]);
  

  return (
    <AuthContext.Provider value={{ user, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
