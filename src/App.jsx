import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PageBreaker from './components/PageBreaker';
import AboutUs from './components/AboutUs';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import Partners from './components/Partners';
import Judges from './components/Judges';
import CommunityPartners from './components/CommunityPartners';
import Team from './components/Team';
import Socials from './components/Socials';
import Footer from './components/Footer';

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger entrance animations instantly since we removed the artificial black screen preloader
        setIsLoaded(true);

        const handleScroll = () => {
            // Hero section is 100vh, we toggle the class when we are within it.
            if (window.scrollY < window.innerHeight - 60) {
                document.documentElement.classList.add('hero-scroll');
            } else {
                document.documentElement.classList.remove('hero-scroll');
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Navbar isLoaded={isLoaded} />
            <HeroSection isLoaded={isLoaded} />
            <PageBreaker />
            <AboutUs />
            <PageBreaker />
            <Prizes />
            <PageBreaker />
            <Sponsors />
            <PageBreaker />
            <Partners />
            <PageBreaker />
            <Judges />
            <PageBreaker />
            <CommunityPartners />
            <PageBreaker />
            <Team />
            <PageBreaker />
            <Socials />
            <Footer />
        </>
    );
}
