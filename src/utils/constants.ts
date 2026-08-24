import { StudioInfo, LaunchMilestone } from '../types';

export const BRAND_DETAILS: StudioInfo = {
  name: 'ESPACIO',
  brand: 'ESPACIO INTERIORS AND MODULAR',
  tagline: 'Designing Spaces, Defining Lifestyles',
  experienceStudioAddress: '1st floor, H.No. 6-63/14B, Moinabad Road, Aziznagar',
  cityStateZip: 'Hyderabad, Telangana 500075',
  phone: '+91 95051 51116',
  phoneRaw: '+919505151116',
  whatsappRaw: '919505151116',
  email: 'concierge@espaciointeriors.com',
  hoursWeekday: 'Monday – Saturday: 10:00 AM – 7:30 PM',
  hoursSunday: 'Sunday: By Appointment Only',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aziznagar+Moinabad+Road+Hyderabad+Telangana+500075',
  estd: 'ESTD. HYDERABAD',
  experienceYears: '40+ YEARS LEGACY',
};

export const LAUNCH_MILESTONES: LaunchMilestone[] = [
  {
    title: 'Architectural Framework & Design Systems',
    category: 'Spatial Design',
    progress: 100,
    status: 'Completed',
    description: 'Precision CAD/BIM standardisation and modular architectural joinery.',
  },
  {
    title: 'Aziznagar Flagship Studio Modernisation',
    category: 'Physical Experience',
    progress: 100,
    status: 'Completed',
    description: '4,000 sq.ft live touch-and-feel display of European kitchen & wardrobe hardware.',
  },
  {
    title: 'Curated Material Vault & Finishes Library',
    category: 'Material Sourcing',
    progress: 92,
    status: 'In Progress',
    description: 'Imported Italian porcelain, natural quartzite, fluted veneer, and smoked metallic glass.',
  },
  {
    title: 'Immersive Digital Showcase & Interactive Configurator',
    category: 'Digital Experience',
    progress: 78,
    status: 'In Progress',
    description: 'Next-generation web portfolio, 3D room tour, and client design portal.',
  },
];

export const SERVICE_OPTIONS = [
  { id: 'Turnkey Interiors', label: 'Turnkey Luxury Interiors', desc: 'End-to-end villa & apartment execution' },
  { id: 'Modular Kitchens', label: 'Modular Kitchens & Systems', desc: 'German & Italian precision fittings' },
  { id: 'Materials Purchase', label: 'Materials & Surface Vault', desc: 'Marbles, veneers, quartz & hardware' },
  { id: 'Renovation', label: 'Complete Home Renovation', desc: 'Modernizing legacy residential spaces' },
  { id: 'Luxury Wardrobes', label: 'Walk-in Wardrobes & Vanities', desc: 'Integrated lighting & leather accents' },
  { id: 'Architectural Design', label: 'Architectural Space Planning', desc: 'Bespoke layouts & lighting engineering' },
] as const;

export const MATERIAL_SHOWCASE = [
  {
    name: 'Statutario & Calacatta Marbles',
    category: 'Italian Stone Vault',
    desc: 'Bookmatched seamless veins for waterfall kitchen islands and statement TV backdrops.',
    accent: '#D3D6DB',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Smoked Oak & Fluted Walnut',
    category: 'Veneers & Millwork',
    desc: 'Deep brushed natural grain treated with ultra-matte protective ceramic finishes.',
    accent: '#B08855',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Brushed Champagne & Rose Gold Hardware',
    category: 'Austrian Blum & Hettich Systems',
    desc: 'Concealed motorized soft-close runners, pocket doors, and LED-embedded profiles.',
    accent: '#C5A572',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Acoustic Fluted Panelling & Bronze Glass',
    category: 'Bespoke Wall Elements',
    desc: 'Integrated ambient backlighting for master suites and executive home lounges.',
    accent: '#7D6A53',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
  },
];
