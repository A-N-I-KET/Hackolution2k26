import React, { useState, useEffect, useRef } from 'react';
import './FloatingButton.css';

export default function FloatingButton() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Attempt to auto-play on mount
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.5; // Set an initial volume
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                // Browsers often block auto-play without user interaction
                console.log("Auto-play prevented by browser. User interaction needed.", error);
                setIsPlaying(false);
            });
        }
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const scrollToHero = () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="floating-buttons-container">
            <audio ref={audioRef} src="/assets/Wildwest.ogg" loop />

            {/* Music Toggle Button */}
            <button
                className={`floating-btn music-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                <div className="vinyl-disc">
                    <div className="vinyl-inner"></div>
                    <div className="vinyl-center"></div>
                </div>

                {/* Lizard sitting on button */}
                <img src="/assets/floating.png" alt="Lizard Decoration" className="lizard-overlay" />
            </button>

            {/* Scroll to Top Button */}
            <button className="floating-btn" onClick={scrollToHero} aria-label="Scroll to Hero Section">
                <img src="/assets/hackolutionshortlogo.png" alt="Hackolution Logo" />
            </button>
        </div>
    );
}
