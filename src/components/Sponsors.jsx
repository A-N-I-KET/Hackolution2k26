import React, { useEffect, useRef } from 'react';

const sponsors = [
    { name: 'Devfolio', link: 'https://devfolio.co', imgSrc: '/assets/devfolio.png', tier: 'The Gold Sponsor' },
    { name: 'ETHIndia', link: 'https://ethindia.co', imgSrc: '/assets/Eth india.png', tier: 'The Silver Sponsor' },
    { name: 'Polygon', link: 'https://polygon.technology', initial: 'P', tier: 'The Silver Sponsor' },
    { name: 'Solana', link: 'https://solana.com', initial: 'S', tier: 'The Bronze Sponsor' },
    { name: 'Replit', link: 'https://replit.com', initial: 'R', tier: 'The Bronze Sponsor' },
    { name: 'GitHub', link: 'https://github.com', initial: 'G', tier: 'The Bronze Sponsor' },
    { name: '.xyz Domains', link: 'https://gen.xyz', initial: 'X', tier: 'The Bronze Sponsor' },
    { name: 'Wolfram', link: 'https://www.wolfram.com', initial: 'W', tier: 'The Bronze Sponsor' },
    { name: 'Taipy', link: 'https://www.taipy.io', initial: 'T', tier: 'The Bronze Sponsor' },
];

export default function Sponsors() {
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
        <section id="sponsors">
            <div className="section-wrapper fade-in" ref={ref}>
                <img src="/assets/sponsor.png" alt="Our Sponsors" className="section-banner" />
                <div className="sponsors-layout">
                    {sponsors.map((s) => (
                        <a
                            key={s.name}
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sponsor-card"
                        >
                            <div className="sponsor-card-inner">
                                {s.imgSrc ? (
                                    <img src={s.imgSrc} alt={s.name} className="sponsor-logo" />
                                ) : (
                                    <div className="sponsor-fallback">{s.initial}</div>
                                )}
                            </div>
                            <div className="sponsor-tier-label">{s.tier}</div>
                        </a>
                    ))}
                </div>
                <div className="sponsors-more">MORE TO COME</div>
            </div>
        </section>
    );
}
