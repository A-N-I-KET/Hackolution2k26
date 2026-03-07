import React from 'react';
import './FloatingButton.css';

export default function FloatingButton() {
    const scrollToHero = () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <button className="floating-btn" onClick={scrollToHero} aria-label="Scroll to Hero Section">
            <img src="/assets/hackolutionshortlogo.png" alt="Hackolution Logo" />
        </button>
    );
}
