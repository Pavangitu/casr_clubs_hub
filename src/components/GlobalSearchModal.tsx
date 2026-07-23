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
  setActiveTab: (tab: NavTab) => void;
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-xl w-full p-6 relative text-gray-900 dark:text-white border border-white/20 shadow-2xl space-y-4">
        {/* Input Bar */}
        <div className="relative w-full flex items-center border-b border-gray-200 dark:border-gray-700 pb-3">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, clubs, workshops, or reg numbers..."
            className="w-full bg-transparent border-none text-sm md:text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
          {/* Students match */}
          {filteredStudents.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Students
              </p>
              {filteredStudents.map((s) => (
                <div
                  key={s.registrationNumber}
                  onClick={() => {
                    onSelectStudent(s);
                    setActiveTab('directory');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-gray-100/70 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-gray-700/60 transition-colors cursor-pointer flex justify-between items-center text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-[10px] text-gray-500">{s.registrationNumber} • {s.clubName}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {/* Clubs match */}
          {filteredClubs.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Organizations
              </p>
              {filteredClubs.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectClub(c);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-gray-100/70 dark:bg-gray-800/60 hover:bg-emerald-50 dark:hover:bg-gray-700/60 transition-colors cursor-pointer flex justify-between items-center text-xs"
                >
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{c.name}</p>
                    <p className="text-[10px] text-gray-500">{c.category} • {c.activeMembers} Members</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {/* Events match */}
          {filteredEvents.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Events
              </p>
              {filteredEvents.map((e) => (
                <div
                  key={e.id}
                  onClick={() => {
                    setActiveTab('events');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-gray-100/70 dark:bg-gray-800/60 hover:bg-purple-50 dark:hover:bg-gray-700/60 transition-colors cursor-pointer flex justify-between items-center text-xs"
                >
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{e.title}</p>
                    <p className="text-[10px] text-gray-500">{e.date} • {e.clubName}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {query.trim() && !hasResults && (
            <div className="text-center py-8 text-xs text-gray-400">
              No matching records found for "{query}".
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-8 text-xs text-gray-400">
              Type a student name (e.g. Alex), reg number (2022BSCS0492), or club (Coding) to search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
