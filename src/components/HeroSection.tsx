import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plaque3D } from './Plaque3D';
import { BRAND_DETAILS, LAUNCH_MILESTONES } from '../utils/constants';
import { Clock, Calendar, PhoneCall, MessageCircle } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

interface HeroSectionProps {
  onScrollToConsultation: () => void;
  onScrollToStudio?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToConsultation,
}) => {
  // Live Countdown Timer (Target: 14 days from current date)
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBookClick = () => {
    playTactileClick();
    onScrollToConsultation();
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Architectural Ambient Lighting Gradients */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-luxury-gold/8 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-luxury-charcoal/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Responsive Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Interactive 3D Brand Plaque */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <Plaque3D />
          </motion.div>

          {/* Right Column: Brand Story, Status & Interactive Progress */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* Eyebrow: ESTD. HYDERABAD • 40+ YEARS LEGACY */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold-dark text-[11px] font-bold tracking-[0.2em] uppercase">
                {BRAND_DETAILS.estd} • {BRAND_DETAILS.experienceYears}
              </span>
              <span className="h-[1px] flex-1 bg-gradient-to-r from-luxury-gold/40 to-transparent" />
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-luxury-charcoal font-light tracking-tight leading-[1.12]">
                Designing Spaces.{' '}
                <span className="italic font-editorial text-luxury-gold-dark block sm:inline">
                  Defining Lifestyles.
                </span>
              </h1>
            </div>

            {/* Maintenance & Studio Open Subtext */}
            <p className="text-base sm:text-lg text-luxury-charcoal-muted font-light leading-relaxed max-w-2xl">
              Our digital experience is currently undergoing an architectural evolution. Our{' '}
              <strong className="font-medium text-luxury-charcoal underline decoration-luxury-gold/40 underline-offset-4">
                Aziznagar Experience Studio
              </strong>{' '}
              remains open for private consultations, turnkey villa interior discussions, and material walk-throughs.
            </p>

            {/* Launch Countdown & Progress Module */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 border border-luxury-beige-border shadow-luxury backdrop-blur-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-luxury-beige-border/60 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-luxury-charcoal tracking-wider uppercase">
                  <Clock className="w-4 h-4 text-luxury-gold" />
                  <span>Digital Experience Reveal Countdown</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-luxury-charcoal-muted">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Studio Operations Active</span>
                </div>
              </div>

              {/* Countdown Numbers Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-3 rounded-xl bg-luxury-beige-light border border-luxury-beige-border/80">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-charcoal block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-luxury-charcoal-muted font-mono">
                    Days
                  </span>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-luxury-beige-light border border-luxury-beige-border/80">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-charcoal block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-luxury-charcoal-muted font-mono">
                    Hours
                  </span>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-luxury-beige-light border border-luxury-beige-border/80">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-charcoal block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-luxury-charcoal-muted font-mono">
                    Mins
                  </span>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-luxury-beige-light border border-luxury-beige-border/80">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-luxury-gold-dark block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-luxury-charcoal-muted font-mono">
                    Secs
                  </span>
                </div>
              </div>

              {/* Milestone Tracker Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs text-luxury-charcoal">
                  <span className="font-medium">System Evolution Progress</span>
                  <span className="font-mono text-luxury-gold-dark font-semibold">92.5%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-luxury-beige-dark overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92.5%' }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark"
                  />
                </div>
              </div>
            </div>

            {/* Quick Action Button Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleBookClick}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-luxury-charcoal text-white font-medium text-sm tracking-wider hover:bg-luxury-charcoal-light hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-luxury-gold" />
                <span>Book VIP Consultation</span>
              </button>

              <a
                href={`https://wa.me/${BRAND_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello ESPACIO, I would like to schedule a studio consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-luxury-beige-border text-luxury-charcoal font-medium text-sm hover:border-emerald-500 hover:text-emerald-700 shadow-sm transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Studio</span>
              </a>

              <a
                href={`tel:${BRAND_DETAILS.phoneRaw}`}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-luxury-beige-dark border border-luxury-beige-border text-luxury-charcoal font-medium text-sm hover:bg-white shadow-sm transition-all"
                title="Direct Call"
              >
                <PhoneCall className="w-4 h-4 text-luxury-gold-dark" />
                <span className="hidden sm:inline">{BRAND_DETAILS.phone}</span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
