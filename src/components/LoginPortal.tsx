import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ShieldCheck, ArrowRight, Loader2, KeyRound, UserCheck, Lock, Sparkles, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '../types';
import logoCenturion from '../assets/logo_centurion.jpeg';

interface LoginPortalProps {
  onStudentLogin: (regNo: string) => Promise<void>;
  onAdminLogin: (adminId: string, pass: string) => Promise<void>;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({ onStudentLogin, onAdminLogin }) => {
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

  // Admin form state
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

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

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950 text-slate-100 font-sans perspective-1000"
      style={{ perspective: 1200 }}
    >
      {/* Background Subtle Gradient Blobs & 3D Floating Liquid Prisms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating 3D Liquid Prism Crystals */}
      <div className="absolute top-16 left-12 w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-emerald-400/20 backdrop-blur-xl border border-white/20 shadow-xl prism-float-3d pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 right-16 w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-purple-400/20 backdrop-blur-xl border border-white/20 shadow-2xl prism-float-3d pointer-events-none hidden md:block" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/3 right-12 w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 backdrop-blur-lg border border-white/20 shadow-lg prism-float-3d pointer-events-none hidden lg:block" style={{ animationDelay: '-6s' }} />

      <div className="w-full max-w-md z-10">
        {/* Header Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-white/95 shadow-2xl shadow-blue-500/20 mb-4 w-24 h-24 overflow-hidden border-2 border-white/40 glass-card">
            <img 
              src={logoCenturion} 
              alt="Centurion University Logo" 
              className="w-full h-full object-contain rounded-full" 
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent">
            University Portal
          </h1>
          <p className="text-sm font-semibold text-slate-400 mt-1">Attendance Management System</p>
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
          className="prism-glass backdrop-blur-3xl bg-slate-900/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/90 relative"
        >
          {/* Dynamic Specular Prism Light Glare Follower */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(96, 165, 250, 0.35) 0%, rgba(236, 72, 153, 0.15) 35%, transparent 70%)`
            }}
          />
          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-1.5 rounded-2xl mb-8 border border-slate-800/50">
            <button
              onClick={() => { setActiveTab('student'); setStudentError(''); }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Student Login
            </button>
            <button
              onClick={() => { setActiveTab('admin'); setAdminError(''); }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Registration Number
                    </label>
                    <span className="text-[11px] text-blue-400 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Passwordless
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={registrationNumber}
                      onChange={(e) => {
                        setRegistrationNumber(e.target.value);
                        if (studentError) setStudentError('');
                      }}
                      placeholder="e.g. 23CSE12345"
                      disabled={isStudentLoading}
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundColor: '#0f172a', caretColor: '#60a5fa', opacity: 1 }}
                      className="login-input w-full pl-11 pr-4 py-3.5 border-2 border-blue-500/60 rounded-2xl text-white !text-white text-base font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all uppercase tracking-wider"
                    />
                  </div>
                  {studentError && (
                    <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1">
                      ⚠️ {studentError}
                    </p>
                  )}
                </div>

                {/* Quick Registration Samples for Demo */}
                <div className="p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/50">
                  <p className="text-[11px] font-medium text-slate-400 mb-2">Sample Registration Numbers:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fillQuickReg('23CSE12345')}
                      className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-blue-300 text-xs font-mono rounded-lg transition-colors border border-blue-500/20"
                    >
                      23CSE12345 (Pavan Datta Gedila)
                    </button>
                    <button
                      type="button"
                      onClick={() => fillQuickReg('230101120031')}
                      className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-emerald-300 text-xs font-mono rounded-lg transition-colors border border-emerald-500/20"
                    >
                      230101120031 (G Pavan Datta)
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isStudentLoading}
                  whileHover={{ scale: 1.03, rotateX: 8, rotateY: -8, translateZ: 25 }}
                  whileTap={{ scale: 0.97, rotateX: -6, rotateY: 6, translateZ: -12 }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  className="w-full py-4 px-5 liquid-prism-button font-bold text-sm tracking-wide rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-2xl"
                >
                  {isStudentLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360, rotateY: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5 animate-spin text-emerald-300" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Authenticating Student...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Student Portal</span>
                      <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-slate-500">
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Admin ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundColor: '#0f172a', caretColor: '#3b82f6', opacity: 1 }}
                      className="login-input w-full pl-11 pr-4 py-3.5 border-2 border-blue-500/60 rounded-2xl text-white !text-white text-base font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundColor: '#0f172a', caretColor: '#3b82f6', opacity: 1 }}
                      className="login-input w-full pl-11 pr-11 py-3.5 border-2 border-blue-500/60 rounded-2xl text-white !text-white text-base font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {adminError && (
                  <p className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                    ⚠️ {adminError}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={isAdminLoading}
                  whileHover={{ scale: 1.03, rotateX: 8, rotateY: -8, translateZ: 25 }}
                  whileTap={{ scale: 0.97, rotateX: -6, rotateY: 6, translateZ: -12 }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  className="w-full py-4 px-5 liquid-prism-button font-bold text-sm tracking-wide rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-2xl"
                >
                  {isAdminLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360, rotateY: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-300" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">Authenticating Admin...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Faculty Portal</span>
                      <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-1 transition-transform" />
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
