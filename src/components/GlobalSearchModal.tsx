import React, { useState } from 'react';
import { StudentProfile, Club, CampusEvent, NavTab } from '../types';
import { Search, X, Users, Calendar, UserCheck, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  students: StudentProfile[];
  clubs: Club[];
  events: CampusEvent[];
  onClose: () => void;
  onSelectStudent: (student: StudentProfile) => void;
  onSelectClub: (club: Club) => void;
  setActiveTab?: (tab: NavTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  students,
  clubs,
  events,
  onClose,
  onSelectStudent,
  onSelectClub,
  setActiveTab
}) => {
  const [query, setQuery] = useState('');

  const filteredStudents = query.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.registrationNumber.toLowerCase().includes(query.toLowerCase()) ||
          s.clubName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredClubs = query.trim()
    ? clubs.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const filteredEvents = query.trim()
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.clubName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults =
    filteredStudents.length > 0 || filteredClubs.length > 0 || filteredEvents.length > 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-xl w-full p-6 relative text-gray-900 dark:text-white border border-amber-500/30 bg-white/95 dark:bg-zinc-950 shadow-2xl space-y-4">
        {/* Input Bar */}
        <div className="relative w-full flex items-center border-b border-gray-200 dark:border-amber-500/30 pb-3">
          <Search className="w-5 h-5 text-amber-500 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, clubs, workshops, or reg numbers..."
            className="w-full bg-transparent border-none text-sm md:text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none font-bold"
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
          {/* Students match */}
          {filteredStudents.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-500" /> Students
              </p>
              {filteredStudents.map((s) => (
                <div
                  key={s.registrationNumber}
                  onClick={() => {
                    onSelectStudent(s);
                    setActiveTab('directory');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-gray-100/70 dark:bg-zinc-900 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 transition-colors cursor-pointer flex justify-between items-center text-xs border border-gray-200 dark:border-amber-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400 font-mono">{s.registrationNumber} • {s.clubName}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </div>
              ))}
            </div>
          )}

          {/* Clubs match */}
          {filteredClubs.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-500" /> Organizations
              </p>
              {filteredClubs.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectClub(c);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-gray-100/70 dark:bg-zinc-900 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 transition-colors cursor-pointer flex justify-between items-center text-xs border border-gray-200 dark:border-amber-500/20"
                >
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{c.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400">{c.category} • {c.activeMembers} Members</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </div>
              ))}
            </div>
          )}

          {/* Events match */}
          {filteredEvents.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" /> Events
              </p>
              {filteredEvents.map((e) => (
                <div
                  key={e.id}
                  onClick={() => {
                    setActiveTab?.('events');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-gray-100/70 dark:bg-zinc-900 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 transition-colors cursor-pointer flex justify-between items-center text-xs border border-gray-200 dark:border-amber-500/20"
                >
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{e.title}</p>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400">{e.date} • {e.clubName}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </div>
              ))}
            </div>
          )}

          {query.trim() && !hasResults && (
            <div className="text-center py-8 text-xs text-slate-400">
              No matching records found for "{query}".
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-8 text-xs text-slate-400">
              Type a student name (e.g. Alex), reg number (2022BSCS0492), or club (Coding) to search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
