import React from "react";
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddPersonForm from "./components/AddPersonFrom";

function App() {
  return (
    <>
      <Navbar />
      <Login /> 
      <AddPersonForm/>
    </>
  );
}

export default App;