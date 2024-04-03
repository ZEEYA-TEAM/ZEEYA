import React, { createContext, useState } from "react";
import LoggingService from "../LoggingService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    LoggingService.logUserAction(localStorage.getItem("PrivateId"), "Logout", "AuthContext", "ok");

    localStorage.removeItem("UserName");
    localStorage.removeItem("PrivateId");

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
