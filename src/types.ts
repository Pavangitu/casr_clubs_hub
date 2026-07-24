export type ThemeMode = 'light' | 'dark';

export type NavTab = 'dashboard' | 'clubs' | 'events' | 'directory' | 'committee';

export type ClubCategory = 'All Clubs' | 'Technical' | 'Cultural' | 'Sports' | 'Social' | 'Innovation';

export interface Club {
  id: string;
  name: string;
  category: Exclude<ClubCategory, 'All Clubs'>;
  description: string;
  fullDescription?: string;
  image: string;
  facultyLead: string;
  studentLead: string;
  activeMembers: number;
  meetingSchedule: string;
  location: string;
  tags: string[];
  foundedYear: number;
  featured?: boolean;
}

export interface AttendanceRecord {
  id: string;
  eventName: string;
  eventCategory?: string;
  date: string;
  durationHours: number;
  durationFormatted?: string;
  status: 'PRESENT' | 'ABSENT' | 'EXCUSED';
  clubName: string;
  reason?: string;
  contact?: string;
  timing?: string;
  timestamp?: string;
  inTime?: string;
  outTime?: string;
  rawScanType?: 'IN' | 'OUT' | 'PAIRED';
}

export interface StudentProfile {
  registrationNumber: string;
  name: string;
  email: string;
  avatar: string;
  clubName: string;
  role: string;
  statusTier: string;
  statusTierDescription: string;
  attendanceGoalPercent: number;
  currentAttendancePercent: number;
  eventsAttendedCount: number;
  creditsEarned: number;
  requiredHours: number;
  completedHours: number;
  degreeProgram?: string;
  semesterYear?: string;
  insCount?: number;
  outsCount?: number;
  totalScans?: number;
  allClubs?: string[];
  nextEvent: {
    title: string;
    date: string;
  };
  monthlyTrends: {
    month: string;
    percentage: number;
    hours: number;
  }[];
  recentHistory: AttendanceRecord[];
}

export interface CampusEvent {
  id: string;
  title: string;
  clubName: string;
  clubCategory: Exclude<ClubCategory, 'All Clubs'>;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  creditsAwarded: number;
  durationHours: number;
  registeredCount: number;
  maxCapacity: number;
  tags: string[];
  speakers?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  type: 'event' | 'attendance' | 'club' | 'system';
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  triggerType: 'AUTO' | 'MANUAL' | 'INITIAL' | string;
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  recordsAdded: number;
  recordsUpdated: number;
  recordsDeleted: number;
  duplicatesSkipped: number;
  failedRecords: number;
  executionTimeMs: number;
  totalRecordsProcessed: number;
  errorMessage?: string;
}

