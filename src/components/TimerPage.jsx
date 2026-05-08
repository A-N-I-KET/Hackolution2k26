import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TimerPage.css';
import './FloatingButton.css';

// ─── Schedule Data (IST = +05:30) ────────────────────────────
// ─── Schedule Data (IST = +05:30) ────────────────────────────
const SIMULATION_MODE = false; // TRUE for testing fast transitions
const simNow = Date.now() + 2000; // start 2 seconds from now

const ORIGINAL_SCHEDULE = [
  { id: 1, name: 'Reporting & Checking',            start: '2026-05-08T08:00:00+05:30', end: '2026-05-08T08:45:00+05:30', day: 1 },
  { id: 2, name: 'Opening Ceremony',                start: '2026-05-08T08:30:00+05:30', end: '2026-05-08T09:00:00+05:30', day: 1 },
  { id: 3, name: 'Hacking Starts',                  start: '2026-05-08T09:30:00+05:30', end: null,                        day: 1, milestone: true },
  { id: 4, name: 'Lunch (Day-1)',                    start: '2026-05-08T13:00:00+05:30', end: '2026-05-08T14:00:00+05:30', day: 1 },
  { id: 5, name: 'Miro Workshop',                   start: '2026-05-08T16:00:00+05:30', end: '2026-05-08T16:30:00+05:30', day: 1 },
  { id: 6, name: 'Osen Workshop',                   start: '2026-05-08T19:00:00+05:30', end: '2026-05-08T19:30:00+05:30', day: 1 },
  { id: 7, name: 'AI Powered Dev Workshop',         start: '2026-05-08T21:00:00+05:30', end: '2026-05-08T21:30:00+05:30', day: 1 },
  { id: 8, name: 'Dinner (Day-1)',                   start: '2026-05-08T21:30:00+05:30', end: '2026-05-08T22:30:00+05:30', day: 1 },
  { id: 9, name: 'Hacknest Mini Event',             start: '2026-05-08T23:00:00+05:30', end: '2026-05-08T23:30:00+05:30', day: 1 },
  { id: 10, name: 'Fun Event',                        start: '2026-05-09T00:30:00+05:30', end: '2026-05-09T01:00:00+05:30', day: 2 },
  { id: 11, name: 'Breakfast (Day-2)',               start: '2026-05-09T09:00:00+05:30', end: '2026-05-09T10:00:00+05:30', day: 2 },
  { id: 12, name: 'Lunch (Day-2)',                    start: '2026-05-09T12:00:00+05:30', end: '2026-05-09T13:00:00+05:30', day: 2 },
  { id: 13, name: 'Hacking Ends',                    start: '2026-05-09T14:30:00+05:30', end: null,                        day: 2, milestone: true },
  { id: 14, name: 'Evaluation',                       start: '2026-05-09T14:30:00+05:30', end: '2026-05-09T16:15:00+05:30', day: 2 },
  { id: 15, name: 'Closing Ceremony',                start: '2026-05-09T16:30:00+05:30', end: '2026-05-09T17:00:00+05:30', day: 2 },
];

const SIM_SCHEDULE = ORIGINAL_SCHEDULE.map((ev, i) => {
  const startMs = simNow + (i * 4000); // 4 seconds per event
  let endMs = startMs + 4000;
  return {
    ...ev,
    start: new Date(startMs).toISOString(),
    end: ev.end === null ? null : new Date(endMs).toISOString()
  };
});

const SCHEDULE = SIMULATION_MODE ? SIM_SCHEDULE : ORIGINAL_SCHEDULE;

const hackingStartEvent = SCHEDULE.find(e => e.name === 'Hacking Starts');
const hackingEndEvent = SCHEDULE.find(e => e.name === 'Hacking Ends');

const HACKING_START = new Date(hackingStartEvent.start).getTime();
const HACKING_END   = new Date(hackingEndEvent.start).getTime();

// ─── Utility ─────────────────────────────────────────────────
function pad(n) { return n.toString().padStart(2, '0'); }

function formatTime(isoStr) {
  const d = new Date(isoStr);
  let h = d.getHours();
  const m = pad(d.getMinutes());
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function getTimeDiff(targetMs, nowMs) {
  let diff = targetMs - nowMs;
  if (diff < 0) diff = 0;
  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, totalMs: diff };
}

// ─── Framer Motion Variants ──────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const eventSwapVariant = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.4 } }
};

// ─── 3D Flip Digit Components ──────────────────────────────────
const FlipDigit = ({ digit, isRed }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [nextDigit, setNextDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setNextDigit(digit);
      setIsFlipping(true);
      
      const timeout = setTimeout(() => {
        setCurrentDigit(digit);
        setIsFlipping(false);
      }, 500); // 500ms total animation time
      
      return () => clearTimeout(timeout);
    }
  }, [digit, currentDigit]);

  const colorClass = isRed ? 'text-red' : '';

  return (
    <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
      {/* Base layers */}
      <div className={`flip-half flip-top ${colorClass}`}><span>{nextDigit}</span></div>
      <div className={`flip-half flip-bottom ${colorClass}`}><span>{currentDigit}</span></div>
      
      {/* Flipping layers */}
      <div className={`flip-half flip-top-flip ${colorClass}`}><span>{currentDigit}</span></div>
      <div className={`flip-half flip-bottom-flip ${colorClass}`}><span>{nextDigit}</span></div>
    </div>
  );
};

const FlipGroup = ({ valueStr, unit, isSeconds = false }) => {
  const digits = valueStr.split('');
  return (
    <div className="timer-digit-group">
      <div className="flip-card-container">
        {digits.map((digit, i) => {
          const isRed = isSeconds && i === digits.length - 1;
          return <FlipDigit key={i} digit={digit} isRed={isRed} />;
        })}
      </div>
      <span className="timer-digit-unit">{unit}</span>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────
export default function TimerPage() {
  const [now, setNow] = useState(Date.now());
  const [showCelebration, setShowCelebration] = useState(false);

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Audio Auto-play Logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;

    const attemptPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
        removeListeners();
      }).catch((error) => {
        console.log("Auto-play prevented.", error);
        setIsPlaying(false);
      });
    };

    const removeListeners = () => {
      document.removeEventListener('click', attemptPlay);
      document.removeEventListener('keydown', attemptPlay);
    };

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
      document.addEventListener('click', attemptPlay, { once: true });
      document.addEventListener('keydown', attemptPlay, { once: true });
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
        audio.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  };

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Determine phase
  const phase = now < HACKING_START ? 'before' : now < HACKING_END ? 'during' : 'ended';

  // Trigger celebration
  useEffect(() => {
    if (phase === 'ended' && !showCelebration) {
      setShowCelebration(true);
    }
  }, [phase, showCelebration]);

  // Timer values
  const target = phase === 'before' ? HACKING_START : HACKING_END;
  const { days, hours, minutes, seconds } = getTimeDiff(target, now);

  // Progress (only during hacking)
  const totalDuration = HACKING_END - HACKING_START;
  const elapsed       = now - HACKING_START;
  const progress      = phase === 'during' ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)) : 0;

  // Current + next events
  const currentEvents = SCHEDULE.filter(e => {
    const s = new Date(e.start).getTime();
    const en = e.end ? new Date(e.end).getTime() : s;
    return now >= s && now < en;
  });

  const nextEvent = SCHEDULE.find(e => {
    const s = new Date(e.start).getTime();
    return s > now;
  });

  // Unique key for the AnimatePresence block to know when to swap events
  const eventBlockKey = currentEvents.length > 0 
    ? currentEvents.map(e => e.id).join('-') 
    : (phase === 'before' && nextEvent ? `before-${nextEvent.id}` : 'during-gap');

  // ─── Celebration View ──────────────────────────────────────
  if (showCelebration) {
    return (
      <div className="timer-celebration">
        <motion.div 
          className="timer-celebration-poster"
          initial={{ y: -1000, rotate: 10, opacity: 0 }}
          animate={{ y: 0, rotate: -1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <div className="timer-wrap-text letterpress">IT'S A WRAP!</div>
          <div className="timer-wrap-subtitle letterpress">Hackolution 2K26</div>
          <div className="timer-wrap-thankyou">
            Thank you for being part of this incredible journey.<br />
            29 hours of innovation, creativity, and code.
          </div>
          <div className="timer-wrap-stats">
            <div className="timer-wrap-stat">
              <span className="timer-wrap-stat-value letterpress">29</span>
              <span className="timer-wrap-stat-label">Hours</span>
            </div>
            <div className="timer-wrap-stat">
              <span className="timer-wrap-stat-value letterpress">15</span>
              <span className="timer-wrap-stat-label">Events</span>
            </div>
            <div className="timer-wrap-stat">
              <span className="timer-wrap-stat-value letterpress">2</span>
              <span className="timer-wrap-stat-label">Days</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Timer View ────────────────────────────────────────────
  return (
    <div className="timer-page">
      {/* Theme Music */}
      <audio ref={audioRef} src="/assets/Wildwest.ogg" loop />
      <div className="floating-buttons-container" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <button
          className={`floating-btn music-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <div className="vinyl-disc">
            <div className="vinyl-inner"></div>
            <div className="vinyl-center"></div>
          </div>
          <img src="/assets/floating.avif" alt="Lizard Decoration" className="lizard-overlay" />
        </button>
      </div>

      <motion.div 
        className="timer-content"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.header className="timer-header" variants={fadeUpVariant}>
          <img src="/assets/hackolutionshortlogo.png" alt="Hackolution" className="timer-logo" />
          <span className="timer-event-title letterpress">Live Dashboard</span>
          <div className="ornamental-divider" />
        </motion.header>

        {/* Phase label */}
        <motion.div className="timer-phase-label letterpress" variants={fadeUpVariant}>
          {phase === 'before' ? '⏳ Hacking Starts In' : '🔥 Hacking Ends In'}
        </motion.div>

        {/* Countdown */}
        <motion.div className="timer-countdown" variants={fadeUpVariant}>
          {days > 0 && (
            <>
              <FlipGroup valueStr={pad(days)} unit="Days" />
              <span className="timer-separator">:</span>
            </>
          )}
          <FlipGroup valueStr={pad(hours)} unit="Hours" />
          <span className="timer-separator">:</span>
          <FlipGroup valueStr={pad(minutes)} unit="Minutes" />
          <span className="timer-separator">:</span>
          <FlipGroup valueStr={pad(seconds)} unit="Seconds" isSeconds={true} />
        </motion.div>

        {/* Progress bar (during hacking only) */}
        {phase === 'during' && (
          <motion.div className="timer-progress-container" variants={fadeUpVariant}>
            <div className="timer-progress-labels">
              <span>Hacking Started</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="timer-progress-track">
              <div className="timer-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="ornamental-divider" style={{ marginTop: '40px', marginBottom: '0' }} />
          </motion.div>
        )}

        {/* Current Event Section with smooth transitions */}
        <motion.div className="timer-current-event" variants={fadeUpVariant}>
          <AnimatePresence mode="wait">
            <motion.div
              key={eventBlockKey}
              variants={eventSwapVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ width: '100%' }}
            >
              {currentEvents.length > 0 && (
                <>
                  <div className="timer-event-card current">
                    <div className="timer-event-status">
                      <motion.span 
                        className="timer-event-dot" 
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span>NOW HAPPENING</span>
                    </div>
                    {currentEvents.map((ev, i) => (
                      <div key={i} className="timer-event-details" style={i > 0 ? { marginTop: '20px' } : {}}>
                        <div className="timer-event-name">{ev.name}</div>
                        <div className="timer-event-time">
                          {formatTime(ev.start)}{ev.end ? ` — ${formatTime(ev.end)}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>

                  {nextEvent && (
                    <div className="timer-event-card next">
                      <div className="timer-next-label">Up Next</div>
                      <div className="timer-next-details">
                        <div className="timer-next-name">{nextEvent.name}</div>
                        <div className="timer-next-time">
                          {formatTime(nextEvent.start)}{nextEvent.end ? ` — ${formatTime(nextEvent.end)}` : ''}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Before-start state: no current events yet */}
              {currentEvents.length === 0 && phase === 'before' && nextEvent && (
                <div className="timer-event-card upcoming-first">
                  <div className="timer-event-status">
                    <span className="timer-event-dot" />
                    <span>COMING UP FIRST</span>
                  </div>
                  <div className="timer-event-details">
                    <div className="timer-event-name">{nextEvent.name}</div>
                    <div className="timer-event-time">
                      {formatTime(nextEvent.start)}{nextEvent.end ? ` — ${formatTime(nextEvent.end)}` : ''}
                    </div>
                  </div>
                </div>
              )}

              {/* During hacking but no specific event right now */}
              {currentEvents.length === 0 && phase === 'during' && (
                <>
                  <div className="timer-event-card current">
                    <div className="timer-event-status">
                      <motion.span 
                        className="timer-event-dot" 
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span>HACKING IN PROGRESS</span>
                    </div>
                    <div className="timer-event-details">
                      <div className="timer-event-name">Keep Building! 🤠</div>
                      <div className="timer-event-time">Next break or event coming up...</div>
                    </div>
                  </div>

                  {nextEvent && (
                    <div className="timer-event-card next">
                      <div className="timer-next-label">Up Next</div>
                      <div className="timer-next-details">
                        <div className="timer-next-name">{nextEvent.name}</div>
                        <div className="timer-next-time">
                          {formatTime(nextEvent.start)}{nextEvent.end ? ` — ${formatTime(nextEvent.end)}` : ''}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
