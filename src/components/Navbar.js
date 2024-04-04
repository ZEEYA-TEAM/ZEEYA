import React, { useState } from "react";
import "./../resources/navbar.scss"
import { Routes, Route, Link} from 'react-router-dom';
import ProjectData from "./AllProject";
import ReportOptions from "./ReportOptions";
import ToDo from "./ToDo";
import About from "./About";
import Login from "./Login";
import Contact from './Contact'
import PeopleOptions from './PeopleOptions';
import Dashboard from './Dashboard';
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
                    {!isLoggedIn ? <li><Link to="/">Home</Link></li> : <li><Link to="/dashboard">Home</Link></li>}
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li>
                                <Link to="/reports">Reports</Link>
                            </li>
                            <li>
                                <Link to="/people">People</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/people" element={<PeopleOptions />} />
                <Route path="/projects" element={<ProjectData />} />
                <Route path="/reports" element={<ReportOptions />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    )
}

export default Navbar;