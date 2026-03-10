import React from 'react';
import { motion } from 'framer-motion';

export default function Venue() {
    return (
        <section id="venue" className="venue-section" style={{ minHeight: 'unset', display: 'flex', alignItems: 'center', padding: '10px 0' }}>
            <motion.div
                className="section-wrapper"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}
            >
                {/* ── Newspaper-style card ── */}
                <div className="newspaper-card" style={{ padding: 'clamp(15px, 4vw, 30px)', margin: '0' }}>
                    <div className="newspaper-border-top"></div>


                    <div className="newspaper-body" style={{ alignItems: 'flex-start', gap: 'clamp(10px, 3vw, 20px)', padding: '0' }}>

                        {/* Left Column: Text Content */}
                        <div className="newspaper-col-text" style={{ flex: '1.4', display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.5vw, 15px)' }}>
                            <p style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 'bold',
                                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                                letterSpacing: '1px',
                                margin: '0',
                                textTransform: 'uppercase',
                                borderBottom: '2px dotted var(--ink-dark)',
                                paddingBottom: 'clamp(8px, 1.5vw, 15px)',
                                textAlign: 'left'
                            }}>
                                THE VENUE OF HACKOLUTION 2026
                            </p>

                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                                lineHeight: '1.1',
                                margin: '5px 0 0 0',
                                textAlign: 'left',
                                textTransform: 'uppercase'
                            }}>
                                IT IS THE OCCASIONAL POLICY OF OUR HOUSE TO SUPPLY THE HACKER ON EVERY ASPECT OF THE VENUE THEY NEED AND SAVE THEM TIME
                            </h3>

                            <p style={{
                                fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                                lineHeight: '1.5',
                                textAlign: 'justify',
                                margin: '0',
                                marginTop: '10px'
                            }}>
                                Join us at the prestigious <strong>IEM ASHRAM CAMPUS</strong> — where code meets community. Whether you're a seasoned open-source contributor or writing your first lines of code, this is your stage. Connect with fellow developers, mentors, and industry leaders over 36 hours of non-stop building, learning, and innovating. Mark your calendars for the <strong>8th of May to the 9th of May 2026</strong> — bring your laptop, your ideas, and your passion. The rest, we've got covered.
                            </p>

                            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '10px', gap: '10px' }}>
                                <span style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(4.5rem, 10vw, 6.5rem)',
                                    lineHeight: '0.8',
                                    fontWeight: 'normal',
                                    color: 'var(--ink-dark)'
                                }}>
                                    W
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'clamp(2px, 1vw, 5px)' }}>
                                    <span style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                                        lineHeight: '1',
                                        fontWeight: 'normal'
                                    }}>
                                        E ARE DESPERATELY
                                    </span>
                                    <span style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
                                        lineHeight: '1',
                                        fontWeight: 'normal',
                                        marginTop: 'clamp(4px, 1vw, 8px)'
                                    }}>
                                        ANXIOUS FOR YOUR ARRIVAL.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="newspaper-col-illustration" style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                            <img
                                className="venue-illustration"
                                src="/assets/ashram.png"
                                alt="IEM Ashram Campus"
                                style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: 'none',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </div>



                    <div className="newspaper-border-bottom"></div>
                </div>
            </motion.div>
        </section>
    );
}
