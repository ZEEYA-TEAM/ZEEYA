import React, { useState } from "react";
import Layout from "./Layout";
import LoggingService from "../LoggingService";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    
    if (firstName.trim() !== "") {
      LoggingService.logUserAction(firstName, 'button_click', 'Login', 'Login-button');
      setIsLoggedIn(true);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <div>
        <p style={{fontSize:"2em"}}>Welcome, {firstName}!</p>
        <Layout />
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              aria-label="Name"
              autoComplete="username"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />      
            <button type="submit">
              Logga in
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;