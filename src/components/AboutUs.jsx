import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Open Theme',
        desc: 'Build anything your heart desires. No restrictions on technology, domain, or imagination — the frontier is yours to conquer.',
        icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 25 C50 25 35 20 15 22 C15 22 13 22 13 25 L13 72 C13 74 15 75 15 75 C35 73 50 78 50 78 C50 78 65 73 85 75 C85 75 87 74 87 72 L87 25 C87 22 85 22 85 22 C65 20 50 25 50 25Z" />
                <line x1="50" y1="25" x2="50" y2="78" />
                <line x1="22" y1="35" x2="42" y2="33" />
                <line x1="22" y1="45" x2="42" y2="43" />
                <line x1="22" y1="55" x2="42" y2="53" />
                <line x1="22" y1="65" x2="42" y2="63" />
                <line x1="58" y1="33" x2="78" y2="35" />
                <line x1="58" y1="43" x2="78" y2="45" />
                <line x1="58" y1="53" x2="78" y2="55" />
                <line x1="58" y1="63" x2="78" y2="65" />
            </svg>
        ),
    },
    {
        title: '36 Hours',
        desc: 'A full thirty-six hours of relentless building, learning, and creating. Rest is for the weary — innovation never sleeps.',
        icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="50" cy="55" r="30" />
                <circle cx="50" cy="55" r="26" />
                <path d="M50 25 C44 18 42 15 45 12 C48 9 52 9 55 12 C58 15 56 18 50 25Z" />
                <path d="M42 14 C35 10 28 12 25 18 C22 24 20 28 18 30" />
                <circle cx="16" cy="32" r="3" />
                <line x1="50" y1="55" x2="50" y2="38" />
                <line x1="50" y1="55" x2="62" y2="50" />
                <circle cx="50" cy="55" r="2" fill="currentColor" />
                <line x1="50" y1="31" x2="50" y2="34" />
                <line x1="50" y1="76" x2="50" y2="79" />
                <line x1="26" y1="55" x2="29" y2="55" />
                <line x1="71" y1="55" x2="74" y2="55" />
            </svg>
        ),
    },
    {
        title: 'Multiple Domains',
        desc: 'From artificial intelligence to blockchain, web development to hardware — explore any domain that strikes your fancy.',
        icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="42" cy="45" r="28" />
                <ellipse cx="42" cy="45" rx="12" ry="28" />
                <line x1="14" y1="45" x2="70" y2="45" />
                <path d="M18 32 C28 30 56 30 66 32" />
                <path d="M18 58 C28 60 56 60 66 58" />
                <rect x="68" y="30" width="22" height="10" rx="1" />
                <rect x="68" y="44" width="22" height="10" rx="1" />
                <rect x="68" y="58" width="22" height="10" rx="1" />
                <line x1="72" y1="35" x2="74" y2="35" />
                <line x1="72" y1="49" x2="74" y2="49" />
                <line x1="72" y1="63" x2="74" y2="63" />
            </svg>
        ),
    },
    {
        title: 'Offline Hackathon',
        desc: 'An in-person gathering of the finest minds. Meet your fellow innovators face to face — no screens between you.',
        icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 40 C30 28 70 28 80 40" />
                <path d="M28 50 C36 40 64 40 72 50" />
                <path d="M36 60 C42 52 58 52 64 60" />
                <circle cx="50" cy="68" r="4" fill="currentColor" />
                <line x1="25" y1="75" x2="75" y2="30" strokeWidth="4" />
            </svg>
        ),
    },
    {
        title: 'Multiple Prizes',
        desc: 'Handsome rewards await the boldest pioneers. Cash prizes, sponsor bounties, and special category awards for all.',
        icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 25 L30 50 C30 65 42 72 50 72 C58 72 70 65 70 50 L70 25 Z" />
                <path d="M30 35 C20 35 15 42 18 52 C20 58 26 58 30 55" />
                <path d="M70 35 C80 35 85 42 82 52 C80 58 74 58 70 55" />
                <path d="M50 38 L53 47 L62 47 L55 53 L58 62 L50 57 L42 62 L45 53 L38 47 L47 47 Z" fill="currentColor" />
                <line x1="50" y1="72" x2="50" y2="80" />
                <path d="M38 80 L62 80 L62 85 L38 85 Z" />
            </svg>
        ),
    },
    {
        title: 'Team Collaborations',
        desc: 'Form alliances with up to four members. Together, your combined skills shall forge something truly remarkable.',
        icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="50" cy="30" r="8" />
                <path d="M36 55 C36 42 64 42 64 55" />
                <circle cx="25" cy="38" r="6" />
                <path d="M15 58 C15 48 35 48 35 58" />
                <circle cx="75" cy="38" r="6" />
                <path d="M65 58 C65 48 85 48 85 58" />
                <circle cx="50" cy="75" r="10" />
                <circle cx="50" cy="75" r="4" />
                <line x1="50" y1="63" x2="50" y2="66" />
                <line x1="50" y1="84" x2="50" y2="87" />
                <line x1="38" y1="75" x2="41" y2="75" />
                <line x1="59" y1="75" x2="62" y2="75" />
                <line x1="42" y1="67" x2="44" y2="69" />
                <line x1="56" y1="81" x2="58" y2="83" />
                <line x1="42" y1="83" x2="44" y2="81" />
                <line x1="56" y1="69" x2="58" y2="67" />
            </svg>
        ),
    },
];

export default function AboutUs() {
    return (
        <section id="about" className="about-section">
            <motion.div
                className="section-wrapper"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                {/* ── Newspaper-style card ── */}
                <div className="newspaper-card">

                    {/* Top decorative border */}
                    <div className="newspaper-border-top"></div>

                    <h2 className="section-heading" style={{ marginTop: '10px' }}>About</h2>

                    {/* Subheading banner */}
                    <div className="newspaper-header" style={{ borderTop: '1px solid var(--ink-brown)', borderBottom: '1px solid var(--ink-brown)', margin: '10px 0' }}>
                        <span className="newspaper-header-text">
                            The Most Anticipated Hackathon of the Year
                        </span>
                    </div>

                    {/* Two-column body */}
                    <div className="newspaper-body">
                        {/* Left column — The Article */}
                        <div className="newspaper-col-text">

                            <h3 className="newspaper-headline" style={{ borderBottom: '2px solid var(--ink-dark)', paddingBottom: '15px', marginBottom: '20px', textAlign: 'center' }}>
                                A SOLEMN PROMISE TO SUPPLY THE INNOVATOR ON EVERY ASPECT OF THEIR CRAFT & REWARD THEM HANDSOMELY
                            </h3>

                            <div style={{ columnCount: 2, columnGap: '30px', columnRule: '1px solid var(--ink-brown)', textAlign: 'justify' }}>
                                <p className="newspaper-text newspaper-dropcap" style={{ marginTop: 0 }}>
                                    Welcome to <strong>Hackolution 2K26</strong> — where innovation meets the spirit of the frontier!
                                    Born from the passion of coders, designers, and dreamers, Hackolution has grown into one of the
                                    most anticipated hackathons of the year. Our journey began with a simple idea: bring together
                                    the brightest minds to solve real-world problems, one line of code at a time.
                                </p>
                                <p className="newspaper-text">
                                    Since its inception, Hackolution has attracted thousands of participants from across the nation,
                                    fostering collaboration, creativity, and technological breakthroughs. From AI-powered solutions
                                    to blockchain innovations, our participants have built projects that push the boundaries of what's
                                    possible. This year, we embrace the wild west spirit — bold, fearless, and pioneering.
                                </p>
                                <p className="newspaper-text">
                                    Whether you're a seasoned developer or a first-time hacker, Hackolution 2K26 offers you the
                                    stage to showcase your skills, learn from industry leaders, win incredible prizes, and forge
                                    connections that last a lifetime.
                                </p>
                            </div>
                        </div>

                        {/* Right column — vintage illustration */}
                        <div className="newspaper-col-illustration">
                            <img
                                className="newspaper-illustration"
                                src="/assets/hackolutionbiglogo.png"
                                alt="Hackolution 2K26"
                            />
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="newspaper-tagline">
                        <p className="newspaper-tagline-text">
                            <span className="newspaper-tagline-dropcap">S</span>addle Up, Partner
                            — The Frontier of Innovation Awaits!
                        </p>
                    </div>

                    {/* Bottom decorative border */}
                    <div className="newspaper-border-bottom"></div>
                </div>

                {/* Feature Highlights Grid — Catalogue Product Cards */}
                <div className="about-features-grid">
                    {features.map((feature, index) => (
                        <div className="about-feature-card" key={index}>
                            <h3 className="about-feature-title">{feature.title}</h3>
                            <div className="about-feature-icon">
                                {feature.icon}
                            </div>
                            <p className="about-feature-desc">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
