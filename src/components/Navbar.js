import React, { useState } from "react";
import "./../resources/navbar.scss"

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Projects</a></li>
                    <li><a href="/">Todo</a></li>
                    <li><a href="/">New Todo</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;