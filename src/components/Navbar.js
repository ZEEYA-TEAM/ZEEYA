import React, { useState } from "react";
import "./../resources/navbar.scss"
import { Routes, Route, Link} from 'react-router-dom';
import ProjectData from "./AllProject";
import ToDo from "./ToDo";
import About from "./About";
import Login from "./Login";
import Contact from './Contact'
import { useAuth } from "../resources/AuthContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, login, logout } = useAuth();


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
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
                    {!isLoggedIn ? <li><Link to="/">Home</Link></li> : ''}
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li>
                                <Link to="/todo">To do</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
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
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    )
}

export default Navbar;