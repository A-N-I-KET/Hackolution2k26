import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

export default function CountdownTimer() {
    // Target 1: May 8th, 2026, 9:00 AM IST
    const target1 = new Date('2026-05-08T09:00:00+05:30').getTime();
    // Target 2: May 9th, 2026, 2:00 PM IST
    const target2 = new Date('2026-05-09T14:00:00+05:30').getTime();

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [currentTarget, setCurrentTarget] = useState(1);

    function calculateTimeLeft() {
        const now = new Date().getTime();
        let difference = target1 - now;
        let activeTarget = 1;

        if (difference < 0) {
            difference = target2 - now;
            activeTarget = 2;
        }

        if (difference < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            target: activeTarget,
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (newTimeLeft.target !== currentTarget) {
                setCurrentTarget(newTimeLeft.target);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [currentTarget]);

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    return (
        <div className="countdown-timer-container">
            <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
                <filter id="torn-paper">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
            <div className="countdown-timer-bg" style={{ filter: 'url(#torn-paper)' }}></div>
            <div className="blood-base"></div>
            <div className="blood-drip"></div>
            <div className="blood-drip"></div>
            <div className="blood-drip"></div>
            <div className="blood-drip"></div>

            <div className="countdown-timer-content">
                <div className="countdown-label">
                    {currentTarget === 1 ? 'HACKING STARTS IN' : 'HACKING ENDS IN'}
                </div>
                <div className="countdown-blocks">
                    <div className="countdown-block">
                        <span className="countdown-value">{formatNumber(timeLeft.days || 0)}</span>
                        <span className="countdown-unit">DAYS</span>
                    </div>
                    <span className="countdown-separator">:</span>
                    <div className="countdown-block">
                        <span className="countdown-value">{formatNumber(timeLeft.hours || 0)}</span>
                        <span className="countdown-unit">HRS</span>
                    </div>
                    <span className="countdown-separator">:</span>
                    <div className="countdown-block">
                        <span className="countdown-value">{formatNumber(timeLeft.minutes || 0)}</span>
                        <span className="countdown-unit">MINS</span>
                    </div>
                    <span className="countdown-separator">:</span>
                    <div className="countdown-block">
                        <span className="countdown-value">{formatNumber(timeLeft.seconds || 0)}</span>
                        <span className="countdown-unit">SECS</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
