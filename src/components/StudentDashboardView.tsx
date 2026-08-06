import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  ShieldCheck, 
  LogOut, 
  User, 
  Building2, 
  Hash, 
  Clock, 
  Award,
  Lock,
  Layers,
  LayoutDashboard,
  Shield,
  Sun,
  Moon,
  ChevronRight,
  Users
} from 'lucide-react';
import { AcademicStudentProfile, StudentProfile, Club, CampusEvent, ThemeMode } from '../types';
import { MOCK_CLUBS, MOCK_EVENTS } from '../data/mockData';
import { CommitteeView } from './CommitteeView';
import { ClubDirectoryView } from './ClubDirectoryView';
import { EventsView } from './EventsView';
import { ViewClubModal } from './ViewClubModal';
import { JoinClubModal } from './JoinClubModal';
import { HistoryModal } from './HistoryModal';
import { ClubAttendanceModule } from './ClubAttendanceModule';
import { Footer } from './Footer';

const MONTH_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTH_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_MAP: Record<string, number> = {
  'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
  'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
};

const parseRecordDate = (dateStr: string) => {
  if (!dateStr) return null;
  // Try YYYY-MM-DD
  let match = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) {
    return {
      year: parseInt(match[1]),
      month: parseInt(match[2]) - 1, // 0-indexed
      day: parseInt(match[3])
    };
  }
  // Try M/D/YYYY or D/M/YYYY
  match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (match) {
    const val1 = parseInt(match[1]);
    const val2 = parseInt(match[2]);
    const year = parseInt(match[3]);
    if (val1 > 12) {
      return { year, month: val2 - 1, day: val1 };
    } else {
      return { year, month: val1 - 1, day: val2 };
    }
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    };
  }
  return null;
};

interface StudentDashboardViewProps {
  student: AcademicStudentProfile;
  allStudents?: StudentProfile[];
  clubs?: Club[];
  events?: CampusEvent[];
  theme?: ThemeMode;
  toggleTheme?: () => void;
  onLogout: () => void;
  onViewClub?: (club: Club) => void;
  onJoinClub?: (club: Club) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ 
  student, 
  allStudents = [],
  clubs = MOCK_CLUBS,
  events = MOCK_EVENTS,
  theme = 'dark',
  toggleTheme,
  onLogout,
  onViewClub,
  onJoinClub
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clubs' | 'events' | 'committee'>('dashboard');
  const [internalViewingClub, setInternalViewingClub] = useState<Club | null>(null);
  const [internalJoiningClub, setInternalJoiningClub] = useState<Club | null>(null);
  const [internalViewingAttendanceClub, setInternalViewingAttendanceClub] = useState<Club | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const latestMonth = student.monthlyAttendance && student.monthlyAttendance.length > 0
    ? student.monthlyAttendance[student.monthlyAttendance.length - 1].month.toUpperCase()
    : 'OCT';
  const [selectedMonthStr, setSelectedMonthStr] = useState<string>(latestMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Match live StudentProfile from Google Sheets sync list for exact history & log sync
  const matchedLiveStudent = Array.isArray(allStudents)
    ? allStudents.find(
        (s) => (s?.registrationNumber || '').trim().toLowerCase() === (student?.registrationNumber || '').trim().toLowerCase()
      )
    : null;

  const liveAttendancePercent = matchedLiveStudent
    ? (matchedLiveStudent.currentAttendancePercent ?? student.overallAttendancePercentage)
    : student.overallAttendancePercentage;

  // Dynamically calculate unique days attended from recent history or live sync
  const liveHistory = matchedLiveStudent?.recentHistory || [];
  const uniqueDaysCount = liveHistory.length > 0
    ? new Set(liveHistory.filter(r => r && (r.status === 'PRESENT' || r.status === 'EXCUSED')).map(r => r.date)).size
    : 0;

  const daysAttended = uniqueDaysCount > 0
    ? uniqueDaysCount
    : (matchedLiveStudent ? (matchedLiveStudent.eventsAttendedCount ?? student.classesAttended) : student.classesAttended);

  // Dynamically calculate hours logged from check-in/check-out session durations
  const sumHoursFromHistory = liveHistory.length > 0
    ? liveHistory
        .filter(r => r && (r.status === 'PRESENT' || r.status === 'EXCUSED'))
        .reduce((sum, r) => sum + (r.durationHours || 1.5), 0)
    : 0;

  const hoursAttended = sumHoursFromHistory > 0
    ? parseFloat(sumHoursFromHistory.toFixed(1))
    : (matchedLiveStudent ? (matchedLiveStudent.completedHours ?? parseFloat((daysAttended * 1.5).toFixed(1))) : parseFloat((daysAttended * 1.5).toFixed(1)));

  const totalClasses = student.totalClasses || 250;
  const totalHours = parseFloat((totalClasses * 1.5).toFixed(1));

  // Calculate percentage increase or decrease trend compared to previous monthly period
  const monthlyData = student.monthlyAttendance || [];
  let percentageTrendDelta = 0;
  if (monthlyData.length >= 2) {
    const currentMonthPct = monthlyData[monthlyData.length - 1].percentage;
    const prevMonthPct = monthlyData[monthlyData.length - 2].percentage;
    percentageTrendDelta = currentMonthPct - prevMonthPct;
  } else if (matchedLiveStudent?.monthlyTrends && matchedLiveStudent.monthlyTrends.length >= 2) {
    const len = matchedLiveStudent.monthlyTrends.length;
    percentageTrendDelta = matchedLiveStudent.monthlyTrends[len - 1].percentage - matchedLiveStudent.monthlyTrends[len - 2].percentage;
  } else {
    percentageTrendDelta = 3.5;
  }

  const studentProfileForHistory: StudentProfile = {
    registrationNumber: student.registrationNumber,
    name: student.name,
    email: student.email || `${student.registrationNumber.toLowerCase()}@centurionuniv.edu.in`,
    avatar: student.avatar,
    clubName: student.branch || 'Campus Club',
    role: 'Student Member',
    statusTier: student.overallAttendancePercentage >= 85 ? 'ELITE' : 'PRO',
    statusTierDescription: 'Academic Member',
    attendanceGoalPercent: 85,
    currentAttendancePercent: student.overallAttendancePercentage,
    eventsAttendedCount: student.classesAttended || 45,
    creditsEarned: Math.round((student.classesAttended || 45) * 0.6),
    requiredHours: 120,
    completedHours: Math.round((student.classesAttended || 45) * 1.5),
    degreeProgram: student.department,
    semesterYear: `Semester ${student.semester}`,
    nextEvent: { title: 'Semester Workshop', date: 'Upcoming' },
    monthlyTrends: (student.monthlyAttendance || []).map((m) => ({
      month: m.month,
      percentage: m.percentage,
      hours: m.attended * 1.5
    })),
    recentHistory: (student.recentLogs || []).map((log, idx) => ({
      id: log.id || `log-${idx}`,
      eventName: `${log.subject} Class Session`,
      eventCategory: 'Academic Lecture',
      date: log.date === 'Today' ? new Date().toISOString().split('T')[0] : log.date === 'Yesterday' ? new Date(Date.now() - 86400000).toISOString().split('T')[0] : log.date,
      durationHours: 1.5,
      durationFormatted: '1 hr 30 mins',
      status: (log.status || 'PRESENT').toUpperCase() as 'PRESENT' | 'ABSENT',
      clubName: log.subject,
      inTime: log.time || '09:30 AM',
      outTime: '11:00 AM'
    }))
  };

  const historyRecords = matchedLiveStudent?.recentHistory || studentProfileForHistory.recentHistory || [];

  const uniqueMonths = Array.from(
    new Set(
      historyRecords
        .map((rec) => {
          const parsed = parseRecordDate(rec.date);
          return parsed ? MONTH_SHORT[parsed.month] : null;
        })
        .filter((m): m is string => !!m)
    )
  );

  const availableMonths = MONTH_SHORT;

  const currentMonthIdx = MONTH_MAP[selectedMonthStr] ?? 9;
  
  const monthLogs = historyRecords.filter((rec) => {
    const parsed = parseRecordDate(rec.date);
    return parsed && parsed.month === currentMonthIdx;
  });

  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();

  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dayLogs = monthLogs.filter((rec) => {
      const parsed = parseRecordDate(rec.date);
      return parsed && parsed.day === dayNum;
    });

    const totalHours = dayLogs.reduce((sum, rec) => sum + (rec.durationHours || 0), 0);
    const isPresent = dayLogs.some((rec) => rec.status === 'PRESENT');
    const isExcused = dayLogs.some((rec) => rec.status === 'EXCUSED');
    const isAbsent = dayLogs.some((rec) => rec.status === 'ABSENT');

    return {
      day: dayNum,
      logs: dayLogs,
      hours: Number(totalHours.toFixed(2)),
      isPresent,
      isExcused,
      isAbsent
    };
  });

  const maxDayHours = Math.max(4, ...dailyData.map((d) => d.hours));

  const handleSelectViewClub = (c: Club) => {
    if (onViewClub) onViewClub(c);
    setInternalViewingClub(c);
  };

  const handleSelectJoinClub = (c: Club) => {
    if (onJoinClub) onJoinClub(c);
    setInternalJoiningClub(c);
  };

  const getAttendanceBadgeColor = (percentage: number) => {
    if (percentage >= 85) return 'text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 border-emerald-300 dark:border-emerald-500/40 font-bold';
    if (percentage >= 75) return 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/40 font-bold';
    return 'text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-500/20 border-rose-300 dark:border-rose-500/40 font-bold';
  };

  const getAttendanceBarColor = (percentage: number) => {
    if (percentage >= 85) return 'from-emerald-500 to-teal-400';
    if (percentage >= 75) return 'from-amber-500 to-yellow-400';
    return 'from-rose-500 to-red-400';
  };

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans relative overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic Background Effects */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Pill Glassmorphic Navbar (Matches Admin Portal Navbar) */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-[#11131a]/85 backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,74,198,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex justify-between items-center px-4 md:px-8 py-3 z-50 transition-all duration-300">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 p-1">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYWoxaLgUQRGQM_9JBtxJgHEHgpjdREMXzL_js7eoNvyd8XxkwTW3PqaEuV0CQS2AMXjSQ-J8m1JFSZQPe8FuJbzKVd4wJvrwp60973PJKtLSEFCfc50GblC-DzW1lAgVyuMcM_EsVzNekBU-kEMGsNr4O_qim7-1akytGwFPJYT6q_6YwcYtezMyFyh28GsHaMthPdSt8iWnsBNY7JT7Ue4SG9KeBMEIHr_kSsVhkkfaOaYt9jTb8jqNW4ORb5NLusN2QgwaS_xtN"
              alt="CaSR Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-base md:text-xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400 bg-clip-text text-transparent">
            CaSR Student Portal
          </span>
        </div>

        {/* Student Nav Tabs (Matching Admin Navbar Tab Pattern) */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>My Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('clubs')}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
              activeTab === 'clubs'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Clubs</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
              activeTab === 'events'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveTab('committee')}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
              activeTab === 'committee'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
          >
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Committee</span>
          </button>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle Button (Matching Admin Navbar) */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-xs md:text-sm font-bold border border-rose-500/30 transition-all shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex-1 w-full space-y-6">
        {/* Student Welcome Header Card */}
        <div className="glass-card p-5 md:p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/40">
                  Student Portal
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 font-mono font-bold">Reg: {student.registrationNumber}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-0.5">
                Welcome, {student.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistoryModal(true)}
              className="px-5 py-2.5 rounded-xl liquid-gradient text-white text-xs md:text-sm font-extrabold shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Clock className="w-4 h-4" /> Log Details
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-xs text-emerald-800 dark:text-emerald-300 font-extrabold">
              <Lock className="w-3.5 h-3.5" />
              <span>Strict Data Isolation Active</span>
            </div>
          </div>
        </div>

        {activeTab === 'clubs' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ClubDirectoryView
              clubs={clubs}
              onViewClub={handleSelectViewClub}
              onJoinClub={handleSelectJoinClub}
              onOpenClubAttendance={(c) => setInternalViewingAttendanceClub(c)}
            />
          </motion.div>
        ) : activeTab === 'events' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EventsView
              events={events}
              currentStudent={matchedLiveStudent || studentProfileForHistory}
            />
          </motion.div>
        ) : activeTab === 'committee' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CommitteeView compactPadding />
          </motion.div>
        ) : (
          <>
            {/* Academic Profile Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01, rotateX: 1, rotateY: -1, translateZ: 5 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
              className="glass-card rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-2.5 mb-5 text-blue-700 dark:text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                <span className="w-8 h-8 rounded-xl glass-neo-icon text-blue-600 dark:text-blue-400">
                  <GraduationCap className="w-4 h-4" />
                </span>
                Academic Profile Information
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <span className="text-xs text-slate-750 dark:text-slate-300 font-bold flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg glass-neo-icon text-blue-600 dark:text-blue-400">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    Registration No
                  </span>
                  <p className="text-sm font-extrabold text-slate-950 dark:text-white font-mono">{student.registrationNumber}</p>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <span className="text-xs text-slate-755 dark:text-slate-300 font-bold flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg glass-neo-icon text-amber-500 dark:text-amber-400">
                      <Hash className="w-3.5 h-3.5" />
                    </span>
                    Roll Number
                  </span>
                  <p className="text-sm font-extrabold text-slate-950 dark:text-white font-mono">{student.rollNumber}</p>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <span className="text-xs text-slate-756 dark:text-slate-300 font-bold flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg glass-neo-icon text-purple-600 dark:text-purple-400">
                      <Building2 className="w-3.5 h-3.5" />
                    </span>
                    Department
                  </span>
                  <p className="text-sm font-extrabold text-slate-950 dark:text-white truncate">
                    {matchedLiveStudent?.degreeProgram || student.department}
                  </p>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <span className="text-xs text-slate-757 dark:text-slate-300 font-bold flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg glass-neo-icon text-indigo-600 dark:text-indigo-400">
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                    Branch
                  </span>
                  <p className="text-sm font-extrabold text-slate-950 dark:text-white truncate">
                    {matchedLiveStudent?.degreeProgram || student.branch}
                  </p>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <span className="text-xs text-slate-758 dark:text-slate-300 font-bold flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg glass-neo-icon text-emerald-600 dark:text-emerald-400">
                      <Award className="w-3.5 h-3.5" />
                    </span>
                    Semester
                  </span>
                  <p className="text-sm font-extrabold text-slate-950 dark:text-white">
                    {matchedLiveStudent?.semesterYear || `Semester ${student.semester}`}
                  </p>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <span className="text-xs text-slate-759 dark:text-slate-300 font-bold flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg glass-neo-icon text-pink-600 dark:text-pink-400">
                      <BookOpen className="w-3.5 h-3.5" />
                    </span>
                    Section
                  </span>
                  <p className="text-sm font-extrabold text-slate-950 dark:text-white font-mono">
                    {matchedLiveStudent?.sectionCode || student.section}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Committee Callout Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              whileHover={{ scale: 1.01, rotateX: 1.5, rotateY: -1.5, translateZ: 8 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
              className="glass-card bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-emerald-500/10 border border-purple-500/30 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 glass-neo-icon rounded-2xl text-purple-650 dark:text-purple-400 shrink-0">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40">
                      Official Campus Body
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-mono font-bold">CUTM/Reg.Off./CASR/154/2026</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-950 dark:text-white mt-1">CaSR Execution Committee (CaEC)</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                    View school coordinators, faculty in-charges, social unit officers, and student leaders.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('committee')}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition-all shadow-md shadow-purple-600/20 whitespace-nowrap flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>View Committee Directory</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Key CaSR Metric & Credit Target Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Overall Attendance Card (Directly linked to Excel Google Sheet calculation) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-3xl p-6 shadow-xl relative overflow-hidden bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                    OVERALL ATTENDANCE
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
                    {liveAttendancePercent >= 75 ? 'Good Standing' : 'Low Warning'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white font-mono tracking-tight">
                      {liveAttendancePercent}%
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Avg</span>
                  </div>

                  {/* Dynamic Percentage Increase / Decrease Badge */}
                  <div
                    className={`flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                      percentageTrendDelta >= 0
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {percentageTrendDelta >= 0 ? (
                      <>
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+{percentageTrendDelta.toFixed(1)}% increase</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>{percentageTrendDelta.toFixed(1)}% decrease</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Sleek Green High-Contrast Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${liveAttendancePercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-sm"
                  />
                </div>

                {/* DAYS ATTENDED & HOURS LOGGED */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      DAYS ATTENDED
                    </span>
                    <span className="text-2xl font-black text-slate-950 dark:text-white mt-1 font-mono">
                      {daysAttended}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      ⏰ HOURS LOGGED
                    </span>
                    <span className="text-2xl font-black text-slate-950 dark:text-white mt-1 font-mono">
                      {hoursAttended} <span className="text-xs font-bold text-slate-500 dark:text-slate-400">hrs</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 1 Year Target Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4, translateZ: 10 }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="glass-card rounded-3xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    1 Year Target
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/40">
                    Annual Goal
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                    30
                  </span>
                  <span className="text-base font-extrabold text-slate-950 dark:text-white">Credits</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
                    (30 hrs)
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">Required annual target</span>
                </div>
              </motion.div>

              {/* 4 Years Target Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4, translateZ: 10 }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="glass-card rounded-3xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    4 Years Target
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40">
                    Degree Goal
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold text-purple-700 dark:text-purple-400 font-mono">
                    120
                  </span>
                  <span className="text-base font-extrabold text-slate-950 dark:text-white">Credits</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40">
                    (120 hrs)
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">Total graduation target</span>
                </div>
              </motion.div>
            </div>


            {/* Monthly Attendance Trends Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-card rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-3 tracking-tight">
                  <span className="w-9 h-9 rounded-xl glass-neo-icon text-emerald-600 dark:text-emerald-400 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <span className="text-slate-950 dark:text-white">Daily Attendance Trends</span>
                </h2>
                
                {/* Month Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
                  {availableMonths.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setSelectedMonthStr(m);
                        setSelectedDay(null); // Reset day selection on month change
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        selectedMonthStr === m
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-850'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Stats Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/15 flex flex-col justify-center">
                  <span className="text-[10px] font-extrabold text-slate-750 dark:text-slate-400 uppercase tracking-wide">Classes Logged</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                    {monthLogs.length}
                  </span>
                </div>
                <div className="bg-blue-500/5 dark:bg-blue-500/10 p-3 rounded-2xl border border-blue-500/15 flex flex-col justify-center">
                  <span className="text-[10px] font-extrabold text-slate-755 dark:text-slate-400 uppercase tracking-wide">Hours Logged</span>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                    {monthLogs.reduce((sum, rec) => sum + (rec.durationHours || 0), 0).toFixed(1)}h
                  </span>
                </div>
                <div className="bg-purple-500/5 dark:bg-purple-500/10 p-3 rounded-2xl border border-purple-500/15 flex flex-col justify-center">
                  <span className="text-[10px] font-extrabold text-slate-755 dark:text-slate-400 uppercase tracking-wide">Avg Session</span>
                  <span className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono mt-0.5">
                    {monthLogs.length > 0 
                      ? `${(monthLogs.reduce((sum, rec) => sum + (rec.durationHours || 0), 0) / monthLogs.length).toFixed(1)}h`
                      : '0.0h'
                    }
                  </span>
                </div>
              </div>

              {/* Graph Container */}
              <div className="relative bg-slate-100/90 dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-inner min-h-[220px]">
                {/* SVG Graph */}
                <div className="w-full h-[180px] select-none flex items-end">
                  {/* Grid Lines & Y-Axis Labels */}
                  <div className="absolute inset-x-4 top-4 bottom-10 flex flex-col justify-between pointer-events-none text-[9px] font-bold text-slate-400 font-mono">
                    {[maxDayHours, maxDayHours / 2, 0].map((h, i) => (
                      <div key={i} className="flex items-center gap-2 w-full">
                        <span className="w-6 text-right shrink-0">{h.toFixed(1)}h</span>
                        <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-850/80" />
                      </div>
                    ))}
                  </div>

                  {/* Bars Container */}
                  <div className="flex-1 h-[140px] flex items-end justify-between gap-1 md:gap-1.5 px-8 relative z-10">
                    {dailyData.map((d) => {
                      const heightPercent = (d.hours / maxDayHours) * 100;
                      const isSelected = selectedDay === d.day;
                      const hasActivity = d.hours > 0;

                      return (
                        <div
                          key={d.day}
                          onClick={() => hasActivity && setSelectedDay(isSelected ? null : d.day)}
                          className={`group flex-1 flex flex-col items-center justify-end h-full cursor-pointer transition-all ${
                            !hasActivity ? 'pointer-events-none' : ''
                          }`}
                        >
                          {/* Hover Tooltip (Bubble) */}
                          <div className={`absolute bottom-full mb-2 bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black px-2 py-1 rounded-lg pointer-events-none shadow-md z-20 whitespace-nowrap transition-all duration-200 scale-0 origin-bottom group-hover:scale-100 ${
                            isSelected ? 'scale-100 opacity-100' : 'opacity-0'
                          }`}
                          style={{
                            left: `${((d.day - 1) / (daysInMonth - 1)) * 80 + 10}%`,
                            transform: 'translateX(-50%)'
                          }}
                          >
                            Day {d.day}: {d.hours}h ({d.logs.length} sessions)
                          </div>

                          {/* Bar */}
                          <div
                            className={`w-full rounded-t-lg transition-all duration-300 ${
                              isSelected 
                                ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.4)] scale-x-110' 
                                : isSelected === null && hasActivity
                                  ? 'bg-gradient-to-t from-emerald-500/80 to-teal-400/80 group-hover:from-emerald-500 group-hover:to-teal-400 shadow-[0_0_6px_rgba(16,185,129,0.1)]'
                                  : hasActivity
                                    ? 'bg-gradient-to-t from-emerald-500/60 to-teal-400/60 group-hover:from-emerald-500/90 group-hover:to-teal-400/90'
                                    : 'h-1.5 w-1.5 rounded-full bg-slate-350 dark:bg-slate-800'
                            }`}
                            style={hasActivity ? { height: `${Math.max(12, heightPercent)}%` } : {}}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* X-Axis Month Day Labels */}
                <div className="flex justify-between text-[9px] font-bold text-slate-500 dark:text-slate-400 font-mono border-t border-slate-200 dark:border-slate-800/80 pt-2 px-8">
                  <span>1st</span>
                  <span>10th</span>
                  <span>20th</span>
                  <span>{daysInMonth}th</span>
                </div>
              </div>

              {/* Day Timings / Attendance Details Panel */}
              <div className="border-t border-slate-200 dark:border-slate-800/60 pt-4">
                {selectedDay !== null && dailyData[selectedDay - 1] ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-805 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        Timings on {selectedMonthStr} {selectedDay}
                      </h4>
                      <button 
                        onClick={() => setSelectedDay(null)}
                        className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Show Month Logs
                      </button>
                    </div>

                    <div className="space-y-2">
                      {dailyData[selectedDay - 1].logs.map((log, lIdx) => (
                        <div 
                          key={lIdx}
                          className="bg-white/60 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-850 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                              {log.rawScanType || 'IN'}
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-955 dark:text-white leading-tight">
                                {log.eventName || 'Class Session'}
                              </p>
                              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{log.inTime ? `${log.inTime} - ${log.outTime || 'N/A'}` : (log.timing || log.date)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-right">
                            <span className="text-[10px] font-extrabold font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800">
                              {log.durationHours} hrs
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                              log.status === 'PRESENT'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-900'
                                : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 border border-blue-250 dark:border-blue-900'
                            }`}>
                              {log.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-805 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Session History for {selectedMonthStr}
                    </h4>

                    {monthLogs.length > 0 ? (
                      <div className="max-h-[160px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
                        {monthLogs.map((log, lIdx) => {
                          const parsed = parseRecordDate(log.date);
                          const dayNum = parsed ? parsed.day : '';
                          return (
                            <div 
                              key={lIdx}
                              onClick={() => dayNum && setSelectedDay(dayNum)}
                              className="bg-white/40 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-6 text-[10px] font-black font-mono text-slate-400 dark:text-slate-500 text-center shrink-0">
                                  #{dayNum}
                                </span>
                                <div>
                                  <p className="text-[11px] font-extrabold text-slate-955 dark:text-white leading-tight">
                                    {log.eventName}
                                  </p>
                                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                                    {log.inTime ? `${log.inTime} - ${log.outTime || 'N/A'}` : (log.timing || log.date)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 text-right">
                                <span className="text-[9px] font-extrabold font-mono text-slate-700 dark:text-slate-400">
                                  {log.durationHours} hrs
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                  log.status === 'PRESENT'
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-900'
                                    : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 border border-blue-250 dark:border-blue-900'
                                }`}>
                                  {log.status}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-slate-100/40 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 text-center text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        No session records logged in the sheet for {selectedMonthStr}.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}

        {/* Security Banner Footer */}
        <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-500/30 text-center text-xs text-blue-950 dark:text-blue-100 font-semibold flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
          <span>
            Authenticated Student Session for Registration No <strong className="text-blue-950 dark:text-white font-mono">{student.registrationNumber}</strong>. 
            Strict Data Access Controls Enforced.
          </span>
        </div>
      </main>

      {/* Modals for viewing and joining clubs */}
      {internalViewingClub && (
        <ViewClubModal
          club={internalViewingClub}
          onClose={() => setInternalViewingClub(null)}
          onJoinClub={(c) => {
            setInternalViewingClub(null);
            setInternalJoiningClub(c);
          }}
          onOpenAttendance={(c) => {
            setInternalViewingClub(null);
            setInternalViewingAttendanceClub(c);
          }}
        />
      )}

      {internalViewingAttendanceClub && (
        <ClubAttendanceModule
          club={internalViewingAttendanceClub}
          allStudents={allStudents}
          onClose={() => setInternalViewingAttendanceClub(null)}
          onViewStudentHistory={() => {}}
        />
      )}

      {internalJoiningClub && (
        <JoinClubModal
          club={internalJoiningClub}
          currentStudent={matchedLiveStudent || studentProfileForHistory}
          onClose={() => setInternalJoiningClub(null)}
          onSuccess={(clubName) => {
            setInternalJoiningClub(null);
            alert(`Successfully registered for ${clubName}!`);
          }}
        />
      )}

      {/* Attendance History Modal Popup */}
      {showHistoryModal && (
        <HistoryModal
          student={matchedLiveStudent || studentProfileForHistory}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      {/* Official Footer matching Admin Portal */}
      <Footer onSelectTab={(tab) => {
        if (tab === 'clubs' || tab === 'events' || tab === 'committee' || tab === 'dashboard') {
          setActiveTab(tab);
        }
      }} />
    </div>
  );
};
