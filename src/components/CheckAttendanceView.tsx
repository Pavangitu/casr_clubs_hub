import React, { useState, useEffect, useMemo } from 'react';
import { StudentProfile } from '../types';
import { HistoryModal } from './HistoryModal';
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
  Calendar,
  Download
} from 'lucide-react';
import { fetchLiveAttendanceData, GOOGLE_SHEETS_URLS, getCustomSheetUrl, setCustomSheetUrl, MASTER_GOOGLE_SHEET_URL } from '../services/googleSheetsService';


// 1. Elite Attendance Avatar (Graduation Cap + Floating Trophy)
const EliteAvatar: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <circle cx="60" cy="60" r="55" fill="#dbeafe" className="animate-pulse" style={{ animationDuration: '3s' }} />
    <path d="M 32 100 C 32 82, 88 82, 88 100 Z" fill="#2563eb" />
    <path d="M 50 82 L 60 94 L 70 82 Z" fill="#f8fafc" />
    <circle cx="60" cy="55" r="23" fill="#fed7aa" />
    <circle cx="51" cy="53" r="2.5" fill="#1e293b" />
    <circle cx="69" cy="53" r="2.5" fill="#1e293b" />
    <path d="M 54 65 Q 60 70, 66 65" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 36 53 C 36 34, 84 34, 84 53 C 76 43, 44 43, 36 53 Z" fill="#475569" />
    <path d="M 42 39 L 78 39 L 75 45 L 45 45 Z" fill="#0f172a" />
    <path d="M 60 22 L 92 32 L 60 42 L 28 32 Z" fill="#1e293b" />
    <path d="M 60 32 L 40 45 L 40 52" stroke="#eab308" strokeWidth="1.5" fill="none" />
    <circle cx="40" cy="52" r="2" fill="#eab308" />
    <g className="animate-bounce" style={{ animationDuration: '2s' }}>
      <path d="M 94 56 L 102 56 L 100 64 C 100 68, 96 68, 96 64 Z" fill="#eab308" />
      <path d="M 92 56 H 104" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      <path d="M 98 64 V 70 H 96 V 72 H 100 V 70 H 98" stroke="#eab308" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

// 2. Pro Attendance Avatar
const ProAvatar: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <circle cx="60" cy="60" r="55" fill="#d1fae5" />
    <path d="M 32 100 C 32 80, 88 80, 88 100 Z" fill="#10b981" />
    <circle cx="60" cy="55" r="23" fill="#fed7aa" />
    <path d="M 36 56 C 36 30, 84 30, 84 56 C 84 72, 36 72, 36 56 Z" fill="none" stroke="#059669" strokeWidth="4.5" />
    <circle cx="51" cy="54" r="2.5" fill="#1f2937" />
    <circle cx="69" cy="54" r="2.5" fill="#1f2937" />
    <path d="M 54 65 Q 60 70, 66 65" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 44 51 H 76" stroke="#111827" strokeWidth="3" />
    <path d="M 45 51 C 45 59, 55 59, 55 51" fill="#111827" />
    <path d="M 65 51 C 65 59, 75 59, 75 51" fill="#111827" />
    <path d="M 38 52 C 38 28, 82 28, 82 52" fill="none" stroke="#4f46e5" strokeWidth="3.5" />
    <rect x="33" y="45" width="8" height="16" rx="3.5" fill="#4f46e5" className="animate-pulse" />
    <rect x="79" y="45" width="8" height="16" rx="3.5" fill="#4f46e5" className="animate-pulse" />
  </svg>
);

// 3. Standard Avatar
const StandardAvatar: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <circle cx="60" cy="60" r="55" fill="#ffedd5" />
    <path d="M 32 100 C 32 82, 88 82, 88 100 Z" fill="#f97316" />
    <circle cx="60" cy="55" r="23" fill="#fed7aa" />
    <circle cx="51" cy="54" r="2" fill="#1e293b" />
    <circle cx="69" cy="54" r="2" fill="#1e293b" />
    <path d="M 55 66 Q 60 69, 65 66" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="51" cy="54" r="7" fill="none" stroke="#b45309" strokeWidth="2" />
    <circle cx="69" cy="54" r="7" fill="none" stroke="#b45309" strokeWidth="2" />
    <line x1="58" y1="54" x2="62" y2="54" stroke="#b45309" strokeWidth="2" />
  </svg>
);

interface CheckAttendanceViewProps {
  currentStudent?: StudentProfile;
  allStudents?: StudentProfile[];
  students?: StudentProfile[];
  onOpenHistoryModal?: (student: StudentProfile) => void;
  onViewHistory?: (student: StudentProfile) => void;
  onSelectStudent?: (student: StudentProfile) => void;
  isSyncingSheets?: boolean;
  isSyncing?: boolean;
  lastSyncedTime?: string;
  onManualSync?: () => void;
  onOpenSyncLogs?: () => void;
}

export const CheckAttendanceView: React.FC<CheckAttendanceViewProps> = ({
  currentStudent,
  allStudents: propAllStudents,
  students,
  onOpenHistoryModal,
  onViewHistory,
  onSelectStudent,
  isSyncingSheets: propIsSyncingSheets = false,
  isSyncing,
  lastSyncedTime: propLastSyncedTime = 'Live',
  onManualSync,
  onOpenSyncLogs
}) => {
  const initialAllStudents = students || propAllStudents || [];
  const activeCurrentStudent = currentStudent || initialAllStudents[0];
  const handleOpenHistoryModal = onViewHistory || onOpenHistoryModal || (() => {});
  const actualIsSyncing = isSyncing ?? propIsSyncingSheets;

  const [allStudentsList, setAllStudentsList] = useState<StudentProfile[]>(initialAllStudents);
  const [activeStudent, setActiveStudent] = useState<StudentProfile>(activeCurrentStudent);
  const [internalHistoryStudent, setInternalHistoryStudent] = useState<StudentProfile | null>(null);

  const handleOpenLogDetails = (st: StudentProfile) => {
    if (handleOpenHistoryModal) handleOpenHistoryModal(st);
    setInternalHistoryStudent(st);
  };

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [regNumberInput, setRegNumberInput] = useState('');
  const [studentNameInput, setStudentNameInput] = useState('');
  const [selectedClubFilter, setSelectedClubFilter] = useState<string>('ALL');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'ELITE' | 'PRO' | 'AT_RISK'>('ALL');

  // UI state
  const [internalIsSyncing, setInternalIsSyncing] = useState(false);
  const [internalLastSynced, setInternalLastSynced] = useState<string>('Live Synced');
  const [showDetailCard, setShowDetailCard] = useState(true);

  const isSyncingSheets = propIsSyncingSheets || internalIsSyncing;
  const lastSyncedTime = propLastSyncedTime !== 'Live' ? propLastSyncedTime : internalLastSynced;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

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

  useEffect(() => {
    if (currentStudent) {
      setActiveStudent(currentStudent);
    }
  }, [currentStudent]);

  const availableClubs = useMemo(() => {
    const clubsSet = new Set<string>();
    allStudentsList.forEach((s) => {
      if (s.clubName) clubsSet.add(s.clubName);
      if (s.allClubs) s.allClubs.forEach((c) => clubsSet.add(c));
    });
    return Array.from(clubsSet).sort();
  }, [allStudentsList]);

  const filteredStudents = useMemo(() => {
    return allStudentsList.filter((s) => {
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

      if (selectedClubFilter !== 'ALL') {
        const matchesPrimary = s.clubName === selectedClubFilter;
        const matchesAll = s.allClubs ? s.allClubs.includes(selectedClubFilter) : false;
        if (!matchesPrimary && !matchesAll) return false;
      }

      if (tierFilter === 'ELITE' && s.currentAttendancePercent < 85) return false;
      if (tierFilter === 'PRO' && (s.currentAttendancePercent < 70 || s.currentAttendancePercent >= 85)) return false;
      if (tierFilter === 'AT_RISK' && s.currentAttendancePercent >= 75) return false;

      return true;
    });
  }, [allStudentsList, searchQuery, regNumberInput, studentNameInput, selectedClubFilter, tierFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, regNumberInput, studentNameInput, selectedClubFilter, tierFilter]);

  useEffect(() => {
    const combinedSearch = (searchQuery || regNumberInput || studentNameInput).trim().toLowerCase();
    if (!combinedSearch) return;

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

    if (filteredStudents.length === 1) {
      setActiveStudent(filteredStudents[0]);
      setShowDetailCard(true);
    }
  }, [searchQuery, regNumberInput, studentNameInput, filteredStudents, allStudentsList]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  const handleSelectStudent = (student: StudentProfile) => {
    setActiveStudent(student);
    setShowDetailCard(true);
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

  const handleExportCSV = () => {
    let csvContent = "\uFEFF"; // BOM for Excel UTF-8
    csvContent += "Registration Number,Student Name,Email,Degree Program,Semester / Year,Section,Primary Club,Completed Hours,Credits Earned,Attendance Rate %,Status Tier\r\n";
    
    allStudentsList.forEach((st) => {
      const row = [
        st.registrationNumber,
        st.name,
        st.email,
        st.degreeProgram || 'Undergraduate',
        st.semesterYear || 'N/A',
        st.sectionCode || 'N/A',
        st.clubName || 'Campus Club',
        st.completedHours || 0,
        st.creditsEarned || 0,
        st.currentAttendancePercent || 0,
        st.statusTier || 'Standard'
      ];
      const rowEscaped = row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",");
      csvContent += rowEscaped + "\r\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `casr_attendance_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderAttendanceAvatar = (tier: string) => {
    const cleanTier = (tier || '').toUpperCase();
    if (cleanTier === 'ELITE') return <EliteAvatar />;
    if (cleanTier === 'VETERAN' || cleanTier === 'PRO') return <ProAvatar />;
    return <StandardAvatar />;
  };

  return (
    <div className="pt-28 md:pt-32 px-4 md:px-12 max-w-7xl mx-auto pb-20 space-y-10 animate-in fade-in duration-500">
      {/* Hero Header & Search Box */}
      <section className="glass-card rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-white/30 dark:border-white/10 relative">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> All Students Attendance Portal
          </div>
          <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900 dark:text-white">
            Search Student Attendance
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Type any Registration Number or Student Name to view real-time attendance and progress towards 1-Year (30 hrs) and 4-Year (120 hrs) requirements.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 p-3 px-5 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSyncingSheets ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSyncingSheets ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              </span>
              <span>
                {isSyncingSheets ? 'Syncing changes from Excel / Google Sheet...' : `Live Synchronized with Excel / Google Sheet (Last sync: ${lastSyncedTime})`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncGoogleSheets}
                disabled={isSyncingSheets}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50 hover:scale-105 active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheets ? 'animate-spin' : ''}`} />
                {isSyncingSheets ? 'Syncing...' : 'Sync Now'}
              </button>
              {onOpenSyncLogs && (
                <button
                  onClick={onOpenSyncLogs}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Sync Settings / Logs
                </button>
              )}
              <a
                href={getCustomSheetUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm hover:scale-105"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Open Google Sheet <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" /> Export Excel/CSV
              </button>
            </div>
          </div>
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
                  setSearchQuery('');
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
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-200/60 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              Pro (70-84%)
            </button>
            <button
              onClick={() => setTierFilter('AT_RISK')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                tierFilter === 'AT_RISK'
                  ? 'bg-rose-600 text-white shadow'
                  : 'bg-gray-200/60 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              Needs Focus (&lt;75%)
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <select
              value={selectedClubFilter}
              onChange={(e) => setSelectedClubFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold focus:outline-none"
            >
              <option value="ALL">All Clubs ({availableClubs.length})</option>
              {availableClubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>

            {(regNumberInput || studentNameInput || selectedClubFilter !== 'ALL' || tierFilter !== 'ALL') && (
              <button
                onClick={handleClearSearch}
                className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 font-bold transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ACTIVE SELECTED STUDENT CARD */}
      {activeStudent && showDetailCard && (
        <section className="glass-card rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-white/30 dark:border-white/10 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-200/50 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl p-1 bg-white/20 dark:bg-white/5 border border-white/30 shadow-inner shrink-0">
                {renderAttendanceAvatar(activeStudent.statusTier)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {activeStudent.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold border border-blue-500/20">
                    {activeStudent.registrationNumber}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {activeStudent.degreeProgram || 'Undergraduate'} • {activeStudent.semesterYear || 'Current Academic Year'} • {activeStudent.email}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleOpenLogDetails(activeStudent)}
                className="px-5 py-2.5 rounded-xl liquid-gradient text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-4 h-4" /> Log Details
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-between space-y-1">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Attendance Rate</span>
              <p className="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-blue-300">
                {activeStudent.currentAttendancePercent}%
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-purple-500/10 border border-emerald-500/20 space-y-1.5 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                Credit Targets (1 & 4 Years)
              </span>
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div className="border-r border-emerald-500/20 pr-2 space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase">
                    1 Year Target
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-xl md:text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                      30 Credits
                    </p>
                    <span className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400/80">
                      (30 hrs)
                    </span>
                  </div>
                </div>
                <div className="pl-1 space-y-0.5">
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 block uppercase">
                    4 Years Target
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-xl md:text-2xl font-extrabold text-purple-700 dark:text-purple-300">
                      120 Credits
                    </p>
                    <span className="text-xs font-semibold text-purple-600/80 dark:text-purple-400/80">
                      (120 hrs)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Member Tier</span>
              <p className="text-2xl md:text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">
                {activeStudent.statusTier}
              </p>
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
                <th className="p-4 text-center">Credit Targets (1Yr / 4Yr)</th>
                <th className="p-4 text-center">Attendance %</th>
                <th className="p-4 text-center">Status Tier</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/40 dark:divide-white/5 font-medium">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-500 dark:text-gray-400">
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
                      <td className="p-4 font-mono font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          {st.registrationNumber}
                        </span>
                      </td>

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

                      <td className="p-4 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                        <div>{st.degreeProgram || 'Undergraduate'}</div>
                        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                          {st.semesterYear || '3rd Year'}
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-[11px]">
                          {st.clubName || 'Campus Club'}
                        </span>
                      </td>

                      <td className="p-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-purple-500/20 text-xs font-bold">
                          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">30 Cr (30h)</span>
                          <span className="text-gray-400 dark:text-gray-500">•</span>
                          <span className="text-purple-600 dark:text-purple-400 font-extrabold">120 Cr (120h)</span>
                        </div>
                      </td>

                      <td className="p-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                            st.currentAttendancePercent >= 85
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : st.currentAttendancePercent >= 70
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {st.currentAttendancePercent}%
                        </span>
                      </td>

                      <td className="p-4 text-center whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-bold">
                          {st.statusTier}
                        </span>
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenHistoryModal(st);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white dark:text-blue-400 text-xs font-bold transition-all flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Log
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Attendance History Modal Popup */}
      {internalHistoryStudent && (
        <HistoryModal
          student={internalHistoryStudent}
          onClose={() => setInternalHistoryStudent(null)}
        />
      )}
    </div>
  );
};
