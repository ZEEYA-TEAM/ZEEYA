import React from "react";
import Login from './components/Login';
import Navbar from './components/Navbar';
import ViewReport from "./components/ViewReports";
import ViewReport from "./components/ViewReports";

function App() {

  return (
    <>
      <div className="page">
        <Navbar />
        <Login />
        <ViewReport/>
      </div>
    </>
  );
}

export default App;