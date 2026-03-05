import React, { useState } from 'react';
import { Link } from 'react-scroll';

const navItems = [
    { label: 'About Us', to: 'about' },
    { label: 'Prizes', to: 'prizes' },
    { label: 'Hacker Guide', to: 'hackerguide' },
    { label: 'More', to: 'faq', isDropdown: true },
];

const moreItems = [
    { label: 'Sponsors', to: 'sponsors' },
    { label: 'Judges', to: 'judges' },
    { label: 'Community Partners', to: 'community' },
    { label: 'FAQ', to: 'faq' },
    { label: 'Team', to: 'team' },
    { label: 'Contact Us', to: 'footer' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Left Side: Logo + Title */}
            <div className="navbar-left">
                <Link to="hero" smooth={true} duration={800} offset={-70} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/assets/hackolutionshortlogo.png" alt="Hackolution 2K26" className="navbar-logo" />
                    <span className="navbar-title">Hackolution 2K26</span>
                </Link>
            </div>

            {/* Right Side: Links + Register */}
            <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
                {navItems.map((item) => (
                    <li key={item.to} className={item.isDropdown ? 'nav-dropdown-wrapper' : ''}>
                        {item.isDropdown ? (
                            <>
                                <span
                                    className="nav-link nav-dropdown-trigger"
                                    onClick={() => setMoreOpen(!moreOpen)}
                                    onMouseEnter={() => setMoreOpen(true)}
                                >
                                    {item.label} ▾
                                </span>
                                {moreOpen && (
                                    <ul className="nav-dropdown" onMouseLeave={() => setMoreOpen(false)}>
                                        {moreItems.map((sub) => (
                                            <li key={sub.to}>
                                                <Link
                                                    className="nav-link"
                                                    to={sub.to}
                                                    smooth={true}
                                                    duration={800}
                                                    offset={-70}
                                                    onClick={() => { setMoreOpen(false); setMenuOpen(false); }}
                                                >
                                                    {sub.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
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
                        )}
                    </li>
                ))}
                <li>
                    <a
                        href="https://forms.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-register-btn"
                    >
                        Register Now
                    </a>
                </li>
            </ul>

            <div className={`hamburger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className="hamburger-line" />
                <div className="hamburger-line" />
                <div className="hamburger-line" />
            </div>
        </nav>
    );
}
