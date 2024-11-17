import React from 'react';
import './Home.scss'; // For custom styling if needed
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonial';
import { WhyChooseUs } from './WhyChooseUs';
import { JoinUs } from './JoinUsSection';
import { Footer } from './Footer';
export default function Home() {
    return (
        <div className='home-container'>
            <HeroSection />

            
            <HowItWorks />


            <Testimonials />

            <WhyChooseUs />

            <JoinUs />

        
            <Footer />
        </div>
    );
}
