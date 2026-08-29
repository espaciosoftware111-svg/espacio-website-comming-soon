// ESPACIO — Complete Standalone Application
// Exact Image 2 Geometry -> 20% Faster Animation -> Silky Upward Page Transition -> Coming Soon Website -> Streamlined Admin CMS

(function () {
  const root = document.getElementById('root');
  if (!root) return;

  // --- LOCAL STORAGE KEYS ---
  const SETTINGS_KEY = 'espacio_site_settings_v7';
  const DRAFT_KEY = 'espacio_draft_settings_v7';
  const ANALYTICS_KEY = 'espacio_analytics_v7';
  const AUTH_KEY = 'espacio_admin_auth_v7';

  // --- DEFAULT SETTINGS ---
  const DEFAULT_SETTINGS = {
    status: 'COMING_SOON',
    branding: {
      name: 'ESPACIO',
      subTitle: 'INTERIORS AND MODULAR',
      tagline1: 'Designing Spaces',
      tagline2: 'Defining Lifestyles',
      estdText: 'ESTD. HYDERABAD',
      legacyText: '40+ YEARS LEGACY',
    },
    taglines: {
      primary: 'Designing Spaces',
      secondary: 'Defining Lifestyles',
      showInIntro: true,
      showInHeader: true,
      showInHero: true,
      showInFooter: true,
    },
    hero: {
      mainHeading: "WE'RE GETTING BETTER FOR YOU",
      description: "We create refined interiors where contemporary design, thoughtful detailing, and understated luxury come together crafted to make every space feel distinctly yours.",
      launchBadgeText: 'SYSTEM UPGRADE & LAUNCH IN PROGRESS',
      showBadge: true,
    },
    countdown: {
      enabled: true,
      targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      label: 'Digital Experience Reveal Countdown',
      progressPercentage: 92.5,
      showProgressBar: true,
    },
    contact: {
      phone: '+91 95051 51116',
      phoneRaw: '+919505151116',
      whatsapp: '+91 95051 51116',
      whatsappRaw: '919505151116',
      whatsappDefaultMessage: 'Hello ESPACIO, I would like to know more about your interiors and modular solutions.',
      email: 'Espacio.hyd@gmail.com',
      address: '1st floor, H.No. 6-63/14B, Moinabad Road, Aziznagar',
      cityStateZip: 'Hyderabad, Telangana 500075',
      workingHoursWeekday: 'Monday – Saturday: 10:00 AM – 7:30 PM',
      workingHoursSunday: 'Sunday: By Appointment Only',
      googleMapsUrl: 'https://maps.app.goo.gl/D8Db7k2tVyNMkhdp1',
      routeGuideTitle: 'Prime Moinabad Road Corridor',
      routeGuideDescription: 'Conveniently accessible from Kokapet, Financial District, Gandipet, and Jubilee Hills with dedicated client valet parking.',
    },
    social: {
      instagram: 'https://www.instagram.com/theespacio.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      facebook: 'https://facebook.com/espaciointeriors',
      youtube: 'https://youtube.com/@espaciointeriors',
      linkedin: 'https://linkedin.com/company/espacio-interiors',
    },
    modularDescription: {
      heading: 'Designed for the way you live.',
      body: 'ESPACIO Interiors & Modular creates refined interior spaces, modular kitchens, wardrobes, furniture and customized solutions designed around modern lifestyles.',
      features: [
        { title: 'Turnkey Luxury Interiors', desc: 'End-to-end villa & apartment execution with bespoke craftsmanship.' },
        { title: 'Modular Kitchens & Systems', desc: 'German & Italian precision fittings with motorized soft-close runners.' },
        { title: 'Curated Materials Vault', desc: 'Imported Italian marble, fluted natural veneers, and bronze glass.' },
        { title: 'Commercial & Corporate Spaces', desc: 'Executive workspaces, boutique retail environments, and luxury commercial architecture.' },
      ],
    },
    buttons: [
      { id: 'btn-wa', name: 'WHATSAPP', enabled: true, type: 'whatsapp', value: '919505151116', message: 'Hello ESPACIO, I would like to know more about your interiors and modular solutions.', order: 1 },
      { id: 'btn-call', name: 'CALL US', enabled: true, type: 'call', value: '+919505151116', order: 2 },
      { id: 'btn-insta', name: 'INSTAGRAM', enabled: true, type: 'instagram', value: 'https://www.instagram.com/theespacio.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', order: 3 },
      { id: 'btn-email', name: 'EMAIL US', enabled: true, type: 'email', value: 'Espacio.hyd@gmail.com', order: 4 },
    ],
    appearance: {
      primaryBgColor: '#F7F4EE',
      accentGoldColor: '#C5A572',
      darkCharcoalColor: '#121316',
      lightIntensity: 'medium',
    },
    animations: {
      enableIntroAnimation: true,
      animationSpeedMultiplier: 1.2,
      allowSkipIntro: true,
    },
  };

  const DEFAULT_ANALYTICS = {
    whatsappClicks: 28,
    callClicks: 19,
    instagramClicks: 46,
    emailClicks: 14,
    mapsClicks: 39,
    totalVisits: 412,
  };

  function getSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      const s = raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
      if (s.branding && s.branding.subTitle) {
        s.branding.subTitle = s.branding.subTitle.replace('MODULARS', 'MODULAR');
      }
      return s;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  function getDraftSettings() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const s = raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : getSettings();
      if (s.branding && s.branding.subTitle) {
        s.branding.subTitle = s.branding.subTitle.replace('MODULARS', 'MODULAR');
      }
      return s;
    } catch {
      return getSettings();
    }
  }

  function saveDraft(s) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(s));
    } catch (e) {}
  }

  function publishSettings(s) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
      localStorage.setItem(DRAFT_KEY, JSON.stringify(s));
    } catch (e) {}
  }

  function resetDefaults() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(DRAFT_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }

  function getAnalytics() {
    try {
      const raw = localStorage.getItem(ANALYTICS_KEY);
      return raw ? { ...DEFAULT_ANALYTICS, ...JSON.parse(raw) } : DEFAULT_ANALYTICS;
    } catch {
      return DEFAULT_ANALYTICS;
    }
  }

  function trackClick(type) {
    try {
      const curr = getAnalytics();
      if (type === 'whatsapp') curr.whatsappClicks++;
      if (type === 'call') curr.callClicks++;
      if (type === 'instagram') curr.instagramClicks++;
      if (type === 'email') curr.emailClicks++;
      if (type === 'maps') curr.mapsClicks++;
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(curr));
    } catch (e) {}
  }

  function trackVisit() {
    try {
      const curr = getAnalytics();
      curr.totalVisits++;
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(curr));
    } catch (e) {}
  }

  function isAdminAuthed() {
    return localStorage.getItem(AUTH_KEY) === 'espacio_admin_active';
  }

  function setAdminAuthed(val) {
    if (val) localStorage.setItem(AUTH_KEY, 'espacio_admin_active');
    else localStorage.removeItem(AUTH_KEY);
  }

  // Audio synthesizer
  let audioCtx = null;
  let soundOn = true;

  function getAudioCtx() {
    if (!audioCtx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (C) audioCtx = new C();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playChime() {
    if (!soundOn) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [587.33, 880.0, 1174.66, 1760.0].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.04 / (i + 1), now + i * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + i * 0.08 + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 2.0);
      });
    } catch (e) {}
  }

  function playClick() {
    if (!soundOn) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  let decodedTypingBuffer = null;
  let isDecodingBuffer = false;

  function preloadKeyboardBuffer() {
    if (!audioCtx || decodedTypingBuffer || isDecodingBuffer) return;
    isDecodingBuffer = true;
    fetch('./keyboard-typing.mp3')
      .then(res => res.arrayBuffer())
      .then(buf => audioCtx.decodeAudioData(buf))
      .then(decoded => { decodedTypingBuffer = decoded; })
      .catch(() => {})
      .finally(() => { isDecodingBuffer = false; });
  }

  const KEYSTROKE_SLICES = [0.06, 0.18, 0.32, 0.46, 0.60, 0.74, 0.88, 1.02, 1.16, 1.30, 1.44, 1.58, 1.72];
  let lastSliceIdx = -1;

  function playCharTyping(isSpace = false) {
    if (!soundOn) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      if (!decodedTypingBuffer) preloadKeyboardBuffer();
      const now = ctx.currentTime;

      if (decodedTypingBuffer) {
        let sliceIdx = Math.floor(Math.random() * KEYSTROKE_SLICES.length);
        if (sliceIdx === lastSliceIdx) sliceIdx = (sliceIdx + 1) % KEYSTROKE_SLICES.length;
        lastSliceIdx = sliceIdx;

        const offset = KEYSTROKE_SLICES[sliceIdx];
        const sliceDuration = isSpace ? 0.14 : 0.11;
        const source = ctx.createBufferSource();
        source.buffer = decodedTypingBuffer;
        source.playbackRate.setValueAtTime(0.96 + Math.random() * 0.08, now);

        const compressor = ctx.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-10, now);
        compressor.knee.setValueAtTime(6, now);
        compressor.ratio.setValueAtTime(6, now);
        compressor.attack.setValueAtTime(0.001, now);
        compressor.release.setValueAtTime(0.06, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(isSpace ? 7.5 : 6.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + sliceDuration);

        source.connect(gain);
        gain.connect(compressor);
        compressor.connect(ctx.destination);
        source.start(now, offset, sliceDuration);
      } else {
        const pitch = (isSpace ? 0.75 : 1.0) * (0.92 + Math.random() * 0.16);
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime((isSpace ? 1400 : 2800) * pitch, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(isSpace ? 1.4 : 1.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.055);
      }
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    const unlockAudio = () => {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    };
    ['click', 'touchstart', 'keydown', 'pointerdown'].forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { passive: true });
    });
  }

  trackVisit();

  function route() {
    const isHashAdmin = window.location.hash.toLowerCase() === '#admin';
    const isPathAdmin = window.location.pathname.toLowerCase().endsWith('/admin');
    if (isHashAdmin || isPathAdmin) {
      renderAdmin();
    } else {
      renderPublic();
    }
  }

  window.addEventListener('hashchange', route);

  // EXACT SVG LOGO MATCHING UPLOADED REFERENCE
  function getExactLogoSVG(color = '#FFFFFF', isLightOn = false, pendantOffset = 0, idPrefix = 'svg') {
    const isVisible = pendantOffset === 0 ? '1' : '0';
    return `
      <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="${idPrefix}-pendantBeamMaster" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stop-color="#FFF8E7" stop-opacity="0.95" />
            <stop offset="40%" stop-color="#DFC28D" stop-opacity="0.55" />
            <stop offset="80%" stop-color="#C5A572" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#C5A572" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- 1. Upper-Left Horizontal Line (Lamp Top Bar) -->
        <line id="${idPrefix}-top-left" x1="14" y1="14" x2="44" y2="14" stroke="${color}" stroke-width="3.2" stroke-linecap="square" />
        
        <!-- 2. Upper-Right Horizontal Line (With clear open gap from X=44 to X=54) -->
        <line id="${idPrefix}-top-right" x1="54" y1="14" x2="86" y2="14" stroke="${color}" stroke-width="3.2" stroke-linecap="square" />
        
        <!-- 3. Right Vertical Line -->
        <line id="${idPrefix}-right-vert" x1="86" y1="14" x2="86" y2="86" stroke="${color}" stroke-width="3.2" stroke-linecap="square" />
        
        <!-- 4. Bottom Horizontal Line -->
        <line id="${idPrefix}-bottom-horiz" x1="86" y1="86" x2="14" y2="86" stroke="${color}" stroke-width="3.2" stroke-linecap="square" />
        
        <!-- 5. Left Vertical Line (STOPS AT Y=48, PRESERVING OPEN TOP-LEFT CORNER!) -->
        <line id="${idPrefix}-left-vert" x1="14" y1="86" x2="14" y2="48" stroke="${color}" stroke-width="3.2" stroke-linecap="square" />

        <!-- 6. Bold Geometric Sans-Serif 'E' in Lower-Right Quadrant -->
        <g id="${idPrefix}-letter-e" opacity="${isVisible}">
          <line x1="58" y1="44" x2="58" y2="78" stroke="${color}" stroke-width="4.8" stroke-linecap="square" />
          <line x1="58" y1="44" x2="76" y2="44" stroke="${color}" stroke-width="4.8" stroke-linecap="square" />
          <line x1="58" y1="61" x2="72" y2="61" stroke="${color}" stroke-width="4.2" stroke-linecap="square" />
          <line x1="58" y1="78" x2="76" y2="78" stroke="${color}" stroke-width="4.8" stroke-linecap="square" />
        </g>

        <!-- 7. Minimal Architectural Pendant Lamp (Upper-Left Area) -->
        <g id="${idPrefix}-pendant-lamp" opacity="${isVisible}" transform="translate(0, ${pendantOffset})">
          <line x1="29" y1="14" x2="29" y2="28" stroke="${color}" stroke-width="2.4" stroke-linecap="round" />
          <polygon points="25.5,28 32.5,28 38,42 20,42" fill="${color}" stroke="${color}" stroke-width="0.8" stroke-linejoin="round" />
          
          <!-- Light Glow Cone -->
          <g id="${idPrefix}-light-glow" opacity="${isLightOn ? '1' : '0'}" style="transition: opacity 0.35s ease;">
            <ellipse cx="29" cy="46" rx="14" ry="10" fill="url(#${idPrefix}-pendantBeamMaster)" opacity="0.9" />
            <polygon points="20,42 38,42 48,68 10,68" fill="url(#${idPrefix}-pendantBeamMaster)" opacity="0.85" />
            <ellipse cx="28" cy="42" rx="7" ry="1.6" fill="#FFFCE6" />
            <circle cx="28" cy="42.5" r="2.8" fill="#FFEAA7" opacity="0.95" />
          </g>
        </g>
      </svg>
    `;
  }

  // --- RENDER PUBLIC COMING SOON ---
  function renderPublic() {
    const settings = getSettings();
    let startTime = null;
    let animId = null;

    const primaryTagline = settings.taglines?.primary || settings.branding.tagline1 || 'Designing Spaces';
    const secondaryTagline = settings.taglines?.secondary || settings.branding.tagline2 || 'Defining Lifestyles';

    root.innerHTML = `
      <div id="app-container" class="min-h-screen relative overflow-hidden bg-[#08090C] text-white">
        
        <!-- 1. INTRO FULLSCREEN OVERLAY (EXACT RECREATION) -->
        <div id="intro-screen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090C] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div id="ambient-radial" class="absolute inset-0 pointer-events-none transition-all duration-700" style="background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, rgba(8,9,12,1) 65%);"></div>
          
          <div class="absolute top-6 right-6 z-30">
            <button id="btn-skip" class="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs tracking-widest text-neutral-300 hover:text-white hover:border-[#C5A572] transition-all">
              <span>SKIP INTRO</span> &rarr;
            </button>
          </div>

          <div id="procedural-intro-box" class="relative z-10 flex flex-col items-center justify-center px-4 max-w-lg text-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div id="logo-composition-group" class="w-44 h-44 sm:w-48 sm:h-48 mb-6 relative transition-transform duration-500">
              ${getExactLogoSVG('#FFFFFF', false, -26)}
            </div>

            <div id="text-reveal-group" class="space-y-2 opacity-0 transition-all duration-500 transform translate-y-4">
              <h1 class="font-sans text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-[0.32em] pl-[0.32em] leading-tight">
                ${settings.branding.name}
              </h1>

              <!-- Gold Accent Divider Bar with Center Square -->
              <div class="flex items-center justify-center gap-2 max-w-[200px] mx-auto my-2">
                <div class="flex-1 h-[1.5px] bg-[#C5A572]"></div>
                <div class="w-1.5 h-1.5 bg-[#C5A572]"></div>
                <div class="flex-1 h-[1.5px] bg-[#C5A572]"></div>
              </div>

              <p class="text-[10px] sm:text-xs font-semibold text-neutral-300 tracking-[0.32em] pl-[0.32em] uppercase">
                ${settings.branding.subTitle || 'INTERIORS AND MODULAR'}
              </p>
              
              <div class="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#C5A572] to-transparent mx-auto my-2.5 opacity-80"></div>

              <!-- Dedicated Brand Philosophy Taglines Moment -->
              <div id="tagline-hero-box" class="space-y-1 font-serif italic text-base sm:text-lg text-neutral-200 transition-all duration-500">
                <p id="type-line-1" class="h-6"></p>
                <p id="type-line-2" class="h-6"></p>
              </div>
            </div>
          </div>

          <div class="absolute bottom-6 flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-500">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C5A572] animate-ping"></span>
            <span id="anim-timer-label">ESPACIO ARCHITECTURAL EXPERIENCE</span>
          </div>
        </div>

        <!-- 2. PUBLIC COMING SOON WEBSITE (SMOOTH UPWARD SLIDE) -->
        <div id="public-website" class="min-h-screen flex flex-col justify-between opacity-0 transform translate-y-16 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden" style="background-color: ${settings.appearance.primaryBgColor}; color: #121316;">
          
          <!-- Exact User Uploaded Luxury Interior Architectural Background -->
          <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <img src="./espacio-luxury-living.jpg" alt="ESPACIO Luxury Living Architecture" class="w-full h-full object-cover object-center" />
            <div class="absolute inset-0" style="background: radial-gradient(ellipse at 50% 35%, rgba(247, 244, 238, 0.40) 0%, rgba(247, 244, 238, 0.60) 100%);"></div>
          </div>

          <!-- Realistic Swinging Pendant Light -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-full max-w-2xl flex flex-col items-center">
            <div class="relative flex flex-col items-center pointer-events-none select-none">
              <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-[300px] xs:w-[360px] sm:w-[540px] md:w-[720px] h-[280px] sm:h-[380px] pointer-events-none -z-10" style="background: radial-gradient(ellipse at 50% 25%, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.16) 35%, rgba(247, 244, 238, 0) 70%);"></div>
              <div class="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[220px] xs:w-[280px] sm:w-[340px] md:w-[480px] h-[140px] sm:h-[180px] pointer-events-none -z-10 filter blur-xl opacity-65" style="background: radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(251, 191, 36, 0.22) 50%, transparent 80%);"></div>

              <div class="animate-lamp-swing relative flex flex-col items-center -mt-14 xs:-mt-16 sm:-mt-22 md:-mt-26">
                <img src="https://res.cloudinary.com/dkp6jeboz/image/upload/v1787583775/ChatGPT_Image_Aug_24_2026_04_31_24_PM_3_ycieeq.png" alt="ESPACIO Luxury Pendant Light" class="w-[125px] h-[170px] xs:w-[145px] xs:h-[195px] sm:w-[170px] sm:h-[230px] md:w-[195px] md:h-[260px] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]" />
              </div>
            </div>
          </div>

          <!-- Clean Borderless Navigation -->
          <header class="relative z-30 w-full max-w-full bg-transparent overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
              
              <!-- Left: Brand Monogram & Title - Exact Image 2 Lockup Structure -->
              <div class="flex items-center gap-3 lg:gap-4 select-none">
                <div id="nav-brand-logo" class="w-9 h-9 sm:w-11 sm:h-11 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-[#121316] border border-[#C5A572]/40 flex items-center justify-center p-1 sm:p-1.5 lg:p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105 shrink-0">
                  ${getExactLogoSVG('#FFFFFF', false, 0, 'nav-logo')}
                </div>
                <div class="flex flex-col justify-center min-w-[130px] sm:min-w-[160px] lg:min-w-[220px]">
                  <span class="font-sans text-base sm:text-lg md:text-xl lg:text-3xl font-bold tracking-[0.22em] lg:tracking-[0.26em] text-[#08090C] leading-none drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">${settings.branding.name}</span>
                  
                  <!-- Thin Gold Line — Gold Square Dot — Thin Gold Line (Matching Image 2) -->
                  <div class="flex items-center gap-1.5 sm:gap-2 my-1 lg:my-1.5 w-full">
                    <span class="flex-1 h-[1.5px] bg-[#C5A572] rounded-full"></span>
                    <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C5A572] rotate-45 shrink-0"></span>
                    <span class="flex-1 h-[1.5px] bg-[#C5A572] rounded-full"></span>
                  </div>

                  <span class="text-[7.5px] sm:text-[9px] md:text-[10px] lg:text-[12.5px] tracking-[0.28em] sm:tracking-[0.32em] font-bold text-[#121316] uppercase leading-none drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">INTERIORS AND MODULAR</span>
                </div>
              </div>
            </div>
          </header>

          <!-- Main Body Content -->
          <main class="relative z-20 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 lg:pt-3 pb-2 sm:pb-3 lg:pb-4 flex flex-col justify-center gap-2.5 sm:gap-3.5 lg:gap-4 overflow-hidden">
            
            <!-- Hero Section -->
            <section class="relative text-center space-y-1.5 sm:space-y-2.5 lg:space-y-3 pt-3 sm:pt-4 md:pt-5 lg:pt-6 w-full shrink-0">
              <!-- 20% Subtle Premium Frosted Atmospheric Mist Overlay -->
              <div class="absolute -inset-4 sm:-inset-8 max-w-3xl mx-auto rounded-3xl pointer-events-none -z-10 filter blur-2xl opacity-20" style="background: radial-gradient(ellipse at 50% 50%, rgba(247, 243, 236, 0.98) 0%, rgba(247, 243, 236, 0.85) 45%, rgba(238, 228, 213, 0.5) 75%, transparent 100%);"></div>

              ${settings.taglines?.showInHero !== false ? `
                <div class="w-full max-w-3xl mx-auto py-0 px-2 relative -top-3 sm:-top-10 md:-top-12 lg:-top-14 flex items-center justify-center">
                  <p class="font-gulams font-black italic text-[11px] xs:text-[13px] sm:text-lg md:text-xl lg:text-[23px] tracking-wider uppercase whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5">
                    <span class="text-[#171717] font-black whitespace-nowrap" style="-webkit-text-stroke: 0.45px #171717;">${primaryTagline}</span>
                    <span class="mx-1 sm:mx-1.5 text-[#C59B27] font-black whitespace-nowrap" style="-webkit-text-stroke: 0.45px #C59B27;">·</span>
                    <span class="text-[#C59B27] font-black whitespace-nowrap" style="-webkit-text-stroke: 0.45px #C59B27;">${secondaryTagline}</span>
                  </p>
                </div>
              ` : ''}

              <h1 class="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#171717] font-bold tracking-tight leading-[1.15] sm:leading-[1.12] max-w-3xl mx-auto px-2 relative top-0 sm:-top-5 md:-top-6 lg:-top-7">
                ${settings.hero.mainHeading}
              </h1>

              <p class="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#3F3A35] font-medium leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
                ${settings.hero.description}
              </p>

              <!-- 4 Contact Buttons -->
              <div class="pt-1.5 sm:pt-2 w-full max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto">
                <div class="grid grid-cols-2 md:flex md:flex-row md:flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:gap-3.5 w-full">
                  <a id="btn-action-wa" href="https://wa.me/${settings.contact.whatsappRaw}?text=${encodeURIComponent(settings.contact.whatsappDefaultMessage)}" target="_blank" class="min-h-[40px] sm:min-h-[44px] lg:min-h-[46px] w-full md:w-auto md:flex-1 lg:max-w-[210px] flex items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3 px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-sans font-bold text-[11px] sm:text-[12px] lg:text-[12.5px] tracking-wider uppercase bg-[#F7F3EC]/95 hover:bg-white border border-[#E8DED0] hover:border-[#C59B27] text-[#171717] shadow-sm hover:shadow-md transition-all active:scale-95">
                    <svg class="w-4 h-4 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span class="truncate">WHATSAPP</span>
                  </a>
                  <a id="btn-action-call" href="tel:${settings.contact.phoneRaw}" class="min-h-[40px] sm:min-h-[44px] lg:min-h-[46px] w-full md:w-auto md:flex-1 lg:max-w-[210px] flex items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3 px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-sans font-bold text-[11px] sm:text-[12px] lg:text-[12.5px] tracking-wider uppercase bg-[#F7F3EC]/95 hover:bg-white border border-[#E8DED0] hover:border-[#C59B27] text-[#171717] shadow-sm hover:shadow-md transition-all active:scale-95">
                    <svg class="w-4 h-4 text-[#C59B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span class="truncate">CALL US</span>
                  </a>
                  <a id="btn-action-insta" href="${settings.social.instagram}" target="_blank" class="min-h-[40px] sm:min-h-[44px] lg:min-h-[46px] w-full md:w-auto md:flex-1 lg:max-w-[210px] flex items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3 px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-sans font-bold text-[11px] sm:text-[12px] lg:text-[12.5px] tracking-wider uppercase bg-[#F7F3EC]/95 hover:bg-white border border-[#E8DED0] hover:border-[#C59B27] text-[#171717] shadow-sm hover:shadow-md transition-all active:scale-95">
                    <svg class="w-4 h-4 text-[#c13584]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span class="truncate">INSTAGRAM</span>
                  </a>
                  <a id="btn-action-email" href="mailto:${settings.contact.email}" class="min-h-[40px] sm:min-h-[44px] lg:min-h-[46px] w-full md:w-auto md:flex-1 lg:max-w-[210px] flex items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3 px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-sans font-bold text-[11px] sm:text-[12px] lg:text-[12.5px] tracking-wider uppercase bg-[#F7F3EC]/95 hover:bg-white border border-[#E8DED0] hover:border-[#C59B27] text-[#171717] shadow-sm hover:shadow-md transition-all active:scale-95">
                    <svg class="w-4 h-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span class="truncate">EMAIL US</span>
                  </a>
                </div>
              </div>

            </section>

            <!-- Lower Architectural Information Panel (Increased Box & Inner Card Heights) -->
            <section class="w-full max-w-full rounded-2xl sm:rounded-3xl bg-[#F7F3EC]/95 border border-[#E8DED0] p-4 sm:p-6 lg:p-7 shadow-lg backdrop-blur-md space-y-3.5 sm:space-y-5 lg:space-y-6 overflow-hidden relative mt-3.5 sm:mt-5 lg:mt-6 shrink-0">
              <div class="text-center max-w-2xl mx-auto space-y-1.5 px-1">
                <span class="text-[10.5px] sm:text-[11.5px] lg:text-[12.5px] font-bold tracking-[0.24em] text-[#C59B27] uppercase flex items-center justify-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C59B27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  <span>Bespoke Interior Solutions</span>
                </span>
                <h2 class="font-serif text-lg sm:text-2xl md:text-3xl lg:text-[26px] text-[#171717] font-bold tracking-tight uppercase">${settings.modularDescription.heading}</h2>
              </div>

              <!-- 3 Feature Cards (Marquee Carousel - Moving Right to Left - Increased Heights) -->
              <div class="relative w-full max-w-full overflow-hidden py-1 sm:py-2">
                <div class="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-r from-[#F7F3EC] to-transparent z-10 pointer-events-none"></div>
                <div class="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-l from-[#F7F3EC] to-transparent z-10 pointer-events-none"></div>

                <div class="animate-marquee-right-to-left flex gap-3.5 sm:gap-5 px-2 sm:px-4 cursor-grab">
                  ${[...settings.modularDescription.features, ...settings.modularDescription.features, ...settings.modularDescription.features].map(f => `
                    <div class="w-[260px] sm:w-[310px] md:w-[355px] flex-shrink-0 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E8DED0] space-y-2 sm:space-y-2.5 hover:border-[#C59B27] hover:shadow-md transition-all select-none">
                      <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#C59B27] shrink-0"></span>
                        <h3 class="font-serif text-xs sm:text-[14px] lg:text-[15px] font-bold text-[#171717] tracking-wide uppercase">${f.title}</h3>
                      </div>
                      <p class="text-[11.5px] sm:text-[12.5px] lg:text-[13.5px] text-[#3F3A35] font-normal leading-relaxed pl-4">${f.desc}</p>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Lower Section Only Brand Description -->
              <div class="text-center max-w-3xl mx-auto border-t border-[#E8DED0]/80 pt-3 sm:pt-4 lg:pt-5">
                <p class="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#3F3A35] font-medium leading-relaxed px-2">
                  ${settings.modularDescription.body}
                </p>
              </div>
            </section>

          </main>

          <div class="pb-8 sm:pb-10"></div>
        </div>

        </div>

      </div>
    `;

    // Timeline controller
    const introScreen = document.getElementById('intro-screen');
    const publicWeb = document.getElementById('public-website');
    const skipBtn = document.getElementById('btn-skip');
    const replayBtn = document.getElementById('btn-replay');
    const soundBtn = document.getElementById('pub-sound-toggle');
    const timerLabel = document.getElementById('anim-timer-label');
    const ambientRadial = document.getElementById('ambient-radial');
    const logoGroup = document.getElementById('logo-composition-group');
    const textGroup = document.getElementById('text-reveal-group');
    const typeLine1 = document.getElementById('type-line-1');
    const typeLine2 = document.getElementById('type-line-2');
    const taglineHeroBox = document.getElementById('tagline-hero-box');

    const navLogoGlow = document.getElementById('nav-logo-light-glow');
    const navLogoBox = document.getElementById('nav-brand-logo');

    function setNavLight(on) {
      if (navLogoGlow) navLogoGlow.setAttribute('opacity', on ? '1' : '0');
      if (navLogoBox) {
        if (on) {
          navLogoBox.classList.add('scale-110', 'shadow-[0_0_22px_rgba(223,194,141,0.7)]', 'border-[#C5A572]');
        } else {
          navLogoBox.classList.remove('scale-110', 'shadow-[0_0_22px_rgba(223,194,141,0.7)]', 'border-[#C5A572]');
        }
      }
    }

    if (navLogoBox) {
      navLogoBox.addEventListener('mouseenter', () => setNavLight(true));
      navLogoBox.addEventListener('mouseleave', () => setNavLight(false));
    }

    ['wa', 'call', 'insta', 'email'].forEach(type => {
      const el = document.getElementById(`btn-action-${type}`);
      if (el) {
        el.addEventListener('mouseenter', () => setNavLight(true));
        el.addEventListener('mouseleave', () => setNavLight(false));
        el.addEventListener('click', () => { playClick(); trackClick(type === 'insta' ? 'instagram' : type); });
      }
    });

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundOn = !soundOn;
        soundBtn.innerText = soundOn ? '🔊' : '🔇';
        if (soundOn) playClick();
      });
    }

    function triggerBeigeTransition() {
      if (animId) cancelAnimationFrame(animId);
      if (introScreen && publicWeb) {
        stopTypingAudio();
        introScreen.style.transform = 'translate3d(0, -35vh, 0)';
        introScreen.style.opacity = '0';
        introScreen.style.filter = 'blur(4px)';
        
        setTimeout(() => {
          introScreen.classList.add('hidden');
          publicWeb.classList.remove('opacity-0', 'translate-y-16');
          publicWeb.classList.add('opacity-100', 'translate-y-0');
        }, 450);
      }
    }

    if (skipBtn) skipBtn.addEventListener('click', () => { stopTypingAudio(); playClick(); triggerBeigeTransition(); });
    if (replayBtn) replayBtn.addEventListener('click', () => { stopTypingAudio(); playClick(); renderPublic(); });

    const svgE = document.getElementById('svg-letter-e');
    const svgPendant = document.getElementById('svg-pendant-lamp');
    const svgGlow = document.getElementById('svg-light-glow');
    let soundChimePlayed = false;
    let typingSoundStarted = false;

    // EXACT FASTER START + 20% SLOWER ENDING TIMELINE (~8.8s)
    function startProceduralTimeline() {
      function animateStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = ((timestamp - startTime) / 1000) * (settings.animations.animationSpeedMultiplier || 1.0);

        if (timerLabel) {
          timerLabel.innerText = `ESPACIO ARCHITECTURAL EMBLEM • ${elapsed.toFixed(1)}s`;
        }

        // 2.3s E Reveal (Faster start)
        if (elapsed >= 2.3 && svgE) {
          svgE.setAttribute('opacity', Math.min(1, (elapsed - 2.3) / 0.45));
        }

        // 3.0s Pendant Lamp Descent
        if (elapsed >= 3.0 && svgPendant) {
          const prog = Math.min(1, (elapsed - 3.0) / 0.75);
          const yOffset = -26 * (1 - prog);
          svgPendant.setAttribute('opacity', Math.min(1, (elapsed - 3.0) / 0.35));
          svgPendant.setAttribute('transform', `translate(0, ${yOffset})`);
        }

        // 3.8s Light ON
        if (elapsed >= 3.8) {
          if (svgGlow) svgGlow.setAttribute('opacity', Math.min(1, (elapsed - 3.8) / 0.35));
          if (ambientRadial) {
            ambientRadial.style.background = 'radial-gradient(circle at 50% 46%, rgba(197,165,114,0.22) 0%, rgba(8,9,12,0.98) 65%)';
          }
          if (!soundChimePlayed) {
            soundChimePlayed = true;
            playChime();
          }
        }

        // 4.3s Logo group moves up
        if (elapsed >= 4.3 && logoGroup) {
          logoGroup.style.transform = 'translate3d(0, -26px, 0)';
        }

        // 4.6s ESPACIO + Sub-title reveal
        if (elapsed >= 4.6 && textGroup) {
          textGroup.classList.remove('opacity-0', 'translate-y-4');
          textGroup.classList.add('opacity-100', 'translate-y-0');
        }

        // 5.2s Typewriter line 1 (Designing Spaces) - Exact character sound match
        if (elapsed >= 5.2 && elapsed < 6.3 && typeLine1) {
          const p1 = Math.min(1, (elapsed - 5.2) / 1.0);
          const currentLen1 = Math.floor(p1 * primaryTagline.length);
          if (currentLen1 > lastTypedLen1) {
            const char = primaryTagline[currentLen1 - 1];
            playCharTyping(char === ' ');
            lastTypedLen1 = currentLen1;
          }
          typeLine1.innerText = primaryTagline.slice(0, currentLen1);
        } else if (elapsed >= 6.3 && typeLine1) {
          typeLine1.innerText = primaryTagline;
        }

        // 6.4s Typewriter line 2 (Defining Lifestyles)
        if (elapsed >= 6.4 && elapsed < 7.7 && typeLine2) {
          const p2 = Math.min(1, (elapsed - 6.4) / 1.15);
          const currentLen2 = Math.floor(p2 * secondaryTagline.length);
          if (currentLen2 > lastTypedLen2) {
            const char = secondaryTagline[currentLen2 - 1];
            playCharTyping(char === ' ');
            lastTypedLen2 = currentLen2;
          }
          typeLine2.innerText = secondaryTagline.slice(0, currentLen2);
        } else if (elapsed >= 7.7 && typeLine2) {
          typeLine2.innerText = secondaryTagline;
        }

        // 7.8s Tagline highlight effect
        if (elapsed >= 7.8 && taglineHeroBox) {
          taglineHeroBox.classList.add('scale-105', 'text-[#C5A572]');
        }

        // 8.8s Complete & transition
        if (elapsed >= 8.8) {
          triggerBeigeTransition();
          return;
        }

        animId = requestAnimationFrame(animateStep);
      }

      if (settings.animations.enableIntroAnimation) {
        animId = requestAnimationFrame(animateStep);
      } else {
        triggerBeigeTransition();
      }
    }

    startProceduralTimeline();

    // Countdown ticker
    let cdS = 19, cdM = 42, cdH = 8, cdD = 14;
    setInterval(() => {
      if (cdS > 0) cdS--;
      else { cdS = 59; if (cdM > 0) cdM--; else { cdM = 59; if (cdH > 0) cdH--; else { cdH = 23; cdD--; } } }
      const elS = document.getElementById('pub-cnt-s');
      const elM = document.getElementById('pub-cnt-m');
      const elH = document.getElementById('pub-cnt-h');
      const elD = document.getElementById('pub-cnt-d');
      if (elS) elS.innerText = String(cdS).padStart(2, '0');
      if (elM) elM.innerText = String(cdM).padStart(2, '0');
      if (elH) elH.innerText = String(cdH).padStart(2, '0');
      if (elD) elD.innerText = String(cdD).padStart(2, '0');
    }, 1000);
  }

  // --- STREAMLINED ADMIN CMS (ONLY ESSENTIAL 4 TABS) ---
  function renderAdmin() {
    let settings = getDraftSettings();
    let analytics = getAnalytics();
    let authed = isAdminAuthed();
    let currentTab = 'analytics';

    function renderAdminUI() {
      if (!authed) {
        root.innerHTML = `
          <div class="min-h-screen bg-[#08090C] text-white flex items-center justify-center p-4">
            <div class="w-full max-w-md p-8 rounded-3xl bg-[#0E1013] border border-white/15 shadow-2xl space-y-6">
              <div class="text-center space-y-2">
                <div class="w-14 h-14 rounded-2xl bg-[#C5A572]/20 border border-[#C5A572]/40 flex items-center justify-center mx-auto text-[#C5A572] text-2xl">🛡️</div>
                <h2 class="font-serif text-2xl font-light text-white">ESPACIO CMS</h2>
                <p class="text-xs text-neutral-400">Enter access key to manage countdown and contact links.</p>
              </div>

              <form id="admin-login-form" class="space-y-4">
                <input id="admin-pin-input" type="password" placeholder="Access PIN (Demo: 1116)" class="w-full text-center tracking-widest text-lg py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#C5A572] focus:outline-none text-white" />
                <p id="admin-pin-err" class="text-xs text-rose-400 text-center hidden">Invalid PIN. (Demo: 1116)</p>
                <button type="submit" class="w-full py-3.5 rounded-xl bg-[#C5A572] hover:bg-[#DFC28D] text-[#121316] font-semibold text-xs tracking-wider uppercase shadow-md transition-all">Authenticate & Enter</button>
              </form>

              <div class="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-white/10">
                <span>Demo PIN: <strong class="text-[#C5A572]">1116</strong></span>
                <a href="#" class="hover:text-white underline">Return to Website &rarr;</a>
              </div>
            </div>
          </div>
        `;

        const form = document.getElementById('admin-login-form');
        const pinInput = document.getElementById('admin-pin-input');
        const pinErr = document.getElementById('admin-pin-err');

        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            playClick();
            const val = (pinInput.value || '').trim().toLowerCase();
            if (val === '1116' || val === 'admin' || val === 'espacio' || val === 'espacio2026') {
              setAdminAuthed(true);
              authed = true;
              renderAdminUI();
            } else {
              if (pinErr) pinErr.classList.remove('hidden');
            }
          });
        }
        return;
      }

      // Authed Streamlined Dashboard
      root.innerHTML = `
        <div class="min-h-screen bg-[#0C0D10] text-neutral-200 flex flex-col font-sans">
          
          <header class="sticky top-0 z-40 bg-[#121316] border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-[#C5A572]/20 border border-[#C5A572]/40 flex items-center justify-center text-[#C5A572]">🛡️</div>
              <div>
                <h1 class="font-serif text-base font-medium text-white">ESPACIO CMS</h1>
                <span class="text-[10px] text-neutral-400 font-mono">Status: <strong class="text-[#C5A572]">${settings.status}</strong></span>
              </div>
            </div>

            <div class="flex items-center gap-2 sm:gap-3">
              <a href="#" class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-neutral-200">View Public</a>
              <button id="admin-btn-save" class="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-xs text-white">Save Draft</button>
              <button id="admin-btn-publish" class="px-4 py-2 rounded-xl bg-[#C5A572] hover:bg-[#DFC28D] text-[#121316] font-semibold text-xs uppercase tracking-wider shadow-md">Publish Live</button>
              <button id="admin-btn-logout" class="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs">Logout</button>
            </div>
          </header>

          <div class="flex-1 flex flex-col md:flex-row">
            <!-- Sidebar with 4 essential tabs only -->
            <aside class="w-full md:w-64 bg-[#0E1013] border-r border-white/10 p-4 space-y-1.5">
              ${[
                { id: 'analytics', label: '📊 Click Analytics' },
                { id: 'countdown', label: '⏱️ Countdown & Progress' },
                { id: 'contact', label: '🔗 Contact Phone & Links' },
                { id: 'status', label: '⚙️ Website Status Mode' },
              ].map(t => `
                <button data-tab="${t.id}" class="tab-btn w-full px-3.5 py-3 rounded-xl text-xs font-medium text-left transition-all ${currentTab === t.id ? 'bg-[#C5A572] text-[#121316] font-semibold shadow-md' : 'text-neutral-400 hover:text-white hover:bg-white/5'}">
                  ${t.label}
                </button>
              `).join('')}

              <div class="pt-6 border-t border-white/10 mt-6">
                <button id="admin-btn-reset" class="w-full py-2 rounded-xl text-neutral-400 hover:text-rose-400 text-xs text-left px-3.5 hover:bg-rose-500/10">
                  ↺ Reset Defaults
                </button>
              </div>
            </aside>

            <main class="flex-1 p-6 sm:p-10 max-w-4xl space-y-6">
              
              <!-- Tab 1: Analytics -->
              ${currentTab === 'analytics' ? `
                <div class="space-y-6">
                  <h2 class="font-serif text-2xl text-white">Live Click Analytics</h2>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span class="text-xs text-emerald-400 block font-semibold">WhatsApp</span>
                      <span class="font-serif text-3xl font-semibold text-white">${analytics.whatsappClicks}</span>
                      <span class="text-[10px] text-neutral-400 block">Total Inquiries</span>
                    </div>
                    <div class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span class="text-xs text-[#C5A572] block font-semibold">Calls</span>
                      <span class="font-serif text-3xl font-semibold text-white">${analytics.callClicks}</span>
                      <span class="text-[10px] text-neutral-400 block">Phone Dialers</span>
                    </div>
                    <div class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span class="text-xs text-pink-400 block font-semibold">Instagram</span>
                      <span class="font-serif text-3xl font-semibold text-white">${analytics.instagramClicks}</span>
                      <span class="text-[10px] text-neutral-400 block">Profile Visits</span>
                    </div>
                    <div class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span class="text-xs text-blue-400 block font-semibold">Emails</span>
                      <span class="font-serif text-3xl font-semibold text-white">${analytics.emailClicks}</span>
                      <span class="text-[10px] text-neutral-400 block">Direct Mails</span>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- Tab 2: Countdown & Progress -->
              ${currentTab === 'countdown' ? `
                <div class="space-y-6">
                  <h2 class="font-serif text-2xl text-white">Countdown & Progress Settings</h2>
                  
                  <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
                    <label class="flex items-center justify-between cursor-pointer">
                      <div>
                        <span class="text-sm font-semibold text-white block">Enable Countdown Timer</span>
                        <span class="text-xs text-neutral-400">Shows Days / Hours / Mins / Secs card on the page.</span>
                      </div>
                      <input id="input-cd-enable" type="checkbox" ${settings.countdown.enabled ? 'checked' : ''} class="w-5 h-5" />
                    </label>

                    <div class="pt-3 border-t border-white/10">
                      <label class="block text-xs font-semibold text-neutral-300 uppercase mb-1">Target Launch Date & Time</label>
                      <input id="input-cd-date" type="datetime-local" value="${settings.countdown.targetDate}" class="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                    </div>

                    <div class="pt-3 border-t border-white/10">
                      <label class="block text-xs font-semibold text-neutral-300 uppercase mb-1">Architectural System Progress (%)</label>
                      <input id="input-cd-prog" type="number" min="0" max="100" step="0.5" value="${settings.countdown.progressPercentage}" class="w-32 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                    </div>

                    <div class="pt-3 border-t border-white/10">
                      <label class="block text-xs font-semibold text-neutral-300 uppercase mb-1">Countdown Title Label</label>
                      <input id="input-cd-label" type="text" value="${settings.countdown.label}" class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- Tab 3: Contact Phone & Links -->
              ${currentTab === 'contact' ? `
                <div class="space-y-6">
                  <h2 class="font-serif text-2xl text-white">Contact Numbers & Button Links</h2>
                  
                  <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
                    <!-- WhatsApp -->
                    <div class="space-y-3">
                      <span class="text-xs font-semibold text-emerald-400 uppercase block">💬 WhatsApp Settings</span>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-xs text-neutral-400 mb-1">WhatsApp Number (digits only)</label>
                          <input id="input-c-wa" type="text" value="${settings.contact.whatsappRaw}" placeholder="919505151116" class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-neutral-400 mb-1">Default WhatsApp Message</label>
                          <input id="input-c-wamsg" type="text" value="${settings.contact.whatsappDefaultMessage}" class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                        </div>
                      </div>
                    </div>

                    <!-- Call -->
                    <div class="pt-4 border-t border-white/10 space-y-3">
                      <span class="text-xs font-semibold text-[#C5A572] uppercase block">📞 Phone Dialer</span>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-xs text-neutral-400 mb-1">Display Phone Number</label>
                          <input id="input-c-phone" type="text" value="${settings.contact.phone}" placeholder="+91 95051 51116" class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-neutral-400 mb-1">Dialer Tel Link</label>
                          <input id="input-c-phoneraw" type="text" value="${settings.contact.phoneRaw}" placeholder="+919505151116" class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                        </div>
                      </div>
                    </div>

                    <!-- Instagram -->
                    <div class="pt-4 border-t border-white/10 space-y-2">
                      <span class="text-xs font-semibold text-pink-400 uppercase block">📸 Instagram Profile URL</span>
                      <input id="input-c-insta" type="text" value="${settings.social.instagram}" placeholder="https://instagram.com/espaciointeriors" class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                    </div>

                    <!-- Email -->
                    <div class="pt-4 border-t border-white/10 space-y-2">
                      <span class="text-xs font-semibold text-blue-400 uppercase block">✉️ Email Address</span>
                      <input id="input-c-email" type="email" value="${settings.contact.email}" placeholder="concierge@espaciointeriors.com" class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm" />
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- Tab 4: Website Status -->
              ${currentTab === 'status' ? `
                <div class="space-y-6">
                  <h2 class="font-serif text-2xl text-white">Website Operating Status</h2>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    ${['COMING_SOON', 'LIVE', 'MAINTENANCE'].map(st => `
                      <div data-st="${st}" class="st-card p-5 rounded-2xl border cursor-pointer ${settings.status === st ? 'bg-[#C5A572]/20 border-[#C5A572] text-white' : 'bg-white/5 border-white/10 text-neutral-400'}">
                        <span class="font-serif text-sm font-semibold text-white block mb-1">${st}</span>
                        <span class="text-[11px] text-neutral-400">
                          ${st === 'COMING_SOON' ? 'Shows coming soon countdown & action buttons.' : st === 'LIVE' ? 'Directs to live showroom.' : 'Shows maintenance experience.'}
                        </span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

            </main>
          </div>
        </div>
      `;

      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          playClick();
          syncFormValues();
          currentTab = btn.getAttribute('data-tab');
          renderAdminUI();
        });
      });

      function syncFormValues() {
        const cdEnable = document.getElementById('input-cd-enable');
        if (cdEnable) settings.countdown.enabled = cdEnable.checked;
        const cdDate = document.getElementById('input-cd-date');
        if (cdDate) settings.countdown.targetDate = cdDate.value;
        const cdProg = document.getElementById('input-cd-prog');
        if (cdProg) settings.countdown.progressPercentage = parseFloat(cdProg.value);
        const cdLabel = document.getElementById('input-cd-label');
        if (cdLabel) settings.countdown.label = cdLabel.value;

        const cWa = document.getElementById('input-c-wa');
        if (cWa) {
          settings.contact.whatsappRaw = cWa.value;
          const bWa = settings.buttons.find(b => b.type === 'whatsapp');
          if (bWa) bWa.value = cWa.value;
        }
        const cWaMsg = document.getElementById('input-c-wamsg');
        if (cWaMsg) {
          settings.contact.whatsappDefaultMessage = cWaMsg.value;
          const bWa = settings.buttons.find(b => b.type === 'whatsapp');
          if (bWa) bWa.message = cWaMsg.value;
        }

        const cPhone = document.getElementById('input-c-phone');
        if (cPhone) settings.contact.phone = cPhone.value;
        const cPhoneRaw = document.getElementById('input-c-phoneraw');
        if (cPhoneRaw) {
          settings.contact.phoneRaw = cPhoneRaw.value;
          const bCall = settings.buttons.find(b => b.type === 'call');
          if (bCall) bCall.value = cPhoneRaw.value;
        }

        const cInsta = document.getElementById('input-c-insta');
        if (cInsta) {
          settings.social.instagram = cInsta.value;
          const bInsta = settings.buttons.find(b => b.type === 'instagram');
          if (bInsta) bInsta.value = cInsta.value;
        }

        const cEmail = document.getElementById('input-c-email');
        if (cEmail) {
          settings.contact.email = cEmail.value;
          const bEmail = settings.buttons.find(b => b.type === 'email');
          if (bEmail) bEmail.value = cEmail.value;
        }
      }

      const saveBtn = document.getElementById('admin-btn-save');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          playClick();
          syncFormValues();
          saveDraft(settings);
          alert('Draft settings saved!');
        });
      }

      const pubBtn = document.getElementById('admin-btn-publish');
      if (pubBtn) {
        pubBtn.addEventListener('click', () => {
          playClick();
          syncFormValues();
          publishSettings(settings);
          alert('Settings published live!');
        });
      }

      const logoutBtn = document.getElementById('admin-btn-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          playClick();
          setAdminAuthed(false);
          authed = false;
          window.location.hash = '';
          renderPublic();
        });
      }

      const resetBtn = document.getElementById('admin-btn-reset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('Reset countdown and contact links to defaults?')) {
            playClick();
            settings = resetDefaults();
            renderAdminUI();
          }
        });
      }

      document.querySelectorAll('.st-card').forEach(c => {
        c.addEventListener('click', () => {
          playClick();
          settings.status = c.getAttribute('data-st');
          renderAdminUI();
        });
      });
    }

    renderAdminUI();
  }

  // Initial Route
  route();
})();
