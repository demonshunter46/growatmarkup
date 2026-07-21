export interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tags: string[];
  bio: string;
  rating: number;
  totalTeams: number;
  availableSlots: string[]; // ISO timestamps
}

export interface BookedSession {
  id: string;
  studentName: string;
  packageName: string;
  topic: string;
  date: string; // ISO timestamp
  mentorId: string;
  mentorName: string;
  meetLink?: string;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED';
}

export interface StudentProgress {
  teamName: string;
  packageName: string;
  sessionsUsed: number;
  sessionsTotal: number;
  completedVideos: string[]; // video IDs
  downloadedDecks: string[]; // deck IDs
}

export interface VideoLesson {
  id: string;
  title: string;
  module: string;
  duration: string;
  isLocked: boolean;
}

export interface ChampionDeck {
  id: string;
  title: string;
  team: string;
  award: string;
  year: number;
  category: 'BCC' | 'BPC';
  downloads: number;
  slidesCount: number;
  keyInsights: string[];
}

export interface Transaction {
  id: string;
  date: string;
  teamName: string;
  packageName: string;
  amount: number;
  paymentMethod: string;
  status: 'PAID' | 'WAITING' | 'FAILED';
}

export interface Package {
  id: string;
  name: string;
  category: 'BCC' | 'BPC' | 'AKADEMI';
  price: number;
  priceFormatted: string;
  unit: string;
  audience: string;
  features: string[];
  isPopular?: boolean;
}

export interface Competition {
  id: string;
  name: string;
  organizer: string;
  registrationDeadline: string;
  reward: string;
  fee: string;
  category: 'BCC' | 'BPC' | 'UMUM';
  link: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  category: 'STUDENT' | 'MENTOR';
  contentType: 'VIDEO' | 'PDF' | 'SLIDES' | 'TEMPLATE';
  description: string;
  url: string;
  addedBy: string;
}

