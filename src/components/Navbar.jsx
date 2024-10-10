import {NavLink} from 'react-router-dom';
import '../Navbar.css';
import {LoginButton, LogoutButton} from "./AuthButtons.jsx";
import copacoLogo from '/src/assets/copacoLogo.png';
import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const Navbar = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>

            <nav className={"navbarTop"}>
                <a className="navbar-logo" href="/">
                    <img className="navbar-logo" src={copacoLogo} alt="Copaco logo"/>
                </a>


                <ul className="navbarTop-links">

                    {isAuthenticated ? (
                            <li>
                                <LogoutButton/>
                            </li>

                    ) : (
                        <li>
                            <LoginButton/>
                        </li>
                    )}

                </ul>
            </nav>
            <nav className="navbar">

            <ul className="navbar-links">
                    <li>
                    <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/configurator">Configuration</NavLink>
                    </li>
                    <li>
                        <NavLink to="/items">Item overview</NavLink>
                    </li>
                {user && user.role === "admin" && (
                    <>
                        <li>
                            <NavLink to="/adminConfig">Configure products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/rules">rules</NavLink>
                        </li>
                    </>
                )}
                </ul>
            </nav>
        </>

    );
};

export default Navbar;
