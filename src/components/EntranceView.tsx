import React, { useState } from 'react';
import { StudentProfile, ThemeMode } from '../types';
import { Search, UserCheck, Shield, Sparkles, Sun, Moon, ArrowRight, LogIn } from 'lucide-react';
import casrOwlLogo from '../../Logos - 2_20260227_150721_0000.png';
import centurionEmblemLogo from '../../images (1).jpeg';

interface EntranceViewProps {
  students: StudentProfile[];
  theme: ThemeMode;
  toggleTheme: () => void;
  onEnter: (student: StudentProfile) => void;
  onOpenLoginPortal?: () => void;
}

export const EntranceView: React.FC<EntranceViewProps> = ({
  students,
  theme,
  toggleTheme,
  onEnter,
  onOpenLoginPortal
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
          <span className="font-extrabold text-xs uppercase tracking-wider text-main-heading">
            CaSR Portal
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full glass-neo-icon text-slate-905 dark:text-white hover:scale-105 transition-all cursor-pointer animate-in fade-in"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </header>

      {/* Hero Body Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full my-8 space-y-8 text-center">
        {/* Dual Logo Container */}
        <div className="flex items-center justify-center gap-6 md:gap-10 animate-in fade-in duration-700">
          {/* Centurion University Emblem (Left) */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-slate-900/90 p-2 shadow-2xl border-2 border-slate-200 dark:border-white/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 overflow-hidden" style={{ animation: 'float 4s ease-in-out infinite' }}>
            <img
              src={logo2Src}
              onError={handleLogo2Error}
              alt="Centurion University Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-400 dark:via-gray-600 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-emerald-500" />
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-400 dark:via-gray-600 to-transparent" />
          </div>

          {/* CaSR Owl Logo (Right) */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-slate-900/90 p-2 shadow-2xl border-2 border-slate-200 dark:border-white/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 overflow-hidden" style={{ animation: 'float 4s ease-in-out infinite 0.6s' }}>
            <img
              src={logoSrc}
              onError={handleLogoError}
              alt="CaSR Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Branding & Tagline */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-main-heading">
            Centurion University
          </h1>
          <p className="text-blue-600 dark:text-emerald-400 text-sm md:text-base font-extrabold tracking-widest uppercase">
            Cultural and Social Responsibility (CaSR)
          </p>
        </div>

        {/* Standalone Action Button */}
        <div className="w-full max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-4 perspective-1000">
          <button
            onClick={onOpenLoginPortal}
            className="w-full py-4 rounded-2xl liquid-prism-button text-white text-xs font-black tracking-wider uppercase shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <LogIn className="w-4 h-4 text-emerald-300" />
            <span>Login Portal</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center max-w-7xl mx-auto py-2 text-xs text-muted-dark font-bold">
        © {new Date().getFullYear()} Centurion University of Technology and Management. All rights reserved.
      </footer>
    </div>
  );
};
