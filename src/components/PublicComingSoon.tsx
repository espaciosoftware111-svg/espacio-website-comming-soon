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
        return <Phone className="w-4 h-4 text-[#C59B27]" />;
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
      className="min-h-screen lg:h-screen lg:max-h-screen w-full max-w-[100vw] relative flex flex-col justify-between overflow-x-hidden selection:bg-luxury-gold selection:text-luxury-charcoal lg:overflow-hidden"
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

      {/* Top Header Navigation (Transparent Header with Localized Logo Fog Glow) */}
      <header className="relative z-30 w-full bg-transparent pt-3 sm:pt-4 md:pt-4.5 pb-2 shrink-0">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 sm:h-18 lg:h-20 flex items-center justify-between">
          
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
              {/* ESPACIO (Crisp & sharp mobile typography) */}
              <span className="font-sans text-[13px] sm:text-lg md:text-2xl lg:text-[26px] xl:text-[28px] font-bold tracking-[0.24em] lg:tracking-[0.28em] text-[#08090C] leading-none">
                ESPACIO
              </span>
              
              {/* Thin Gold Line — Gold Square Dot — Thin Gold Line */}
              <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 my-0.5 sm:my-1 lg:my-1.5 w-full">
                <span className="flex-1 h-[1.2px] sm:h-[1.5px] bg-[#C5A572] rounded-full" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C5A572] rotate-45 shrink-0" />
                <span className="flex-1 h-[1.2px] sm:h-[1.5px] bg-[#C5A572] rounded-full" />
              </div>

              {/* INTERIORS AND MODULAR (Crisp & legible mobile typography) */}
              <span className="block text-[6.8px] sm:text-[9px] md:text-[10px] lg:text-[11.5px] tracking-[0.24em] sm:tracking-[0.32em] font-bold text-[#121316] uppercase leading-none">
                INTERIORS AND MODULAR
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area (Balanced Single Viewport Layout) */}
      <main className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 lg:pt-3 pb-2 sm:pb-3 lg:pb-4 flex flex-col justify-center gap-2.5 sm:gap-3.5 lg:gap-4 overflow-hidden">
        
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center space-y-1.5 sm:space-y-2.5 lg:space-y-3 pt-3 sm:pt-4 md:pt-5 lg:pt-6 w-full shrink-0"
        >
          {/* 20% Subtle Premium Frosted Atmospheric Mist Overlay */}
          <div
            className="absolute -inset-4 sm:-inset-8 max-w-3xl mx-auto rounded-3xl pointer-events-none -z-10 filter blur-2xl opacity-20"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(247, 243, 236, 0.98) 0%, rgba(247, 243, 236, 0.85) 45%, rgba(238, 228, 213, 0.5) 75%, transparent 100%)',
            }}
          />

          {/* Hero Tagline Connection: DESIGNING SPACES · DEFINING LIFESTYLES */}
          {settings.taglines?.showInHero !== false && (
            <div className="w-full max-w-3xl mx-auto py-0 px-2 relative -top-3 sm:-top-10 md:-top-12 lg:-top-14 flex items-center justify-center">
              <p className="font-gulams font-black italic text-[11px] xs:text-[13px] sm:text-lg md:text-xl lg:text-[23px] tracking-wider uppercase whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5">
                <span className="text-[#171717] font-black whitespace-nowrap" style={{ WebkitTextStroke: '0.45px #171717' }}>{primaryTagline}</span>
                <span className="mx-1 sm:mx-1.5 text-[#C59B27] font-black whitespace-nowrap" style={{ WebkitTextStroke: '0.45px #C59B27' }}>·</span>
                <span className="text-[#C59B27] font-black whitespace-nowrap" style={{ WebkitTextStroke: '0.45px #C59B27' }}>{secondaryTagline}</span>
              </p>
            </div>
          )}

          {/* Main Hero Headline: WE'RE GETTING BETTER FOR YOU (Moved down by 10% on mobile ONLY) */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#171717] font-bold tracking-tight leading-[1.15] sm:leading-[1.12] max-w-3xl mx-auto px-2 relative top-0 sm:-top-5 md:-top-6 lg:-top-7">
            {settings.hero.mainHeading}
          </h1>

          {/* Hero Unique Description (Increased font size as requested) */}
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#3F3A35] font-medium leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
            {settings.hero.description}
          </p>

          {/* 4 CONTACT BUTTONS */}
          <div className="pt-1.5 sm:pt-2 w-full max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:gap-3.5 w-full">
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
                      className="min-h-[40px] sm:min-h-[44px] lg:min-h-[46px] w-full md:w-auto md:flex-1 lg:max-w-[210px] flex items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3 px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-sans font-bold text-[11px] sm:text-[12px] lg:text-[12.5px] tracking-wider uppercase bg-[#F7F3EC]/95 hover:bg-white border border-[#E8DED0] hover:border-[#C59B27] text-[#171717] shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                      {renderButtonIcon(btn.type)}
                      <span className="font-bold truncate">{btn.name}</span>
                    </a>
                  );
                })}
            </div>
          </div>

        </motion.section>

        {/* LOWER ARCHITECTURAL INFORMATION PANEL (Increased Box & Inner Card Heights) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-full rounded-2xl sm:rounded-3xl bg-[#F7F3EC]/95 border border-[#E8DED0] p-4 sm:p-6 lg:p-7 shadow-lg backdrop-blur-md space-y-3.5 sm:space-y-5 lg:space-y-6 overflow-hidden relative mt-3.5 sm:mt-5 lg:mt-6 shrink-0"
        >
          {/* Label + Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-1.5 px-1">
            <span className="text-[10.5px] sm:text-[11.5px] lg:text-[12.5px] font-bold tracking-[0.24em] text-[#C59B27] uppercase flex items-center justify-center gap-1.5">
              <Layers className="w-4 h-4 text-[#C59B27]" />
              <span>Bespoke Interior Solutions</span>
            </span>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-[26px] text-[#171717] font-bold tracking-tight uppercase">
              {settings.modularDescription.heading}
            </h2>
          </div>

          {/* 3 Feature Cards (Marquee Carousel - Right to Left - Increased Heights) */}
          <div className="relative w-full max-w-full overflow-hidden py-1 sm:py-2">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-r from-[#F7F3EC] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-l from-[#F7F3EC] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-right-to-left flex gap-3.5 sm:gap-5 px-2 sm:px-4 pointer-events-none">
              {[...settings.modularDescription.features, ...settings.modularDescription.features, ...settings.modularDescription.features].map((feat, i) => (
                <div
                  key={i}
                  className="w-[260px] sm:w-[310px] md:w-[355px] flex-shrink-0 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E8DED0] space-y-2 sm:space-y-2.5 hover:border-[#C59B27] hover:shadow-md transition-all select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27] shrink-0" />
                    <h3 className="font-serif text-xs sm:text-[14px] lg:text-[15px] font-bold text-[#171717] tracking-wide uppercase">{feat.title}</h3>
                  </div>
                  <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13.5px] text-[#3F3A35] font-normal leading-relaxed pl-4">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Section Only Brand Description */}
          <div className="text-center max-w-3xl mx-auto border-t border-[#E8DED0]/80 pt-3 sm:pt-4 lg:pt-5">
            <p className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#3F3A35] font-medium leading-relaxed px-2">
              {settings.modularDescription.body}
            </p>
          </div>
        </motion.section>

      </main>
    </motion.div>
  );
};
