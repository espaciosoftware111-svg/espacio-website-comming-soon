import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConsultationSubmission } from '../types';
import { Shield, X, Download, RefreshCw, KeyRound, AlertCircle, Phone, Calendar } from 'lucide-react';
import { playTactileClick, playSuccessChord } from '../utils/audio';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<ConsultationSubmission[]>([]);

  // Load leads from localStorage
  const refreshLeads = () => {
    try {
      const stored = localStorage.getItem('espacio_consultations');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        // Initial sample VIP leads for demonstration
        const sampleLeads: ConsultationSubmission[] = [
          {
            id: 'ESP-8921',
            fullName: 'Vikramaditya Rao',
            phone: '+91 98490 12345',
            requirement: 'Turnkey Interiors',
            timeSlot: 'Morning (10:30 AM - 1:00 PM)',
            notes: '5BHK Triplex Villa in Gandipet, looking for full Italian marble and modular kitchen',
            createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
            status: 'Contacted',
          },
          {
            id: 'ESP-7412',
            fullName: 'Dr. Sunita Reddy',
            phone: '+91 99899 54321',
            requirement: 'Modular Kitchens',
            timeSlot: 'Evening (5:30 PM - 7:30 PM)',
            notes: 'Quartz island, Blum motorized fittings requested',
            createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
            status: 'Pending',
          },
        ];
        setLeads(sampleLeads);
        localStorage.setItem('espacio_consultations', JSON.stringify(sampleLeads));
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    if (pin === '1116' || pin === 'admin' || pin === 'espacio') {
      setIsAuthenticated(true);
      setError('');
      playSuccessChord();
    } else {
      setError('Invalid Access Key. (Demo Key: 1116)');
    }
  };

  const handleStatusToggle = (id: string) => {
    playTactileClick();
    const updated = leads.map((lead) => {
      if (lead.id === id) {
        const nextStatus = lead.status === 'Pending' ? 'Contacted' : lead.status === 'Contacted' ? 'Scheduled' : 'Pending';
        return { ...lead, status: nextStatus as 'Pending' | 'Contacted' | 'Scheduled' };
      }
      return lead;
    });
    setLeads(updated);
    localStorage.setItem('espacio_consultations', JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    playTactileClick();
    const headers = ['ID', 'Full Name', 'Phone', 'Requirement', 'Time Slot', 'Notes', 'Created At', 'Status'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.requirement}"`,
      `"${l.timeSlot || ''}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`,
      l.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `espacio-vip-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#0E1013] border border-white/15 text-white shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-medium tracking-wide">
                  ESPACIO Administrative Console
                </h3>
                <span className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase">
                  Internal Operations & VIP Lead Dispatch
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Login View */
            <div className="p-8 space-y-6">
              <div className="text-center max-w-sm mx-auto space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-luxury-gold">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg text-white">Staff Authentication</h4>
                <p className="text-xs text-neutral-400">
                  Enter your assigned 4-digit security PIN to access incoming consultation bookings.
                </p>
              </div>

              <form onSubmit={handleLogin} className="max-w-xs mx-auto space-y-4">
                <div>
                  <input
                    type="password"
                    maxLength={10}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN (Demo: 1116)"
                    className="w-full text-center tracking-[0.4em] font-mono text-lg py-3 rounded-xl bg-white/10 border border-white/20 focus:border-luxury-gold focus:outline-none text-white placeholder:text-neutral-500 placeholder:text-sm placeholder:tracking-normal"
                    autoFocus
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-400 text-center font-medium flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{error}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal font-semibold text-xs tracking-wider uppercase shadow-md transition-all active:scale-[0.98]"
                >
                  Verify & Access Dashboard
                </button>
              </form>

              <div className="text-center pt-2">
                <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  Default Staff Access PIN: <strong className="text-luxury-gold">1116</strong>
                </span>
              </div>
            </div>
          ) : (
            /* Dashboard View */
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Top Quick Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <span className="text-xs text-neutral-400 block">Total Active Leads</span>
                  <span className="font-serif text-2xl text-luxury-gold font-medium">
                    {leads.length} Consultations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={refreshLeads}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-neutral-200 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-luxury-gold text-luxury-charcoal font-semibold text-xs hover:bg-luxury-gold-light transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Leads List */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                  Priority Client Queue
                </h4>

                {leads.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-6 text-center">
                    No consultation inquiries received yet.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white font-serif">{lead.fullName}</span>
                            <span className="text-[10px] font-mono text-luxury-gold bg-luxury-gold/15 px-2 py-0.5 rounded border border-luxury-gold/30">
                              {lead.requirement}
                            </span>
                          </div>
                          <button
                            onClick={() => handleStatusToggle(lead.id)}
                            className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase transition-colors cursor-pointer ${
                              lead.status === 'Scheduled'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : lead.status === 'Contacted'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                            title="Click to toggle status"
                          >
                            ● {lead.status}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                            <a href={`tel:${lead.phone}`} className="hover:text-white underline">
                              {lead.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
                            <span>{lead.timeSlot || 'Standard Slot'}</span>
                          </div>
                        </div>

                        {lead.notes && (
                          <p className="text-[11px] text-neutral-300 bg-white/5 p-2 rounded-lg italic">
                            &ldquo;{lead.notes}&rdquo;
                          </p>
                        )}

                        <div className="text-[10px] text-neutral-500 flex items-center justify-between pt-1">
                          <span>Ref: {lead.id}</span>
                          <span>{new Date(lead.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
