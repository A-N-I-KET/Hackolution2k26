import React from 'react';
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
    return (
        <>
            <Navbar />
            <HeroSection />
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
