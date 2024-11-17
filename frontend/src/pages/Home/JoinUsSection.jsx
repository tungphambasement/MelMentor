import React from 'react';

export function JoinUs() {
    return (
        <div className="join-us py-5">
            <div className="container text-center">
                <h2>Join Melmentor Today</h2>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h4>For Mentees</h4>
                        <p>Learn new skills, get career advice, and grow with expert guidance.</p>
                        <a href="/signup" className="btn btn-primary">Sign Up as a Mentee</a>
                    </div>
                    <div className="col-md-6">
                        <h4>For Mentors</h4>
                        <p>Share your expertise, help others, and make an impact.</p>
                        <a href="/signup" className="btn btn-outline-primary">Become a Mentor</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
