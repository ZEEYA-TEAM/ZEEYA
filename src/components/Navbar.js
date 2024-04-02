import React, { useState } from "react";
import "./../resources/navbar.scss"
import { Router, Routes, Route, NavLink} from 'react-router-dom'; // Import Routes
import ProjectData from "./AllProject";
import ToDo from "./ToDo";
import About from "./About";
import Login from "./Login";
import WithAuthentication from "./WithAuthentication";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // const logSomething = () => {
    //     console.log("isLoggedIn = ", isLoggedIn);
    // };

    // useEffect(() => {
    //     setInterval(logSomething, 5000);
    // }, []);

    return (
        <>
            <h1>{isLoggedIn ? "True" : "False"}</h1>
            <Router>
                <div>
                    <nav>
                        <ul className="navbar-brand">
                            <li><strong>ZEEYA TEAM</strong></li>
                        </ul>
                        <ul className="navbar-toggle">
                            <button onClick={toggleMenu}>
                                &#9776;
                            </button>
                        </ul>
                            <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                                <li>
                                    <NavLink to="/" activeClassName="active">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" activeClassName="active">About</NavLink>
                                </li>
                                {isLoggedIn && (
                                    <>
                                        <li>
                                            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/projects" activeClassName="active">Projects</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/todo" activeClassName="active">To do</NavLink>
                                        </li>
                                        <li>
                                            <button>Logout</button>
                                        </li>
                                    </>
                                )}

                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" exact element={<Login />} />
                        <Route path="/todo" element={<ToDo />} />
                        <Route path="/projects" element={<ProjectData />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default WithAuthentication(Navbar);