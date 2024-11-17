import React from 'react';

export function Testimonials() {
    const testimonials = [
        { name: "Alex Johnson", text: "Melmentor helped me find the guidance I needed to switch careers. Highly recommend!" },
        { name: "Emily White", text: "Thanks to my mentor, I gained confidence and landed my dream job." },
        { name: "Michael Brown", text: "My mentor was knowledgeable and provided great advice." }
    ];

    return (
        <div className="testimonials py-5">
            <div className="container text-center">
                <h2>What Our Mentees Say</h2>
                <div className="row mt-4">
                    {testimonials.map((testimonial, index) => (
                        <div className="col-md-4" key={index}>
                            <blockquote className="blockquote">
                                <p>"{testimonial.text}"</p>
                                <footer className="blockquote-footer">{testimonial.name}</footer>
                            </blockquote>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
