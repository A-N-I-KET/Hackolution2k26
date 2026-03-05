import React, { useEffect, useRef } from 'react';

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
                    <table className="faq-table">
                        <thead>
                            <tr>
                                <th className="faq-th faq-th-num">#</th>
                                <th className="faq-th faq-th-question">Question</th>
                                <th className="faq-th faq-th-answer">Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqs.map((faq, i) => (
                                <tr className="faq-row" key={i}>
                                    <td className="faq-td faq-td-num">{i + 1}</td>
                                    <td className="faq-td faq-td-question">{faq.q}</td>
                                    <td className="faq-td faq-td-answer">{faq.a}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

