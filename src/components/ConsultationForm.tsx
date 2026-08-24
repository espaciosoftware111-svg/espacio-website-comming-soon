import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_OPTIONS, BRAND_DETAILS } from '../utils/constants';
import { ServiceRequirement, ConsultationSubmission } from '../types';
import { Sparkles, CheckCircle2, Phone, User, Calendar, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { playTactileClick, playSuccessChord } from '../utils/audio';

interface ConsultationFormProps {
  onSuccessSubmit?: (data: ConsultationSubmission) => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSuccessSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState<ServiceRequirement>('Turnkey Interiors');
  const [timeSlot, setTimeSlot] = useState('Morning (10:30 AM - 1:00 PM)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ConsultationSubmission | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setErrorMsg('Please enter a valid phone or WhatsApp number');
      return;
    }

    setIsSubmitting(true);
    playTactileClick();

    setTimeout(() => {
      const newSubmission: ConsultationSubmission = {
        id: 'ESP-' + Math.floor(1000 + Math.random() * 9000),
        fullName: fullName.trim(),
        phone: phone.trim(),
        requirement,
        timeSlot,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        status: 'Pending',
      };

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('espacio_consultations') || '[]');
        localStorage.setItem('espacio_consultations', JSON.stringify([newSubmission, ...existing]));
      } catch (err) {
        console.error('Storage save error', err);
      }

      setIsSubmitting(false);
      setSubmittedData(newSubmission);
      playSuccessChord();

      if (onSuccessSubmit) {
        onSuccessSubmit(newSubmission);
      }
    }, 650);
  };

  const handlePillSelect = (req: ServiceRequirement) => {
    playTactileClick();
    setRequirement(req);
  };

  const resetForm = () => {
    playTactileClick();
    setSubmittedData(null);
    setFullName('');
    setPhone('');
    setNotes('');
  };

  return (
    <div id="vip-consultation" className="relative max-w-4xl mx-auto">
      {/* Outer Floating Luxury Card */}
      <div className="relative rounded-3xl bg-white border border-luxury-beige-border shadow-luxury-hover p-6 sm:p-10 md:p-12 overflow-hidden">
        
        {/* Subtle Luxury Corner Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-luxury-gold/15 via-luxury-gold/5 to-transparent rounded-bl-full pointer-events-none" />

        <AnimatePresence mode="wait">
          {submittedData ? (
            /* Success View */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center py-6 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-lg">
                <span className="text-[11px] font-mono tracking-widest text-luxury-gold-dark font-bold uppercase">
                  REFERENCE #{submittedData.id} • CONFIRMED
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal">
                  Thank You, {submittedData.fullName}
                </h3>
                <p className="text-sm text-luxury-charcoal-muted leading-relaxed">
                  Your VIP consultation request for{' '}
                  <strong className="text-luxury-charcoal">{submittedData.requirement}</strong> has been prioritized. Our Senior Design Architect will connect with you via WhatsApp or phone shortly.
                </p>
              </div>

              {/* Direct WhatsApp Action Link for Instant Chat */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-md">
                <a
                  href={`https://wa.me/${BRAND_DETAILS.whatsappRaw}?text=${encodeURIComponent(
                    `Hello ESPACIO, I just submitted consultation request #${submittedData.id} for ${submittedData.requirement}. My name is ${submittedData.fullName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Immediate WhatsApp Note</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-luxury-beige-border text-luxury-charcoal hover:bg-luxury-beige-light text-sm font-medium transition-colors"
                >
                  Book Another
                </button>
              </div>
            </motion.div>
          ) : (
            /* Booking Form */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="w-4 h-4 text-luxury-gold-dark" />
                  <span className="text-xs font-bold tracking-[0.2em] text-luxury-gold-dark uppercase">
                    Priority Client Concierge
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-luxury-charcoal">
                  Reserve a Private Studio Consultation
                </h2>
                <p className="text-sm text-luxury-charcoal-muted max-w-2xl">
                  While our online portal evolves, our design studio in Aziznagar is fully operational. Share your space requirements for a dedicated 1-on-1 session with our architectural team.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Requirement Selection Pills */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold tracking-wider text-luxury-charcoal uppercase">
                    Select Your Requirement
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SERVICE_OPTIONS.map((opt) => {
                      const isSelected = requirement === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handlePillSelect(opt.id as ServiceRequirement)}
                          className={`flex flex-col items-start p-3 rounded-xl text-left border transition-all ${
                            isSelected
                              ? 'bg-luxury-charcoal text-white border-luxury-charcoal shadow-md scale-[1.01]'
                              : 'bg-luxury-beige-light/60 text-luxury-charcoal border-luxury-beige-border hover:bg-luxury-beige-light hover:border-luxury-gold/50'
                          }`}
                        >
                          <span className="text-xs font-semibold">{opt.label}</span>
                          <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-luxury-gold' : 'text-luxury-charcoal-muted'}`}>
                            {opt.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Name and Phone Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider text-luxury-charcoal uppercase">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal-muted" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rajesh Reddy / Ananya Rao"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-luxury-beige-light/50 border border-luxury-beige-border focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 text-sm text-luxury-charcoal transition-all placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider text-luxury-charcoal uppercase">
                      Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal-muted" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-luxury-beige-light/50 border border-luxury-beige-border focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 text-sm text-luxury-charcoal transition-all placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Preferred Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider text-luxury-charcoal uppercase">
                      Preferred Studio Time Slot
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-charcoal-muted" />
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-luxury-beige-light/50 border border-luxury-beige-border focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 text-sm text-luxury-charcoal transition-all cursor-pointer"
                      >
                        <option>Morning (10:30 AM - 1:00 PM)</option>
                        <option>Afternoon (2:00 PM - 5:00 PM)</option>
                        <option>Evening (5:30 PM - 7:30 PM)</option>
                        <option>Sunday Special Private Appointment</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider text-luxury-charcoal uppercase">
                      Space Dimensions or Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. 4BHK Villa in Kokapet, Modular kitchen..."
                      className="w-full px-4 py-3 rounded-xl bg-luxury-beige-light/50 border border-luxury-beige-border focus:border-luxury-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 text-sm text-luxury-charcoal transition-all placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-dark text-white font-medium text-sm tracking-wider shadow-gold-glow hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Registering Consultation...</span>
                    ) : (
                      <>
                        <span>Request Priority Callback</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
