import React from 'react';
import { motion } from 'framer-motion';
import { EspacioMonogram } from './EspacioMonogram';
import { Shield, Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playTactileClick } from '../utils/audio';

interface NavbarProps {
  onOpenStaffModal: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStaffModal }) => {
  const [soundOn, setSoundOn] = React.useState(true);

  React.useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playTactileClick();
    }
  };

  const handleStaffClick = () => {
    playTactileClick();
    onOpenStaffModal();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-transparent transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-20 flex items-center justify-between">
        {/* Left: Brand Monogram & Title - Perfectly Proportioned & Aligned Lockup */}
        <div className="relative flex items-center gap-3 sm:gap-4 lg:gap-4.5 select-none px-2 py-1">
          {/* Soft, Feathered Cream/White Fog Glow centered behind LOGO + TEXT ONLY */}
          <div
            className="absolute -inset-5 sm:-inset-7 md:-inset-9 rounded-full pointer-events-none -z-10 filter blur-xl opacity-95"
            style={{
              background:
                'radial-gradient(ellipse at 42% 50%, rgba(250, 244, 237, 0.98) 0%, rgba(250, 244, 237, 0.85) 42%, rgba(250, 244, 237, 0.4) 75%, transparent 100%)',
            }}
          />
          {/* Monogram Emblem (Balanced Proportional Sizing) */}
          <div className="w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13 xl:w-15 xl:h-15 flex items-center justify-center transition-transform hover:scale-105 shrink-0">
            <EspacioMonogram size="100%" className="w-full h-full" variant="dark" isLightOn={true} glow={true} tightFit={true} useImage={false} />
          </div>
          {/* Typography Lockup */}
          <div className="flex flex-col justify-center min-w-0 sm:min-w-[140px] lg:min-w-[195px]">
            <span className="font-sans text-[13px] sm:text-lg md:text-2xl lg:text-[26px] xl:text-[28px] font-bold tracking-[0.24em] lg:tracking-[0.28em] text-[#08090C] leading-none">
              ESPACIO
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 my-0.5 sm:my-1 lg:my-1.5 w-full">
              <span className="flex-1 h-[1.2px] sm:h-[1.5px] bg-[#C5A572] rounded-full" />
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C5A572] rotate-45 shrink-0" />
              <span className="flex-1 h-[1.2px] sm:h-[1.5px] bg-[#C5A572] rounded-full" />
            </div>
            <span className="block text-[6.8px] sm:text-[9px] md:text-[10px] lg:text-[11.5px] tracking-[0.24em] sm:tracking-[0.32em] font-bold text-[#121316] uppercase leading-none">
              INTERIORS AND MODULAR
            </span>
          </div>
        </div>

        {/* Center: Animated Pill Badge (System Upgrade & Launch in Progress) */}
        <div className="hidden md:flex items-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-charcoal/5 border border-luxury-charcoal/10 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-gold"></span>
            </span>
            <span className="text-[11px] font-medium tracking-wider text-luxury-charcoal uppercase">
              SYSTEM UPGRADE & LAUNCH IN PROGRESS
            </span>
          </motion.div>
        </div>

        {/* Right: Sound Toggle + Staff Login */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 select-none">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="w-9 h-9 rounded-full border border-luxury-beige-border bg-white/60 hover:bg-white text-luxury-charcoal-muted hover:text-luxury-charcoal flex items-center justify-center transition-all shadow-sm"
            title={soundOn ? 'Mute luxury sound effects' : 'Enable luxury sound effects'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-luxury-gold" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Staff Login Button */}
          <button
            onClick={handleStaffClick}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-luxury-charcoal/15 bg-luxury-charcoal text-white hover:bg-luxury-charcoal-light hover:border-luxury-gold/40 text-xs font-medium tracking-wide transition-all shadow-md active:scale-95"
          >
            <Shield className="w-3.5 h-3.5 text-luxury-gold" />
            <span className="hidden sm:inline">Staff Login</span>
            <span className="sm:hidden">Staff</span>
          </button>
        </div>
      </div>

      {/* Mobile Animated Status Sub-bar */}
      <div className="md:hidden flex items-center justify-center py-1.5 bg-luxury-charcoal/5 border-t border-luxury-beige-border/50 text-[10px] tracking-wider text-luxury-charcoal font-medium">
        <span className="relative flex h-1.5 w-1.5 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luxury-gold"></span>
        </span>
        <span>SYSTEM UPGRADE & LAUNCH IN PROGRESS</span>
      </div>
    </header>
  );
};
