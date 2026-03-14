import React, { useEffect, useRef } from 'react';

const sponsorsData = [
    { name: 'Devfolio', link: 'https://devfolio.co', imgSrc: '/assets/SPONSOR/Devfolio.png', tier: 'The Gold Sponsor', desc: 'An undisputed leader in hackathon commerce. They supply only the most premium robust tools.' },
    { name: 'ETHIndia', link: 'https://ethindia.co', imgSrc: '/assets/SPONSOR/ETHIndia.png', tier: 'The Silver Sponsor', desc: 'A marvel of the modern decentralized world. Known across the continent for their outstanding chain.' },
    { name: 'PujoPlanner', link: 'https://pujoplanner.com', imgSrc: '/assets/SPONSOR/pujoplanner.png', tier: 'The Silver Sponsor', desc: 'Your ultimate companion for navigating Durga Puja pandals. Smart route planning and real-time updates at your fingertips.', style: { transform: 'scale(1.5)' } },
    { name: 'Hacknest', link: 'https://hacknest.in/', imgSrc: '/assets/SPONSOR/hacknest.png', tier: 'The Silver Sponsor', desc: 'A thriving community platform connecting hackers, builders, and innovators to collaborate and create together.', style: { transform: 'scale(1.0)' } },
    { name: 'Featherless.ai', link: 'https://featherless.ai/', imgSrc: '/assets/SPONSOR/featherlessai.png', tier: 'The Silver Sponsor', desc: 'Run open-source AI models with zero infrastructure hassle. Serverless inference that scales effortlessly.', style: { transform: 'scale(1.5)' } },
    { name: 'CodeCrafters', link: 'https://codecrafters.io/', imgSrc: '/assets/SPONSOR/codecrafters.svg', tier: 'The Silver Sponsor', desc: 'Master complex programming by building real-world software from scratch. Practice with Redis, Git, Docker and more.', style: { transform: 'scale(1.0)' } },
    { name: 'Mastra.ai', link: 'https://mastra.ai/', imgSrc: '/assets/SPONSOR/mastra.png', tier: 'The Bronze Sponsor', desc: 'The open-source TypeScript AI agent framework. Build, test, and deploy AI agents with ease.', style: { transform: 'scale(1.5)' } },
    { name: 'XYZ', link: 'https://gen.xyz/', imgSrc: '/assets/SPONSOR/xyz.png', tier: 'The Bronze Sponsor', desc: 'The domain for the next generation of internet users. Affordable, memorable, and perfect for your next big idea.', style: { transform: 'scale(1.0)' } },
    { name: 'Appwrite', link: 'https://appwrite.io/', imgSrc: '/assets/SPONSOR/appwrite.png', tier: 'The Bronze Sponsor', desc: 'An open-source backend platform for building secure web and mobile apps with auth, databases, and storage.', style: { transform: 'scale(1.0)' } },
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
                <div className="vintage-judges-footer">
                    <span>==== MORE TO COME ====</span>
                </div>
            </div>
        </section>
    );
}
