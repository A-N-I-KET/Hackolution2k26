import React from 'react';

export default function HeroSection() {
    return (
        <section className="hero-section" id="hero" style={{ padding: '20px 0', display: 'flex', justifyContent: 'center' }}>
            <img
                src="/assets/hackolutionbiglogo.png"
                alt="Hackolution Big Logo"
                className="hero-big-logo"
                style={{
                    width: '90%',
                    maxWidth: '1200px',
                    height: 'auto',
                    filter: 'drop-shadow(4px 8px 25px rgba(0, 0, 0, 0.5))',
                    animation: 'fadeInUp 1s ease-out'
                }}
            />
        </section>
    );
}
