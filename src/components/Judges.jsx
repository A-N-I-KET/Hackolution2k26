import React, { useEffect, useRef } from 'react';

const judgesData = [
    { name: 'Dr. Sarah Mitchell', role: 'AI Researcher, Stanford', imgSrc: '/assets/teamimage.png', desc: 'A recognized pioneer in the field of artificial thought. Her insights guide our technical evaluations with precise logic.' },
    { name: 'Raj Patel', role: 'CTO, TechVentures', imgSrc: '/assets/teamimage.png', desc: 'An experienced captain of industry, overseeing wide-scale infrastructural feats across the globe. He seeks true substance.' },
    { name: 'Elena Rodriguez', role: 'VP Engineering, Google', imgSrc: '/assets/teamimage.png', desc: 'The remarkable mind behind some of the most reliable networks of our modern era. She honors speed and flawless execution.' },
    { name: 'Amit Sharma', role: 'Founder, CodeCraft', imgSrc: '/assets/teamimage.png', desc: 'A true artisan of the code. He meticulously inspects the craftsmanship of all software entries for their robust nature.' },
    { name: 'Prof. David Chen', role: 'CS Head, MIT', imgSrc: '/assets/teamimage.png', desc: 'Providing exact academic scrutiny to ensure the theoretical soundness of every proposed engine and mechanism.' },
    { name: 'Priya Nair', role: 'Lead Dev, Microsoft', imgSrc: '/assets/teamimage.png', desc: 'A seasoned architect whose daily work shapes the computing experiences of millions worldwide. She favors reliable design.' },
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
