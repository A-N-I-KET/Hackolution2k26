import React, { useState, useEffect, useRef } from 'react';
import './FloatingButton.css';

export default function FloatingButton() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.5; // Set an initial volume

        const attemptPlay = () => {
            audio.play().then(() => {
                setIsPlaying(true);
                removeListeners();
            }).catch((error) => {
                console.log("Auto-play prevented. User interaction needed.", error);
                setIsPlaying(false);
            });
        };

        const removeListeners = () => {
            document.removeEventListener('click', attemptPlay);
            document.removeEventListener('keydown', attemptPlay);
            document.removeEventListener('touchstart', attemptPlay);
            document.removeEventListener('pointerdown', attemptPlay);
        };

        // Try playing immediately
        audio.play().then(() => {
            setIsPlaying(true);
        }).catch(() => {
            setIsPlaying(false);
            // Wait for user interaction
            document.addEventListener('click', attemptPlay, { once: true });
            document.addEventListener('keydown', attemptPlay, { once: true });
            document.addEventListener('touchstart', attemptPlay, { once: true });
            document.addEventListener('pointerdown', attemptPlay, { once: true });
        });

        return removeListeners;
    }, []);

    const togglePlay = (e) => {
        if (e) e.stopPropagation();
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().then(() => {
                    setIsPlaying(true);
                }).catch(console.error);
            }
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
