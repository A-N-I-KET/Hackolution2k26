import React, { useEffect, useRef } from 'react';

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

                <div className="vintage-catalogue-header">
                    <h2 className="vintage-title-main">HIGHEST QUALITY HACKATHON REWARDS AND PRIZES</h2>
                    <h3 className="vintage-title-sub">
                        <span className="vintage-sub-left">FOR THE VERY</span>
                        <span className="vintage-sub-large">BEST DEVELOPERS</span>
                    </h3>
                </div>

                <div className="vintage-prizes-grid">
                    {/* 2nd Place */}
                    <div className="vintage-prize-col">
                        <div className="vintage-col-title">2ND PLACE &ndash; SILVER</div>
                        <div className="vintage-img-wrapper">
                            <img src="/assets/silver.png" alt="Silver Medal" className="vintage-col-img" />
                        </div>
                        <p className="vintage-col-desc">
                            An invaluable reward for any and all coding challenges. Serves as a testament to your team's ingenuity and endurance. A true technological wonder that cures bugs when they will not subdue.
                        </p>
                        <div className="vintage-btn-wrap">
                            <div className="vintage-btn">PRIZE: ₹ XX,XXX</div>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="vintage-prize-col">
                        <div className="vintage-col-title">1ST PLACE &ndash; GOLD</div>
                        <div className="vintage-img-wrapper">
                            <img src="/assets/gold.png" alt="Gold Medal" className="vintage-col-img" />
                        </div>
                        <p className="vintage-col-desc">
                            Take the Grand Prize for a feeling of ultimate triumph and vigor for the whole team, and give yourself the cold dead focus and dangerous speed of a master hacker. 100% pure gold standard innovation.
                        </p>
                        <div className="vintage-btn-wrap">
                            <div className="vintage-btn">PRIZE: ₹ XX,XXX</div>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="vintage-prize-col">
                        <div className="vintage-col-title">3RD PLACE &ndash; BRONZE</div>
                        <div className="vintage-img-wrapper">
                            <img src="/assets/bronze.png" alt="Bronze Medal" className="vintage-col-img" />
                        </div>
                        <p className="vintage-col-desc">
                            Thousands are being benefited where basic skills and logic have failed. This remarkable bronze reward treats code fatigue, cures compiler errors and quickly renews vigor.
                        </p>
                        <div className="vintage-btn-wrap">
                            <div className="vintage-btn">PRIZE: ₹ X,XXX</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
