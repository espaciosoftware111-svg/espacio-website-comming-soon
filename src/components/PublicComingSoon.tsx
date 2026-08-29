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
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const isLampLit = isLogoHovered || isButtonHovered;
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[100dvh] lg:h-screen lg:max-h-screen w-full max-w-[100vw] relative flex flex-col justify-between overflow-x-hidden selection:bg-luxury-gold selection:text-luxury-charcoal lg:overflow-hidden pb-4 lg:pb-0"
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

      {/* Top Header Navigation */}
      <header className="relative z-30 w-full bg-transparent pt-3 sm:pt-4 lg:pt-5 pb-1 shrink-0">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 h-14 sm:h-16 lg:h-18 flex items-center justify-between">
          
          {/* Left: Brand Monogram & Title - Hover to turn on logo lamp light */}
          <div
            className="relative flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 select-none px-1.5 sm:px-2 py-1 cursor-pointer group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            {/* Monogram Emblem (Larger on mobile, glows when hovered or when action buttons are hovered) */}
            <div className={`w-11 h-11 xs:w-12 xs:h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 lg:h-13 flex items-center justify-center transition-all duration-300 shrink-0 ${isLampLit ? 'scale-110 drop-shadow-[0_0_16px_rgba(223,194,141,0.7)]' : 'group-hover:scale-105'}`}>
              <EspacioMonogram size="100%" className="w-full h-full" variant="dark" isLightOn={isLampLit} glow={isLampLit} tightFit={true} useImage={false} />
            </div>

            {/* Typography Lockup - Bold & Prominent on mobile */}
            <div className="inline-flex flex-col items-start justify-center pl-0.5 sm:pl-1">
              {/* ESPACIO */}
              <span className="font-['Montserrat',sans-serif] text-[16.5px] xs:text-[18px] sm:text-[16px] md:text-[19px] lg:text-[22px] font-semibold tracking-[0.30em] sm:tracking-[0.32em] text-[#121316] leading-none whitespace-nowrap">
                ESPACIO
              </span>
              
              {/* Thin Gold Line — Gold Diamond Dot — Thin Gold Line */}
              <div className="flex items-center justify-between gap-1 sm:gap-1.5 my-1 sm:my-1.5 lg:my-2 w-full">
                <span className="flex-1 h-[1.2px] bg-[#C59B27]" />
                <span className="w-1.5 h-1.5 bg-[#C59B27] rotate-45 shrink-0" />
                <span className="flex-1 h-[1.2px] bg-[#C59B27]" />
              </div>

              {/* INTERIORS AND MODULAR */}
              <span className="font-['Montserrat',sans-serif] text-[7px] xs:text-[7.5px] sm:text-[7px] md:text-[8px] lg:text-[9.5px] tracking-[0.34em] sm:tracking-[0.36em] font-semibold text-[#121316] uppercase leading-none whitespace-nowrap">
                INTERIORS AND MODULAR
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area (Balanced & Centered across all viewports) */}
      <main className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-col justify-center items-center gap-2.5 sm:gap-4 md:gap-5 lg:gap-6 overflow-hidden">
        
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center space-y-1.5 sm:space-y-2 lg:space-y-2.5 pt-5 xs:pt-6 sm:pt-8 md:pt-12 lg:pt-16 w-full shrink-0"
        >
          {/* Hero Text Group with 37% Soft Atmospheric Mist for Enhanced Visibility */}
          <div className="relative w-full max-w-3xl mx-auto space-y-1.5 sm:space-y-2 lg:space-y-2.5 py-1 px-1 sm:px-2">
            {/* 37% Soft Luminous Mist Backdrop behind text ONLY */}
            <div
              className="absolute -inset-x-4 sm:-inset-x-8 -inset-y-3 sm:-inset-y-4 rounded-3xl pointer-events-none -z-10 filter blur-xl opacity-[0.37]"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(247, 244, 238, 0.82) 45%, rgba(247, 244, 238, 0.35) 75%, transparent 100%)',
              }}
            />

            {/* Hero Tagline Connection: DESIGNING SPACES · DEFINING LIFESTYLES */}
            {settings.taglines?.showInHero !== false && (
              <div className="w-full max-w-3xl mx-auto py-0.5 px-1 sm:px-2 flex items-center justify-center">
                <p className="font-['Montserrat',sans-serif] font-bold text-[9.5px] xs:text-[11px] sm:text-[13.5px] md:text-[15px] lg:text-[16.5px] tracking-[0.22em] xs:tracking-[0.26em] sm:tracking-[0.30em] uppercase whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
                  <span className="text-[#171717] font-bold whitespace-nowrap">{primaryTagline}</span>
                  <span className="mx-0.5 sm:mx-1 md:mx-1.5 text-[#C59B27] font-bold whitespace-nowrap">·</span>
                  <span className="text-[#C59B27] font-bold whitespace-nowrap">{secondaryTagline}</span>
                </p>
              </div>
            )}

            {/* Main Hero Headline: WE'RE GETTING BETTER FOR YOU */}
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[38px] text-[#171717] font-bold tracking-tight leading-[1.12] max-w-3xl mx-auto px-1 sm:px-2 drop-shadow-[0_1px_3px_rgba(255,255,255,0.7)]">
              {settings.hero.mainHeading}
            </h1>

            {/* Hero Description */}
            <p className="text-[12px] sm:text-sm md:text-[15px] lg:text-[15.5px] text-[#3F3A35] font-medium leading-relaxed max-w-2xl mx-auto px-2 sm:px-0 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
              {settings.hero.description}
            </p>
          </div>

          {/* 4 CONTACT BUTTONS (Responsive 2x2 grid on mobile, 4-in-row on tablet/desktop) */}
          <div className="pt-1 sm:pt-1.5 w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0">
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 lg:gap-3 w-full">
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
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="min-h-[36px] sm:min-h-[38px] lg:min-h-[40px] w-full md:w-auto md:flex-1 lg:max-w-[200px] flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-xl font-sans font-bold text-[10px] sm:text-[11.5px] lg:text-[12px] tracking-wider uppercase bg-[#F7F3EC]/95 hover:bg-white border border-[#E8DED0] hover:border-[#C59B27] text-[#171717] shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                      {renderButtonIcon(btn.type)}
                      <span className="font-bold truncate">{btn.name}</span>
                    </a>
                  );
                })}
            </div>
          </div>

        </motion.section>

        {/* LOWER ARCHITECTURAL INFORMATION PANEL */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-full rounded-2xl sm:rounded-3xl bg-[#F7F3EC]/95 border border-[#E8DED0] p-3 sm:p-4.5 lg:p-5 shadow-lg backdrop-blur-md space-y-1.5 sm:space-y-3 lg:space-y-3.5 overflow-hidden relative shrink-0"
        >
          {/* Label + Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-0.5 sm:space-y-1 px-1">
            <span className="text-[8.5px] sm:text-[10.5px] lg:text-[11px] font-bold tracking-[0.20em] sm:tracking-[0.22em] text-[#C59B27] uppercase flex items-center justify-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Bespoke Interior Solutions</span>
            </span>
            <h2 className="font-serif text-sm sm:text-lg md:text-xl lg:text-[22px] text-[#171717] font-bold tracking-tight uppercase leading-tight">
              {settings.modularDescription.heading}
            </h2>
          </div>

          {/* 3 Feature Cards (Marquee Carousel - Right to Left) */}
          <div className="relative w-full max-w-full overflow-hidden py-0.5 sm:py-1">
            <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-16 md:w-20 bg-gradient-to-r from-[#F7F3EC] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-16 md:w-20 bg-gradient-to-l from-[#F7F3EC] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-right-to-left flex gap-2.5 sm:gap-4 px-1 sm:px-4 pointer-events-none">
              {[...settings.modularDescription.features, ...settings.modularDescription.features, ...settings.modularDescription.features].map((feat, i) => (
                <div
                  key={i}
                  className="w-[200px] xs:w-[225px] sm:w-[270px] md:w-[310px] flex-shrink-0 p-2.5 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E8DED0] space-y-1 sm:space-y-1.5 hover:border-[#C59B27] hover:shadow-md transition-all select-none"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C59B27] shrink-0" />
                    <h3 className="font-serif text-[10px] sm:text-[13px] lg:text-[13.5px] font-bold text-[#171717] tracking-wide uppercase leading-snug">{feat.title}</h3>
                  </div>
                  <p className="text-[9.5px] sm:text-[11.5px] lg:text-[12px] text-[#3F3A35] font-normal leading-snug pl-2.5 sm:pl-3.5">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Section Brand Description */}
          <div className="text-center max-w-3xl mx-auto border-t border-[#E8DED0]/80 pt-1.5 sm:pt-2.5 lg:pt-3">
            <p className="text-[10px] sm:text-xs md:text-[12.5px] lg:text-[13.5px] text-[#3F3A35] font-medium leading-relaxed px-1 sm:px-2">
              {settings.modularDescription.body}
            </p>
          </div>
        </motion.section>

      </main>
    </motion.div>
  );
};
