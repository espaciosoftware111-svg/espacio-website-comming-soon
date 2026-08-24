import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SiteSettings } from '../types/settings';
import { playLuxuryChime, playShimmerSweep, playTactileClick } from '../utils/audio';

interface ExactLogoAnimationProps {
  settings: SiteSettings;
  onAnimationComplete: () => void;
  onSkip: () => void;
}

export const ExactLogoAnimation: React.FC<ExactLogoAnimationProps> = ({
  settings,
  onAnimationComplete,
  onSkip,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [tagline1Typed, setTagline1Typed] = useState('');
  const [tagline2Typed, setTagline2Typed] = useState('');
  const [taglinesHighlighted, setTaglinesHighlighted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const primaryTagline = settings.taglines?.primary || settings.branding.tagline1 || 'Designing Spaces';
  const secondaryTagline = settings.taglines?.secondary || settings.branding.tagline2 || 'Defining Lifestyles';

  const soundPlayedRef = useRef<{ chime: boolean; shimmer: boolean }>({
    chime: false,
    shimmer: false,
  });

  const speed = settings.animations.animationSpeedMultiplier || 1.0;

  useEffect(() => {
    const animateLoop = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const rawElapsed = (timestamp - startTimeRef.current) / 1000;
      const elapsed = rawElapsed * speed;
      setElapsedTime(elapsed);

      // Sound trigger on light activation (3.8s)
      if (elapsed >= 3.8 && !soundPlayedRef.current.chime) {
        soundPlayedRef.current.chime = true;
        playLuxuryChime();
      }

      // Shimmer sweep on brand reveal (4.6s)
      if (elapsed >= 4.6 && !soundPlayedRef.current.shimmer) {
        soundPlayedRef.current.shimmer = true;
        playShimmerSweep();
      }

      // Tagline 1 Typewriter (5.2s to 6.0s - Slower, 20% reduced ending speed for editorial elegance)
      if (elapsed >= 5.2) {
        const p1 = Math.min(1, (elapsed - 5.2) / 0.8);
        setTagline1Typed(primaryTagline.slice(0, Math.floor(p1 * primaryTagline.length)));
      } else {
        setTagline1Typed('');
      }

      // Tagline 2 Typewriter (6.3s to 7.2s)
      if (elapsed >= 6.3) {
        const p2 = Math.min(1, (elapsed - 6.3) / 0.9);
        setTagline2Typed(secondaryTagline.slice(0, Math.floor(p2 * secondaryTagline.length)));
      } else {
        setTagline2Typed('');
      }

      // Tagline Highlight Effect (7.4s - Luminous gold aura)
      if (elapsed >= 7.4) {
        setTaglinesHighlighted(true);
      }

      // Smooth Upward Transition Trigger (8.8s)
      if (elapsed >= 8.8 && !isExiting) {
        setIsExiting(true);
        setTimeout(() => {
          onAnimationComplete();
        }, 750);
        return;
      }

      animFrameRef.current = requestAnimationFrame(animateLoop);
    };

    animFrameRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [onAnimationComplete, primaryTagline, secondaryTagline, speed, isExiting]);

  const handleSkip = () => {
    playTactileClick();
    setIsExiting(true);
    setTimeout(() => {
      onAnimationComplete();
    }, 450);
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={
        isExiting
          ? {
              y: '-35vh',
              opacity: 0,
              filter: 'blur(4px)',
              transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            }
          : { opacity: 1, y: 0 }
      }
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090C] text-white overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background:
            elapsedTime >= 3.8
              ? 'radial-gradient(circle at 50% 46%, rgba(197, 165, 114, 0.22) 0%, rgba(8, 9, 12, 0.98) 65%)'
              : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(8, 9, 12, 1) 60%)',
        }}
      />

      {/* Subtle Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Skip Button */}
      {settings.animations.allowSkipIntro && (
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs tracking-widest text-neutral-300 hover:text-white hover:border-luxury-gold/50 transition-all active:scale-95 shadow-sm"
          >
            <span>SKIP INTRO</span>
            <span>&rarr;</span>
          </button>
        </div>
      )}

      {/* Central Composition Stage */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-4 max-w-lg text-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: elapsedTime >= 4.3 ? 'translate3d(0, -26px, 0)' : 'translate3d(0, 0, 0)',
        }}
      >
        {/* LOGO FRAME (EXACT IMAGE 2 OPEN FRAME WITH BALANCED GAPS AROUND E) */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center mb-6">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <radialGradient id="lightConeMaster" cx="50%" cy="0%" r="90%">
                <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#DFC28D" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#C5A572" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#C5A572" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 1. Upper-Left Horizontal Line (Starts faster at 0.6s) */}
            {elapsedTime >= 0.6 && (
              <line
                x1="14"
                y1="14"
                x2="44"
                y2="14"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="square"
                style={{
                  strokeDasharray: '30',
                  strokeDashoffset: (1 - Math.min(1, (elapsedTime - 0.6) / 0.35)) * 30,
                }}
              />
            )}

            {/* 2. Upper-Right Horizontal Line (With clear open gap from X=44 to X=54) */}
            {elapsedTime >= 0.8 && (
              <line
                x1="54"
                y1="14"
                x2="86"
                y2="14"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="square"
                style={{
                  strokeDasharray: '32',
                  strokeDashoffset: (1 - Math.min(1, (elapsedTime - 0.8) / 0.35)) * 32,
                }}
              />
            )}

            {/* 3. Right Vertical Line */}
            {elapsedTime >= 1.2 && (
              <line
                x1="86"
                y1="14"
                x2="86"
                y2="86"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="square"
                style={{
                  strokeDasharray: '72',
                  strokeDashoffset: (1 - Math.min(1, (elapsedTime - 1.2) / 0.35)) * 72,
                }}
              />
            )}

            {/* 4. Bottom Horizontal Line */}
            {elapsedTime >= 1.55 && (
              <line
                x1="86"
                y1="86"
                x2="14"
                y2="86"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="square"
                style={{
                  strokeDasharray: '72',
                  strokeDashoffset: (1 - Math.min(1, (elapsedTime - 1.55) / 0.35)) * 72,
                }}
              />
            )}

            {/* 5. Left Vertical Line (STOPS AT Y=48, PRESERVING OPEN TOP-LEFT CORNER!) */}
            {elapsedTime >= 1.9 && (
              <line
                x1="14"
                y1="86"
                x2="14"
                y2="48"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="square"
                style={{
                  strokeDasharray: '38',
                  strokeDashoffset: (1 - Math.min(1, (elapsedTime - 1.9) / 0.35)) * 38,
                }}
              />
            )}

            {/* 6. Geometric Sans-Serif 'E' in Lower-Right Quadrant */}
            {elapsedTime >= 2.3 && (
              <g
                style={{
                  opacity: Math.min(1, (elapsedTime - 2.3) / 0.45),
                  transform: `scale(${0.94 + 0.06 * Math.min(1, (elapsedTime - 2.3) / 0.45)})`,
                  transformOrigin: '67px 61px',
                }}
              >
                {/* E Spine */}
                <line x1="58" y1="44" x2="58" y2="78" stroke="#FFFFFF" strokeWidth="4.8" strokeLinecap="square" />
                {/* E Top arm */}
                <line x1="58" y1="44" x2="76" y2="44" stroke="#FFFFFF" strokeWidth="4.8" strokeLinecap="square" />
                {/* E Middle arm */}
                <line x1="58" y1="61" x2="72" y2="61" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="square" />
                {/* E Bottom arm */}
                <line x1="58" y1="78" x2="76" y2="78" stroke="#FFFFFF" strokeWidth="4.8" strokeLinecap="square" />
              </g>
            )}

            {/* 7. Pendant Lamp in Upper-Left Quadrant (Descends at 3.0s) */}
            {elapsedTime >= 3.0 && (
              <g
                style={{
                  transform: `translate3d(0, ${-26 * (1 - Math.min(1, (elapsedTime - 3.0) / 0.75))}px, 0)`,
                  opacity: Math.min(1, (elapsedTime - 3.0) / 0.35),
                }}
              >
                {/* Stem */}
                <line x1="29" y1="14" x2="29" y2="28" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                {/* Trapezoidal Lampshade */}
                <polygon points="25.5,28 32.5,28 38,42 20,42" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.8" strokeLinejoin="round" />

                {/* Light Glow Activation (at 3.8s) */}
                {elapsedTime >= 3.8 && (
                  <g style={{ opacity: Math.min(1, (elapsedTime - 3.8) / 0.35) }}>
                    <ellipse cx="29" cy="46" rx="14" ry="10" fill="url(#lightConeMaster)" opacity="0.9" />
                    <polygon points="20,42 38,42 48,68 10,68" fill="url(#lightConeMaster)" opacity="0.85" />
                    <ellipse cx="29" cy="42" rx="7" ry="1.6" fill="#FFFCE6" />
                    <circle cx="29" cy="42.5" r="2.8" fill="#FFEAA7" opacity="0.95" />
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* ESPACIO BRAND NAME & SUB-TITLE (Reveals at 4.6s) */}
        {elapsedTime >= 4.6 && (
          <div
            className="space-y-2 text-center"
            style={{
              opacity: Math.min(1, (elapsedTime - 4.6) / 0.5),
              transform: `translate3d(0, ${Math.max(0, (1 - (elapsedTime - 4.6) / 0.5) * 14)}px, 0)`,
            }}
          >
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-[0.32em] pl-[0.32em] leading-tight">
              {settings.branding.name}
            </h1>

            {/* Gold Accent Divider Bar with Square Dot (─────── ▪ ───────) */}
            {elapsedTime >= 4.8 && (
              <div
                className="flex items-center justify-center gap-2 max-w-[220px] mx-auto my-1.5"
                style={{
                  opacity: Math.min(1, (elapsedTime - 4.8) / 0.35),
                  transform: `scaleX(${Math.min(1, (elapsedTime - 4.8) / 0.35)})`,
                }}
              >
                <div className="flex-1 h-[1.5px] bg-[#C5A572]" />
                <div className="w-1.5 h-1.5 bg-[#C5A572]" />
                <div className="flex-1 h-[1.5px] bg-[#C5A572]" />
              </div>
            )}

            {elapsedTime >= 4.9 && (
              <p
                className="text-[10px] sm:text-xs font-semibold text-neutral-300 tracking-[0.32em] pl-[0.32em] uppercase pt-0.5"
                style={{
                  opacity: Math.min(1, (elapsedTime - 4.9) / 0.35),
                }}
              >
                {settings.branding.subTitle || 'INTERIORS AND MODULAR'}
              </p>
            )}

            {/* BRAND TAGLINES (Slower 20% ending speed for editorial readability) */}
            {elapsedTime >= 5.2 && (
              <div
                className={`pt-4 space-y-1.5 transition-all duration-700 ${
                  taglinesHighlighted ? 'scale-[1.03]' : 'scale-100'
                }`}
              >
                <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent mx-auto mb-2.5 opacity-80" />
                
                {/* Tagline Line 1: Designing Spaces */}
                <p className="font-serif italic text-base sm:text-lg tracking-wide text-neutral-200 h-6">
                  <span className={taglinesHighlighted ? 'text-white font-medium drop-shadow-[0_0_12px_rgba(197,165,114,0.4)]' : ''}>
                    {tagline1Typed}
                  </span>
                  {elapsedTime >= 5.2 && elapsedTime < 6.2 && (
                    <span className="inline-block w-1 h-3.5 bg-luxury-gold ml-0.5 animate-pulse" />
                  )}
                </p>

                {/* Tagline Line 2: Defining Lifestyles */}
                <p className="font-serif italic text-base sm:text-lg tracking-wide text-neutral-200 h-6">
                  <span className={taglinesHighlighted ? 'text-luxury-gold font-medium drop-shadow-[0_0_12px_rgba(197,165,114,0.4)]' : ''}>
                    {tagline2Typed}
                  </span>
                  {elapsedTime >= 6.3 && elapsedTime < 8.7 && (
                    <span className="inline-block w-1 h-3.5 bg-luxury-gold ml-0.5 animate-pulse" />
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status Ticker */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] tracking-widest text-neutral-500 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
        <span>ESPACIO ARCHITECTURAL EMBLEM • {elapsedTime.toFixed(1)}s</span>
      </div>
    </motion.div>
  );
};
