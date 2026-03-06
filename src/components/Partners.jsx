import React, { useEffect, useRef } from 'react';

const partnersData = [
    { name: 'Eventopia', link: 'https://eventopia.in/', imgSrc: '/assets/PARTNER/eventopia.png', title: 'Media Partner' },
    { name: 'Hacknest', link: 'https://hacknest.in/', imgSrc: '/assets/SPONSOR/hacknest.png', title: 'Technical Partner' },
   
];

export default function Partners() {
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
        <section id="partners">
            <div className="section-wrapper fade-in" ref={ref}>

                <div className="vintage-catalogue-header">
                    <h2 className="vintage-title-main">OUR ESTEEMED PARTNERS</h2>
                    <h3 className="vintage-title-sub">
                        <span className="vintage-sub-left">ALLIED WITH</span>
                        <span className="vintage-sub-large">INDUSTRY LEADERS</span>
                    </h3>
                </div>

                <div className="partner-cards-grid">
                    {partnersData.map((p) => (
                        <a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="partner-card"
                        >
                            {/* Ribbon banner for the partner title */}
                            <div className="partner-ribbon">
                                <span className="partner-ribbon-text">{p.title}</span>
                            </div>

                            {/* Logo area */}
                            <div className="partner-logo-area">
                                {p.imgSrc ? (
                                    <img src={p.imgSrc} alt={p.name} className="partner-logo-img" />
                                ) : (
                                    <div className="partner-logo-fallback">{p.name.charAt(0)}</div>
                                )}
                            </div>

                            {/* Partner name */}
                            <div className="partner-name-plate">
                                <span className="partner-name-text">{p.name}</span>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
