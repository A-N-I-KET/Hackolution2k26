import React, { useEffect } from 'react';

export default function HeroSection() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://apply.devfolio.co/v2/sdk.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    return (
        <section className="hero-section" id="hero" style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img
                src="/assets/hackolutionbiglogo.png"
                alt="Hackolution Big Logo"
                className="hero-big-logo"
                style={{
                    width: '90%',
                    maxWidth: '1200px',
                    height: 'auto',
                    filter: 'drop-shadow(4px 8px 25px rgba(0, 0, 0, 0.5))',
                    animation: 'fadeInUp 1s ease-out',
                    marginBottom: '20px'
                }}
            />
            <div
                className="apply-button"
                data-hackathon-slug="hackolution2k26"
                data-button-theme="light"
                style={{ height: '44px', width: '312px' }}
            ></div>
        </section>
    );
}
