import React, { useEffect, useRef } from 'react';

const timelineEvents = [
    { time: "28th January - 25th March", title: "Registration Ongoing", desc: "Dont miss out on this opportunity to showcase your skills and creativity Register Now.", completed: false, ongoing: true },
    { time: "26th March - 31st March", title: "Idea Submission & Selection Round", desc: "Submit your ideas and let the selection begin!"},
    { time: "1st April - 5th April", title: "Offline Selected Team Approval", desc: "Selected Teams will be announced and they will appear in the hackathon." },
    { time: "8th May", title: "Hackolution Day 1", desc: "First day of hackolution 2k26 is here!" },
    { time: "9th May", title: "Hackolution Day 2", desc: "Final day of hackolution 2k26 is here!" },
];

export default function Timeline() {
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
        <section id="schedule">
            <div className="section-wrapper fade-in" ref={ref}>

                <img src="/assets/stamp.png" alt="Stamp" className="timeline-stamp-corner" />

                <div className="vintage-catalogue-header">
                    <h2 className="vintage-title-main">THE DAY'S MANIFEST</h2>
                    <h3 className="vintage-title-sub">
                        <span className="vintage-sub-left">SCHEDULE OF</span>
                        <span className="vintage-sub-large">EVENTS & ESCAPADES</span>
                    </h3>
                </div>

                <div className="vintage-timeline-container">
                    {timelineEvents.map((event, index) => (
                        <div key={index} className={`vintage-timeline-item ${event.completed ? 'completed' : ''} ${event.ongoing ? 'ongoing' : ''}`}>
                            <div className="vintage-timeline-time">{event.time}</div>
                            <div className="vintage-timeline-content">
                                <h4 className="vintage-timeline-title">{event.title}</h4>
                                <p className="vintage-timeline-desc">{event.desc}</p>
                            </div>
                            {event.completed && <span className="timeline-tick">✓</span>}
                        </div>
                    ))}
                </div>

                <div className="vintage-judges-footer">
                    <span>==== MORE TO COME IN THE WILD WEST ====</span>
                </div>
            </div>
        </section>
    );
}
