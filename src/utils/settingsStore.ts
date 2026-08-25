import { SiteSettings, DEFAULT_SITE_SETTINGS, AnalyticsData } from '../types/settings';

const SETTINGS_KEY = 'espacio_site_settings_v7';
const DRAFT_KEY = 'espacio_draft_settings_v7';
const ANALYTICS_KEY = 'espacio_analytics_v7';
const ADMIN_AUTH_KEY = 'espacio_admin_auth_v7';

const DEFAULT_ANALYTICS: AnalyticsData = {
  whatsappClicks: 24,
  callClicks: 18,
  instagramClicks: 42,
  emailClicks: 11,
  mapsClicks: 35,
  totalVisits: 380,
  lastUpdated: new Date().toISOString(),
};

// Listeners for live sync
type SettingsListener = (settings: SiteSettings) => void;
const listeners: Set<SettingsListener> = new Set();

export const subscribeToSettings = (listener: SettingsListener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyListeners = (settings: SiteSettings) => {
  listeners.forEach((l) => l(settings));
};

export const getSiteSettings = (): SiteSettings => {
  if (typeof window === 'undefined') return DEFAULT_SITE_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
      return DEFAULT_SITE_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    const settings = { ...DEFAULT_SITE_SETTINGS, ...parsed };
    if (settings.branding?.subTitle) {
      settings.branding.subTitle = settings.branding.subTitle.replace('MODULARS', 'MODULAR');
    }
    if (settings.modularDescription) {
      if (!settings.modularDescription.body || settings.modularDescription.body.includes('creates refined interior spaces')) {
        settings.modularDescription.body = DEFAULT_SITE_SETTINGS.modularDescription.body;
      }
    }
    return settings;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
};

export const getDraftSettings = (): SiteSettings => {
  if (typeof window === 'undefined') return DEFAULT_SITE_SETTINGS;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) {
      return getSiteSettings();
    }
    const settings = { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
    if (settings.branding?.subTitle) {
      settings.branding.subTitle = settings.branding.subTitle.replace('MODULARS', 'MODULAR');
    }
    if (settings.modularDescription) {
      if (!settings.modularDescription.body || settings.modularDescription.body.includes('creates refined interior spaces')) {
        settings.modularDescription.body = DEFAULT_SITE_SETTINGS.modularDescription.body;
      }
    }
    return settings;
  } catch {
    return getSiteSettings();
  }
};

export const saveDraftSettings = (settings: SiteSettings): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving draft', e);
  }
};

export const publishSiteSettings = (settings: SiteSettings): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    localStorage.setItem(DRAFT_KEY, JSON.stringify(settings));
    notifyListeners(settings);
  } catch (e) {
    console.error('Error publishing settings', e);
  }
};

export const resetSiteSettingsToDefault = (): SiteSettings => {
  if (typeof window === 'undefined') return DEFAULT_SITE_SETTINGS;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
  localStorage.setItem(DRAFT_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
  notifyListeners(DEFAULT_SITE_SETTINGS);
  return DEFAULT_SITE_SETTINGS;
};

// --- ANALYTICS ---
export const getAnalyticsData = (): AnalyticsData => {
  if (typeof window === 'undefined') return DEFAULT_ANALYTICS;
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (!raw) {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(DEFAULT_ANALYTICS));
      return DEFAULT_ANALYTICS;
    }
    return { ...DEFAULT_ANALYTICS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ANALYTICS;
  }
};

export const trackAnalyticsClick = (type: 'whatsapp' | 'call' | 'instagram' | 'email' | 'maps'): void => {
  if (typeof window === 'undefined') return;
  try {
    const curr = getAnalyticsData();
    if (type === 'whatsapp') curr.whatsappClicks += 1;
    if (type === 'call') curr.callClicks += 1;
    if (type === 'instagram') curr.instagramClicks += 1;
    if (type === 'email') curr.emailClicks += 1;
    if (type === 'maps') curr.mapsClicks += 1;
    curr.lastUpdated = new Date().toISOString();
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(curr));
  } catch (e) {
    console.error('Analytics track error', e);
  }
};

export const trackPageVisit = (): void => {
  if (typeof window === 'undefined') return;
  try {
    const curr = getAnalyticsData();
    curr.totalVisits += 1;
    curr.lastUpdated = new Date().toISOString();
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(curr));
  } catch (e) {
    console.error('Visit track error', e);
  }
};

// --- AUTHENTICATION ---
export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'authenticated_espacio_session';
};

export const authenticateAdmin = (pinOrPass: string): boolean => {
  const clean = pinOrPass.trim().toLowerCase();
  // Valid credentials: '1116', 'admin', 'espacio', 'espacio2026'
  if (clean === '1116' || clean === 'admin' || clean === 'espacio' || clean === 'espacio2026') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated_espacio_session');
    }
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
};
