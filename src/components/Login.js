import React, { useState } from "react";

import LoggingService from "../LoggingService";
import Navbar from "./Navbar";

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
       {isLoggedIn ? null : ( 
          <nav>            
            <ul className="navbar-brand">
              <li><strong>ZEEYA TEAM</strong></li>
          </ul>          
          <ul className="navbar-menu">
              <li><a href="/">Home</a></li>
              <li><a href="/">About</a></li>
          </ul>
        </nav>
          )}   
    
      {isLoggedIn ? (
        <div>
          
        <p style={{fontSize:"2em"}}>Welcome, {firstName}!</p>        
          <Navbar/>
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