import React, { useState } from 'react';
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

export default function Navbar({ isLoaded }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={isLoaded ? { y: 0 } : { y: -100 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="navbar"
        >
            {/* Left Side: Logo + Title */}
            <div className="navbar-left">
                {/* Logo and Title removed as requested */}
            </div>

            {/* Right Side: All Section Links */}
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
            </ul>

            <div className={`hamburger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className="hamburger-line" />
                <div className="hamburger-line" />
                <div className="hamburger-line" />
            </div>
        </motion.nav>
    );
}
