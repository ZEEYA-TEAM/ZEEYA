import React, { useState } from "react";
import "./../resources/navbar.scss"
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'; // Import Routes
import ProjectData from "./AllProject";
import ToDo from "./ToDo";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
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
                    <li>
                    <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                    </li>
                    <li>
                    <NavLink to="/projects" activeClassName="active">Projects</NavLink>
                    </li>
                    <li>
                    <NavLink to="/todo" activeClassName="active">To do</NavLink>
                    </li>
                 </ul>
            </nav>
            <Routes>
                {/* <Route path="/" exact element={<Home />} /> */}
                <Route path="/todo" element={<ToDo />} />
                <Route path="/projects" element={<ProjectData />} />
                
            </Routes>
            </div>
        </Router>
        </>
    )
}



export default Navbar;