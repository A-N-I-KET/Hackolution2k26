import React, { useEffect, useRef } from 'react';

const partnersData = [
    { name: 'INNOFUSION', link: 'https://www.innofusion.tech/', imgSrc: '/assets/COMMUNITY/innofusion.png' },
   
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

                <div className="vintage-judges-header" style={{ marginBottom: '25px' }}>
                    <div className="vintage-judges-left" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>OUR COMMUNITY PARTNERS</div>
                    <div className="vintage-judges-right">
                        <span>THE ALLIED FORCES THAT MAKE</span>
                        <span>THIS GATHERING POSSIBLE</span>
                    </div>
                </div>

                <div className="vintage-judges-divider"></div>

                <div className="vintage-partners-grid">
                    {partnersData.map((p) => (
                        <a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="vintage-partner-col text-only"
                        >
                            <div className="vintage-partner-img-wrap">
                                {p.imgSrc ? (
                                    <img src={p.imgSrc} alt={p.name} className="vintage-partner-img" />
                                ) : (
                                    <div className="vintage-partner-fallback">{p.name.charAt(0)}</div>
                                )}
                            </div>
                            <div className="vintage-partner-title">{p.name}</div>
                        </a>
                    ))}
                </div>

                <div className="vintage-judges-footer" style={{ marginTop: '25px' }}>
                    <span>==== MORE TO COME ====</span>
                </div>

            </div>
        </section>
    );
}
