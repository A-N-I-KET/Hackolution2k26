import React, { useEffect, useRef } from 'react';

const partnersData = [
    { name: 'GDG on Campus', link: 'https://gdg.community.dev', imgSrc: '/assets/teamimage.png', desc: 'Fostering environments where ambitious students learn, build, and connect under top-tier mentorship.' },
    { name: 'MLH', link: 'https://mlh.io', imgSrc: '/assets/teamimage.png', desc: 'Major League Hacking. Providing the standard structure and tremendous support for student developers across the globe.' },
    { name: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org', imgSrc: '/assets/teamimage.png', desc: 'An undisputed vault of computer science knowledge. Their comprehensive archives have aided countless engineers.' },
    { name: 'HackerEarth', link: 'https://www.hackerearth.com', imgSrc: '/assets/teamimage.png', desc: 'A premier platform for enterprise hackathons and technical assessments. They bring industry-proven scale.' },
    { name: 'CodeChef', link: 'https://www.codechef.com', imgSrc: '/assets/teamimage.png', desc: 'The fierce competitive programming arena. Training minds to calculate efficiently under severe pressure.' },
    { name: 'Dev Community', link: 'https://dev.to', imgSrc: '/assets/teamimage.png', desc: 'A constructive and inclusive social network for software developers. The modern builder\'s tavern.' },
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
                            className="vintage-partner-col"
                        >
                            <div className="vintage-partner-title">{p.name}</div>
                            <div className="vintage-partner-img-wrap">
                                {p.imgSrc ? (
                                    <img src={p.imgSrc} alt={p.name} className="vintage-partner-img" />
                                ) : (
                                    <div className="vintage-partner-fallback">{p.name.charAt(0)}</div>
                                )}
                            </div>
                            <p className="vintage-partner-desc">{p.desc}</p>
                            <div className="vintage-partner-action">VIEW PARTNER</div>
                        </a>
                    ))}
                </div>

                <div className="vintage-judges-footer" style={{ marginTop: '25px' }}>
                    <span>==== HACKOLUTION 2K26 ====</span>
                </div>

            </div>
        </section>
    );
}
