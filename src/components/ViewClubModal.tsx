import React from 'react';
import { Club, StudentProfile } from '../types';
import { X, School, UserCheck, Users, Calendar, MapPin, Sparkles, Tag, ArrowRight, BarChart3, ExternalLink, Award, History } from 'lucide-react';

interface ViewClubModalProps {
  club: Club;
  onClose: () => void;
  onJoin?: () => void;
  onJoinClub?: (club: Club) => void;
  onOpenAttendance?: (club: Club) => void;
  allStudents?: StudentProfile[];
}

export const ViewClubModal: React.FC<ViewClubModalProps> = ({ club, onClose, onJoin, onJoinClub, onOpenAttendance, allStudents = [] }) => {
  const handleJoin = () => {
    if (onJoinClub) {
      onJoinClub(club);
    } else if (onJoin) {
      onJoin();
    }
  };

  const clubCreditsList = React.useMemo(() => {
    let list: any[] = [];
    try {
      const savedClubCredits = JSON.parse(localStorage.getItem('casr_club_credits') || '{}');
      const directLogs = savedClubCredits[club.name] || savedClubCredits['General Club Activities'] || [];
      list = [...directLogs];
    } catch (e) {}

    if (allStudents && allStudents.length > 0) {
      allStudents.forEach((st) => {
        if (Array.isArray(st.creditLogs)) {
          st.creditLogs.forEach((log) => {
            if (!log.clubName || log.clubName === club.name || (st.clubName || '').toLowerCase().includes(club.name.toLowerCase())) {
              if (!list.some((existing) => existing.id === log.id)) {
                list.push({
                  ...log,
                  studentName: st.name,
                  registrationNumber: st.registrationNumber
                });
              }
            }
          });
        }
      });
    }
    return list;
  }, [club.name, allStudents]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-gray-900 dark:text-white border border-white/20 dark:border-white/10 shadow-2xl">
        {/* Header Image */}
        <div className="relative h-56 w-full bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-amber-600/30">
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                {club.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">{club.name}</h2>
            </div>
            <span className="text-xs text-amber-200 font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
              Est. {club.foundedYear}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Active Members & Leads */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-zinc-900 border border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 font-bold uppercase">Active Members</p>
                <p className="text-base font-extrabold text-amber-500 dark:text-amber-400 font-mono">{club.activeMembers}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-zinc-900 border border-amber-500/20 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center overflow-hidden shrink-0 border border-amber-500/30 shadow-sm">
                {club.facultyLead?.includes('Dr. Ritesh Kumar') ? (
                  <img src="/dr_ritesh_kumar.jpg" alt="Dr. Ritesh Kumar" className="w-full h-full object-cover object-center" />
                ) : (
                  <School className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 font-bold uppercase">Faculty Lead</p>
                <p className="text-xs font-bold line-clamp-1 text-gray-900 dark:text-white">{club.facultyLead}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-zinc-900 border border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 font-bold uppercase">Student Lead</p>
                <p className="text-xs font-bold line-clamp-1 text-gray-900 dark:text-white">{club.studentLead}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              About the Organization
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {club.fullDescription || club.description}
            </p>
          </div>

          {/* Meeting Schedule & Venue */}
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-zinc-900 border border-amber-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
              <Calendar className="w-4 h-4 text-amber-500" /> Meeting Schedule: {club.meetingSchedule}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-amber-500" /> Venue: {club.location}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-500" /> Domain Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {club.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-[11px] font-semibold"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Member Credits Entered / Faculty Credit History in Club Details */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Faculty Credit Awards & Club Log
              </h4>
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {clubCreditsList.length} Logged Entries
              </span>
            </div>

            {clubCreditsList.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                No credits manually entered for members of {club.name} yet. Faculty Leads will enter member credits in the faculty portal.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {clubCreditsList.map((log: any, idx: number) => (
                  <div key={log.id || idx} className="p-3 bg-white/80 dark:bg-zinc-900 rounded-xl border border-amber-500/20 shadow-sm flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <span>{log.studentName || log.registrationNumber}</span>
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">({log.registrationNumber})</span>
                      </p>
                      <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5">{log.reason}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Awarded by: {log.awardedBy} • {log.date}</p>
                    </div>
                    <div className="text-right font-mono shrink-0 font-extrabold text-amber-500 dark:text-amber-400 text-sm bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      +{log.amount} CR
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            {club.attendanceFormUrl && (
              <a
                href={club.attendanceFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <ExternalLink className="w-4 h-4" /> Give Attendance (Form)
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-amber-500/20 text-xs font-bold hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                handleJoin();
              }}
              className="flex-1 py-3 rounded-2xl liquid-gradient text-white text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Apply to Join <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
