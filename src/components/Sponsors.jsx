import React, { useEffect, useRef } from 'react';

const sponsorsData = [
    { name: 'Devfolio', link: 'https://devfolio.co', imgSrc: '/assets/devfolio.png', tier: 'The Gold Sponsor', desc: 'An undisputed leader in hackathon commerce. They supply only the most premium robust tools.' },
    { name: 'ETHIndia', link: 'https://ethindia.co', imgSrc: '/assets/Eth india.png', tier: 'The Silver Sponsor', desc: 'A marvel of the modern decentralized world. Known across the continent for their outstanding chain.' },
    { name: 'PujoPlanner', link: 'https://pujoplanner.com', imgSrc: '/assets/pujoplanner.png', tier: 'The Silver Sponsor', desc: 'Handling thousands of patrons daily, a few patterns stand out. The very best in local planning.', style: { transform: 'scale(1.5)' } },
    { name: 'Solana', link: 'https://solana.com', initial: 'S', tier: 'The Bronze Sponsor', desc: 'Lightning fast transactions. A simple but effective engine that leaves all competitors in the dust.' },
    { name: 'Replit', link: 'https://replit.com', initial: 'R', tier: 'The Bronze Sponsor', desc: 'The finest in cloud development. A complete environment consisting of everything a worker needs.' },
    { name: 'GitHub', link: 'https://github.com', initial: 'G', tier: 'The Bronze Sponsor', desc: 'The world\'s most dependable repository housing. Built for endurance and true collaborative spirit.' },
    { name: '.xyz Domains', link: 'https://gen.xyz', initial: 'X', tier: 'The Bronze Sponsor', desc: 'Secure your name in the expanding new frontier. Affordable, recognizable, and highly dependable.' },
    { name: 'Wolfram', link: 'https://www.wolfram.com', initial: 'W', tier: 'The Bronze Sponsor', desc: 'Computation of the highest order. Thousands have benefited from their exact mathematical engines.' },
    { name: 'Taipy', link: 'https://www.taipy.io', initial: 'T', tier: 'The Bronze Sponsor', desc: 'Build profound data applications with absolute ease. Tailored for the modern scientific engineer.' },
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

                <div className="vintage-catalogue-header">
                    <h2 className="vintage-title-main">OUR ESTEEMED EVENT SPONSORS</h2>
                    <h3 className="vintage-title-sub">
                        <span className="vintage-sub-left">CHECK OUT THESE</span>
                        <span className="vintage-sub-large">EXCELLENT ORGANIZATIONS</span>
                    </h3>
                </div>

                <div className="vintage-prizes-grid">
                    {sponsorsData.map((s) => (
                        <a
                            key={s.name}
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="vintage-prize-col sponsor-override"
                        >
                            <div className="vintage-col-title">{s.name}</div>
                            <div className="vintage-img-wrapper sponsor-img-override">
                                {s.imgSrc ? (
                                    <img src={s.imgSrc} alt={s.name} className="vintage-col-img" style={s.style} />
                                ) : (
                                    <div className="sponsor-fallback">{s.initial}</div>
                                )}
                            </div>
                            <p className="vintage-col-desc">{s.desc}</p>
                            <div className="vintage-btn-wrap">
                                <div className="vintage-btn">SUPPORT: {s.tier.replace('The ', '')}</div>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
