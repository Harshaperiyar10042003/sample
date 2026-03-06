import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CourseDisplay from '../components/CourseHeader'
import PlacementGuidance from '../components/PlacementGuidance'
import Footer from '../components/Footer'
import WhatWeDo from '../components/WhatWeDo'
import ClientsSec from '../components/ClientsSec'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const HomPage = () => {
    const location = useLocation();

    useEffect(() => {
        // Handle hash navigation when component mounts or hash changes
        if (location.hash) {
            const elementId = location.hash.substring(1); // Remove the #
            const element = document.getElementById(elementId);
            if (element) {
                // Small timeout to ensure page is fully loaded
                setTimeout(() => {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' 
                    });
                }, 100);
            }
        }
    }, [location.hash]);
    return (
        <div>
            <Navbar />
            <Hero />
            <WhatWeDo />
            <section id="courses-section">
                <CourseDisplay />
            </section>
            <ClientsSec />
            <PlacementGuidance />
            <Footer />
        </div>
    )
}

export default HomPage
