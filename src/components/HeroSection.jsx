import React, { useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection({ isLoaded }) {
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
                <motion.video
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 15, ease: "easeOut" }}
                    autoPlay loop muted playsInline className="hero-bg-video"
                    style={{ willChange: "transform" }}
                >
                    <source src="/assets/video.mp4" type="video/mp4" />
                </motion.video>

                {/* Constant film grain and vignette to pull focus over the video */}
                <div className="hero-vignette"></div>
                <div className="film-grain"></div>

                {/* Dark overlay that fades out to reveal the video */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isLoaded ? 0 : 1 }}
                    transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#1a1d1a',
                        zIndex: 0
                    }}
                />

                <div className="hero-cutout-container" style={{ willChange: "transform, opacity" }}>
                    <motion.svg
                        initial={{ opacity: 0, scale: 1.5, y: -100 }}
                        animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.5, y: -100 }}
                        transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 120, damping: 15 }}
                        width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', willChange: "transform, opacity" }}>
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
                    </motion.svg>
                    {/* Hidden text for screen readers */}
                    <h1 style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>HACKOLUTION 2k26</h1>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="hero-bottom-bar" style={{ pointerEvents: 'auto', willChange: "transform, opacity" }}>
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
                </motion.div>
            </motion.div>
        </section>
    );
}
