import React, { useEffect, useRef } from 'react';

const timelineEvents = [
    { time: "Day 1 - 09:00 AM", title: "Gates Open & Registration", desc: "Saddle up and check-in at the frontier post. Grab your Hackolution gear and find your crew." },
    { time: "Day 1 - 10:30 AM", title: "Opening Ceremony", desc: "A grand ol' welcome from the organizers. Rule the roost, understand the bounties, and get fired up!" },
    { time: "Day 1 - 11:45 AM", title: "Hacking Commences", desc: "The gold rush begins! Start building your projects. May the best outlaws strike gold." },
    { time: "Day 1 - 03:00 PM", title: "Mentorship Round 1", desc: "Veterans of the trail will come by to inspect your blueprints and point you in the right direction." },
    { time: "Day 1 - 08:00 PM", title: "Dinner & Saloon Games", desc: "Take a load off, grab some grub, and enjoy some mini-games to refresh the mind before the long night." },
    { time: "Day 2 - 08:30 AM", title: "Breakfast at the Camp", desc: "Fuel up for the final stretch. Coffee and bacon for the weary travelers." },
    { time: "Day 2 - 11:30 AM", title: "Hacking Concludes", desc: "Pencils down! The sheriff's calling time. Submit your final projects for inspection." },
    { time: "Day 2 - 01:00 PM", title: "Judging Commences", desc: "Present your bounties to the esteemed judges. Show 'em what you've built on the frontier." },
    { time: "Day 2 - 04:30 PM", title: "Closing Ceremony & Awards", desc: "The final showdown. We crown the biggest outlaws of Hackolution 2k26 and distribute the loot." },
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
                        <div key={index} className="vintage-timeline-item">
                            <div className="vintage-timeline-time">{event.time}</div>
                            <div className="vintage-timeline-content">
                                <h4 className="vintage-timeline-title">{event.title}</h4>
                                <p className="vintage-timeline-desc">{event.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="vintage-judges-footer">
                    <span>==== SUBJECT TO CHANGE IN THE WILD WEST ====</span>
                </div>
            </div>
        </section>
    );
}
