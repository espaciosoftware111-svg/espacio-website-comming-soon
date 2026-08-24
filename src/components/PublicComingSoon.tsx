import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiteSettings } from '../types/settings';
import { trackAnalyticsClick } from '../utils/settingsStore';
import { playTactileClick } from '../utils/audio';
import { EspacioMonogram } from './EspacioMonogram';
import {
  MessageCircle,
  Phone,
  Instagram,
  Mail,
  Clock,
  Sparkles,
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
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 42, seconds: 19 });

  const primaryTagline = settings.taglines?.primary || settings.branding.tagline1 || 'Designing Spaces';
  const secondaryTagline = settings.taglines?.secondary || settings.branding.tagline2 || 'Defining Lifestyles';

  // Countdown timer calculation
  useEffect(() => {
    if (!settings.countdown.enabled) return;

    const target = new Date(settings.countdown.targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [settings.countdown.enabled, settings.countdown.targetDate]);

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
      className="min-h-screen relative flex flex-col justify-between overflow-x-hidden selection:bg-luxury-gold selection:text-luxury-charcoal"
      style={{ backgroundColor: settings.appearance.primaryBgColor }}
    >
      {/* PENDANT LIGHT HANGING OVER HEADER WITH RADIANT WARMTH */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10 w-full max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center"
        >
          {/* Hanging Cord */}
          <div className="w-[1.5px] h-14 bg-gradient-to-b from-neutral-800 via-neutral-500 to-luxury-charcoal" />
          
          {/* Connector Finial */}
          <div className="w-2 h-2 rounded-full bg-luxury-gold shadow-sm -mt-0.5" />

          {/* Geometric Trapezoidal Lampshade */}
          <div
            className="w-10 h-7 bg-luxury-charcoal rounded-t-sm shadow-xl relative flex items-end justify-center"
            style={{
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            }}
          >
            <div className="w-4 h-1.5 bg-[#FFFBEA] rounded-full filter blur-[1px] mb-0.5" />
          </div>

          {/* Warm Light Pool spreading onto the beige background */}
          <div
            className="absolute top-20 w-[640px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, rgba(197,165,114,0.24) 0%, rgba(247,244,238,0) 70%)',
            }}
          />
        </motion.div>
      </div>

      {/* Top Header Navigation (Ultra-Luxury Architectural Header) */}
      <header className="relative z-30 w-full backdrop-blur-md bg-luxury-beige/90 border-b border-luxury-beige-border/80 shadow-[0_4px_30px_-10px_rgba(18,19,22,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Brand Monogram & Title */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-xl bg-luxury-charcoal border border-luxury-gold/30 flex items-center justify-center p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform hover:scale-105">
              <EspacioMonogram size={28} variant="white" isLightOn={false} />
            </div>

            <div className="flex flex-col">
              <span className="font-sans text-lg font-medium tracking-[0.24em] text-luxury-charcoal leading-none">
                {settings.branding.name}
              </span>
              <span className="text-[9px] tracking-[0.28em] font-semibold text-luxury-gold uppercase mt-1">
                {settings.branding.subTitle}
              </span>
            </div>
          </div>

          {/* Center: Premium Jewel Tagline Capsule */}
          {settings.taglines?.showInHeader !== false && (
            <div className="relative group select-none">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-luxury-gold/30 via-luxury-gold-light/40 to-luxury-gold/30 opacity-70 blur-[3px] group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative flex items-center gap-2.5 px-6 py-2 rounded-full bg-gradient-to-r from-white/95 via-[#FAF8F5] to-white/95 border border-luxury-gold/45 shadow-[0_4px_20px_-4px_rgba(197,165,114,0.25)] backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse shrink-0" />
                <span className="font-serif italic text-xs tracking-[0.14em] text-luxury-charcoal whitespace-nowrap">
                  <strong className="font-semibold text-luxury-charcoal">{primaryTagline}</strong>
                  <span className="mx-1.5 text-luxury-gold font-normal">·</span>
                  <span className="text-luxury-gold-dark font-semibold drop-shadow-sm">{secondaryTagline}</span>
                </span>
              </div>
            </div>
          )}

          {/* Right: Architectural Studio Presence Pill */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-luxury-beige-border shadow-sm backdrop-blur-sm select-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-luxury-charcoal font-medium">
                Aziznagar Studio · Hyd
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area (Smooth upward cascade) */}
      <main className="relative z-20 flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6 pt-4"
        >
          {/* Hero Tagline Connection */}
          {settings.taglines?.showInHero !== false && (
            <div className="max-w-md mx-auto py-1">
              <p className="font-serif italic text-lg sm:text-xl text-neutral-700 tracking-wide">
                <span>&ldquo;{primaryTagline}</span>
                <span className="mx-1.5 text-luxury-gold">·</span>
                <span className="text-luxury-gold-dark font-medium">{secondaryTagline}&rdquo;</span>
              </p>
            </div>
          )}

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-charcoal font-light tracking-tight leading-[1.12] max-w-3xl mx-auto">
            {settings.hero.mainHeading}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-luxury-charcoal-muted font-light leading-relaxed max-w-2xl mx-auto">
            {settings.hero.description}
          </p>

          {/* COUNTDOWN */}
          {settings.countdown.enabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto p-5 sm:p-6 rounded-3xl bg-white/85 border border-luxury-beige-border shadow-luxury backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-luxury-charcoal border-b border-luxury-beige-border/60 pb-3">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-luxury-gold" />
                  <span>{settings.countdown.label}</span>
                </span>
                <span className="text-emerald-700 flex items-center gap-1.5 font-mono text-[11px] lowercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>studio active</span>
                </span>
              </div>

              {/* Numbers Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="p-3 rounded-2xl bg-luxury-beige-light border border-luxury-beige-border">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-charcoal block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-charcoal-muted">
                    Days
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-luxury-beige-light border border-luxury-beige-border">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-charcoal block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-charcoal-muted">
                    Hours
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-luxury-beige-light border border-luxury-beige-border">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-charcoal block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-charcoal-muted">
                    Mins
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-luxury-beige-light border border-luxury-beige-border">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-gold-dark block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-charcoal-muted">
                    Secs
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              {settings.countdown.showProgressBar && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs text-luxury-charcoal">
                    <span className="font-medium">Architectural System Progress</span>
                    <span className="font-mono text-luxury-gold-dark font-semibold">
                      {settings.countdown.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-luxury-beige-dark overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark transition-all duration-700"
                      style={{ width: `${settings.countdown.progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 4 ACTION BUTTONS */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
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

                  const isWa = btn.type === 'whatsapp';
                  const isCall = btn.type === 'call';

                  return (
                    <a
                      key={btn.id}
                      href={href}
                      target={btn.type === 'whatsapp' || btn.type === 'instagram' || btn.type === 'maps' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      onClick={() => handleButtonClick(btn.type as any)}
                      className={`min-h-[44px] min-w-[140px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-medium text-xs tracking-wider uppercase shadow-sm transition-all active:scale-95 ${
                        isWa
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                          : isCall
                          ? 'bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white shadow-md'
                          : 'bg-white hover:bg-luxury-beige-light border border-luxury-beige-border text-luxury-charcoal hover:border-luxury-gold/50'
                      }`}
                    >
                      {renderButtonIcon(btn.type)}
                      <span>{btn.name}</span>
                    </a>
                  );
                })}
            </div>
          </div>

        </motion.section>

        {/* MODULAR BUSINESS DESCRIPTION */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white border border-luxury-beige-border p-6 sm:p-10 shadow-luxury space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] text-luxury-gold-dark uppercase flex items-center justify-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Bespoke Architectural Solutions</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal">
              {settings.modularDescription.heading}
            </h2>
            <p className="text-sm text-luxury-charcoal-muted leading-relaxed">
              {settings.modularDescription.body}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settings.modularDescription.features.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-luxury-beige-light/70 border border-luxury-beige-border/80 space-y-1.5 hover:border-luxury-gold/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-luxury-gold" />
                  <h3 className="font-serif text-sm font-semibold text-luxury-charcoal">{feat.title}</h3>
                </div>
                <p className="text-xs text-luxury-charcoal-muted leading-relaxed pl-4">{feat.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* FOOTER WITH PROMINENT TAGLINES PHILOSOPHY */}
      <footer className="relative z-20 bg-luxury-charcoal text-white pt-12 pb-10 border-t border-luxury-charcoal-light mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
            {/* Monogram + Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center p-2">
                <EspacioMonogram size={32} variant="white" />
              </div>
              <div>
                <span className="font-sans text-xl tracking-[0.25em] text-white block">
                  {settings.branding.name}
                </span>
                <span className="text-[10px] tracking-[0.3em] font-semibold text-luxury-gold uppercase">
                  {settings.branding.subTitle}
                </span>
              </div>
            </div>

            {/* Prominently Highlighted Brand Philosophy Taglines */}
            {settings.taglines?.showInFooter !== false && (
              <div className="text-center md:text-right space-y-1">
                <h3 className="font-serif text-lg sm:text-xl text-white font-light tracking-wide">
                  {primaryTagline}
                </h3>
                <h3 className="font-serif text-lg sm:text-xl text-luxury-gold font-medium tracking-wide">
                  {secondaryTagline}
                </h3>
              </div>
            )}
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${settings.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick('whatsapp')}
                className="hover:text-luxury-gold transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${settings.contact.phoneRaw}`}
                onClick={() => handleButtonClick('call')}
                className="hover:text-luxury-gold transition-colors"
              >
                Call Us
              </a>
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick('instagram')}
                className="hover:text-luxury-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href={`mailto:${settings.contact.email}`}
                onClick={() => handleButtonClick('email')}
                className="hover:text-luxury-gold transition-colors"
              >
                Email
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
            <p>© {new Date().getFullYear()} {settings.branding.name} {settings.branding.subTitle}. All Rights Reserved.</p>
            <p>Aziznagar Studio • Hyderabad, Telangana</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
