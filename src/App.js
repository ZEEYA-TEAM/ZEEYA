import React from "react";
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <div className="page">
        <Navbar />
        <Login />
      </div>
    </>
  );
}

export default App;