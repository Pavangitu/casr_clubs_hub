import React, { useState, useEffect, useMemo } from 'react';
import { StudentProfile } from '../types';
import {
  Search,
  BadgeCheck,
  User,
  Clock,
  Award,
  Sparkles,
  RefreshCw,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  FileSpreadsheet,
  ExternalLink,
  Filter,
  Users,
  ChevronLeft,
  Eye,
  AlertTriangle,
  X,
  Calendar
} from 'lucide-react';
import { fetchLiveAttendanceData, GOOGLE_SHEETS_URLS } from '../services/googleSheetsService';

// 1. Elite Attendance Avatar (Graduation Cap + Floating Trophy)
const EliteAvatar: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Background Circle */}
    <circle cx="60" cy="60" r="55" fill="#dbeafe" className="animate-pulse" style={{ animationDuration: '3s' }} />
    
    {/* Body/Shirt */}
    <path d="M 32 100 C 32 82, 88 82, 88 100 Z" fill="#2563eb" />
    <path d="M 50 82 L 60 94 L 70 82 Z" fill="#f8fafc" />
    
    {/* Head */}
    <circle cx="60" cy="55" r="23" fill="#fed7aa" />
    
    {/* Face Details */}
    <circle cx="51" cy="53" r="2.5" fill="#1e293b" />
    <circle cx="69" cy="53" r="2.5" fill="#1e293b" />
    <path d="M 54 65 Q 60 70, 66 65" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    
    {/* Hair */}
    <path d="M 36 53 C 36 34, 84 34, 84 53 C 76 43, 44 43, 36 53 Z" fill="#475569" />
    
    {/* Graduation Cap base */}
    <path d="M 42 39 L 78 39 L 75 45 L 45 45 Z" fill="#0f172a" />
    {/* Cap diamond top */}
    <path d="M 60 22 L 92 32 L 60 42 L 28 32 Z" fill="#1e293b" />
    {/* Tassel */}
    <path d="M 60 32 L 40 45 L 40 52" stroke="#eab308" strokeWidth="1.5" fill="none" />
    <circle cx="40" cy="52" r="2" fill="#eab308" />
    
    {/* Floating Gold Trophy */}
    <g className="animate-bounce" style={{ animationDuration: '2s' }}>
      <path d="M 94 56 L 102 56 L 100 64 C 100 68, 96 68, 96 64 Z" fill="#eab308" />
      <path d="M 92 56 H 104" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      <path d="M 98 64 V 70 H 96 V 72 H 100 V 70 H 98" stroke="#eab308" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

// 2. Pro/Active Attendance Avatar (Hoodie + Sunglasses + Headphones + Soundwaves)
const ProAvatar: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Background Circle */}
    <circle cx="60" cy="60" r="55" fill="#d1fae5" />
    
    {/* Hoodie Body */}
    <path d="M 32 100 C 32 80, 88 80, 88 100 Z" fill="#10b981" />
    
    {/* Head */}
    <circle cx="60" cy="55" r="23" fill="#fed7aa" />
    
    {/* Hoodie Hood border */}
    <path d="M 36 56 C 36 30, 84 30, 84 56 C 84 72, 36 72, 36 56 Z" fill="none" stroke="#059669" strokeWidth="4.5" />
    
    {/* Face Details */}
    <circle cx="51" cy="54" r="2.5" fill="#1f2937" />
    <circle cx="69" cy="54" r="2.5" fill="#1f2937" />
    <path d="M 54 65 Q 60 70, 66 65" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    
    {/* Cool Sunglasses */}
    <path d="M 44 51 H 76" stroke="#111827" strokeWidth="3" />
    <path d="M 45 51 C 45 59, 55 59, 55 51" fill="#111827" />
    <path d="M 65 51 C 65 59, 75 59, 75 51" fill="#111827" />
    
    {/* Headphones Band */}
    <path d="M 38 52 C 38 28, 82 28, 82 52" fill="none" stroke="#4f46e5" strokeWidth="3.5" />
    {/* Earcups */}
    <rect x="33" y="45" width="8" height="16" rx="3.5" fill="#4f46e5" className="animate-pulse" />
    <rect x="79" y="45" width="8" height="16" rx="3.5" fill="#4f46e5" className="animate-pulse" />
    
    {/* Soundwaves */}
    <g stroke="#4f46e5" strokeWidth="2" strokeLinecap="round">
      <line x1="22" y1="53" x2="22" y2="53">
        <animate attributeName="y2" values="44;62;44" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="98" y1="53" x2="98" y2="53">
        <animate attributeName="y2" values="38;68;38" dur="0.8s" repeatCount="indefinite" />
      </line>
    </g>
  </svg>
);

// 3. Standard Attendance Avatar (Glasses + Reading Book)
const StandardAvatar: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Background Circle */}
    <circle cx="60" cy="60" r="55" fill="#ffedd5" />
    
    {/* Body */}
    <path d="M 32 100 C 32 82, 88 82, 88 100 Z" fill="#f97316" />
    
    {/* Head */}
    <circle cx="60" cy="55" r="23" fill="#fed7aa" />
    
    {/* Face Details */}
    <circle cx="51" cy="54" r="2" fill="#1e293b" />
    <circle cx="69" cy="54" r="2" fill="#1e293b" />
    <path d="M 55 66 Q 60 69, 65 66" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Glasses */}
    <circle cx="51" cy="54" r="7" fill="none" stroke="#b45309" strokeWidth="2" />
    <circle cx="69" cy="54" r="7" fill="none" stroke="#b45309" strokeWidth="2" />
    <line x1="58" y1="54" x2="62" y2="54" stroke="#b45309" strokeWidth="2" />
    
    {/* Hair */}
    <path d="M 36 53 Q 60 38, 84 53 C 87 46, 33 46, 36 53 Z" fill="#78350f" />
    
    {/* Book */}
    <g className="animate-bounce" style={{ animationDuration: '3s' }}>
      {/* Cover */}
      <path d="M 40 76 Q 60 82, 80 76 L 80 92 Q 60 96, 40 92 Z" fill="#0284c7" />
      {/* Pages */}
      <path d="M 43 77 Q 60 82, 77 77 L 77 90 Q 60 94, 43 90 Z" fill="#ffffff" />
      {/* Fold line */}
      <line x1="60" y1="80" x2="60" y2="92" stroke="#bae6fd" strokeWidth="1.5" />
    </g>
  </svg>
);

interface CheckAttendanceViewProps {
  currentStudent: StudentProfile;
  allStudents: StudentProfile[];
  onOpenHistoryModal: (student: StudentProfile) => void;
  isSyncingSheets?: boolean;
  lastSyncedTime?: string;
  onManualSync?: () => void;
}

export const CheckAttendanceView: React.FC<CheckAttendanceViewProps> = ({
  currentStudent,
  allStudents: initialAllStudents,
  onOpenHistoryModal,
  isSyncingSheets: propIsSyncingSheets = false,
  lastSyncedTime: propLastSyncedTime = 'Live',
  onManualSync
}) => {
  const [allStudentsList, setAllStudentsList] = useState<StudentProfile[]>(initialAllStudents);
  const [activeStudent, setActiveStudent] = useState<StudentProfile>(currentStudent);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [regNumberInput, setRegNumberInput] = useState('');
  const [studentNameInput, setStudentNameInput] = useState('');
  const [selectedClubFilter, setSelectedClubFilter] = useState<string>('ALL');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'ELITE' | 'PRO' | 'AT_RISK'>('ALL');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [internalIsSyncing, setInternalIsSyncing] = useState(false);
  const [internalLastSynced, setInternalLastSynced] = useState<string>('Live Synced');
  const [trendPeriod, setTrendPeriod] = useState<'6months' | 'year'>('6months');
  const [hoveredTrend, setHoveredTrend] = useState<number | null>(null);
  const [showDetailCard, setShowDetailCard] = useState(true);

  const isSyncingSheets = propIsSyncingSheets || internalIsSyncing;
  const lastSyncedTime = propLastSyncedTime !== 'Live' ? propLastSyncedTime : internalLastSynced;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Sync internal list with parent App.tsx live polling updates
  useEffect(() => {
    if (initialAllStudents && initialAllStudents.length > 0) {
      setAllStudentsList(initialAllStudents);
      setActiveStudent((prev) => {
        const found = initialAllStudents.find(
          (s) => s.registrationNumber.toLowerCase() === prev.registrationNumber.toLowerCase()
        );
        return found || initialAllStudents[0];
      });
    }
  }, [initialAllStudents]);

  // Sync activeStudent with currentStudent prop changes (e.g. from global navbar search)
  useEffect(() => {
    if (currentStudent) {
      setActiveStudent(currentStudent);
    }
  }, [currentStudent]);

  // Extract all unique clubs for filtering
  const availableClubs = useMemo(() => {
    const clubsSet = new Set<string>();
    allStudentsList.forEach((s) => {
      if (s.clubName) clubsSet.add(s.clubName);
      if (s.allClubs) s.allClubs.forEach((c) => clubsSet.add(c));
    });
    return Array.from(clubsSet).sort();
  }, [allStudentsList]);

  // Real-time filtered students list
  const filteredStudents = useMemo(() => {
    return allStudentsList.filter((s) => {
      // Search query (either from unified search or reg/name fields)
      const combinedSearch = (searchQuery || regNumberInput || studentNameInput).trim().toLowerCase();

      if (combinedSearch) {
        const matchesReg = s.registrationNumber.toLowerCase().includes(combinedSearch);
        const matchesName = s.name.toLowerCase().includes(combinedSearch);
        const matchesDegree = s.degreeProgram ? s.degreeProgram.toLowerCase().includes(combinedSearch) : false;
        const matchesClub = s.clubName ? s.clubName.toLowerCase().includes(combinedSearch) : false;

        if (!matchesReg && !matchesName && !matchesDegree && !matchesClub) {
          return false;
        }
      }

      // Club filter
      if (selectedClubFilter !== 'ALL') {
        const matchesPrimary = s.clubName === selectedClubFilter;
        const matchesAll = s.allClubs ? s.allClubs.includes(selectedClubFilter) : false;
        if (!matchesPrimary && !matchesAll) return false;
      }

      // Tier filter
      if (tierFilter === 'ELITE' && s.currentAttendancePercent < 85) return false;
      if (tierFilter === 'PRO' && (s.currentAttendancePercent < 70 || s.currentAttendancePercent >= 85)) return false;
      if (tierFilter === 'AT_RISK' && s.currentAttendancePercent >= 75) return false;

      return true;
    });
  }, [allStudentsList, searchQuery, regNumberInput, studentNameInput, selectedClubFilter, tierFilter]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, regNumberInput, studentNameInput, selectedClubFilter, tierFilter]);

  // Automatically select the active student if search queries yield a single match or exact registration number match
  useEffect(() => {
    const combinedSearch = (searchQuery || regNumberInput || studentNameInput).trim().toLowerCase();
    if (!combinedSearch) return;

    // Check if there is an exact registration number match first
    if (regNumberInput.trim()) {
      const exactMatch = allStudentsList.find(
        (s) => s.registrationNumber.toLowerCase() === regNumberInput.trim().toLowerCase()
      );
      if (exactMatch) {
        setActiveStudent(exactMatch);
        setShowDetailCard(true);
        return;
      }
    }

    // Otherwise, if the filtered list has exactly one matching student, make them active
    if (filteredStudents.length === 1) {
      setActiveStudent(filteredStudents[0]);
      setShowDetailCard(true);
    }
  }, [searchQuery, regNumberInput, studentNameInput, filteredStudents, allStudentsList]);

  // Paginated students slice
  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  // Handle selecting a student from table or search
  const handleSelectStudent = (student: StudentProfile) => {
    setActiveStudent(student);
    setShowDetailCard(true);
    // Scroll smoothly to detail card if needed
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSyncGoogleSheets = async () => {
    if (onManualSync) {
      onManualSync();
      return;
    }
    setInternalIsSyncing(true);
    try {
      const liveData = await fetchLiveAttendanceData();
      if (liveData && liveData.length > 0) {
        setAllStudentsList(liveData);
        const matched = liveData.find(
          (s) => s.registrationNumber.toLowerCase() === activeStudent.registrationNumber.toLowerCase()
        );
        if (matched) {
          setActiveStudent(matched);
        }
        setInternalLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to sync Google Sheets:', err);
    } finally {
      setInternalIsSyncing(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setRegNumberInput('');
    setStudentNameInput('');
    setSelectedClubFilter('ALL');
    setTierFilter('ALL');
  };

  const renderAttendanceAvatar = (tier: string) => {
    const cleanTier = (tier || '').toUpperCase();
    if (cleanTier === 'ELITE') {
      return <EliteAvatar />;
    } else if (cleanTier === 'VETERAN' || cleanTier === 'PRO') {
      return <ProAvatar />;
    }
    return <StandardAvatar />;
  };

  return (
    <div className="pt-28 md:pt-32 px-4 md:px-12 max-w-7xl mx-auto pb-20 space-y-10 animate-in fade-in duration-500">

      {/* Hero Header & Real-time Search Box */}
      <section className="glass-card rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-white/30 dark:border-white/10 relative">



        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> All Students Attendance Portal
          </div>
          <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900 dark:text-white">
            Search Student Attendance
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Type any Registration Number or Student Name to view real-time attendance, scan counts, and calculated hours from IN & OUT timestamps.
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* Registration Number Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-200 ml-1">
              Registration Number
            </label>
            <div className="w-full bg-slate-100 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 focus-within:border-blue-600 dark:focus-within:border-blue-400 rounded-xl flex items-center px-4 py-3 gap-3 transition-all duration-300 shadow-sm focus-within:shadow-md">
              <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <input
                type="text"
                value={regNumberInput}
                onChange={(e) => {
                  setRegNumberInput(e.target.value);
                  setSearchQuery(''); // clear generic query to use specific field
                }}
                placeholder="e.g. 230101120031"
                className="bg-transparent border-none focus:outline-none w-full text-xs md:text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 uppercase font-mono font-bold"
              />
              {regNumberInput && (
                <button onClick={() => setRegNumberInput('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Student Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-200 ml-1">
              Student Name
            </label>
            <div className="w-full bg-slate-100 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 focus-within:border-blue-600 dark:focus-within:border-blue-400 rounded-xl flex items-center px-4 py-3 gap-3 transition-all duration-300 shadow-sm focus-within:shadow-md">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <input
                type="text"
                value={studentNameInput}
                onChange={(e) => {
                  setStudentNameInput(e.target.value);
                  setSearchQuery('');
                }}
                placeholder="e.g. G Pavan Datta"
                className="bg-transparent border-none focus:outline-none w-full text-xs md:text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 font-bold"
              />
              {studentNameInput && (
                <button onClick={() => setStudentNameInput('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto pt-2 border-t border-gray-200/50 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Tier Filter:
            </span>
            <button
              onClick={() => setTierFilter('ALL')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                tierFilter === 'ALL'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-200/60 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              All ({allStudentsList.length})
            </button>
            <button
              onClick={() => setTierFilter('ELITE')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                tierFilter === 'ELITE'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-gray-200/60 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              Elite (&ge;85%)
            </button>
            <button
              onClick={() => setTierFilter('PRO')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                tierFilter === 'PRO'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-gray-200/60 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              Pro (70-84%)
            </button>
            <button
              onClick={() => setTierFilter('AT_RISK')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                tierFilter === 'AT_RISK'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-gray-200/60 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              At Risk (&lt;75%)
            </button>
          </div>

          {/* Club Dropdown Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-gray-500 dark:text-gray-400">Club:</span>
            <select
              value={selectedClubFilter}
              onChange={(e) => setSelectedClubFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-gray-200/80 dark:bg-gray-800 text-gray-900 dark:text-white font-medium border-none focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL">All Campus Clubs</option>
              {availableClubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>

            {(regNumberInput || studentNameInput || searchQuery || selectedClubFilter !== 'ALL' || tierFilter !== 'ALL') && (
              <button
                onClick={handleClearSearch}
                className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 font-bold hover:bg-red-500/20 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Active Student Highlighted Card (Inspector View) */}
      {showDetailCard && activeStudent && (
        <section className="glass-card rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl relative overflow-hidden border border-blue-500/20">
          <button
            onClick={() => setShowDetailCard(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Minimize student breakdown card"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Profile & Core Stats (Left Column) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6 lg:border-r border-gray-200/50 dark:border-white/10 pr-0 lg:pr-8">
            <div className="text-center lg:text-left space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                {activeStudent.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Reg No:{' '}
                <span className="font-mono text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                  {activeStudent.registrationNumber}
                </span>
              </p>
              {activeStudent.email && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-xs">
                  {activeStudent.email}
                </p>
              )}
              {activeStudent.degreeProgram && (
                <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-semibold pt-1 justify-center lg:justify-start">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>
                    {activeStudent.degreeProgram} • {activeStudent.semesterYear || '3rd Year'}
                  </span>
                </div>
              )}
            </div>

            <div className="w-full space-y-3 pt-2">
              <div className="flex justify-between items-end text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Target Attendance Goal</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {activeStudent.attendanceGoalPercent || 85}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${activeStudent.attendanceGoalPercent || 85}%` }}
                />
              </div>
            </div>

            {/* Registered Clubs & Units Card */}
            <div className="glass-card p-5 rounded-2xl w-full border border-white/40 dark:border-white/10 space-y-3 mt-2 shadow-sm">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
                Registered Clubs & Units
              </p>
              <div className="flex flex-wrap gap-2">
                {/* Primary Club Pill */}
                {activeStudent.clubName && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 border border-blue-500/20">
                    🏆 {activeStudent.clubName} (Primary)
                  </span>
                )}
                {/* All Attended Clubs Pills */}
                {activeStudent.allClubs &&
                  activeStudent.allClubs
                    .filter((c) => c !== activeStudent.clubName)
                    .map((clubName) => (
                      <span
                        key={clubName}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 border border-emerald-500/25"
                      >
                        ✨ {clubName}
                      </span>
                    ))}
              </div>
            </div>
          </div>

          {/* Detailed Stats & Charts (Right Column) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Circular Gauge Card */}
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-2 border-t-4 border-t-blue-600 dark:border-t-blue-500">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-gray-200 dark:text-gray-800"
                      cx="48"
                      cy="48"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-blue-600 dark:text-blue-400 transition-all duration-1000"
                      cx="48"
                      cy="48"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * activeStudent.currentAttendancePercent) / 100}
                    />
                  </svg>
                  <span className="absolute text-xl font-bold text-gray-900 dark:text-white">
                    {activeStudent.currentAttendancePercent}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Overall Attendance Rate
                </p>
              </div>

              {/* Yearly Requirement (30 Hours & 30 Credits) & Program Goal */}
              <div className="space-y-3 w-full">


                {/* 4-Year Total Program Requirement (120 Hours) */}
                <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border-l-4 border-l-purple-500 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">4-Year Program Requirement</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      120.0 Total Hours (30.0 hrs / Year)
                    </p>
                  </div>
                </div>
              </div>


            </div>

            {/* Monthly Trend Chart */}
            <div className="glass-card p-6 rounded-2xl flex flex-col h-64 border border-white/20 dark:border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" /> Monthly Attendance Analysis
                </h3>
                <span className="text-[11px] font-semibold text-gray-500">Live Calculated</span>
              </div>

              {/* Bar Chart Container */}
              <div className="flex-1 flex items-end justify-between gap-3 px-2 h-44">
                {activeStudent.monthlyTrends.map((trend, idx) => {
                  const isHovered = hoveredTrend === idx;
                  const isLatest = idx === activeStudent.monthlyTrends.length - 1;

                  return (
                    <div
                      key={trend.month}
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative group cursor-pointer"
                      onMouseEnter={() => setHoveredTrend(idx)}
                      onMouseLeave={() => setHoveredTrend(null)}
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-10 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-[10px] font-bold py-1 px-2 rounded shadow-lg z-20 whitespace-nowrap animate-in fade-in zoom-in-90">
                          {trend.percentage}% ({trend.hours}h)
                        </div>
                      )}

                      {/* Bar Track */}
                      <div className="w-full flex-1 flex items-end bg-gray-100/75 dark:bg-gray-800/30 rounded-lg overflow-hidden h-32">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-500 origin-bottom ${
                            isLatest
                              ? 'bg-blue-600 dark:bg-blue-500 shadow-lg shadow-blue-500/30'
                              : 'bg-blue-500/30 dark:bg-blue-400/20 hover:bg-blue-500 dark:hover:bg-blue-400'
                          }`}
                          style={{ height: `${trend.percentage}%` }}
                        />
                      </div>

                      {/* Month Label */}
                      <span
                        className={`text-[10px] font-bold whitespace-nowrap ${
                          isLatest ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {trend.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Scan Logs */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/20 dark:border-white/10">
              <div className="px-6 py-4 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Scan Logs for {activeStudent.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Showing {activeStudent.recentHistory.length} recorded entries from Google Sheets
                  </p>
                </div>
                <button
                  onClick={() => onOpenHistoryModal(activeStudent)}
                  className="text-blue-600 dark:text-emerald-400 text-xs font-semibold hover:underline flex items-center gap-1"
                >
                  View Full Modal Log ({activeStudent.recentHistory.length}) <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-gray-200/40 dark:divide-white/5 max-h-60 overflow-y-auto">
                {activeStudent.recentHistory.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500">No attendance records logged yet.</div>
                ) : (
                  activeStudent.recentHistory.map((rec) => (
                    <div
                      key={rec.id}
                      className="px-6 py-3 flex items-center justify-between hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{rec.eventName}</p>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                            <span>{rec.date}</span>
                            <span>•</span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{rec.clubName}</span>
                            {(rec.inTime || rec.outTime) && (
                              <>
                                <span>•</span>
                                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[10px] text-gray-700 dark:text-gray-300">
                                  {rec.inTime ? `IN: ${rec.inTime}` : ''}
                                  {rec.inTime && rec.outTime ? ' ➔ ' : ''}
                                  {rec.outTime ? `OUT: ${rec.outTime}` : ''}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                            rec.status === 'PRESENT'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {rec.durationFormatted || `${rec.durationHours} hrs`}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL STUDENTS MASTER ATTENDANCE TABLE */}
      <section className="glass-card rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-white/30 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200/50 dark:border-white/10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" /> Master Attendance Directory
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Showing <strong className="text-blue-600 dark:text-blue-400">{filteredStudents.length}</strong> of{' '}
              {allStudentsList.length} total registered students
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-blue-600 hover:text-white transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-blue-600 hover:text-white transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200/50 dark:border-white/10">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 uppercase tracking-wider text-[11px] font-bold border-b border-gray-200/50 dark:border-white/10">
                <th className="p-4">Reg Number</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Degree & Year</th>
                <th className="p-4">Club</th>
                <th className="p-4 text-center">In / Out Scans</th>
                <th className="p-4 text-center">Calculated Hours</th>
                <th className="p-4 text-center">Attendance %</th>
                <th className="p-4 text-center">Status Tier</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/40 dark:divide-white/5 font-medium">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <AlertTriangle className="w-8 h-8 text-amber-500" />
                      <p className="font-bold text-sm">No student records found matching your query.</p>
                      <p className="text-xs">Try searching a different Registration Number or clear active filters.</p>
                      <button
                        onClick={handleClearSearch}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((st) => {
                  const isSelected = activeStudent?.registrationNumber === st.registrationNumber;

                  return (
                    <tr
                      key={st.registrationNumber}
                      onClick={() => handleSelectStudent(st)}
                      className={`hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors cursor-pointer group ${
                        isSelected ? 'bg-blue-500/15 dark:bg-blue-500/25 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      {/* Registration Number */}
                      <td className="p-4 font-mono font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          {st.registrationNumber}
                        </span>
                      </td>

                      {/* Student Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {st.name}
                            </div>
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{st.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Degree Program */}
                      <td className="p-4 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                        <div>{st.degreeProgram || 'Undergraduate'}</div>
                        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                          {st.semesterYear || '3rd Year'}
                        </div>
                      </td>

                      {/* Club */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-[11px]">
                          {st.clubName || 'Campus Club'}
                        </span>
                      </td>

                      {/* In / Out Scans */}
                      <td className="p-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {st.insCount ?? st.eventsAttendedCount} IN
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="font-bold text-gray-500">{st.outsCount ?? 0} OUT</span>
                        </div>
                      </td>

                      {/* Calculated Hours */}
                      <td className="p-4 text-center whitespace-nowrap">
                        <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          {st.completedHours.toFixed(1)} hrs
                        </span>
                      </td>

                      {/* Attendance % & Progress */}
                      <td className="p-4 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`font-extrabold text-sm ${
                              st.currentAttendancePercent >= 85
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : st.currentAttendancePercent >= 70
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {st.currentAttendancePercent}%
                          </span>
                          <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                st.currentAttendancePercent >= 85
                                  ? 'bg-emerald-500'
                                  : st.currentAttendancePercent >= 70
                                  ? 'bg-blue-500'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${st.currentAttendancePercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status Tier */}
                      <td className="p-4 text-center whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                            st.statusTier === 'Elite'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : st.statusTier === 'Pro'
                              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {st.statusTier || 'Standard'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleSelectStudent(st)}
                            className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-all"
                            title="Inspect detailed stats card"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Inspect</span>
                          </button>
                          <button
                            onClick={() => onOpenHistoryModal(st)}
                            className="px-2.5 py-1.5 rounded-xl bg-gray-200/80 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-xs flex items-center gap-1 transition-all"
                            title="View complete scan log modal"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Logs</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Showing {(currentPage - 1) * pageSize + 1} -{' '}
            {Math.min(currentPage * pageSize, filteredStudents.length)} of {filteredStudents.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl bg-gray-200/80 dark:bg-gray-800 text-xs font-semibold disabled:opacity-40 hover:bg-blue-600 hover:text-white transition-colors"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl bg-gray-200/80 dark:bg-gray-800 text-xs font-semibold disabled:opacity-40 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Previous
            </button>

            <span className="text-xs font-bold text-gray-900 dark:text-white px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl bg-gray-200/80 dark:bg-gray-800 text-xs font-semibold disabled:opacity-40 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl bg-gray-200/80 dark:bg-gray-800 text-xs font-semibold disabled:opacity-40 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Last
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
