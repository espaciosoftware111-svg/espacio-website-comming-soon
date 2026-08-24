export type ServiceRequirement =
  | 'Turnkey Interiors'
  | 'Modular Kitchens'
  | 'Materials Purchase'
  | 'Renovation'
  | 'Luxury Wardrobes'
  | 'Architectural Design';

export interface ConsultationSubmission {
  id: string;
  fullName: string;
  phone: string;
  requirement: ServiceRequirement;
  timeSlot?: string;
  notes?: string;
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'Scheduled';
}

export interface StudioInfo {
  name: string;
  brand: string;
  tagline: string;
  experienceStudioAddress: string;
  cityStateZip: string;
  phone: string;
  phoneRaw: string;
  whatsappRaw: string;
  email: string;
  hoursWeekday: string;
  hoursSunday: string;
  googleMapsUrl: string;
  estd: string;
  experienceYears: string;
}

export interface LaunchMilestone {
  title: string;
  category: string;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  description: string;
}
