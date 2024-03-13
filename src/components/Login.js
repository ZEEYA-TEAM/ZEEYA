import React, { useState } from "react";
import Layout from "./Layout";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (firstName.trim() !== "") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {isLoggedIn ? (
        <div>
        <p style={{fontSize:"2em"}}>Välkommen, {firstName}!</p>
        <Layout />
        </div>
      ) : (
        <form>
          <label>
            Förnamn:
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
  );
}

export default Login;