import React, { useState } from 'react';
import { Club, StudentProfile, AttendanceRecord } from '../types';
import {
  X,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Search,
  PlusCircle,
  Sparkles,
  BarChart3,
  UserCheck,
  Award,
  Filter,
  FileSpreadsheet,
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

import { matchStudentToClub } from '../utils/clubUtils';

interface ClubAttendanceModuleProps {
  club: Club;
  allStudents: StudentProfile[];
  onClose: () => void;
  onViewStudentHistory?: (student: StudentProfile) => void;
  onUpdateAttendance?: (clubId: string, sessionRecord: { date: string; sessionName: string; durationHours: number; studentStatuses: Record<string, 'PRESENT' | 'ABSENT' | 'EXCUSED'> }) => void;
}

export const ClubAttendanceModule: React.FC<ClubAttendanceModuleProps> = ({
  club,
  allStudents,
  onClose,
  onViewStudentHistory,
  onUpdateAttendance
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'mark' | 'sessions' | 'analytics'>('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'ELITE' | 'PRO' | 'AT_RISK'>('ALL');

  // Mark Attendance state
  const [sessionDate, setSessionDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [sessionTitle, setSessionTitle] = useState<string>(`${club.name} Weekly Session`);
  const [sessionDuration, setSessionDuration] = useState<number>(2);
  const [studentStatuses, setStudentStatuses] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'EXCUSED'>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter students affiliated with this club using matchStudentToClub
  const clubMembers = allStudents.filter((student) => matchStudentToClub(student, club.id, club.name));

  // Only show exact members registered for this club from the Google Sheet
  const displayedMembers = clubMembers;

  const filteredMembers = displayedMembers.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTier = true;
    if (tierFilter === 'ELITE') matchesTier = st.currentAttendancePercent >= 85;
    else if (tierFilter === 'PRO') matchesTier = st.currentAttendancePercent >= 75 && st.currentAttendancePercent < 85;
    else if (tierFilter === 'AT_RISK') matchesTier = st.currentAttendancePercent < 75;

    return matchesSearch && matchesTier;
  });

  // Calculate Club Attendance Statistics
  const avgAttendance = Math.round(
    displayedMembers.reduce((acc, m) => acc + m.currentAttendancePercent, 0) / (displayedMembers.length || 1)
  );
  const eliteCount = displayedMembers.filter((m) => m.currentAttendancePercent >= 85).length;
  const proCount = displayedMembers.filter((m) => m.currentAttendancePercent >= 75 && m.currentAttendancePercent < 85).length;
  const atRiskCount = displayedMembers.filter((m) => m.currentAttendancePercent < 75).length;

  // Extract sessions history for this club across students
  const clubSessionsMap = new Map<string, { date: string; title: string; presentCount: number; totalCount: number; duration: number }>();
  
  const normalizedClubName = (club.name || '').replace(/^[^\w\s]+\s*/, '').toLowerCase().trim();

  displayedMembers.forEach((m) => {
    (m.recentHistory || [])
      .filter((h) => (h?.clubName || '').toLowerCase().includes(normalizedClubName) || h?.clubName === club.name)
      .forEach((h) => {
        const key = `${h.date}-${h.eventName}`;
        if (!clubSessionsMap.has(key)) {
          clubSessionsMap.set(key, {
            date: h.date,
            title: h.eventName,
            presentCount: h.status === 'PRESENT' ? 1 : 0,
            totalCount: 1,
            duration: h.durationHours || 2
          });
        } else {
          const s = clubSessionsMap.get(key)!;
          s.totalCount += 1;
          if (h.status === 'PRESENT') s.presentCount += 1;
        }
      });
  });

  const clubSessions = Array.from(clubSessionsMap.values());

  const handleMarkAll = (status: 'PRESENT' | 'ABSENT' | 'EXCUSED') => {
    const updated: Record<string, 'PRESENT' | 'ABSENT' | 'EXCUSED'> = {};
    filteredMembers.forEach((m) => {
      updated[m.registrationNumber] = status;
    });
    setStudentStatuses((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleStatus = (regNo: string, status: 'PRESENT' | 'ABSENT' | 'EXCUSED') => {
    setStudentStatuses((prev) => ({
      ...prev,
      [regNo]: prev[regNo] === status ? 'PRESENT' : status
    }));
  };

  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateAttendance) {
      onUpdateAttendance(club.id, {
        date: sessionDate,
        sessionName: sessionTitle,
        durationHours: sessionDuration,
        studentStatuses
      });
    }
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveTab('roster');
    }, 1800);
  };

  const exportCSV = () => {
    const headers = ['Registration Number', 'Student Name', 'Degree / Branch', 'Attendance %', 'Status Tier', 'Club Role'];
    const rows = displayedMembers.map((m) => [
      m.registrationNumber,
      `"${m.name}"`,
      `"${m.degreeProgram || 'Engineering'}"`,
      `${m.currentAttendancePercent}%`,
      m.statusTier,
      `"${m.role}"`
    ]);
    
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${club.name.replace(/[^a-zA-Z0-9]/g, '_')}_Attendance_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col relative text-gray-900 dark:text-white border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
        
        {/* Module Header */}
        <div className="relative p-6 md:p-8 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900 text-white shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img
                src={club.image}
                alt={club.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider">
                    Official Attendance Module ({displayedMembers.length} Members)
                  </span>
                  {club.sheetGid && (
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono font-bold">
                      Sheet Tab: #{club.sheetGid}
                    </span>
                  )}
                  <span className="text-xs text-blue-200">{club.category}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black mt-1">{club.name}</h2>
                <p className="text-xs text-blue-200/80 mt-0.5">Faculty Lead: {club.facultyLead} | Student Lead: {club.studentLead}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {club.attendanceFormUrl && (
                <a
                  href={club.attendanceFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Give Attendance (Form)
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <p className="text-[10px] text-blue-200 uppercase font-bold">Club Roster</p>
                <p className="text-lg font-black">{displayedMembers.length} Members</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] text-blue-200 uppercase font-bold">Avg Attendance</p>
                <p className="text-lg font-black text-emerald-300">{avgAttendance}%</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] text-blue-200 uppercase font-bold">Sessions Logged</p>
                <p className="text-lg font-black">{clubSessions.length || 12} Sessions</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-blue-200 uppercase font-bold">Elite Tier</p>
                <p className="text-lg font-black text-amber-300">{eliteCount} Members</p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'roster'
                  ? 'bg-white text-blue-950 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Users className="w-4 h-4" /> Member Roster ({displayedMembers.length})
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-white text-blue-950 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics & Export
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-900">
          
          {/* TAB 1: MEMBER ROSTER */}
          {activeTab === 'roster' && (
            <div className="space-y-6">
              {/* Search & Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or reg number..."
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                  <span className="text-xs text-gray-500 font-bold uppercase shrink-0">Tier:</span>
                  {(['ALL', 'ELITE', 'PRO', 'AT_RISK'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTierFilter(t)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all ${
                        tierFilter === t
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                  
                  <button
                    onClick={exportCSV}
                    className="ml-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" /> CSV Report
                  </button>
                </div>
              </div>

              {/* Roster Table */}
              <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100/80 dark:bg-slate-900/60 text-gray-500 dark:text-gray-400 text-[11px] font-extrabold uppercase tracking-wider border-b border-gray-200 dark:border-white/10">
                        <th className="py-3.5 px-4">Student</th>
                        <th className="py-3.5 px-4">Reg Number</th>
                        <th className="py-3.5 px-4">Club Attendance %</th>
                        <th className="py-3.5 px-4">Hours</th>
                        <th className="py-3.5 px-4">Status Tier</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/5 text-xs">
                      {filteredMembers.map((st) => (
                        <tr key={st.registrationNumber} className="hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition-colors">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img
                              src={st.avatar}
                              alt={st.name}
                              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-white/20"
                            />
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white">{st.name}</p>
                              <p className="text-[10px] text-gray-500">{st.degreeProgram || 'CSE'}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-gray-600 dark:text-gray-300">
                            {st.registrationNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    st.currentAttendancePercent >= 85
                                      ? 'bg-emerald-500'
                                      : st.currentAttendancePercent >= 75
                                      ? 'bg-blue-500'
                                      : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${st.currentAttendancePercent}%` }}
                                />
                              </div>
                              <span className="font-bold">{st.currentAttendancePercent}%</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium">{st.completedHours || 32} hrs</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                st.currentAttendancePercent >= 85
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                  : st.currentAttendancePercent >= 75
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {st.statusTier}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => onViewStudentHistory && onViewStudentHistory(st)}
                              className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 rounded-lg text-[11px] font-bold transition-all"
                            >
                              Inspect Logs
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-white/10">
                  <Users className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">No registered members found for {club.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Only exact members registered in the Google Sheet are displayed.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ANALYTICS & EXPORT */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Elite Tier (&ge; 85%)</span>
                  <p className="text-3xl font-black">{eliteCount} Members</p>
                  <p className="text-xs text-gray-500">High engagement student members</p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Pro Tier (75% - 84%)</span>
                  <p className="text-3xl font-black">{proCount} Members</p>
                  <p className="text-xs text-gray-500">Regular club attendees</p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">At Risk Tier (&lt; 75%)</span>
                  <p className="text-3xl font-black">{atRiskCount} Members</p>
                  <p className="text-xs text-gray-500">Requires attendance warning</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 space-y-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-500" /> Export Official Club Attendance Register
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Generate a structured CSV report containing student registration numbers, names, attendance percentages, tiers, and hours for {club.name}.
                </p>

                <button
                  onClick={exportCSV}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" /> Download {club.name} Attendance CSV
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
