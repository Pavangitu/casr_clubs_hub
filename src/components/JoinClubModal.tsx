import React from 'react';
import { Club, StudentProfile } from '../types';
import { X, Send, Sparkles, User, Mail, ShieldCheck } from 'lucide-react';

interface JoinClubModalProps {
  club: Club;
  student?: StudentProfile;
  currentStudent?: StudentProfile;
  onClose: () => void;
  onSuccess?: (clubName: string) => void;
}

export const JoinClubModal: React.FC<JoinClubModalProps> = ({ club, student, currentStudent, onClose, onSuccess }) => {
  const activeStudent = currentStudent || student;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl p-6 md:p-8 max-w-lg w-full relative space-y-6 text-gray-900 dark:text-white border border-amber-500/30 bg-white dark:bg-zinc-950 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Club Registration
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Join {club.name}</h2>
          <p className="text-xs text-gray-600 dark:text-slate-300 font-medium">
            Official registration for campus clubs is managed via the Centurion University CaSR form.
          </p>
        </div>

        <div className="space-y-4">
          {/* Pre-filled Student Info */}
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-zinc-900 border border-amber-500/20 space-y-2 text-xs">
            <p className="font-extrabold text-gray-800 dark:text-slate-200">Applying Student Details:</p>
            {activeStudent ? (
              <>
                <div className="flex items-center gap-2 font-black text-amber-600 dark:text-amber-400">
                  <User className="w-4 h-4 text-amber-500" /> {activeStudent.name} ({activeStudent.registrationNumber})
                </div>
                <div className="text-gray-600 dark:text-slate-300 flex items-center gap-2 font-medium">
                  <Mail className="w-3.5 h-3.5 text-amber-500" /> {activeStudent.email}
                </div>
              </>
            ) : (
              <p className="text-gray-500 dark:text-slate-400">No student profile selected.</p>
            )}
          </div>

          {/* Google Form Link Button */}
          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:bg-zinc-900 flex flex-col items-center text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Official Google Registration Form</h4>
              <p className="text-[11px] text-gray-600 dark:text-slate-300 max-w-xs leading-relaxed font-medium">
                Please submit your registration request on the official Centurion CaSR Google Form to complete your enrollment.
              </p>
            </div>
            <a
              href="https://forms.gle/7fcvyVHk1GxcXxiN7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white text-xs font-black shadow-lg shadow-amber-500/20 hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Open Google Form
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-200 dark:bg-zinc-800 text-xs font-bold text-gray-700 dark:text-gray-300 border border-amber-500/20 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Cancel & Close
          </button>
        </div>
      </div>
    </div>
  );
};
