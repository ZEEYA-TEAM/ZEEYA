import React from "react";
import { AuthProvider } from "./resources/AuthContext";
import Navbar from "./components/Navbar";


function App() {

  return (
    <AuthProvider>        
      <div className="page">
        <Navbar />
      </div>
    </AuthProvider>
  );
}

export default App;