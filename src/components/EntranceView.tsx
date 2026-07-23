import React, { useState } from 'react';
import { StudentProfile, ThemeMode } from '../types';
import { Search, UserCheck, Shield, Sparkles, Sun, Moon, ArrowRight } from 'lucide-react';
import casrOwlLogo from '../../Logos - 2_20260227_150721_0000.png';
import centurionEmblemLogo from '../../images (1).jpeg';

interface EntranceViewProps {
  students: StudentProfile[];
  theme: ThemeMode;
  toggleTheme: () => void;
  onEnter: (student: StudentProfile) => void;
}

export const EntranceView: React.FC<EntranceViewProps> = ({
  students,
  theme,
  toggleTheme,
  onEnter
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(casrOwlLogo);
  const [logo2Src, setLogo2Src] = useState<string>(centurionEmblemLogo);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const handleLogoError = () => {
    if (logoSrc !== '/logo_casr.png') {
      setLogoSrc('/logo_casr.png');
    }
  };

  const handleLogo2Error = () => {
    if (logo2Src !== '/logo_centurion.jpeg') {
      setLogo2Src('/logo_centurion.jpeg');
    }
  };

  const filteredStudents = searchQuery.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectStudent = (student: StudentProfile) => {
    setSelectedStudent(student);
    setSearchQuery('');
  };

  const handleEnterPortal = () => {
    // If no student selected, default to first student in directory
    onEnter(selectedStudent || students[0]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 relative z-10 overflow-hidden font-sans">
      {/* Top Controls Header */}
      <header className="w-full flex justify-between items-center max-w-7xl mx-auto py-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600 dark:text-emerald-400" />
          <span className="font-extrabold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
            CaSR Portal
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white/60 dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white shadow-sm hover:scale-105 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
      </header>

      {/* Hero Body Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full my-8 space-y-8 text-center">
        {/* Dual Logo Container */}
        <div className="flex items-center justify-center gap-6 md:gap-10 animate-in fade-in duration-700">
          {/* CaSR Owl Logo (Left) */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-slate-900/90 p-2 shadow-2xl border-2 border-white/80 dark:border-white/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 overflow-hidden" style={{ animation: 'float 4s ease-in-out infinite' }}>
            <img
              src={logoSrc}
              onError={handleLogoError}
              alt="CaSR Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-blue-500/50 dark:bg-emerald-500/50" />
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
          </div>

          {/* Centurion University Emblem (Right) */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-slate-900/90 p-2 shadow-2xl border-2 border-white/80 dark:border-white/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 overflow-hidden" style={{ animation: 'float 4s ease-in-out infinite 0.6s' }}>
            <img
              src={logo2Src}
              onError={handleLogo2Error}
              alt="Centurion University Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Branding & Tagline */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            Centurion University
          </h1>
          <p className="text-blue-600 dark:text-emerald-400 text-sm md:text-base font-bold tracking-widest uppercase">
            Cultural and Social Responsibility (CaSR)
          </p>
        </div>

        {/* Portal Entry Input Container */}
        <div className="w-full max-w-md glass-card p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Search your profile to verify credits or enter directly to browse clubs.
          </p>

          {/* Input field */}
          <div className="relative flex items-center bg-white/60 dark:bg-slate-900/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 transition-all shadow-sm focus-within:shadow-md focus-within:shadow-blue-500/10">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Reg. Number or Student Name..."
              className="w-full bg-transparent border-none text-xs md:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none font-medium"
            />
          </div>

          {/* Filtered Dropdown results */}
          {filteredStudents.length > 0 && (
            <div className="rounded-xl border border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md overflow-hidden text-left divide-y divide-gray-100 dark:divide-white/5 animate-in slide-in-from-top-2 duration-200">
              {filteredStudents.map((s) => (
                <div
                  key={s.registrationNumber}
                  onClick={() => handleSelectStudent(s)}
                  className="p-3 hover:bg-blue-50 dark:hover:bg-slate-800/60 cursor-pointer flex justify-between items-center transition-colors text-xs"
                >
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{s.name}</p>
                    <p className="text-[10px] text-gray-500">{s.registrationNumber} • {s.clubName}</p>
                  </div>
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
          )}

          {/* Selected student status chip */}
          {selectedStudent ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-between text-xs font-semibold animate-in zoom-in-95">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Selected: {selectedStudent.name}</span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-[10px] uppercase hover:underline"
              >
                Clear
              </button>
            </div>
          ) : null}

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={handleEnterPortal}
              className="w-full py-3.5 rounded-xl liquid-gradient text-white text-xs font-extrabold shadow-lg shadow-blue-500/20 hover:scale-102 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{selectedStudent ? 'Enter as SU Student' : 'Enter CaSR Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center max-w-7xl mx-auto py-2 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
        © {new Date().getFullYear()} Centurion University of Technology and Management. All rights reserved.
      </footer>
    </div>
  );
};
