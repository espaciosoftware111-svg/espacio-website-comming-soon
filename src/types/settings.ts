export type WebsiteStatus = 'COMING_SOON' | 'LIVE' | 'MAINTENANCE';

export interface ActionButtonConfig {
  id: string;
  name: string;
  enabled: boolean;
  type: 'whatsapp' | 'call' | 'instagram' | 'email' | 'maps' | 'custom';
  value: string;
  message?: string;
  icon: string;
  order: number;
}

export interface SiteSettings {
  status: WebsiteStatus;
  branding: {
    name: string;
    subTitle: string;
    tagline1: string;
    tagline2: string;
    estdText: string;
    legacyText: string;
  };
  taglines: {
    primary: string;
    secondary: string;
    showInIntro: boolean;
    showInHeader: boolean;
    showInHero: boolean;
    showInFooter: boolean;
  };
  hero: {
    mainHeading: string;
    description: string;
    launchBadgeText: string;
    showBadge: boolean;
  };
  countdown: {
    enabled: boolean;
    targetDate: string;
    label: string;
    progressPercentage: number;
    showProgressBar: boolean;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    whatsapp: string;
    whatsappRaw: string;
    whatsappDefaultMessage: string;
    email: string;
    address: string;
    cityStateZip: string;
    workingHoursWeekday: string;
    workingHoursSunday: string;
    googleMapsUrl: string;
    routeGuideTitle: string;
    routeGuideDescription: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
  modularDescription: {
    heading: string;
    body: string;
    features: Array<{ title: string; desc: string }>;
  };
  buttons: ActionButtonConfig[];
  appearance: {
    primaryBgColor: string;
    accentGoldColor: string;
    darkCharcoalColor: string;
    lightIntensity: 'subtle' | 'medium' | 'vibrant';
    themeMode: 'luxury-beige' | 'dark-obsidian';
  };
  animations: {
    enableIntroAnimation: boolean;
    animationSpeedMultiplier: number;
    enableStrokeDrawing: boolean;
    enableEReveal: boolean;
    enablePendantDescent: boolean;
    enableLightGlow: boolean;
    enableTextReveal: boolean;
    enableTaglineTyping: boolean;
    enableBeigeTransition: boolean;
    allowSkipIntro: boolean;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  maintenance: {
    heading: string;
    message: string;
    estimatedReturn: string;
  };
}

export interface AnalyticsData {
  whatsappClicks: number;
  callClicks: number;
  instagramClicks: number;
  emailClicks: number;
  mapsClicks: number;
  totalVisits: number;
  lastUpdated: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
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
    description: "We’re making a few improvements behind the scenes to bring you a better experience.",
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
    routeGuideTitle: 'Conveniently Located on Prime Moinabad Road',
    routeGuideDescription: 'Situated along the prime Moinabad Road corridor in Aziznagar, easily accessible from Kokapet, Financial District, Gandipet, and Jubilee Hills with dedicated client valet parking.',
  },
  social: {
    instagram: 'https://www.instagram.com/theespacio.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    facebook: 'https://facebook.com/espaciointeriors',
    youtube: 'https://youtube.com/@espaciointeriors',
    linkedin: 'https://linkedin.com/company/espacio-interiors',
  },
  modularDescription: {
    heading: 'DESIGNED FOR THE WAY YOU LIVE.',
    body: 'ESPACIO Interiors & Modular We create refined interiors where contemporary design, thoughtful detailing, and understated luxury come together crafted to make every space feel distinctly yours.',
    features: [
      { title: 'SMART KITCHENS & SYSTEMS', desc: 'Intelligent layouts and seamless storage that make everyday living effortless.' },
      { title: 'CURATED MATERIALS VAULT', desc: 'Handpicked premium materials that bring texture, durability, and timeless elegance.' },
      { title: 'COMMERCIAL & CORPORATE SPACES', desc: 'Sophisticated environments designed to inspire productivity and leave a lasting impression.' },
    ],
  },
  buttons: [
    {
      id: 'btn-wa',
      name: 'WHATSAPP',
      enabled: true,
      type: 'whatsapp',
      value: '919505151116',
      message: 'Hello ESPACIO, I would like to know more about your interiors and modular solutions.',
      icon: 'MessageCircle',
      order: 1,
    },
    {
      id: 'btn-call',
      name: 'CALL US',
      enabled: true,
      type: 'call',
      value: '+919505151116',
      icon: 'Phone',
      order: 2,
    },
    {
      id: 'btn-insta',
      name: 'INSTAGRAM',
      enabled: true,
      type: 'instagram',
      value: 'https://www.instagram.com/theespacio.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      icon: 'Instagram',
      order: 3,
    },
    {
      id: 'btn-email',
      name: 'EMAIL US',
      enabled: true,
      type: 'email',
      value: 'Espacio.hyd@gmail.com',
      icon: 'Mail',
      order: 4,
    },
  ],
  appearance: {
    primaryBgColor: '#F7F4EE',
    accentGoldColor: '#C5A572',
    darkCharcoalColor: '#121316',
    lightIntensity: 'medium',
    themeMode: 'luxury-beige',
  },
  animations: {
    enableIntroAnimation: true,
    animationSpeedMultiplier: 1.0,
    enableStrokeDrawing: true,
    enableEReveal: true,
    enablePendantDescent: true,
    enableLightGlow: true,
    enableTextReveal: true,
    enableTaglineTyping: true,
    enableBeigeTransition: true,
    allowSkipIntro: true,
  },
  seo: {
    title: 'ESPACIO Interiors & Modulars — Designing Spaces, Defining Lifestyles',
    description: 'Luxury interior architecture, bespoke modular kitchens, custom wardrobes, and turnkey interior solutions in Hyderabad.',
    ogImage: '/og-image.jpg',
  },
  maintenance: {
    heading: 'Architectural System Maintenance',
    message: 'We are currently enhancing the ESPACIO digital showroom experience.',
    estimatedReturn: '48 Hours',
  },
};
