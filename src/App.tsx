import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SiteSettings } from './types/settings';
import { getSiteSettings, subscribeToSettings, trackPageVisit } from './utils/settingsStore';
import { ExactLogoAnimation } from './components/ExactLogoAnimation';
import { PublicComingSoon } from './components/PublicComingSoon';
import { AdminPanel } from './components/AdminPanel';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [isAdminView, setIsAdminView] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Record page visit
    trackPageVisit();

    // Check URL or hash for /admin or #admin
    const checkAdminRoute = () => {
      const isHashAdmin = window.location.hash.toLowerCase() === '#admin';
      const isPathAdmin = window.location.pathname.toLowerCase().endsWith('/admin');
      if (isHashAdmin || isPathAdmin) {
        setIsAdminView(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Subscribe to live settings changes from Admin Panel publishes
    const unsubscribe = subscribeToSettings((newSettings) => {
      setSettings(newSettings);
    });

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      unsubscribe();
    };
  }, []);

  const handleAnimationComplete = () => {
    setIsTransitioning(true);
    setShowIntro(false);
  };

  const handleSkipIntro = () => {
    setIsTransitioning(true);
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsTransitioning(false);
    setShowIntro(true);
  };

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const handleCloseAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  if (isAdminView) {
    return (
      <AdminPanel
        onCloseToPublic={handleCloseAdmin}
        onPreviewSite={handleCloseAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#08090C] text-white relative">
      <AnimatePresence mode="wait">
        {showIntro && settings.animations.enableIntroAnimation ? (
          <ExactLogoAnimation
            key="intro-animation"
            settings={settings}
            onAnimationComplete={handleAnimationComplete}
            onSkip={handleSkipIntro}
          />
        ) : (
          <PublicComingSoon
            key="public-coming-soon"
            settings={settings}
            onOpenAdmin={handleOpenAdmin}
            onReplayIntro={handleReplayIntro}
            isTransitioningFromIntro={isTransitioning}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
