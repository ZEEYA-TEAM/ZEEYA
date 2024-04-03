import React, { useState, useEffect } from "react";
import './../resources/login.scss'
import { useAuth } from "../resources/AuthContext";
import LoggingService from "../LoggingService";

function Login() {
  const [notionname, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { isLoggedIn, login, logout } = useAuth();


  useEffect(() => {
    if (isLoggedIn) {
      // Redirect or perform action when user is already logged in
      console.log("User is already logged in");

      const userName = localStorage.getItem("UserName");
      const userId = localStorage.getItem("PrivateId");
   
      if (userName && userId) {
        // If both userName and userId are found in localStorage, update the user state
        setUser({ name: userName, id: userId });
      }
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
 
        method: "POST",
 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notionname, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update localStorage and user state with new user info
        localStorage.setItem("UserName", data.user);
        localStorage.setItem("PrivateId", data.userid);
        setUser({ name: data.user, id: data.userid });
     
        login();
        setUsername("");
        setPassword("");
        console.log("Login ok", isLoggedIn);
        LoggingService.logUserAction(user.id, "Login", "Login", "ok");
 
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Network error or server cannot be reached");
    }
  };
 
  const handleLogout = () => {
    //setIsLoggedIn(!isLoggedIn);
    // Clear user info from localStorage
    localStorage.removeItem("UserName");
    localStorage.removeItem("PrivateId");
    // Reset user state to null
    setUser(null);

    console.log("Logout ok", isLoggedIn);
  };
  return (
 
    <main>
       {/* <h1>{isLoggedIn ? "True" : "False"}</h1>
      {isLoggedIn ? ( */}
      {isLoggedIn ? (
        // Show user info if user state is set
        <>
          <div>
            <h2>Welcome, {user.name}</h2>
  
            <p>Your User ID: {user.id}</p>
          </div>
        </>
      ) : (
        <>
          {/* Otherwise, show the login form */}
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              name="login"
              placeholder="Username"
              aria-label="Login"
              autoComplete="username"
              required
              value={notionname}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="login"
              placeholder="Password"
              aria-label="Login"
              autoComplete="username"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </main>
  );
}

export default Login;