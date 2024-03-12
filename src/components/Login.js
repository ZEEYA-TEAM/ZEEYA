import React, { useState } from "react";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (firstName.trim() !== "") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      <nav >
        <ul>
          <li><a href="#">Home</a></li>
          <li> <a href="#">About</a></li>
          <li> <a href="#">Contact</a></li>
          <li> <a href="#">Projects</a></li>
          <li> <a href="#">Todo</a></li>
          <li> <a href="#">New Todo</a></li>
        </ul>
      </nav>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
        {isLoggedIn ? (
          <p>Välkommen, {firstName}!</p>
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
    </div>
  );
}

export default Login;