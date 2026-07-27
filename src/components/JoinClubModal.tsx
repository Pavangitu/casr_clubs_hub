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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl p-6 md:p-8 max-w-lg w-full relative space-y-6 text-gray-900 dark:text-white border border-white/20 dark:border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Club Registration
          </div>
          <h2 className="text-2xl font-bold">Join {club.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Official registration for campus clubs is managed via the Centurion University CaSR form.
          </p>
        </div>

        <div className="space-y-4">
          {/* Pre-filled Student Info */}
          <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60 space-y-2 text-xs">
            <p className="font-bold text-gray-700 dark:text-gray-200">Applying Student Details:</p>
            {activeStudent ? (
              <>
                <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-emerald-400">
                  <User className="w-4 h-4" /> {activeStudent.name} ({activeStudent.registrationNumber})
                </div>
                <div className="text-gray-500 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {activeStudent.email}
                </div>
              </>
            ) : (
              <p className="text-gray-500">No student profile selected.</p>
            )}
          </div>

          {/* Google Form Link Button */}
          <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 dark:bg-emerald-500/5 flex flex-col items-center text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-emerald-400" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm">Official Google Registration Form</h4>
              <p className="text-[11px] text-gray-500 max-w-xs leading-relaxed">
                Please submit your registration request on the official Centurion CaSR Google Form to complete your enrollment.
              </p>
            </div>
            <a
              href="https://forms.gle/7fcvyVHk1GxcXxiN7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl liquid-gradient text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-102 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Open Google Form
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel & Close
          </button>
        </div>
      </div>
    </div>
  );
};
