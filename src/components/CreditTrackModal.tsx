import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Sparkles, X, Lock, History, CheckCircle2 } from 'lucide-react';
import { CreditLogEntry } from '../types';

interface CreditTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  registrationNumber: string;
  avatar?: string;
  currentCredits: number;
  creditLogs?: CreditLogEntry[];
  isFaculty?: boolean;
  onAwardCredits?: (regNo: string, amount: number, reason: string, awardedBy?: string, clubName?: string, eventName?: string) => Promise<void> | void;
  defaultClubName?: string;
}

export const CreditTrackModal: React.FC<CreditTrackModalProps> = ({
  isOpen,
  onClose,
  studentName,
  registrationNumber,
  avatar,
  currentCredits,
  creditLogs = [],
  isFaculty = true,
  onAwardCredits,
  defaultClubName = 'CaSR Club'
}) => {
  const [creditAmount, setCreditAmount] = useState<number>(1);
  const [eventName, setEventName] = useState<string>('Annual Club Workshop');
  const [reason, setReason] = useState<string>('Active Club Participation & Contribution');
  const [awardedBy, setAwardedBy] = useState<string>('Faculty Lead');
  const [clubName, setClubName] = useState<string>(defaultClubName);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFaculty || !onAwardCredits) return;

    if (!reason.trim()) {
      setErrorMsg('Please specify a reason or activity note.');
      return;
    }
    if (creditAmount === 0) {
      setErrorMsg('Credit amount cannot be zero.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await onAwardCredits(registrationNumber, creditAmount, reason.trim(), awardedBy.trim(), clubName.trim(), eventName.trim());
      setSuccessMsg(`Successfully ${creditAmount > 0 ? `added +${creditAmount}` : creditAmount} credit(s) to ${studentName}!`);
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update credits.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-xl bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl overflow-hidden relative text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Credit Track Module
                  </span>
                  {!isFaculty && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Read-Only
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-extrabold text-white mt-0.5">
                  {isFaculty ? 'Faculty Credit Management Console' : 'My Earned Credit Track'}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Info Bar */}
          <div className="my-4 p-3.5 bg-zinc-900 rounded-2xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">{studentName}</p>
              <p className="text-xs font-mono text-amber-400">{registrationNumber}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Credits</span>
              <span className="text-2xl font-black font-mono text-amber-400">{currentCredits}</span>
            </div>
          </div>

          {/* Faculty Add Credit Form (ONLY for Faculty) */}
          {isFaculty && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 bg-zinc-900/60 rounded-2xl border border-amber-500/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Award Manual Member Credits
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Credit Amount</label>
                  <div className="flex gap-1.5 items-center">
                    {[1, 2, 5, 10].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCreditAmount(amt)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          creditAmount === amt
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-extrabold shadow'
                            : 'bg-zinc-900 text-slate-300 hover:bg-zinc-800 border border-amber-500/20'
                        }`}
                      >
                        +{amt}
                      </button>
                    ))}
                    <input
                      type="number"
                      value={creditAmount}
                      onChange={(e) => setCreditAmount(Number(e.target.value))}
                      className="w-16 px-2 py-1 bg-zinc-900 border border-amber-500/30 rounded-xl text-center text-xs font-mono font-bold text-white dark-input focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Awarding Faculty Lead</label>
                  <input
                    type="text"
                    value={awardedBy}
                    onChange={(e) => setAwardedBy(e.target.value)}
                    placeholder="Faculty Name"
                    className="w-full px-3 py-2 bg-zinc-900 border border-amber-500/30 rounded-xl text-xs font-medium text-white dark-input focus:outline-none focus:border-amber-400 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Event / Workshop Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. CodeStorm 2026 / Tech Workshop"
                    className="w-full px-3 py-2 bg-zinc-900 border border-amber-500/30 rounded-xl text-xs font-medium text-white dark-input focus:outline-none focus:border-amber-400 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Activity / Award Reason</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. 1st Place Winner / Active Contribution"
                    className="w-full px-3 py-2 bg-zinc-900 border border-amber-500/30 rounded-xl text-xs font-medium text-white dark-input focus:outline-none focus:border-amber-400 placeholder-slate-400"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs font-semibold text-rose-400">⚠️ {errorMsg}</p>
              )}
              {successMsg && (
                <p className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {successMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" /> Confirm & Add Credit to Member Profile
              </button>
            </form>
          )}

          {/* Credit Audit Log History */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-amber-400" /> Credit History Audit Log ({creditLogs.length})
            </h3>

            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {creditLogs.length === 0 ? (
                <div className="p-4 text-center bg-zinc-900/60 rounded-xl text-xs text-slate-500">
                  No manual credit adjustments logged yet for this member.
                </div>
              ) : (
                creditLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-zinc-900/60 rounded-xl border border-amber-500/20 flex items-center justify-between text-xs">
                    <div>
                      {log.eventName && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block mb-1">
                          📅 {log.eventName}
                        </span>
                      )}
                      <p className="font-bold text-slate-200">{log.reason}</p>
                      <p className="text-[11px] text-slate-400">
                        {log.awardedBy} {log.clubName ? `• ${log.clubName}` : ''} • {log.date}
                      </p>
                    </div>
                    <span className={`font-mono font-black text-sm px-2.5 py-1 rounded-lg shrink-0 ${
                      log.amount > 0
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-zinc-800 text-slate-400 border border-zinc-700'
                    }`}>
                      {log.amount > 0 ? `+${log.amount}` : log.amount}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-slate-300 rounded-xl text-xs font-semibold border border-amber-500/20 cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
