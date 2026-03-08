import React, { useEffect, useRef } from 'react';

const judgesData = [
    { name: 'AVIK AGARWALA', role: 'SYSTEM ENGINEER @ TCS', imgSrc: '/assets/JUDGES/AVIK.png', desc: 'A recognized pioneer in the field of artificial thought. Her insights guide our technical evaluations with precise logic.', linkedin: 'https://www.linkedin.com/in/avikagarwala/' },
    { name: 'KRISHNENDU DASGUPTA', role: 'Ex Backend Developer @Altor', imgSrc: '/assets/JUDGES/KRISNENDU.png', desc: 'An experienced captain of industry, overseeing wide-scale infrastructural feats across the globe. He seeks true substance.', linkedin: 'https://www.linkedin.com/in/krishnendudg/' },
    { name: 'SUBHAM BHATTACHARYA', role: 'SWE @ ABP', imgSrc: '/assets/JUDGES/SUBHAM.png', desc: 'The remarkable mind behind some of the most reliable networks of our modern era. She honors speed and flawless execution.', linkedin: 'https://www.linkedin.com/in/subham2409/' },
];

export default function Judges() {
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="judges">
            <div className="section-wrapper fade-in" ref={ref}>

                <div className="vintage-judges-header">
                    <div className="vintage-judges-left">MEET OUR DISTINGUISHED JUDGES</div>
                    <div className="vintage-judges-right">
                        <span>CHECK OUT THESE EXCELLENT PROFESSIONALS</span>
                        <span>AVAILABLE FOR EXPERT EVALUATIONS</span>
                    </div>
                </div>

                <div className="vintage-judges-divider"></div>

                <div className="vintage-judges-grid">
                    {judgesData.map((j) => (
                        <div key={j.name} className="vintage-judge-col">
                            <div className="vintage-judge-title">{j.name}</div>
                            <div className="vintage-judge-img-wrap">
                                {j.imgSrc ? (
                                    <img src={j.imgSrc} alt={j.name} className="vintage-judge-img" />
                                ) : (
                                    <div className="vintage-judge-fallback">{j.name.charAt(0)}</div>
                                )}
                            </div>
                            <p className="vintage-judge-desc">{j.desc}</p>
                            <div className="vintage-judge-role">
                                <span>Role</span>
                                <span className="dots"></span>
                                <span style={{ textAlign: 'right' }}>{j.role}</span>
                            </div>
                            {j.linkedin && (
                                <a href={j.linkedin} target="_blank" rel="noopener noreferrer" className="vintage-judge-linkedin">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                    </svg>
                                    <span>CONNECT ON LINKEDIN</span>
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                <div className="vintage-judges-footer">
                    <span>==== HACKOLUTION 2K26 ====</span>
                </div>

            </div>
        </section>
    );
}
