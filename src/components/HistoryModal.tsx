import React, { useState } from 'react';
import { StudentProfile, AttendanceRecord } from '../types';
import { X, Award, CheckCircle2, Clock, Filter, Calendar } from 'lucide-react';

interface HistoryModalProps {
  student: StudentProfile;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ student, onClose }) => {
  const [filter, setFilter] = useState<'ALL' | 'PRESENT' | 'ABSENT'>('ALL');

  const filteredHistory = student.recentHistory.filter((item) => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  const totalHours = filteredHistory.reduce((acc, curr) => acc + curr.durationHours, 0);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col relative text-gray-900 dark:text-white border border-white/20 dark:border-white/10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" /> Complete Attendance History
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Student: <span className="font-bold text-blue-600 dark:text-emerald-400">{student.name}</span> ({student.registrationNumber})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar & Quick Metrics */}
        <div className="p-4 bg-gray-100/60 dark:bg-gray-800/50 flex flex-wrap justify-between items-center gap-3 px-6 text-xs">
          <div className="flex gap-2">
            {(['ALL', 'PRESENT', 'ABSENT'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full font-bold transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/60 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>Total Filtered Hours: <strong>{totalHours.toFixed(1)} hrs</strong></span>
          </div>
        </div>

        {/* List Content */}
        <div className="p-6 overflow-y-auto divide-y divide-gray-200/50 dark:divide-white/10 space-y-3 flex-1">
          {filteredHistory.map((rec) => (
            <div
              key={rec.id}
              className="pt-3 first:pt-0 flex items-center justify-between hover:bg-gray-100/50 dark:hover:bg-white/5 p-3 rounded-2xl transition-colors gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{rec.eventName}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span>{rec.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-blue-600 dark:text-emerald-400">{rec.clubName}</span>
                    {(rec.inTime || rec.outTime) && (
                      <>
                        <span>•</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[11px] text-gray-700 dark:text-gray-300">
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
                  className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${
                    rec.status === 'PRESENT'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  {rec.durationFormatted || `${rec.durationHours} hrs`}
                </span>
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-xs">
              No attendance records matching filter criteria.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 dark:border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl liquid-gradient text-white text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
