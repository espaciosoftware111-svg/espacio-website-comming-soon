import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Sparkles, X, ChevronUp, Calendar } from 'lucide-react';
import { BRAND_DETAILS } from '../utils/constants';
import { playTactileClick } from '../utils/audio';

interface DirectActionDockProps {
  onOpenConsultation: () => void;
}

export const DirectActionDock: React.FC<DirectActionDockProps> = ({ onOpenConsultation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDock = () => {
    playTactileClick();
    setIsExpanded(!isExpanded);
  };

  const handleBook = () => {
    playTactileClick();
    onOpenConsultation();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="flex flex-col gap-2.5 p-3 rounded-2xl bg-white/95 border border-luxury-beige-border shadow-2xl backdrop-blur-md min-w-[210px]"
          >
            <div className="px-2 pt-1 pb-1 border-b border-luxury-beige-border/60">
              <span className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase font-semibold">
                Direct Studio Connect
              </span>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${BRAND_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello ESPACIO, I would like to schedule a private studio consultation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileClick}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-emerald-800 transition-colors text-xs font-semibold"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>WhatsApp Studio</span>
                <span className="text-[10px] text-emerald-600 font-normal">Instant response</span>
              </div>
            </a>

            {/* Direct Call */}
            <a
              href={`tel:${BRAND_DETAILS.phoneRaw}`}
              onClick={playTactileClick}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-luxury-beige-light text-luxury-charcoal transition-colors text-xs font-semibold"
            >
              <div className="w-8 h-8 rounded-lg bg-luxury-charcoal text-luxury-gold flex items-center justify-center shrink-0 shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>Call Studio</span>
                <span className="text-[10px] text-luxury-charcoal-muted font-normal">{BRAND_DETAILS.phone}</span>
              </div>
            </a>

            {/* Book VIP */}
            <button
              onClick={handleBook}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-luxury-beige-light text-luxury-charcoal transition-colors text-xs font-semibold text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-luxury-gold text-white flex items-center justify-center shrink-0 shadow-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>VIP Consultation</span>
                <span className="text-[10px] text-luxury-charcoal-muted font-normal">Reserve private slot</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Bubble Toggle */}
      <motion.button
        onClick={toggleDock}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 font-medium text-xs tracking-wider uppercase ${
          isExpanded
            ? 'bg-luxury-charcoal text-white'
            : 'bg-gradient-to-r from-luxury-charcoal via-luxury-charcoal-light to-luxury-charcoal text-white border border-luxury-gold/40 shadow-plaque'
        }`}
      >
        {isExpanded ? (
          <>
            <X className="w-4 h-4 text-luxury-gold" />
            <span>Close</span>
          </>
        ) : (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Connect with Studio</span>
            <ChevronUp className="w-3.5 h-3.5 text-luxury-gold" />
          </>
        )}
      </motion.button>
    </div>
  );
};
