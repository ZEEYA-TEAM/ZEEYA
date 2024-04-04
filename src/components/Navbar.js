import React, { useState } from "react";
import "./../resources/navbar.scss"
import { Routes, Route, Link} from 'react-router-dom';
import ProjectData from "./AllProject";
import ReportOptions from "./ReportOptions";
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

    const handleLogout = () => {
        toggleMenu();
        logout();
    }

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
                    {!isLoggedIn ? <li><Link to="/" onClick={toggleMenu}>Home</Link></li> : <li><Link to="/dashboard" onClick={toggleMenu}>Home</Link></li>}
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/projects" onClick={toggleMenu}>Projects</Link>
                            </li>
                            <li>
                                <Link to="/reports" onClick={toggleMenu}>Reports</Link>
                            </li>
                            <li>
                                <Link to="/people" onClick={toggleMenu}>People</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/about" onClick={toggleMenu}>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
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
