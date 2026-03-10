import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StartSection from './components/StartSection';
import PageBreaker from './components/PageBreaker';
import AboutUs from './components/AboutUs';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import Partners from './components/Partners';
import Judges from './components/Judges';
import CommunityPartners from './components/CommunityPartners';
import Team from './components/Team';
import Venue from './components/Venue';
import Socials from './components/Socials';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
            <motion.div
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: 'var(--accent-red)',
                    transformOrigin: '0%',
                    zIndex: 2000
                }}
            />
            <Navbar isLoaded={isLoaded} />
            <HeroSection isLoaded={isLoaded} />
            <StartSection />
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
            <Venue />
            <PageBreaker />
            <Socials />
            <Footer />
            <FloatingButton />
        </>
    );
}
