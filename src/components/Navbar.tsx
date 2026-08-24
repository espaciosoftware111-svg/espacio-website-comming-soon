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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-luxury-beige/85 border-b border-luxury-beige-border/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Minimal ESPACIO Text Logo & Monogram (Image 2 Lockup Design) */}
        <div className="flex items-center gap-3 lg:gap-4 select-none">
          <div className="w-10 h-10 lg:w-15 lg:h-15 xl:w-16 xl:h-16 rounded-xl lg:rounded-2xl bg-[#121316] border border-[#C5A572]/40 flex items-center justify-center p-1.5 lg:p-2.5 shadow-md shrink-0">
            <EspacioMonogram size="100%" className="w-full h-full" variant="white" isLightOn={true} glow={true} />
          </div>
          <div className="flex flex-col justify-center min-w-[130px] lg:min-w-[200px]">
            <span className="font-sans text-lg lg:text-2xl xl:text-3xl font-bold tracking-[0.22em] lg:tracking-[0.26em] text-luxury-charcoal leading-none">
              ESPACIO
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 my-1 lg:my-1.5 w-full">
              <span className="flex-1 h-[1.5px] bg-[#C5A572] rounded-full" />
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C5A572] rotate-45 shrink-0" />
              <span className="flex-1 h-[1.5px] bg-[#C5A572] rounded-full" />
            </div>
            <span className="text-[8px] lg:text-[11px] xl:text-[12px] tracking-[0.28em] font-bold text-luxury-charcoal uppercase leading-none">
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
