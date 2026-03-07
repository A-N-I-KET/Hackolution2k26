import React, { useEffect, useRef } from 'react';

const organizers = [
    { name: 'ANIKET CHAKRABORTY', role: 'Organizer', imgSrc: '/assets/teamimage.png' },
    { name: 'ROHAN SINHA', role: 'Organizer', imgSrc: '/assets/teamimage.png' },
    { name: 'SOUMODIP DAS', role: 'Organizer', imgSrc: '/assets/teamimage.png' },
    { name: 'SAIKAT DEBNATH', role: 'Organizer', imgSrc: '/assets/teamimage.png' },
    { name: 'SOUVIK GHOSH', role: 'Organizer', imgSrc: '/assets/teamimage.png' },
];

const coordinators = [
    { name: 'ANIRBAN DAS', role: 'GRAPHICS', imgSrc: '/assets/teamimage.png' },
    { name: 'SUBHRADEEP ROY CHOWDHURY', role: 'Marketing', imgSrc: '/assets/teamimage.png' },
    { name: 'ASAD HUSSAIN', role: 'Sponsorship', imgSrc: '/assets/teamimage.png' },
    { name: 'MD.HAMMAD SHARIQ ', role: 'Operations', imgSrc: '/assets/teamimage.png' },
    { name: 'SIRSHA KUMAR', role: 'Content', imgSrc: '/assets/teamimage.png' },
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

                <div className="team-subsection-title" style={{ marginTop: '40px', fontSize: '2rem' }}>ORGANIZERS</div>
                {renderCards(organizers)}

                <div className="team-subsection-title" style={{ marginTop: '60px', fontSize: '2rem' }}>COORDINATORS</div>
                {renderCards(coordinators)}

                <div className="vintage-judges-footer" style={{ marginTop: '40px' }}>
                    <span>==== HACKOLUTION 2K26 ====</span>
                </div>

            </div>
        </section>
    );
}
