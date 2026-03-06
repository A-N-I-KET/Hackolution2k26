import React, { useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import { motion, useScroll, useTransform } from 'framer-motion';

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

    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section className="hero-revamped" id="hero">
            <motion.div style={{ scale, opacity, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                <video autoPlay loop muted playsInline className="hero-bg-video">
                    <source src="/assets/video.mp4" type="video/mp4" />
                </video>
                <div className="hero-cutout-container">
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                        <defs>
                            <mask id="hero-text-mask">
                                <rect width="100%" height="100%" fill="white" />
                                <text x="50%" y="50%" dy="30px" textAnchor="middle" dominantBaseline="middle" fill="black" className="hero-cutout-text" style={{ transformOrigin: 'center' }}>
                                    HACKOLUTION<tspan className="hero-version" dy="1.5em" dx="5px" fill="black">2k26</tspan>
                                </text>
                            </mask>
                            <filter id="rough-edge" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                        </defs>
                        <rect width="100%" height="100%" fill="#9A0302" mask="url(#hero-text-mask)" />
                        <text x="50%" y="50%" dy="30px" textAnchor="middle" dominantBaseline="middle" fill="none" stroke="#000000" strokeWidth="4" filter="url(#rough-edge)" className="hero-cutout-text" style={{ transformOrigin: 'center' }}>
                            HACKOLUTION<tspan className="hero-version" dy="1.5em" dx="5px" fill="none" stroke="#000000" strokeWidth="2">2k26</tspan>
                        </text>
                    </svg>
                    {/* Hidden text for screen readers */}
                    <h1 style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>HACKOLUTION 2k26</h1>
                </div>
                <div className="hero-bottom-bar" style={{ pointerEvents: 'auto' }}>
                    <div className="hero-bottom-left">
                    </div>
                    <div className="hero-bottom-center">
                        <div
                            className="apply-button"
                            data-hackathon-slug="hackolution2k26"
                            data-button-theme="light"
                            style={{ height: '44px', width: '312px' }}
                        ></div>
                        <CountdownTimer />
                        <a href="https://discord.gg/xV9GNx4t" target="_blank" rel="noopener noreferrer" className="discord-button">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" alt="Discord" />
                            JOIN OUR DISCORD
                        </a>
                    </div>
                    <div className="hero-bottom-right">
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
