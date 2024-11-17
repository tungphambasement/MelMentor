import React from 'react';

export function HeroSection() {
    return (
        <div className="hero-section text-center py-5" style={{ backgroundImage: 'url("/images/hero-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container">
                <h1 className="display-4 text-dark">Unlock Your Potential with Expert Mentorship</h1>
                <p className="lead text-dark">Connect with experienced professionals to guide your career, studies, and personal growth.</p>
                <a href="/signup" className="btn btn-primary btn-lg">Get Started</a>
                <a href="/mentors" className="btn btn-outline-dark btn-lg ms-3">Find a Mentor</a>
            </div>
        </div>
    );
}