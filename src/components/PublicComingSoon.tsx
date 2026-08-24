import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiteSettings } from '../types/settings';
import { trackAnalyticsClick } from '../utils/settingsStore';
import { playTactileClick } from '../utils/audio';
import { EspacioMonogram } from './EspacioMonogram';
import { PendantLight } from './PendantLight';
import { EXACT_LUXURY_BG } from '../assets/luxuryBgBase64';
import {
  MessageCircle,
  Phone,
  Instagram,
  Mail,
  Layers,
} from 'lucide-react';

interface PublicComingSoonProps {
  settings: SiteSettings;
  onOpenAdmin?: () => void;
  onReplayIntro?: () => void;
  isTransitioningFromIntro?: boolean;
}

export const PublicComingSoon: React.FC<PublicComingSoonProps> = ({
  settings,
}) => {
  const primaryTagline = settings.taglines?.primary || settings.branding.tagline1 || 'Designing Spaces';
  const secondaryTagline = settings.taglines?.secondary || settings.branding.tagline2 || 'Defining Lifestyles';

  const handleButtonClick = (type: 'whatsapp' | 'call' | 'instagram' | 'email' | 'maps') => {
    playTactileClick();
    trackAnalyticsClick(type);
  };

  const renderButtonIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-600" />;
      case 'call':
        return <Phone className="w-4 h-4 text-luxury-gold-dark" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'email':
        return <Mail className="w-4 h-4 text-blue-600" />;
      default:
        return <MessageCircle className="w-4 h-4 text-luxury-gold" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full max-w-[100vw] relative flex flex-col justify-between overflow-x-hidden selection:bg-luxury-gold selection:text-luxury-charcoal"
      style={{ backgroundColor: settings.appearance.primaryBgColor }}
    >
      {/* EXACT USER-UPLOADED ARCHITECTURAL LIVING ROOM BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
        <img
          src={EXACT_LUXURY_BG || './espacio-luxury-living.jpg'}
          alt="ESPACIO Luxury Living Architecture"
          className="w-full h-full object-cover object-center"
        />
        {/* Luminous soft aura behind text to maximize contrast & sharp visibility */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse at 50% 36%, rgba(247, 244, 238, 0.58) 0%, rgba(247, 244, 238, 0.42) 50%, rgba(247, 244, 238, 0.68) 100%)',
          }}
        />
      </div>

      {/* REALISTIC SWINGING PENDANT LIGHT WITH WARM AMBIENT POOL */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-full max-w-2xl flex flex-col items-center overflow-visible">
        <PendantLight />
      </div>

      {/* Top Header Navigation (Clean, Borderless Luxury Header) */}
      <header className="relative z-30 w-full max-w-full bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
          
          {/* Left: Brand Monogram & Title - Exact Image 2 Lockup Structure */}
          <div className="flex items-center gap-3 lg:gap-4 select-none">
            <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-[#121316] border border-[#C5A572]/40 flex items-center justify-center p-1 sm:p-1.5 lg:p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 shrink-0">
              <EspacioMonogram size="100%" className="w-full h-full" variant="white" isLightOn={true} glow={true} />
            </div>

            <div className="flex flex-col justify-center min-w-[130px] sm:min-w-[160px] lg:min-w-[220px]">
              {/* ESPACIO */}
              <span className="font-sans text-base sm:text-lg md:text-xl lg:text-3xl font-bold tracking-[0.22em] lg:tracking-[0.26em] text-[#08090C] leading-none drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
                ESPACIO
              </span>
              
              {/* Thin Gold Line — Gold Square Dot — Thin Gold Line (Matching Image 2) */}
              <div className="flex items-center gap-1.5 sm:gap-2 my-1 lg:my-1.5 w-full">
                <span className="flex-1 h-[1.5px] bg-[#C5A572] rounded-full" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C5A572] rotate-45 shrink-0" />
                <span className="flex-1 h-[1.5px] bg-[#C5A572] rounded-full" />
              </div>

              {/* INTERIORS AND MODULAR */}
              <span className="text-[7.5px] sm:text-[9px] md:text-[10px] lg:text-[12.5px] tracking-[0.28em] sm:tracking-[0.32em] font-bold text-[#121316] uppercase leading-none drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
                INTERIORS AND MODULAR
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area (Balanced 37% increased vertical spacing) */}
      <main className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-5 flex flex-col justify-center gap-4 sm:gap-6 overflow-hidden">
        
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-2.5 sm:space-y-4 pt-1 w-full"
        >
          {/* Hero Tagline Connection */}
          {settings.taglines?.showInHero !== false && (
            <div className="max-w-lg mx-auto py-0.5 px-2">
              <p className="font-serif italic font-bold text-base sm:text-xl md:text-2xl text-[#08090C] tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
                <span>&ldquo;{primaryTagline}</span>
                <span className="mx-1.5 sm:mx-2 text-[#9A7A48]">·</span>
                <span className="text-[#8A662E] font-bold">{secondaryTagline}&rdquo;</span>
              </p>
            </div>
          )}

          {/* Main Heading (Fluid responsive typography) */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#08090C] font-bold tracking-tight leading-[1.15] sm:leading-[1.12] max-w-3xl mx-auto px-2 drop-shadow-[0_3px_16px_rgba(255,255,255,0.95)]">
            {settings.hero.mainHeading}
          </h1>

          {/* Description (High-contrast legible text) */}
          <p className="text-xs sm:text-base md:text-lg text-[#16171A] font-medium leading-relaxed max-w-2xl mx-auto px-2 sm:px-0 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
            {settings.hero.description}
          </p>

          {/* 4 ACTION BUTTONS (2x2 Grid on Mobile / All in 1 Row on Laptop View) */}
          <div className="pt-2 sm:pt-3 w-full max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full">
              {settings.buttons
                .filter((b) => b.enabled)
                .sort((a, b) => a.order - b.order)
                .map((btn) => {
                  let href = '#';
                  if (btn.type === 'whatsapp') {
                    const cleanPhone = (btn.value || settings.contact.whatsappRaw).replace(/\D/g, '');
                    const msg = encodeURIComponent(btn.message || settings.contact.whatsappDefaultMessage);
                    href = `https://wa.me/${cleanPhone}?text=${msg}`;
                  } else if (btn.type === 'call') {
                    href = `tel:${btn.value || settings.contact.phoneRaw}`;
                  } else if (btn.type === 'instagram') {
                    href = btn.value || settings.social.instagram;
                  } else if (btn.type === 'email') {
                    href = `mailto:${btn.value || settings.contact.email}`;
                  } else if (btn.type === 'maps') {
                    href = btn.value || settings.contact.googleMapsUrl;
                  }

                  return (
                    <a
                      key={btn.id}
                      href={href}
                      target={btn.type === 'whatsapp' || btn.type === 'instagram' || btn.type === 'maps' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      onClick={() => handleButtonClick(btn.type as any)}
                      className="min-h-[44px] sm:min-h-[48px] lg:min-h-[52px] w-full md:w-auto md:flex-1 lg:max-w-[220px] flex items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3 px-2.5 sm:px-4 lg:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-xs lg:text-sm tracking-wider uppercase bg-white/95 hover:bg-white border-2 border-luxury-beige-border hover:border-luxury-gold/70 text-luxury-charcoal shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      {renderButtonIcon(btn.type)}
                      <span className="font-bold truncate">{btn.name}</span>
                    </a>
                  );
                })}
            </div>
          </div>

        </motion.section>

        {/* MODULAR BUSINESS DESCRIPTION (MOVING RIGHT TO LEFT MARQUEE) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-full rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-luxury-beige-border p-3.5 sm:p-5 md:p-6 shadow-xl backdrop-blur-md space-y-3 sm:space-y-4 overflow-hidden relative mt-2 sm:mt-3.5"
        >
          <div className="text-center max-w-2xl mx-auto space-y-0.5 sm:space-y-1 px-1">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#8A662E] uppercase flex items-center justify-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Bespoke Architectural Solutions</span>
            </span>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl text-[#08090C] font-bold">
              {settings.modularDescription.heading}
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#18191C] font-medium leading-relaxed">
              {settings.modularDescription.body}
            </p>
          </div>

          {/* Marquee Carousel - Moving Right to Left */}
          <div className="relative w-full max-w-full overflow-hidden py-0.5 sm:py-1">
            {/* Left & Right gradient fade masks for seamless elegance */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-right-to-left flex gap-3 sm:gap-4 px-2 sm:px-4 cursor-grab">
              {/* Duplicate array for seamless infinite looping */}
              {[...settings.modularDescription.features, ...settings.modularDescription.features, ...settings.modularDescription.features].map((feat, i) => (
                <div
                  key={i}
                  className="w-[240px] sm:w-[290px] md:w-[340px] flex-shrink-0 p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#D4C8B8] space-y-1 sm:space-y-1.5 hover:border-[#8A662E] hover:bg-white hover:shadow-lg transition-all select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-luxury-gold shrink-0" />
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-[#08090C] tracking-wide uppercase">{feat.title}</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#25272C] font-medium leading-relaxed pl-3.5 sm:pl-4.5">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

      </main>
    </motion.div>
  );
};
