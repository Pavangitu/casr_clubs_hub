import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ShieldCheck, ArrowRight, Loader2, KeyRound, UserCheck, Lock, Sparkles, Eye, EyeOff, Search, Shuffle } from 'lucide-react';
import { UserRole, StudentProfile } from '../types';
import logoCenturion from '../assets/logo_centurion.jpeg';
import logoCasr from '../assets/logo_casr.png';

interface LoginPortalProps {
  allStudents?: StudentProfile[];
  onStudentLogin: (regNo: string) => Promise<void>;
  onAdminLogin: (adminId: string, pass: string) => Promise<void>;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({ allStudents = [], onStudentLogin, onAdminLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('student');

  // Interactive 3D Card Tilt State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setTilt({ rotateX, rotateY, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  // Student form state
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [isStudentLoading, setIsStudentLoading] = useState(false);
  const [studentError, setStudentError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Admin form state
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Live Auto-Complete Suggestions as student types
  const searchResults = (registrationNumber.trim() && allStudents.length > 0)
    ? allStudents.filter((s) => {
        const query = registrationNumber.trim().toLowerCase();
        const reg = s.registrationNumber.toLowerCase();
        const name = s.name.toLowerCase();
        return reg.includes(query) || name.includes(query);
      }).slice(0, 5)
    : [];

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    if (!registrationNumber.trim()) {
      setStudentError('Registration Number is required.');
      return;
    }

    setIsStudentLoading(true);
    try {
      await onStudentLogin(registrationNumber.trim());
    } catch (err: any) {
      setStudentError(err.message || 'Invalid Registration Number.');
    } finally {
      setIsStudentLoading(false);
    }
  };

  const selectSuggestedStudent = async (student: StudentProfile) => {
    setRegistrationNumber(student.registrationNumber);
    setIsInputFocused(false);
    setStudentError('');
    setIsStudentLoading(true);
    try {
      await onStudentLogin(student.registrationNumber);
    } catch (err: any) {
      setStudentError(err.message || 'Invalid Registration Number.');
    } finally {
      setIsStudentLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (!adminId.trim() || !adminPassword) {
      setAdminError('Please provide both Admin ID and Password.');
      return;
    }

    setIsAdminLoading(true);
    try {
      await onAdminLogin(adminId.trim(), adminPassword);
    } catch (err: any) {
      setAdminError(err.message || 'Invalid Admin ID or Password.');
    } finally {
      setIsAdminLoading(false);
    }
  };

  const fillQuickReg = (reg: string) => {
    setRegistrationNumber(reg);
    setStudentError('');
  };

  // Filter out dummy/short test reg numbers (like '1', '201', '2301', '123456789')
  const validStudentsPool = useMemo(() => {
    const filtered = allStudents.filter((s) => {
      const reg = (s.registrationNumber || '').trim();
      if (!reg || reg.length < 6 || /^12345/.test(reg) || /^\d{1,5}$/.test(reg)) {
        return false;
      }
      return true;
    });

    if (filtered.length > 0) return filtered;

    return [
      { registrationNumber: '230101120031', name: 'G Pavan Datta' },
      { registrationNumber: '230101120099', name: 'Meera V.' },
      { registrationNumber: '230101120102', name: 'Rohan Sharma' },
      { registrationNumber: '230101120115', name: 'Ananya Verma' }
    ] as StudentProfile[];
  }, [allStudents]);

  const [sampleStudents, setSampleStudents] = useState<StudentProfile[]>([]);

  const getRandomSamples = (pool: StudentProfile[], count: number = 4) => {
    if (pool.length <= count) return pool;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setSampleStudents(getRandomSamples(validStudentsPool, 4));
  }, [validStudentsPool]);

  const handleShuffleRandomSamples = () => {
    setSampleStudents(getRandomSamples(validStudentsPool, 4));
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950 text-slate-100 font-sans perspective-1000"
      style={{ perspective: 1200 }}
    >
      {/* Background Subtle Gradient Blobs & 3D Floating Liquid Prisms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating 3D Liquid Prism Crystals */}
      <div className="absolute top-16 left-12 w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 backdrop-blur-xl border border-amber-500/30 shadow-xl prism-float-3d pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 right-16 w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600/20 to-amber-300/20 backdrop-blur-xl border border-amber-500/30 shadow-2xl prism-float-3d pointer-events-none hidden md:block" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/3 right-12 w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400/20 to-amber-500/20 backdrop-blur-lg border border-amber-500/30 shadow-lg prism-float-3d pointer-events-none hidden lg:block" style={{ animationDelay: '-6s' }} />

      <div className="w-full max-w-md z-10">
        {/* Header Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            {/* Centurion University Seal Logo */}
            <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-white shadow-2xl shadow-amber-500/20 w-24 h-24 overflow-hidden border-2 border-amber-500/30 glass-card hover:scale-105 transition-transform duration-300">
              <img 
                src={logoCenturion} 
                onError={(e) => { (e.target as HTMLImageElement).src = '/logo_centurion.jpeg'; }}
                alt="Centurion University Logo" 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>
            {/* CaSR Owl Logo */}
            <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-white shadow-2xl shadow-amber-500/20 w-24 h-24 overflow-hidden border-2 border-amber-500/30 glass-card hover:scale-105 transition-transform duration-300">
              <img 
                src={logoCasr} 
                onError={(e) => { (e.target as HTMLImageElement).src = '/logo_casr.png'; }}
                alt="CaSR Logo" 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
            CaSR Portal
          </h1>
          <p className="text-sm font-semibold text-amber-400/80 mt-1">Attendance Management System</p>
        </motion.div>

        {/* 3D Liquid Prism Neumorphic Glassmorphism Card */}
        <motion.div
          animate={{ 
            rotateX: tilt.rotateX, 
            rotateY: tilt.rotateY,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ 
            transformStyle: 'preserve-3d', 
            perspective: 1200,
          }}
          className="prism-glass backdrop-blur-3xl bg-zinc-950/85 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 relative"
        >
          {/* Dynamic Specular Prism Light Glare Follower */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(245, 158, 11, 0.3) 0%, rgba(251, 191, 36, 0.15) 35%, transparent 70%)`
            }}
          />
          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-1.5 rounded-2xl mb-8 border-2 border-amber-500/30 shadow-md">
            <button
              onClick={() => { setActiveTab('student'); setStudentError(''); }}
              className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-100 dark:text-white hover:text-amber-400 hover:bg-zinc-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Student Login
            </button>
            <button
              onClick={() => { setActiveTab('admin'); setAdminError(''); }}
              className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-100 dark:text-white hover:text-amber-400 hover:bg-zinc-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Faculty / Admin
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'student' ? (
              /* STUDENT LOGIN PORTAL */
              <motion.form
                key="student-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleStudentSubmit}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-100 dark:text-white">
                      Registration Number
                    </label>
                    <span className="text-[11px] text-amber-400 font-extrabold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Passwordless Search
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={registrationNumber}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                      onChange={(e) => {
                        setRegistrationNumber(e.target.value);
                        if (studentError) setStudentError('');
                      }}
                      placeholder="e.g. 23CSE12345 or 230101120031"
                      disabled={isStudentLoading}
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundColor: '#09090b', caretColor: '#f59e0b', opacity: 1 }}
                      className="login-input w-full pl-11 pr-4 py-3.5 border-2 border-amber-500/60 rounded-2xl text-white !text-white text-base font-black placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/40 focus:border-amber-400 transition-all uppercase tracking-wider shadow-inner"
                    />

                    {/* LIVE SEARCH AUTO-COMPLETE DROPDOWN */}
                    {isInputFocused && searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-amber-500/60 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-zinc-800">
                        <div className="px-3 py-1.5 bg-zinc-950 text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Search className="w-3 h-3 text-amber-400" /> Matching Students ({searchResults.length})
                        </div>
                        {searchResults.map((st) => (
                          <div
                            key={st.registrationNumber}
                            onMouseDown={() => selectSuggestedStudent(st)}
                            className="p-3 hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center justify-between group"
                          >
                            <div>
                              <p className="text-xs font-black text-white group-hover:text-amber-300">
                                {st.name}
                              </p>
                              <p className="text-[11px] font-mono text-amber-400 font-black">
                                {st.registrationNumber} • {st.clubName || 'Student'}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {studentError && (
                    <p className="mt-2 text-xs font-black text-rose-400 flex items-center gap-1">
                      ⚠️ {studentError}
                    </p>
                  )}
                </div>

                {/* Quick Registration Samples from Live Google Sheets */}
                <div className="p-4 bg-zinc-900 rounded-2xl border-2 border-amber-500/30 shadow-md">
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[11px] font-extrabold text-slate-200 dark:text-slate-100">Sample Registration Numbers:</p>
                    <button
                      type="button"
                      onClick={handleShuffleRandomSamples}
                      className="text-[11px] font-black text-amber-300 hover:text-white flex items-center gap-1 transition-colors bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-1 rounded-lg border border-amber-500/40 cursor-pointer shadow-sm"
                      title="Get 4 new random student registration numbers"
                    >
                      <Shuffle className="w-3 h-3 text-amber-400" /> Random Eg
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sampleStudents.map((st, idx) => (
                      <button
                        key={st.registrationNumber + idx}
                        type="button"
                        onClick={() => fillQuickReg(st.registrationNumber)}
                        className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-amber-300 text-xs font-mono font-black rounded-xl transition-all border border-amber-500/40 text-left hover:border-amber-400 cursor-pointer shadow-sm"
                      >
                        {st.registrationNumber} ({st.name})
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isStudentLoading}
                  whileHover={{ scale: 1.03, rotateX: 8, rotateY: -8, translateZ: 25 }}
                  whileTap={{ scale: 0.97, rotateX: -6, rotateY: 6, translateZ: -12 }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  className="w-full py-4 px-5 liquid-prism-button font-black text-sm tracking-wide rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-2xl"
                >
                  {isStudentLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360, rotateY: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5 animate-spin text-amber-200" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent font-black">Authenticating Student...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-black">Login to Student Portal</span>
                      <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-slate-300 dark:text-slate-300 font-extrabold">
                  Protected by University Secure Session Authentication
                </p>
              </motion.form>
            ) : (
              /* FACULTY / ADMIN LOGIN PORTAL */
              <motion.form
                key="admin-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleAdminSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-100 dark:text-white mb-2">
                    Admin ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={adminId}
                      onChange={(e) => {
                        setAdminId(e.target.value);
                        if (adminError) setAdminError('');
                      }}
                      placeholder="Enter Admin ID"
                      disabled={isAdminLoading}
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundColor: '#09090b', caretColor: '#f59e0b', opacity: 1 }}
                      className="login-input w-full pl-11 pr-4 py-3.5 border-2 border-amber-500/60 rounded-2xl text-white !text-white text-base font-black placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/40 focus:border-amber-400 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-100 dark:text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        if (adminError) setAdminError('');
                      }}
                      placeholder="••••••••"
                      disabled={isAdminLoading}
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundColor: '#09090b', caretColor: '#f59e0b', opacity: 1 }}
                      className="login-input w-full pl-11 pr-11 py-3.5 border-2 border-amber-500/60 rounded-2xl text-white !text-white text-base font-black placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/40 focus:border-amber-400 transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {adminError && (
                  <p className="text-xs font-black text-rose-400 flex items-center gap-1">
                    ⚠️ {adminError}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={isAdminLoading}
                  whileHover={{ scale: 1.03, rotateX: 8, rotateY: -8, translateZ: 25 }}
                  whileTap={{ scale: 0.97, rotateX: -6, rotateY: 6, translateZ: -12 }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  className="w-full py-4 px-5 liquid-prism-button font-black text-sm tracking-wide rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-2xl"
                >
                  {isAdminLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360, rotateY: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5 animate-spin text-amber-200" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent font-black">Authenticating Admin...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-black">Login to Faculty Portal</span>
                      <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
