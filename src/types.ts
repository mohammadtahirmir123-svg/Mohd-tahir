export interface Project {
  id: string;
  title: string;
  category: 'Websites' | 'UI/UX' | 'AI Automation' | 'Graphic Design' | 'Branding' | 'Landing Pages';
  description: string;
  image: string;
  tech: string[];
  results: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  text: string;
}

export interface AIProject {
  id: string;
  title: string;
  description: string;
  metrics: string;
  status: 'active' | 'completed' | 'optimized';
  steps: { label: string; details: string }[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'Freelance' | 'Direct Clients' | 'Startup' | 'Education';
}
