import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const isLoggedIn = localStorage.getItem('token');

    return (
        <nav className="header">
            <Link to="/" className="logo">BloodDonor</Link>
            <div className="nav-links">
                <Link to="/donors">Find Donors</Link>
                <Link to="/requests">Requests</Link>
                <Link to="/donate">Donate</Link>
                {isLoggedIn ? (
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        window.location = '/login';
                    }}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;