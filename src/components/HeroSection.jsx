import React, { useEffect, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection({ isLoaded }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        handleResize(); // Check initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // 1. Ensure the script is injected
        const scriptId = 'devfolio-script';
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://apply.devfolio.co/v2/sdk.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        // 2. Set up a robust initializer
        const initDevfolio = () => {
            if (window.devfolio && typeof window.devfolio.init === 'function') {
                window.devfolio.init();
            }
        };

        // If we just created the script, wait for it to load before we observe the DOM
        script.addEventListener('load', () => {
            initDevfolio(); // try right away just in case
        });

        // 3. Watch the DOM for the apply-button element.
        // The Devfolio SDK fails if the script loads BEFORE the <div className="apply-button"> is in the DOM.
        // It also fails on React hot-reloads because the script is cached but the DOM node is recreated.
        const observer = new MutationObserver((mutations, obs) => {
            const applyBtn = document.querySelector('.apply-button');
            if (applyBtn && window.devfolio) {
                // Button is in the DOM AND script is loaded! Try initializing.
                initDevfolio();
            }
        });

        // Start observing immediately
        observer.observe(document.body, { childList: true, subtree: true });

        // Also try immediately in case it's already there (e.g. hot reload)
        initDevfolio();

        return () => {
            observer.disconnect();
            // We do NOT remove the script on unmount. Let it stay cached for faster navigation.
        };
    }, []);

    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    const introText = "INTRODUCING".split("");
    const mainText = "HACKOLUTION".split("");
    const subText = "2k26".split("");

    const [phase, setPhase] = useState('initial');
    const [currentTextIndex, setCurrentTextIndex] = useState(0); // 0 for intro, 1 for main

    useEffect(() => {
        if (isLoaded) {
            // Start intros
            setPhase('typingIntro');
            setCurrentTextIndex(0);

            // Wait for typing Intro to finish ("INTRODUCING" is 11 chars * 0.1s + 0.7s delay = ~1.8s)
            // Add some pause, say to 2.8s
            const t1 = setTimeout(() => {
                setPhase('hidden'); // quickly fade out Intro
            }, 2800);

            // After fade out, switch text to "HACKOLUTION" and start typing it
            const t2 = setTimeout(() => {
                setCurrentTextIndex(1);
                setPhase('typingMain');
            }, 3000);

            return () => { clearTimeout(t1); clearTimeout(t2); };
        } else {
            setPhase('initial');
            setCurrentTextIndex(0);
        }
    }, [isLoaded]);

    const svgVariants = {
        initial: { opacity: 0, scale: 1.5, y: -100 },
        typingIntro: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: 0.1, type: "spring", stiffness: 120, damping: 15 } },
        hidden: { opacity: 1, scale: 1, y: 0, transition: { duration: 0 } },
        typingMain: { opacity: 1, scale: 1, y: 0, transition: { duration: 0 } }
    };

    const letterVariants = {
        initial: { opacity: 0 },
        typingIntro: (i) => ({
            opacity: 1,
            transition: { delay: 0.7 + i * 0.1, duration: 0.1 }
        }),
        hidden: { opacity: 0, transition: { duration: 0.2 } },
        typingMain: (i) => ({
            opacity: 1,
            transition: { delay: 0.1 + i * 0.1, duration: 0.1 }
        })
    };

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
                    <source src="/assets/video.webm" type="video/webm" />
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
                        initial="initial"
                        animate={phase}
                        variants={svgVariants}
                        width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', willChange: "transform, opacity, filter" }}>
                        <defs>
                            <mask id="hero-text-mask">
                                <rect width="100%" height="100%" fill="white" />
                                <text x="50%" y="50%" dy="30px" textAnchor="middle" dominantBaseline="middle" className="hero-cutout-text" style={{ transformOrigin: 'center' }}>
                                    {currentTextIndex === 0 ? (
                                        introText.map((char, i) => (
                                            <motion.tspan key={`mask-intro-${i}`} custom={i} variants={letterVariants} fill="black">
                                                {char}
                                            </motion.tspan>
                                        ))
                                    ) : (
                                        <>
                                            {mainText.map((char, i) => (
                                                <motion.tspan key={`mask-main-${i}`} custom={i} variants={letterVariants} fill="black">
                                                    {char}
                                                </motion.tspan>
                                            ))}
                                            <tspan className="hero-version" dy={isMobile ? "1.33em" : "1.5em"} dx={isMobile ? "-2.5em" : "5px"}>
                                                {subText.map((char, i) => (
                                                    <motion.tspan key={`mask-sub-${i}`} custom={mainText.length + i} variants={letterVariants} fill="black">
                                                        {char}
                                                    </motion.tspan>
                                                ))}
                                            </tspan>
                                        </>
                                    )}
                                </text>
                            </mask>
                            <filter id="rough-edge" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                            <filter id="black-clouds">
                                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" seed="5" result="noise" />
                                <feColorMatrix type="matrix" values="
                                    0 0 0 0 0
                                    0 0 0 0 0
                                    0 0 0 0 0
                                    0 0 0 1.5 -0.2" in="noise" />
                            </filter>
                        </defs>
                        <rect width="100%" height="100%" fill="#9A0302" mask="url(#hero-text-mask)" />
                        <rect width="100%" height="100%" filter="url(#black-clouds)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} mask="url(#hero-text-mask)" />
                        <text x="50%" y="50%" dy="30px" textAnchor="middle" dominantBaseline="middle" filter="url(#rough-edge)" className="hero-cutout-text" style={{ transformOrigin: 'center' }}>
                            {currentTextIndex === 0 ? (
                                introText.map((char, i) => (
                                    <motion.tspan key={`stroke-intro-${i}`} custom={i} variants={letterVariants} fill="none" stroke="#000000" strokeWidth="4">
                                        {char}
                                    </motion.tspan>
                                ))
                            ) : (
                                <>
                                    {mainText.map((char, i) => (
                                        <motion.tspan key={`stroke-main-${i}`} custom={i} variants={letterVariants} fill="none" stroke="#000000" strokeWidth="4">
                                            {char}
                                        </motion.tspan>
                                    ))}
                                    <tspan className="hero-version" dy={isMobile ? "1.33em" : "1.5em"} dx={isMobile ? "-2.5em" : "5px"}>
                                        {subText.map((char, i) => (
                                            <motion.tspan key={`stroke-sub-${i}`} custom={mainText.length + i} variants={letterVariants} fill="none" stroke="#000000" strokeWidth="2">
                                                {char}
                                            </motion.tspan>
                                        ))}
                                    </tspan>
                                </>
                            )}
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
                        <a href="https://discord.gg/B4KZdv5N2P" target="_blank" rel="noopener noreferrer" className="discord-button">
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
