import React, { useEffect, useRef } from 'react';

const partnersData = [
    { name: 'GDG on Campus', link: 'https://gdg.community.dev', imgSrc: '/assets/teamimage.png' },
    { name: 'MLH', link: 'https://mlh.io', imgSrc: '/assets/teamimage.png' },
    { name: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org', imgSrc: '/assets/teamimage.png' },
    { name: 'HackerEarth', link: 'https://www.hackerearth.com', imgSrc: '/assets/teamimage.png' },
    { name: 'CodeChef', link: 'https://www.codechef.com', imgSrc: '/assets/teamimage.png' },
    { name: 'Dev Community', link: 'https://dev.to', imgSrc: '/assets/teamimage.png' },
    { name: 'Vercel', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Netlify', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'GitHub', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Postman', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Figma', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Notion', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Auth0', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Twilio', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Stripe', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'DigitalOcean', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Supabase', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'MongoDB', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'Docker', link: '#', imgSrc: '/assets/teamimage.png' },
    { name: 'AWS', link: '#', imgSrc: '/assets/teamimage.png' }
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
                    <span>==== HACKOLUTION 2K26 ====</span>
                </div>

            </div>
        </section>
    );
}
