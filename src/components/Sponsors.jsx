import React, { useEffect, useRef } from 'react';

const sponsorsData = [
    { name: 'Devfolio', link: 'https://devfolio.co', imgSrc: '/assets/SPONSOR/Devfolio.png', tier: 'The Gold Sponsor', desc: 'An undisputed leader in hackathon commerce. They supply only the most premium robust tools.' },
    { name: 'ETHIndia', link: 'https://ethindia.co', imgSrc: '/assets/SPONSOR/ETHIndia.png', tier: 'The Silver Sponsor', desc: 'A marvel of the modern decentralized world. Known across the continent for their outstanding chain.' },
    { name: 'PujoPlanner', link: 'https://pujoplanner.com', imgSrc: '/assets/SPONSOR/pujoplanner.png', tier: 'The Silver Sponsor', desc: 'Handling thousands of patrons daily, a few patterns stand out. The very best in local planning.', style: { transform: 'scale(1.5)' } },
    { name: 'Hacknest', link: 'https://hacknest.in/', imgSrc: '/assets/SPONSOR/hacknest.png', tier: 'The Silver Sponsor', desc: 'Handling thousands of patrons daily, a few patterns stand out. The very best in local planning.', style: { transform: 'scale(1.0)' } },
    { name: 'Featherless.ai', link: 'https://featherless.ai/', imgSrc: '/assets/SPONSOR/featherlessai.png', tier: 'The Silver Sponsor', desc: 'Handling thousands of patrons daily, a few patterns stand out. The very best in local planning.', style: { transform: 'scale(1.5)' } },
    { name: 'Mastra.ai', link: 'https://mastra.ai/', imgSrc: '/assets/SPONSOR/mastra.png', tier: 'The Bronze Sponsor', desc: 'Handling thousands of patrons daily, a few patterns stand out. The very best in local planning.', style: { transform: 'scale(1.5)' } },
    { name: 'XYZ', link: 'https://gen.xyz/', imgSrc: '/assets/SPONSOR/xyz.png', tier: 'The Bronze Sponsor', desc: 'Handling thousands of patrons daily, a few patterns stand out. The very best in local planning.', style: { transform: 'scale(1.0)' } },
    
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
                            className={`vintage-prize-col sponsor-override ${s.tier === 'The Gold Sponsor' ? 'gold-sponsor' : s.tier === 'The Silver Sponsor' ? 'silver-sponsor' : s.tier === 'The Bronze Sponsor' ? 'bronze-sponsor' : ''}`}
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
