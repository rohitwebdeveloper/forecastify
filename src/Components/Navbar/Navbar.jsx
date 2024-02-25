import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () =>{


    return(
        <>
        <div className="navbarContainer">
            <div className="navbar">
            <div className="appName">Forecastify</div>
            </div>
        </div>
        </>
    )
}


export default Navbar;