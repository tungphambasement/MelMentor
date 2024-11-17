import React from 'react';

export function WhyChooseUs() {
    return (
        <div className="why-choose-us py-5 bg-light">
            <div className="container text-center">
                <h2>Why Melmentor?</h2>
                <div className="row mt-4">
                    <div className="col-md-3">
                        <i className="fas fa-users fa-3x"></i>
                        <h4>Expert Mentors</h4>
                        <p>Work with professionals who have years of experience.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fas fa-user-check fa-3x"></i>
                        <h4>Personalized Guidance</h4>
                        <p>Receive tailored advice to meet your personal goals.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fas fa-calendar-alt fa-3x"></i>
                        <h4>Flexible Sessions</h4>
                        <p>Schedule sessions at your convenience.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fas fa-wallet fa-3x"></i>
                        <h4>Affordable & Accessible</h4>
                        <p>Mentorship options for every budget.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
