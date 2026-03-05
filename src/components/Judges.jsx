import React, { useEffect, useRef } from 'react';

const judges = [
    { name: 'Dr. Sarah Mitchell', role: 'AI Researcher, Stanford', imgSrc: '/assets/teamimage.png' },
    { name: 'Raj Patel', role: 'CTO, TechVentures', imgSrc: '/assets/teamimage.png' },
    { name: 'Elena Rodriguez', role: 'VP Engineering, Google', imgSrc: '/assets/teamimage.png' },
    { name: 'Amit Sharma', role: 'Founder, CodeCraft Labs', imgSrc: '/assets/teamimage.png' },
    { name: 'Prof. David Chen', role: 'CS Department Head, MIT', imgSrc: '/assets/teamimage.png' },
    { name: 'Priya Nair', role: 'Lead Developer, Microsoft', imgSrc: '/assets/teamimage.png' },
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
                <img src="/assets/judges.png" alt="Judges" className="section-banner" />
                <div style={{ height: '20px' }} />
                <div className="cards-grid">
                    {judges.map((j) => (
                        <div className="card" key={j.name}>
                            {j.imgSrc ? (
                                <img src={j.imgSrc} alt={j.name} className="card-img-full" />
                            ) : (
                                <div className="card-img-full" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '3rem',
                                    color: 'var(--ink-dark)',
                                }}>
                                    {j.initial}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
