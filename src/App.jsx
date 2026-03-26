import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StartSection from './components/StartSection';
import HacknestTeamPortal from './components/HacknestTeamPortal';
import { motion, useScroll, useSpring } from 'framer-motion';

const PageBreaker = lazy(() => import('./components/PageBreaker'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const Prizes = lazy(() => import('./components/Prizes'));
const Sponsors = lazy(() => import('./components/Sponsors'));
const Partners = lazy(() => import('./components/Partners'));
const Judges = lazy(() => import('./components/Judges'));
const CommunityPartners = lazy(() => import('./components/CommunityPartners'));
const Team = lazy(() => import('./components/Team'));
const Venue = lazy(() => import('./components/Venue'));
const Timeline = lazy(() => import('./components/Timeline'));
const Socials = lazy(() => import('./components/Socials'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingButton = lazy(() => import('./components/FloatingButton'));

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pathname, setPathname] = useState(window.location.pathname);

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
        const handlePathChange = () => setPathname(window.location.pathname);
        window.addEventListener('popstate', handlePathChange);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('popstate', handlePathChange);
        };
    }, []);

    if (pathname === '/hacknest-team-portal') {
        return (
            <>
                <HacknestTeamPortal />
                <Analytics />
            </>
        );
    }

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
            <Suspense fallback={null}>
                <AboutUs />
                <PageBreaker />
                <Prizes />
                <PageBreaker />
                <Timeline />
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
            </Suspense>
            <Analytics />
        </>
    );
}
