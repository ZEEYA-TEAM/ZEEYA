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
      <main>
        {isLoggedIn ? (
          <div>
          <p style={{fontSize:"2em"}}>Welcome, {firstName}!</p>
          <Layout />
          </div>
        ) : (
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
        )}
      </main>
    </>
  );
}

export default Login;