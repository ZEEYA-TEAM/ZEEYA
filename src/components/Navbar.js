import React from "react";

function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li><strong>ZEEYA</strong></li>
                </ul>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/todo">Todo</a></li>
                    <li><a href="/new-todo">New Todo</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;