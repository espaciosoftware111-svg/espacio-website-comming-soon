import React from 'react';
import { EspacioMonogram } from './EspacioMonogram';
import { BRAND_DETAILS } from '../utils/constants';
import { RotateCcw, Instagram, Linkedin, MessageCircle, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const currentYear = new Date().getFullYear();

  const handleReplay = () => {
    playTactileClick();
    onReplayIntro();
  };

  return (
    <footer className="bg-luxury-charcoal text-white pt-16 pb-12 border-t border-luxury-charcoal-light relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-luxury-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Identity & Tagline (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center p-1.5 shadow-inner">
                <EspacioMonogram size={26} variant="silver" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-light tracking-[0.22em] text-white">
                  ESPACIO
                </span>
                <span className="text-[9px] tracking-[0.28em] font-semibold text-luxury-gold uppercase">
                  INTERIORS AND MODULARS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Bespoke luxury residential interiors, precision German/Italian modular kitchens, and turnkey architectural spaces. 40+ years legacy of craftsmanship in Hyderabad.
            </p>

            {/* Replay Intro Button */}
            <div className="pt-2">
              <button
                onClick={handleReplay}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-neutral-300 hover:text-white transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300 text-luxury-gold" />
                <span>Replay Cinematic Intro</span>
              </button>
            </div>
          </div>

          {/* Quick Studio Coordinates (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold block font-semibold">
              Studio Coordinates
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {BRAND_DETAILS.experienceStudioAddress},<br />
              {BRAND_DETAILS.cityStateZip}
            </p>
            <div className="space-y-1.5 pt-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                <a href={`tel:${BRAND_DETAILS.phoneRaw}`} className="hover:text-white transition-colors">
                  {BRAND_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-luxury-gold" />
                <a href={`mailto:${BRAND_DETAILS.email}`} className="hover:text-white transition-colors">
                  {BRAND_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Connect & Socials (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold block font-semibold">
              Connect With Us
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href={`https://wa.me/${BRAND_DETAILS.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-600 border border-white/10 flex items-center justify-center text-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-pink-600 border border-white/10 flex items-center justify-center text-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-blue-600 border border-white/10 flex items-center justify-center text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-neutral-400 pt-1">
              Private design consultations available Monday through Sunday.
            </p>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {currentYear} ESPACIO INTERIORS AND MODULARS. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Hyderabad, Telangana</span>
            <span>•</span>
            <span className="text-luxury-gold">40+ Years Legacy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
