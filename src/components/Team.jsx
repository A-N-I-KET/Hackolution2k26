import React, { useEffect, useRef } from 'react';

const organizers = [
    { name: 'John Doe', role: 'Lead Organizer', imgSrc: '/assets/teamimage.png' },
    { name: 'Jane Smith', role: 'Co-Organizer', imgSrc: '/assets/teamimage.png' },
    { name: 'Mike Johnson', role: 'Technical Lead', imgSrc: '/assets/teamimage.png' },
    { name: 'Emily Davis', role: 'Design Lead', imgSrc: '/assets/teamimage.png' },
];

const coordinators = [
    { name: 'Alex Turner', role: 'Logistics', imgSrc: '/assets/teamimage.png' },
    { name: 'Sophia Lee', role: 'Marketing', imgSrc: '/assets/teamimage.png' },
    { name: 'Daniel Brown', role: 'Sponsorship', imgSrc: '/assets/teamimage.png' },
    { name: 'Olivia Wilson', role: 'Operations', imgSrc: '/assets/teamimage.png' },
    { name: 'Ethan Garcia', role: 'Content', imgSrc: '/assets/teamimage.png' },
    { name: 'Mia Martinez', role: 'Social Media', imgSrc: '/assets/teamimage.png' },
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
        <div className="cards-grid">
            {members.map((m) => (
                <div className="card" key={m.name}>
                    {m.imgSrc ? (
                        <img src={m.imgSrc} alt={m.name} className="card-img-full" />
                    ) : (
                        <div className="card-img-full" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '3rem',
                            color: 'var(--ink-dark)',
                        }}>
                            {m.initial}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <section id="team" className="team-section">
            <div className="section-wrapper fade-in" ref={ref}>
                <h2 className="section-heading">Our Team</h2>

                <div className="team-subsection-title">Organizers</div>
                {renderCards(organizers)}

                <div className="team-subsection-title">Coordinators</div>
                {renderCards(coordinators)}
            </div>
        </section>
    );
}
