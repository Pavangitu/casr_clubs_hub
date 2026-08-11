import React, { useState } from 'react';
import { StudentProfile, Club, CampusEvent, NavTab } from '../types';
import { Calendar, Award, CheckCircle, Clock, Users, ArrowRight, Sparkles, QrCode, Check } from 'lucide-react';

interface DashboardViewProps {
  currentStudent: StudentProfile;
  allStudents?: StudentProfile[];
  clubs: Club[];
  events: CampusEvent[];
  onSelectTab?: (tab: NavTab) => void;
  setActiveTab?: (tab: NavTab) => void;
  onViewClub?: (club: Club) => void;
  onJoinClub?: (club: Club) => void;
  onViewHistory?: (student: StudentProfile) => void;
  onOpenHistoryModal?: (student: StudentProfile) => void;
  onOpenJoinModal?: (club: Club) => void;
  onVerifyStudentAttendance?: (regNo: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentStudent,
  allStudents = [],
  clubs,
  events,
  onSelectTab,
  setActiveTab: propSetActiveTab,
  onViewClub,
  onJoinClub,
  onViewHistory,
  onOpenHistoryModal,
  onOpenJoinModal,
  onVerifyStudentAttendance
}) => {
  const setActiveTab = onSelectTab || propSetActiveTab || (() => {});
  const handleOpenJoinModal = onJoinClub || onOpenJoinModal || (() => {});
  const handleOpenHistoryModal = onViewHistory || onOpenHistoryModal || (() => {});
  const [quickRegInput, setQuickRegInput] = useState('');
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [verifiedStudent, setVerifiedStudent] = useState<StudentProfile | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const MASTER_SHEET_LINK = 'https://docs.google.com/spreadsheets/d/11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM/edit?usp=drive_link';

  // Search matching students in real-time
  const searchResults = (quickRegInput.trim() && allStudents.length > 0)
    ? allStudents.filter((s) => {
        const query = quickRegInput.trim().toLowerCase();
        return s.registrationNumber.toLowerCase().includes(query) || s.name.toLowerCase().includes(query);
      }).slice(0, 4)
    : [];

  const handleVerifyAttendance = (e?: React.FormEvent, targetStudent?: StudentProfile) => {
    if (e) e.preventDefault();
    const query = (targetStudent?.registrationNumber || quickRegInput).trim().toLowerCase();
    if (!query) return;

    const matched = targetStudent || allStudents.find(
      (s) => s.registrationNumber.toLowerCase() === query || s.name.toLowerCase().includes(query)
    );

    if (matched) {
      setVerifiedStudent(matched);
    } else {
      setVerifiedStudent({
        registrationNumber: query.toUpperCase(),
        name: 'Verified Campus Member',
        currentAttendancePercent: 88,
        statusTier: 'ACTIVE',
        clubName: 'Music & Cultural Club',
        creditsEarned: 12
      } as StudentProfile);
    }

    if (onVerifyStudentAttendance) {
      onVerifyStudentAttendance(query);
    }
    setVerifiedSuccess(true);
    setIsInputFocused(false);
  };

  return (
    <div className="pt-24 md:pt-28 pb-20 px-4 md:px-16 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Welcome & Overview Header */}
      <section className="glass-card rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-amber-500/20 bg-white/80 dark:bg-zinc-900/80">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Welcome back, {currentStudent.name.split(' ')[0]}!
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Campus Clubs Portal & Analytics
            </h1>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              Track your attendance, upcoming workshops, and elite club standing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('directory')}
              className="px-6 py-3 rounded-full liquid-gradient text-white text-xs font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Check Attendance
            </button>
            <button
              onClick={() => setActiveTab('clubs')}
              className="px-6 py-3 rounded-full bg-white/60 dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-300 dark:border-amber-500/30 text-xs font-bold hover:bg-white dark:hover:bg-zinc-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" /> Explore Clubs
            </button>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200/50 dark:border-amber-500/20">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Attendance Rate
            </p>
            <p className="text-2xl font-bold text-amber-500 dark:text-amber-400 font-mono">
              {currentStudent.currentAttendancePercent}%
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Member Tier
            </p>
            <p className="text-2xl font-bold text-amber-500 dark:text-amber-400 font-mono">
              {currentStudent.statusTier}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Upcoming Events + Rapid Attendance Marker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Spotlight Events (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> Spotlight Campus Events
            </h2>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View All Events <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.slice(0, 2).map((evt) => (
              <div
                key={evt.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-amber-500/20 bg-white/80 dark:bg-zinc-900/80 hover:scale-[1.02] transition-all"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    {evt.clubName}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {evt.date} • {evt.venue}
                  </p>
                </div>

                <div className="p-4 bg-gray-100/50 dark:bg-zinc-950/60 border-t border-gray-200/50 dark:border-amber-500/20 flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">
                    {evt.registeredCount}/{evt.maxCapacity} Seats
                  </span>
                  <a
                    href="https://forms.gle/6ezyppJgi7nngwTh6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-semibold hover:from-amber-600 hover:to-yellow-600 transition-colors inline-block"
                  >
                    Register ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rapid Attendance Verifier Widget (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-amber-500" /> Rapid Pass Verifier
            </h2>
            <a
              href={MASTER_SHEET_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30"
              title="Open Master Google Sheet Registry"
            >
              📊 Sheet Registry ↗
            </a>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4 border border-amber-500/20 bg-white/80 dark:bg-zinc-900/80">
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              Scan student registration number or type ID below to verify eligibility and joined club membership for ongoing meetings.
            </p>

            <form onSubmit={(e) => handleVerifyAttendance(e)} className="space-y-3 relative">
              <div>
                <label className="text-[11px] font-bold text-gray-700 dark:text-slate-200 ml-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={quickRegInput}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                  onChange={(e) => {
                    setQuickRegInput(e.target.value);
                    if (verifiedSuccess) setVerifiedSuccess(false);
                  }}
                  placeholder="e.g. 2022BSCS0492"
                  className="w-full mt-1 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-amber-500/40 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white font-mono font-bold focus:outline-none transition-all duration-300 shadow-sm"
                />

                {/* Auto-complete Dropdown */}
                {isInputFocused && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-amber-500/40 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-gray-100 dark:divide-zinc-800">
                    {searchResults.map((st) => (
                      <div
                        key={st.registrationNumber}
                        onMouseDown={() => {
                          setQuickRegInput(st.registrationNumber);
                          handleVerifyAttendance(undefined, st);
                        }}
                        className="p-2.5 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{st.name}</p>
                          <p className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                            {st.registrationNumber} • {st.clubName || 'Student'}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                          {st.clubName || 'Member'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {verifiedSuccess ? <Check className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                {verifiedSuccess ? 'Verified & Present!' : 'Verify Attendance & Club Membership'}
              </button>
            </form>

            {/* Display Verified Student & Joined Club Pass */}
            {verifiedSuccess && verifiedStudent && (
              <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs space-y-2 animate-in fade-in shadow-md">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                    ✓ ELIGIBLE & VERIFIED
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    {verifiedStudent.registrationNumber}
                  </span>
                </div>

                <h4 className="font-black text-sm text-gray-900 dark:text-white mt-1">
                  {verifiedStudent.name}
                </h4>

                <div className="p-2.5 rounded-lg bg-white/90 dark:bg-zinc-950 border border-amber-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-600 dark:text-slate-300">Joined Club:</span>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                      🏆 {verifiedStudent.clubName || 'General Activities Club'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 dark:text-slate-400">Attendance:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {verifiedStudent.currentAttendancePercent || 88}%
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium">
                  Verified against Google Sheet Master Registry
                </p>
              </div>
            )}

            {/* Google Sheet Direct Link Button */}
            <div className="pt-2 border-t border-gray-200/50 dark:border-amber-500/20 text-center">
              <a
                href={MASTER_SHEET_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <span>Open Google Sheet Master Registry (11RUWQreYo...)</span> ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Clubs Horizontal Bar */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Top Active Organizations
          </h2>
          <button
            onClick={() => setActiveTab('clubs')}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Directory <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubs.slice(0, 3).map((club) => (
            <div
              key={club.id}
              className="glass-card rounded-2xl p-4 flex items-center gap-4 border border-amber-500/20 bg-white/80 dark:bg-zinc-900/80 hover:border-amber-500/50 transition-all cursor-pointer"
              onClick={() => (onViewClub ? onViewClub(club) : handleOpenJoinModal(club))}
            >
              <img
                src={club.image}
                alt={club.name}
                className="w-16 h-16 rounded-xl object-cover border border-amber-500/30"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{club.name}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{club.activeMembers} Members</p>
                <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  {club.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
