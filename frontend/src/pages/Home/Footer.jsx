import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container text-center">
                <ul className="list-inline">
                    <li className="list-inline-item"><Link to="/">Home</Link></li>
                    <li className="list-inline-item"><Link to="/how-it-works">How It Works</Link></li>
                    <li className="list-inline-item"><Link to="/mentors">Mentors</Link></li>
                    <li className="list-inline-item"><Link to="/signup">Sign Up</Link></li>
                    <li className="list-inline-item"><Link to="/login">Log In</Link></li>
                </ul>
                <p className="mb-0">© 2024 Melmentor. All rights reserved.</p>
            </div>
        </footer>
    );
}
