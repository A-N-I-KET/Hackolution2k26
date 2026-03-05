import React, { useEffect, useRef } from 'react';

const partners = [
    { name: 'GDG on Campus', link: 'https://gdg.community.dev', imgSrc: '/assets/teamimage.png' },
    { name: 'MLH', link: 'https://mlh.io', imgSrc: '/assets/teamimage.png' },
    { name: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org', imgSrc: '/assets/teamimage.png' },
    { name: 'HackerEarth', link: 'https://www.hackerearth.com', imgSrc: '/assets/teamimage.png' },
    { name: 'CodeChef', link: 'https://www.codechef.com', imgSrc: '/assets/teamimage.png' },
    { name: 'Dev Community', link: 'https://dev.to', imgSrc: '/assets/teamimage.png' },
];

export default function CommunityPartners() {
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
        <section id="community">
            <div className="section-wrapper fade-in" ref={ref}>
                <img src="/assets/communitypartner.png" alt="Community Partners" className="section-banner" />
                <div className="sponsors-layout">
                    {partners.map((p) => (
                        <a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sponsor-card"
                        >
                            <div className="sponsor-card-inner">
                                {p.imgSrc ? (
                                    <img src={p.imgSrc} alt={p.name} className="sponsor-logo" />
                                ) : (
                                    <div className="sponsor-fallback">{p.initial || p.name[0]}</div>
                                )}
                            </div>
                            <div className="sponsor-tier-label">Partner</div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
