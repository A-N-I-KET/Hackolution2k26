import React, { useEffect, useRef } from 'react';

const prizes = [
    {
        rank: '2nd',
        place: 'Silver',
        amount: '₹ XX,XXX',
        img: '/assets/bronze.png',
    },
    {
        rank: '1st',
        place: 'Gold',
        amount: '₹ XX,XXX',
        img: '/assets/silver.png',
    },
    {
        rank: '3rd',
        place: 'Bronze',
        amount: '₹ X,XXX',
        img: '/assets/gold.png',
    },
];

export default function Prizes() {
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
        <section id="prizes">
            <div className="section-wrapper fade-in" ref={ref}>
                <img src="/assets/prize.png" alt="Prizes" className="section-banner" />
                <div className="prizes-grid">
                    {prizes.map((p) => (
                        <div className="prize-card" key={p.rank}>
                            <img src={p.img} alt={p.place} className="prize-medal-img" />
                            <div className="prize-amount">{p.amount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
