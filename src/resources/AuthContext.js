import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggingService from "../LoggingService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const privateId = localStorage.getItem("PrivateId");
      if (privateId) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const login = () => {
    setIsLoggedIn(true);

    LoggingService.logUserAction(localStorage.getItem("PrivateId"), "Login", "AuthContext", "ok");
  };

  const logout = () => {
    LoggingService.logUserAction(localStorage.getItem("PrivateId"), "Logout", "AuthContext", "ok");

    localStorage.removeItem("UserName");
    localStorage.removeItem("PrivateId");

    setIsLoggedIn(false);

    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
