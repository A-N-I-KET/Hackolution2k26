import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const navItems = [
    { label: 'About Us', to: 'about' },
    { label: 'Prizes', to: 'prizes' },
    { label: 'Sponsors', to: 'sponsors' },
    { label: 'Partners', to: 'partners' },
    { label: 'Judges', to: 'judges' },
    { label: 'Community Partners', to: 'community' },
    { label: 'Team', to: 'team' },
    { label: 'Contact Us', to: 'footer' },
];

// Quick links shown directly in the mobile navbar (not inside hamburger)
const mobileQuickItems = [
    { label: 'Prizes', to: 'prizes' },
    { label: 'Sponsors', to: 'sponsors' },
];

export default function Navbar({ isLoaded }) {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.classList.remove('mobile-menu-open');
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.classList.remove('mobile-menu-open');
        };
    }, [menuOpen]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={isLoaded ? { y: 0 } : { y: -100 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className={`navbar${menuOpen ? ' menu-open' : ''}`}
        >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', display: menuOpen ? 'none' : 'block' }}>
                <svg width="100%" height="100%">
                    <defs>
                        <filter id="nav-black-clouds">
                            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" seed="5" result="noise" />
                            <feColorMatrix type="matrix" values="
                                0 0 0 0 0
                                0 0 0 0 0
                                0 0 0 0 0
                                0 0 0 1.5 -0.2" in="noise" />
                        </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="#9A0302" />
                    <rect width="100%" height="100%" filter="url(#nav-black-clouds)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
                </svg>
            </div>
            {/* Left Side: Logo + Title */}
            <div className="navbar-left">
                {/* Logo and Title removed as requested */}
            </div>

            {/* Right Side: All Section Links (desktop + hamburger drawer) */}
            <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
                {navItems.map((item) => (
                    <li key={item.to}>
                        <Link
                            className="nav-link"
                            to={item.to}
                            smooth={true}
                            duration={800}
                            offset={-70}
                            spy={true}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                <li>
                    <a
                        href="https://hackolution2k26.devfolio.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link nav-register-btn"
                        onClick={() => setMenuOpen(false)}
                    >
                        REGISTER NOW
                    </a>
                </li>
            </ul>

            {/* Mobile quick-links: visible directly in navbar on small screens */}
            <div className="mobile-quick-links">
                {mobileQuickItems.map((item) => (
                    <Link
                        key={item.to}
                        className="mobile-quick-link"
                        to={item.to}
                        smooth={true}
                        duration={800}
                        offset={-70}
                        spy={true}
                    >
                        {item.label}
                    </Link>
                ))}
                <a
                    href="https://hackolution2k26.devfolio.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-quick-link mobile-nav-register-btn"
                >
                    REGISTER NOW
                </a>
            </div>

            <div className={`hamburger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className="hamburger-line" />
                <div className="hamburger-line" />
                <div className="hamburger-line" />
            </div>
        </motion.nav>
    );
}
