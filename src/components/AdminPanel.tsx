import React, { useState, useEffect } from 'react';
import { SiteSettings, AnalyticsData, DEFAULT_SITE_SETTINGS } from '../types/settings';
import {
  getDraftSettings,
  saveDraftSettings,
  publishSiteSettings,
  resetSiteSettingsToDefault,
  getAnalyticsData,
  isAdminAuthenticated,
  authenticateAdmin,
  logoutAdmin,
} from '../utils/settingsStore';
import { playTactileClick, playSuccessChord } from '../utils/audio';
import { EspacioMonogram } from './EspacioMonogram';
import {
  Shield,
  LogOut,
  Save,
  Send,
  RotateCcw,
  Eye,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  Instagram,
  Mail,
  Activity,
  Calendar,
  ToggleRight,
  Link as LinkIcon,
} from 'lucide-react';

interface AdminPanelProps {
  onCloseToPublic: () => void;
  onPreviewSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onCloseToPublic, onPreviewSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Settings Form State
  const [formSettings, setFormSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [analytics, setAnalytics] = useState<AnalyticsData>(getAnalyticsData());
  const [activeTab, setActiveTab] = useState<'analytics' | 'countdown' | 'contact' | 'status'>('analytics');

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const isAuth = isAdminAuthenticated();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      setFormSettings(getDraftSettings());
      setAnalytics(getAnalyticsData());
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    if (authenticateAdmin(pinInput)) {
      setIsAuthenticated(true);
      setAuthError('');
      setFormSettings(getDraftSettings());
      setAnalytics(getAnalyticsData());
      playSuccessChord();
    } else {
      setAuthError('Invalid Access PIN. (Demo PIN: 1116)');
    }
  };

  const handleLogout = () => {
    playTactileClick();
    logoutAdmin();
    setIsAuthenticated(false);
    onCloseToPublic();
  };

  // Save Draft
  const handleSaveDraft = () => {
    playTactileClick();
    saveDraftSettings(formSettings);
    showToast('Draft settings saved successfully!');
  };

  // Publish Live
  const handlePublish = () => {
    playTactileClick();
    publishSiteSettings(formSettings);
    playSuccessChord();
    showToast('Changes published! Public website updated live.');
  };

  // Reset Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset countdown and contact links to defaults?')) {
      playTactileClick();
      const defs = resetSiteSettingsToDefault();
      setFormSettings(defs);
      showToast('Settings restored to defaults.');
    }
  };

  // Nested field updater
  const updateNested = (category: keyof SiteSettings, field: string, value: any) => {
    setFormSettings((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value,
      },
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090C] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0E1013] border border-white/15 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center mx-auto text-luxury-gold">
              <EspacioMonogram size={36} variant="gold" />
            </div>
            <h2 className="font-serif text-2xl font-light text-white">ESPACIO Admin Console</h2>
            <p className="text-xs text-neutral-400">
              Enter your access PIN to manage countdown and contact links.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Access PIN (Demo: 1116)"
                className="w-full text-center tracking-widest text-lg py-3 rounded-xl bg-white/10 border border-white/20 focus:border-luxury-gold focus:outline-none text-white placeholder:text-neutral-500 placeholder:text-sm placeholder:tracking-normal"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 text-center font-medium flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{authError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal font-semibold text-xs tracking-wider uppercase shadow-md transition-all active:scale-[0.98]"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-white/10">
            <span>Demo PIN: <strong className="text-luxury-gold">1116</strong></span>
            <button onClick={onCloseToPublic} className="hover:text-white underline">
              Return to Website &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0D10] text-neutral-200 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-semibold shadow-2xl border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#121316] border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <EspacioMonogram size={24} variant="gold" />
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-medium text-white tracking-wide">
              ESPACIO CMS
            </h1>
            <span className="text-[10px] text-neutral-400 font-mono tracking-wider">
              Status:{' '}
              <strong className={formSettings.status === 'COMING_SOON' ? 'text-luxury-gold' : 'text-emerald-400'}>
                {formSettings.status}
              </strong>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onPreviewSite}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-neutral-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-xs text-white transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handlePublish}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 flex items-center justify-center transition-colors ml-1"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Grid */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar (Clean 4 essential tabs only) */}
        <aside className="w-full md:w-64 bg-[#0E1013] border-r border-white/10 p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'analytics', label: 'Click Analytics', icon: Activity },
            { id: 'countdown', label: 'Countdown & Progress', icon: Calendar },
            { id: 'contact', label: 'Contact Phone & Links', icon: LinkIcon },
            { id: 'status', label: 'Website Status Mode', icon: ToggleRight },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playTactileClick();
                  setActiveTab(tab.id as any);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all text-left ${
                  isActive
                    ? 'bg-luxury-gold text-luxury-charcoal font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
            <button
              onClick={handleResetDefaults}
              className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </aside>

        {/* Right Tab Content */}
        <main className="flex-1 p-6 sm:p-10 max-w-4xl overflow-y-auto space-y-8">
          
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-white">Live Click Analytics</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Real user clicks on WhatsApp, Call, Instagram, and Email buttons.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </div>
                  <span className="font-serif text-3xl font-semibold text-white block">
                    {analytics.whatsappClicks}
                  </span>
                  <span className="text-[10px] text-neutral-400">Total Inquiries</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-luxury-gold text-xs">
                    <Phone className="w-4 h-4" />
                    <span>Calls</span>
                  </div>
                  <span className="font-serif text-3xl font-semibold text-white block">
                    {analytics.callClicks}
                  </span>
                  <span className="text-[10px] text-neutral-400">Phone Dialers</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-pink-400 text-xs">
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </div>
                  <span className="font-serif text-3xl font-semibold text-white block">
                    {analytics.instagramClicks}
                  </span>
                  <span className="text-[10px] text-neutral-400">Profile Visits</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-blue-400 text-xs">
                    <Mail className="w-4 h-4" />
                    <span>Emails</span>
                  </div>
                  <span className="font-serif text-3xl font-semibold text-white block">
                    {analytics.emailClicks}
                  </span>
                  <span className="text-[10px] text-neutral-400">Direct Mails</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COUNTDOWN & PROGRESS */}
          {activeTab === 'countdown' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-white">Countdown & Progress Settings</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Configure the launch countdown card, target date, and progress percentage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Enable Countdown Timer</h3>
                    <p className="text-xs text-neutral-400">Shows the Days / Hours / Mins / Secs card on the page.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formSettings.countdown.enabled}
                    onChange={(e) => updateNested('countdown', 'enabled', e.target.checked)}
                    className="w-5 h-5 rounded text-luxury-gold accent-luxury-gold"
                  />
                </div>

                <div className="pt-3 border-t border-white/10">
                  <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">
                    Target Launch Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formSettings.countdown.targetDate}
                    onChange={(e) => updateNested('countdown', 'targetDate', e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-white/10">
                  <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">
                    Architectural System Progress ({formSettings.countdown.progressPercentage}%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.5}
                      value={formSettings.countdown.progressPercentage}
                      onChange={(e) => updateNested('countdown', 'progressPercentage', parseFloat(e.target.value))}
                      className="flex-1 accent-luxury-gold cursor-pointer"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      value={formSettings.countdown.progressPercentage}
                      onChange={(e) => updateNested('countdown', 'progressPercentage', parseFloat(e.target.value))}
                      className="w-24 px-3 py-1.5 text-center rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">
                    Countdown Title Label
                  </label>
                  <input
                    type="text"
                    value={formSettings.countdown.label}
                    onChange={(e) => updateNested('countdown', 'label', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT PHONE & LINKS */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-white">Contact Phone Numbers & Links</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage the destination links and phone numbers for all 4 action buttons.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
                
                {/* WHATSAPP */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Settings</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">WhatsApp Number (with country code, digits only)</label>
                      <input
                        type="text"
                        value={formSettings.contact.whatsappRaw}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateNested('contact', 'whatsappRaw', val);
                          // Sync to buttons
                          const updated = [...formSettings.buttons];
                          const waIdx = updated.findIndex((b) => b.type === 'whatsapp');
                          if (waIdx !== -1) updated[waIdx].value = val;
                          setFormSettings((prev) => ({ ...prev, buttons: updated }));
                        }}
                        placeholder="919505151116"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Default Pre-filled Message</label>
                      <input
                        type="text"
                        value={formSettings.contact.whatsappDefaultMessage}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateNested('contact', 'whatsappDefaultMessage', val);
                          const updated = [...formSettings.buttons];
                          const waIdx = updated.findIndex((b) => b.type === 'whatsapp');
                          if (waIdx !== -1) updated[waIdx].message = val;
                          setFormSettings((prev) => ({ ...prev, buttons: updated }));
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* CALL PHONE NUMBER */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-luxury-gold text-xs font-semibold uppercase">
                    <Phone className="w-4 h-4" />
                    <span>Call Phone Number</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Display Phone Number</label>
                      <input
                        type="text"
                        value={formSettings.contact.phone}
                        onChange={(e) => updateNested('contact', 'phone', e.target.value)}
                        placeholder="+91 95051 51116"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Dialer Phone URL (tel:)</label>
                      <input
                        type="text"
                        value={formSettings.contact.phoneRaw}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateNested('contact', 'phoneRaw', val);
                          const updated = [...formSettings.buttons];
                          const cIdx = updated.findIndex((b) => b.type === 'call');
                          if (cIdx !== -1) updated[cIdx].value = val;
                          setFormSettings((prev) => ({ ...prev, buttons: updated }));
                        }}
                        placeholder="+919505151116"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* INSTAGRAM */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase">
                    <Instagram className="w-4 h-4" />
                    <span>Instagram Profile Link</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formSettings.social.instagram}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateNested('social', 'instagram', val);
                        const updated = [...formSettings.buttons];
                        const instaIdx = updated.findIndex((b) => b.type === 'instagram');
                        if (instaIdx !== -1) updated[instaIdx].value = val;
                        setFormSettings((prev) => ({ ...prev, buttons: updated }));
                      }}
                      placeholder="https://instagram.com/espaciointeriors"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </div>
                  <div>
                    <input
                      type="email"
                      value={formSettings.contact.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateNested('contact', 'email', val);
                        const updated = [...formSettings.buttons];
                        const mailIdx = updated.findIndex((b) => b.type === 'email');
                        if (mailIdx !== -1) updated[mailIdx].value = val;
                        setFormSettings((prev) => ({ ...prev, buttons: updated }));
                      }}
                      placeholder="concierge@espaciointeriors.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:border-luxury-gold focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: STATUS */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-white">Website Operating Status</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Switch between Coming Soon, Live Showroom, or Maintenance mode.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'COMING_SOON',
                    title: 'COMING SOON',
                    desc: 'Shows the intro animation, countdown timer, and contact action buttons.',
                  },
                  {
                    id: 'LIVE',
                    title: 'LIVE SHOWROOM',
                    desc: 'Directs visitors into the active digital showroom presence.',
                  },
                  {
                    id: 'MAINTENANCE',
                    title: 'MAINTENANCE',
                    desc: 'Displays maintenance notice with direct contact buttons.',
                  },
                ].map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setFormSettings({ ...formSettings, status: st.id as any })}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      formSettings.status === st.id
                        ? 'bg-luxury-gold/15 border-luxury-gold text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-sm font-semibold text-white">{st.title}</span>
                      {formSettings.status === st.id && (
                        <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
