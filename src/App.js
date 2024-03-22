import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // استيراد BrowserRouter
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {" "}
      {/* استخدام BrowserRouter هنا */}
      <>
        <Navbar />
        <Login />
      </>
    </Router>
  );
}

export default App;
