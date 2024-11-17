import React from 'react';

export function HowItWorks() {
    return (
        <div className="how-it-works py-5">
            <div className="container text-center">
                <h2>How Melmentor Works</h2>
                <div className="row mt-4">
                    <div className="col-md-3">
                        <i className="fas fa-user-plus fa-3x"></i>
                        <h4>Sign Up</h4>
                        <p>Create a free account in seconds.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fas fa-search fa-3x"></i>
                        <h4>Find a Mentor</h4>
                        <p>Browse expert mentors in various fields.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fas fa-comments fa-3x"></i>
                        <h4>Connect</h4>
                        <p>Schedule sessions and start learning.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fas fa-chart-line fa-3x"></i>
                        <h4>Grow</h4>
                        <p>Receive personalized advice to accelerate your growth.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
