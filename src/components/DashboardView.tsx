import React, { useState } from 'react';
import { StudentProfile, Club, CampusEvent, NavTab } from '../types';
import { Calendar, Award, CheckCircle, Clock, Users, ArrowRight, Sparkles, QrCode, Check } from 'lucide-react';

interface DashboardViewProps {
  currentStudent: StudentProfile;
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

  const handleVerifyAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickRegInput.trim()) return;
    if (onVerifyStudentAttendance) {
      onVerifyStudentAttendance(quickRegInput);
    }
    setVerifiedSuccess(true);
    setTimeout(() => {
      setVerifiedSuccess(false);
      setQuickRegInput('');
    }, 3000);
  };

  return (
    <div className="pt-24 md:pt-28 pb-20 px-4 md:px-16 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Welcome & Overview Header */}
      <section className="glass-card rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-white/30 dark:border-white/10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-emerald-500/10 text-blue-600 dark:text-emerald-400 text-xs font-semibold">
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
              className="px-6 py-3 rounded-full liquid-gradient text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Check Attendance
            </button>
            <button
              onClick={() => setActiveTab('clubs')}
              className="px-6 py-3 rounded-full bg-white/60 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 text-xs font-bold hover:bg-white transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" /> Explore Clubs
            </button>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200/50 dark:border-white/10">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Attendance Rate
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {currentStudent.currentAttendancePercent}%
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Member Tier
            </p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
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
              <Calendar className="w-5 h-5 text-blue-500" /> Spotlight Campus Events
            </h2>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-semibold text-blue-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              View All Events <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.slice(0, 2).map((evt) => (
              <div
                key={evt.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-white/30 dark:border-white/10 hover:scale-[1.02] transition-all"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-full">
                    +{evt.creditsAwarded} Credits
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {evt.clubName}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {evt.date} • {evt.venue}
                  </p>
                </div>

                <div className="p-4 bg-gray-100/50 dark:bg-white/5 border-t border-gray-200/50 dark:border-white/10 flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">
                    {evt.registeredCount}/{evt.maxCapacity} Seats
                  </span>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rapid Attendance Verifier Widget (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-500" /> Rapid Pass Verifier
          </h2>

          <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/30 dark:border-white/10">
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Scan student registration number or type ID below to verify eligibility for ongoing club meetings.
            </p>

            <form onSubmit={handleVerifyAttendance} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 ml-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={quickRegInput}
                  onChange={(e) => setQuickRegInput(e.target.value)}
                  placeholder="e.g. 2022BSCS0492"
                  className="w-full mt-1 bg-white/60 dark:bg-slate-900/40 border border-gray-200 dark:border-white/10 focus:border-emerald-500/80 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-emerald-500/10"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {verifiedSuccess ? <Check className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                {verifiedSuccess ? 'Verified & Present!' : 'Verify Attendance'}
              </button>
            </form>

            {verifiedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs text-center font-medium animate-in fade-in">
                Student status active. Attendance logged successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Clubs Horizontal Bar */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" /> Top Active Organizations
          </h2>
          <button
            onClick={() => setActiveTab('clubs')}
            className="text-xs font-semibold text-blue-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            Directory <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubs.slice(0, 3).map((club) => (
            <div
              key={club.id}
              className="glass-card rounded-2xl p-4 flex items-center gap-4 border border-white/20 dark:border-white/10 hover:border-blue-500/30 transition-all cursor-pointer"
              onClick={() => (onViewClub ? onViewClub(club) : handleOpenJoinModal(club))}
            >
              <img
                src={club.image}
                alt={club.name}
                className="w-16 h-16 rounded-xl object-cover border border-white/20"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{club.name}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{club.activeMembers} Members</p>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-emerald-400">
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
