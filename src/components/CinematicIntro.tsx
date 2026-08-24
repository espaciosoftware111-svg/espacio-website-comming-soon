import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EspacioMonogram } from './EspacioMonogram';
import { playLuxuryChime, playShimmerSweep, playTactileClick } from '../utils/audio';
import { BRAND_DETAILS } from '../utils/constants';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'shimmer' | 'reveal' | 'transition'>('drawing');
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  useEffect(() => {
    // Stage 1: Stroke drawing starts at 0s

    // Stage 2: Glow & Shimmer at 1.4s
    const timer1 = setTimeout(() => {
      setPhase('shimmer');
      playLuxuryChime();
    }, 1400);

    // Stage 3: Typography Reveal at 2.0s
    const timer2 = setTimeout(() => {
      setPhase('reveal');
      playShimmerSweep();
    }, 2000);

    // Stage 4: Trigger Transition to Beige canvas at ~3.4s
    const timer3 = setTimeout(() => {
      setPhase('transition');
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    playTactileClick();
    setPhase('transition');
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={
        phase === 'transition'
          ? {
              opacity: 0,
              scale: 1.04,
              filter: 'blur(6px)',
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }
          : { opacity: 1 }
      }
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070809] text-white overflow-hidden select-none"
    >
      {/* Background Ambient Vignette & Golden Dust Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(197,165,114,0.12)_0%,_rgba(7,8,9,0.95)_70%)] pointer-events-none" />
      
      {/* Architectural Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Skip Button in Top-Right */}
      <div className="absolute top-6 right-6 z-20">
        <motion.button
          onClick={handleSkip}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.75, y: 0 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs tracking-widest text-neutral-300 hover:text-white hover:border-luxury-gold/50 transition-all duration-300"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* Central Emblem & Typography Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-lg text-center">
        {/* Emblem Container with Shimmer Light Sweep */}
        <div className="relative mb-8">
          <EspacioMonogram
            size={130}
            variant="silver"
            animated={true}
            glow={phase === 'shimmer' || phase === 'reveal'}
            className="drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
          />

          {/* Shimmer Light Sweep Overlay */}
          <AnimatePresence>
            {(phase === 'shimmer' || phase === 'reveal') && (
              <motion.div
                initial={{ x: '-150%', opacity: 0 }}
                animate={{ x: '150%', opacity: [0, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
                  transform: 'skewX(-25deg)',
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Brand Typography with Staggered Blur-to-Focus Reveal */}
        <div className="flex flex-col items-center space-y-3">
          {/* Primary Title: ESPACIO */}
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={
              phase === 'reveal' || phase === 'transition'
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 22, filter: 'blur(10px)' }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.25em] pl-[0.25em] select-none"
          >
            ESPACIO
          </motion.h1>

          {/* Secondary Title: INTERIORS AND MODULARS */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={
              phase === 'reveal' || phase === 'transition'
                ? { opacity: 0.9, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 16, filter: 'blur(8px)' }
            }
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-xs font-semibold text-luxury-gold tracking-[0.3em] pl-[0.3em] uppercase"
          >
            INTERIORS AND MODULARS
          </motion.p>

          {/* Tagline Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === 'reveal' || phase === 'transition'
                ? { scaleX: 1, opacity: 0.4 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent my-1"
          />

          {/* Brand Tagline: Designing Spaces, Defining Lifestyles */}
          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={
              phase === 'reveal' || phase === 'transition'
                ? { opacity: 0.85, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 12, filter: 'blur(6px)' }
            }
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial italic text-sm sm:text-base text-neutral-300 font-normal tracking-wide"
          >
            &ldquo;{BRAND_DETAILS.tagline}&rdquo;
          </motion.p>
        </div>
      </div>

      {/* Bottom Subtle Status Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 flex items-center gap-2 text-[10px] tracking-widest text-neutral-400 font-mono"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
        <span>INITIALIZING ARCHITECTURAL ENVIRONMENT</span>
      </motion.div>
    </motion.div>
  );
};
