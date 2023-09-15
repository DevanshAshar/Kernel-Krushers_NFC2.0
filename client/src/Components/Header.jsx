import React from "react"
import { Link, NavLink } from "react-router-dom"

import imageUrl from "../Assets/Images/avatar-icon.png"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    return (
        <header>
            <Link className="site-logo" to="/">#NewsLife</Link>
            <nav>
                <NavLink 
                    to="host"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="livenews"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Live News
                </NavLink>
                <NavLink 
                    to="search"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Search
                </NavLink>
                <NavLink 
                    to="checknews"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Check News
                </NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src={imageUrl} 
                        className="login-icon"
                    />
                </Link>
            </nav>
        </header>
    )
}