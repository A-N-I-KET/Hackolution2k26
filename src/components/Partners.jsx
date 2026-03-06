import React, { useEffect, useRef } from 'react';

const partnersData = [
    { name: 'Polygon', link: 'https://polygon.technology', imgSrc: '/assets/pujoplanner.png', style: { transform: 'scale(1.5)' }, desc: 'A formidable scaling network ensuring rapid and reliable deliveries across the entire realm.' },
    { name: 'Filecoin', link: 'https://filecoin.io', imgSrc: '/assets/pujoplanner.png', style: { transform: 'scale(1.5)' }, desc: 'Secure, resilient, and permanent storage. Your digital ledgers remain untouched by time.' },
    { name: 'Balsamiq', link: 'https://balsamiq.com', imgSrc: '/assets/pujoplanner.png', style: { transform: 'scale(1.5)' }, desc: 'The architect\'s choice. Rapid wireframing tools of the highest quality and simplicity.' },
    { name: 'Echo3D', link: 'https://www.echo3d.com', imgSrc: '/assets/pujoplanner.png', style: { transform: 'scale(1.5)' }, desc: 'A modern wonder of three-dimensional asset administration. Seamlessly bridging domains.' },
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

                <div className="vintage-prizes-grid">
                    {partnersData.map((p) => (
                        <a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="vintage-prize-col sponsor-override"
                        >
                            <div className="vintage-col-title">{p.name}</div>
                            <div className="vintage-img-wrapper sponsor-img-override">
                                {p.imgSrc ? (
                                    <img src={p.imgSrc} alt={p.name} className="vintage-col-img" style={p.style} />
                                ) : (
                                    <div className="sponsor-fallback">{p.initial}</div>
                                )}
                            </div>
                            <p className="vintage-col-desc">{p.desc}</p>
                            <div className="vintage-btn-wrap">
                                <div className="vintage-btn">OFFICIAL PARTNER</div>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
