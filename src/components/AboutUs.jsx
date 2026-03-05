import React, { useEffect, useRef } from 'react';

export default function AboutUs() {
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about-section">
            <div className="section-wrapper fade-in" ref={ref}>
                <h2 className="section-heading">About</h2>
                <div className="about-card">
                    <p>
                        Welcome to <strong>Hackolution 2K26</strong> — where innovation meets the spirit of the frontier!
                        Born from the passion of coders, designers, and dreamers, Hackolution has grown into one of the
                        most anticipated hackathons of the year. Our journey began with a simple idea: bring together
                        the brightest minds to solve real-world problems, one line of code at a time.
                    </p>
                    <p>
                        Since its inception, Hackolution has attracted thousands of participants from across the nation,
                        fostering collaboration, creativity, and technological breakthroughs. From AI-powered solutions
                        to blockchain innovations, our participants have built projects that push the boundaries of what's
                        possible. This year, we embrace the wild west spirit — bold, fearless, and pioneering.
                    </p>
                    <p>
                        Whether you're a seasoned developer or a first-time hacker, Hackolution 2K26 offers you the
                        stage to showcase your skills, learn from industry leaders, win incredible prizes, and forge
                        connections that last a lifetime. Saddle up, partner — the frontier of innovation awaits!
                    </p>
                </div>
            </div>
        </section>
    );
}
