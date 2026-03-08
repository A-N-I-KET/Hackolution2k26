import React, { useEffect, useRef } from 'react';

const organizers = [
    { name: 'ANIKET CHAKRABORTY', role: 'Organizer', imgSrc: '/assets/teamimage.png', linkedin: 'https://www.linkedin.com/in/aniketchakrabortydev/', portfolio: 'https://www.aniketchakrabortydev.in/', instagram: 'https://www.instagram.com/its_aniket_btw' },
    { name: 'ROHAN SINHA', role: 'Organizer', imgSrc: '/assets/teamimage.png', linkedin: 'https://www.linkedin.com/in/rohan-sinha-0b926225a/', portfolio: '', instagram: 'https://www.instagram.com/_the_rohan_sinha' },
    { name: 'SOUMODIP DAS', role: 'Organizer', imgSrc: '/assets/teamimage.png', linkedin: '#', portfolio: '#', instagram: '#' },
    { name: 'SAIKAT DEBNATH', role: 'Organizer', imgSrc: '/assets/teamimage.png', linkedin: 'https://www.linkedin.com/in/heyysaikat/', portfolio: 'https://heyysaikat.in/', instagram: 'https://www.instagram.com/heyysaikat' },
    { name: 'SOUVIK GHOSH', role: 'Organizer', imgSrc: '/assets/teamimage.png', linkedin: 'https://www.linkedin.com/in/souvik-ghosh-1bb26a282/', portfolio: 'https://www.devsouvik.in/', instagram: 'https://www.instagram.com/souvik___05' },
];

const coordinators = [
    { name: 'ANIRBAN DAS', role: 'GRAPHICS LEAD', imgSrc: '/assets/teamimage.png', linkedin: 'https://www.linkedin.com/in/anirban-das-croundous/', portfolio: 'https://anirbandev.vercel.app/', instagram: 'https://www.instagram.com/anirbananimates/' },
    { name: 'SUBHRADEEP ROY CHOWDHURY', role: 'Marketing', imgSrc: '/assets/teamimage.png', linkedin: '#', portfolio: '#', instagram: '#' },
    { name: 'ASAD HUSSAIN', role: 'Sponsorship', imgSrc: '/assets/teamimage.png', linkedin: '#', portfolio: '#', instagram: '#' },
    { name: 'MD.HAMMAD SHARIQ ', role: 'Operations', imgSrc: '/assets/teamimage.png', linkedin: '#', portfolio: '#', instagram: '#' },
    { name: 'SIRSHA KUMAR', role: 'Content', imgSrc: '/assets/teamimage.png', linkedin: '#', portfolio: '#', instagram: '#' },
];

const facultyCoordinators = [
    { name: 'Prof. Dr. Satyajit Chakrabarti', role: 'DIRECTOR OF IEM' },
    { name: 'RUPAM BHATTACHARYA', role: 'HOD' },
    { name: 'KAUSTAV SARKAR', role: 'PROFESSOR' },
    { name: 'NAYANTARA MITRA', role: 'ASST HOD' },
    { name: 'PRITI DEB', role: 'PROFESSOR' },
    { name: 'PRIYANKA DAS', role: 'PROFESSOR' },
];

export default function Team() {
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const renderCards = (members) => (
        <div className="vintage-team-grid">
            {members.map((m) => (
                <div className="vintage-team-col" key={m.name}>
                    <div className="vintage-team-title">{m.name}</div>
                    <div className="vintage-team-img-wrap">
                        {m.imgSrc ? (
                            <img src={m.imgSrc} alt={m.name} className="vintage-team-img" />
                        ) : (
                            <div className="vintage-team-fallback">{m.name.charAt(0)}</div>
                        )}
                    </div>
                    <p className="vintage-team-desc">A highly dedicated professional managing the intricate efforts required for this scale.</p>
                    <div className="vintage-team-role">
                        <span>POST</span>
                        <span className="dots"></span>
                        <span style={{ textAlign: 'right' }}>{m.role}</span>
                    </div>
                    <div className="vintage-team-socials">
                        {m.linkedin && (
                            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="vintage-team-social-icon" title="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                            </a>
                        )}
                        {m.portfolio && (
                            <a href={m.portfolio} target="_blank" rel="noopener noreferrer" className="vintage-team-social-icon" title="Portfolio">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                            </a>
                        )}
                        {m.instagram && (
                            <a href={m.instagram} target="_blank" rel="noopener noreferrer" className="vintage-team-social-icon" title="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m-.25 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9m10.16 1.13a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderFacultyCards = (members) => (
        <div className="vintage-team-grid" style={{ gridTemplateColumns: `repeat(${members.length}, 1fr)`, overflowX: 'auto' }}>
            {members.map((m, index) => (
                <div
                    className="vintage-team-col"
                    key={m.name}
                    style={{
                        justifyContent: 'space-between',
                        minWidth: '200px',
                        borderRight: index === members.length - 1 ? 'none' : '2px solid var(--ink-dark)'
                    }}
                >
                    <div className="vintage-team-title" style={{ transform: 'none' }}>{m.name}</div>
                    <div className="vintage-team-role" style={{ marginTop: 'auto' }}>
                        <span>POST</span>
                        <span className="dots"></span>
                        <span style={{ textAlign: 'right' }}>{m.role}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section id="team" className="team-section">
            <div className="section-wrapper fade-in" ref={ref}>

                <div className="vintage-judges-header" style={{ marginBottom: '25px' }}>
                    <div className="vintage-judges-left" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>THE ORGANIZATION TEAM</div>
                    <div className="vintage-judges-right">
                        <span>THE DEDICATED INDIVIDUALS</span>
                        <span>BEHIND THE SCENES</span>
                    </div>
                </div>

                <div className="vintage-judges-divider"></div>

                <div className="team-subsection-title" style={{ marginTop: '40px' }}>ORGANIZERS</div>
                {renderCards(organizers)}

                <div className="team-subsection-title" style={{ marginTop: '60px' }}>COORDINATORS</div>
                {renderCards(coordinators)}

                <div className="team-subsection-title" style={{ marginTop: '60px' }}>FACULTY COORDINATORS</div>
                {renderFacultyCards(facultyCoordinators)}

                <div className="vintage-judges-footer" style={{ marginTop: '40px' }}>
                    <span>==== HACKOLUTION 2K26 ====</span>
                </div>

            </div>
        </section>
    );
}
