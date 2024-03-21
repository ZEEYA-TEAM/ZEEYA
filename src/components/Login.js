import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

function Login() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (username.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:3001/api/login", {
          username: username,
        });
        if (response.data.success) {
          setIsLoggedIn(true);
        } else {
          setError("Username not found");
        }
      } catch (error) {
        setError("Login failed");
        console.error(error);
      }
    } else {
      setError("Please enter your username");
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}>
          {isLoggedIn ? (
            <div>
              <p style={{ fontSize: "2em" }}>Welcome, {username}!</p>
              <Layout />
            </div>
          ) : (
            <form>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <br />
              <button type="button" onClick={handleLogin}>
                Log In
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
