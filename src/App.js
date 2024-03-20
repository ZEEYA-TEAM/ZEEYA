import React, { useRef, useEffect } from "react";
import Login from './components/Login';
import Navbar from './components/Navbar';
import People from "./components/People";

function App() {
  const mainRef = useRef();
  useEffect(() => {
    const setMinHeight = () => {
      if (!mainRef.current) return;
      mainRef.current.style.minHeight = `${window.innerHeight}px`;
    };
    setMinHeight();
    window.addEventListener("resize", setMinHeight);
    return () => {
      window.removeEventListener("resize", setMinHeight);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Login />    
    </>
  );
}

export default App;