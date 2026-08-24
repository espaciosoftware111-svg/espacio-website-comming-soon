import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_DETAILS, MATERIAL_SHOWCASE } from '../utils/constants';
import { MapPin, Clock, Navigation, Phone, MessageCircle, ArrowUpRight, Building2, Layers } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

export const StudioSection: React.FC = () => {
  return (
    <section id="studio-details" className="py-16 lg:py-24 bg-luxury-beige-light/70 border-t border-luxury-beige-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold-dark text-xs font-bold tracking-[0.2em] uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Aziznagar Flagship Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-charcoal">
            Experience Materials & Modular Systems in Person
          </h2>
          <p className="text-sm sm:text-base text-luxury-charcoal-muted leading-relaxed">
            Our physical experience center is open to architects, interior designers, homeowners, and developers. Explore real-scale modular kitchen layouts, tactile stone finishes, and European mechanism hardware.
          </p>
        </div>

        {/* Studio Location & Contact Master Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address, Hours, and Direct Triggers (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-luxury-beige-border p-6 sm:p-10 shadow-luxury flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Address Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-luxury-beige-dark border border-luxury-beige-border flex items-center justify-center shrink-0 text-luxury-gold-dark">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold-dark font-semibold">
                    Studio Location
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-luxury-charcoal font-medium">
                    ESPACIO Flagship Experience Studio
                  </h3>
                  <p className="text-sm text-luxury-charcoal-muted leading-relaxed">
                    {BRAND_DETAILS.experienceStudioAddress},<br />
                    {BRAND_DETAILS.cityStateZip}
                  </p>
                </div>
              </div>

              {/* Working Hours Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-luxury-beige-dark border border-luxury-beige-border flex items-center justify-center shrink-0 text-luxury-gold-dark">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold-dark font-semibold">
                    Studio Visiting Hours
                  </span>
                  <p className="text-sm font-medium text-luxury-charcoal">
                    {BRAND_DETAILS.hoursWeekday}
                  </p>
                  <p className="text-xs text-luxury-charcoal-muted">
                    {BRAND_DETAILS.hoursSunday}
                  </p>
                </div>
              </div>

              {/* Legacy Badge */}
              <div className="p-4 rounded-2xl bg-luxury-beige-light border border-luxury-beige-border/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-luxury-charcoal block">40+ Years Manufacturing Heritage</span>
                  <span className="text-[11px] text-luxury-charcoal-muted">State-of-the-art German CNC manufacturing in Hyderabad</span>
                </div>
                <span className="text-xs font-mono text-luxury-gold-dark font-bold px-2.5 py-1 bg-white rounded-lg border border-luxury-beige-border">
                  HYDERABAD
                </span>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-luxury-beige-border">
              {/* Google Maps Directions */}
              <a
                href={BRAND_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTactileClick}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-luxury-charcoal text-white text-xs font-semibold tracking-wider hover:bg-luxury-charcoal-light transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4 text-luxury-gold" />
                <span>Directions ↗</span>
              </a>

              {/* Direct WhatsApp Chat */}
              <a
                href={`https://wa.me/${BRAND_DETAILS.whatsappRaw}?text=${encodeURIComponent(
                  'Hello ESPACIO, I would like to visit the Aziznagar Experience Studio.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTactileClick}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* One-Click Call */}
              <a
                href={`tel:${BRAND_DETAILS.phoneRaw}`}
                onClick={playTactileClick}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white border border-luxury-beige-border text-luxury-charcoal text-xs font-semibold tracking-wider hover:bg-luxury-beige-light transition-all"
              >
                <Phone className="w-4 h-4 text-luxury-gold-dark" />
                <span>Call Concierge</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Studio Map Preview / Route Guide (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-luxury-charcoal text-white p-6 sm:p-8 flex flex-col justify-between shadow-plaque relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(197,165,114,0.18)_0%,_transparent_60%)] pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase">
                  Studio Route Guide
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-neutral-100">
                Conveniently Located on Moinabad Road
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Situated along the prime Moinabad Road corridor in Aziznagar, easily accessible from Kokapet, Financial District, Gandipet, and Jubilee Hills.
              </p>

              {/* Landmark checkpoints */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                  <span>10 mins from Outer Ring Road (ORR Exit 18/19)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                  <span>Dedicated valet & private client parking available</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                  <span>Private conference lounge for architects & clients</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
              <a
                href={BRAND_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-sm transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-luxury-gold" />
                  <span className="text-xs font-medium text-neutral-100">Open in Google Maps</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Material & Finish Showcase Strip */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-luxury-gold-dark tracking-widest uppercase">
                <Layers className="w-4 h-4" />
                <span>Curated Materials Vault</span>
              </div>
              <h3 className="font-serif text-2xl text-luxury-charcoal mt-1">
                Touch & Feel Premium Finishes
              </h3>
            </div>
            <p className="text-xs text-luxury-charcoal-muted max-w-md">
              Over 250+ certified imported finishes on live display at our Aziznagar Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MATERIAL_SHOWCASE.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl bg-white border border-luxury-beige-border overflow-hidden shadow-sm hover:shadow-luxury transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono tracking-wider text-luxury-gold uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <h4 className="font-serif text-sm font-medium text-luxury-charcoal group-hover:text-luxury-gold-dark transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-luxury-charcoal-muted leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
