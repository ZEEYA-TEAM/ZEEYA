import React, { useState } from "react";
import Layout from "./Layout";
import LoggingService from "../LoggingService";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (firstName.trim() !== "") {
      LoggingService.logUserAction(firstName, 'button_click', 'Login', 'Login-button');
      setIsLoggedIn(true);
    }
  };
  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
          {isLoggedIn ? (
           <div>
           <p style={{fontSize:"2em"}}>Welcome, {firstName}!</p>
           <Layout />
           </div>
          ) : (            
            <form>
              <label>
                First Name:
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <br />
              <button type="button" onClick={handleLogin}>
                Logga in
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;