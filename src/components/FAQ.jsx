import React, { useState, useEffect, useRef } from 'react';

const faqs = [
    {
        q: 'What is Hackolution 2K26?',
        a: 'Hackolution 2K26 is an annual hackathon that brings together developers, designers, and innovators from around the country to build creative solutions to real-world problems in a limited timeframe.',
    },
    {
        q: 'Who can participate?',
        a: 'Anyone with a passion for technology! Whether you are a student, professional, or hobbyist — all skill levels are welcome. Teams can have up to 4 members.',
    },
    {
        q: 'Is there a registration fee?',
        a: 'No! Hackolution 2K26 is completely free to participate. We provide food, swag, and an unforgettable experience at no cost.',
    },
    {
        q: 'What should I bring?',
        a: 'Bring your laptop, charger, any hardware you plan to use, and your imagination. We will provide everything else — Wi-Fi, meals, snacks, and mentorship.',
    },
    {
        q: 'How long is the hackathon?',
        a: 'The hackathon runs for 36 hours straight. Yes, you read that right — 36 hours of non-stop building, learning, and creating.',
    },
    {
        q: 'Can I participate solo?',
        a: 'While we encourage team participation (up to 4 members), solo hackers are also welcome. We will have a team formation session at the beginning of the event.',
    },
    {
        q: 'What are the judging criteria?',
        a: 'Projects will be judged on innovation, technical complexity, design, practicality, and presentation. Our panel of industry experts will evaluate each submission.',
    },
    {
        q: 'Will there be mentors?',
        a: 'Absolutely! We have industry mentors from top tech companies who will be available throughout the event to guide you and help with technical challenges.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
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
        <section id="faq" className="faq-section">
            <div className="section-wrapper fade-in" ref={ref}>
                <h2 className="section-heading">Frequently Asked Questions</h2>
                <div style={{ height: '20px' }} />
                <div className="faq-container">
                    {faqs.map((faq, i) => (
                        <div className="faq-item" key={i}>
                            <div
                                className="faq-question"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                {faq.q}
                                <span className={`faq-arrow${openIndex === i ? ' open' : ''}`}>▼</span>
                            </div>
                            <div className={`faq-answer${openIndex === i ? ' open' : ''}`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
