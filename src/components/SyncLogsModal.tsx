import React, { useState } from 'react';
import { SyncLogEntry } from '../types';
import { MASTER_GOOGLE_SHEET_URL, SECONDARY_GOOGLE_SHEET_URL, THIRD_GOOGLE_SHEET_URL, getCustomSheetUrl, setCustomSheetUrl } from '../services/googleSheetsService';
import {
  X,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sliders,
  Trash2,
  Download
} from 'lucide-react';

interface SyncLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncLogs: SyncLogEntry[];
  isSyncing: boolean;
  onManualSync: () => void;
  autoSyncInterval: number; // in seconds, 0 = manual
  onSelectInterval: (interval: number) => void;
  onClearLogs: () => void;
}

export const SyncLogsModal: React.FC<SyncLogsModalProps> = ({
  isOpen,
  onClose,
  syncLogs,
  isSyncing,
  onManualSync,
  autoSyncInterval,
  onSelectInterval,
  onClearLogs
}) => {
  const [sheetUrlInput, setSheetUrlInput] = useState(getCustomSheetUrl());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'SUCCESS' | 'WARNING' | 'ERROR'>('ALL');

  if (!isOpen) return null;

  const latestLog = syncLogs[0];
  const totalRuns = syncLogs.length;
  const totalAdded = syncLogs.reduce((acc, l) => acc + l.recordsAdded, 0);
  const totalUpdated = syncLogs.reduce((acc, l) => acc + l.recordsUpdated, 0);
  const totalDeleted = syncLogs.reduce((acc, l) => acc + l.recordsDeleted, 0);
  const totalSkipped = syncLogs.reduce((acc, l) => acc + l.duplicatesSkipped, 0);
  const totalFailed = syncLogs.reduce((acc, l) => acc + l.failedRecords, 0);

  const avgExecutionMs = totalRuns > 0
    ? Math.round(syncLogs.reduce((acc, l) => acc + l.executionTimeMs, 0) / totalRuns)
    : 0;

  const filteredLogs = syncLogs.filter((l) => {
    if (filterStatus === 'ALL') return true;
    return l.status === filterStatus;
  });

  const exportLogsAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(syncLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `google_sheets_sync_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-card rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-slate-900/95 text-gray-900 dark:text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Google Sheets Synchronization Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  Master DB
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Single Source of Truth: Auto-syncing live changes from Google Sheets to website database.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={MASTER_GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
              title="Open Sheet 1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Sheet 1 <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={SECONDARY_GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm"
              title="Open Sheet 2"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Sheet 2 <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={THIRD_GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm"
              title="Open Sheet 3"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Sheet 3 <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-gray-200/60 dark:bg-slate-800/80 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Top Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Custom Google Sheet URL Configuration Card */}
            <div className="md:col-span-12 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Linked Google Spreadsheet URL
                  </span>
                </div>
                {saveSuccess && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved & Reconnected
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={sheetUrlInput}
                  onChange={(e) => {
                    setSheetUrlInput(e.target.value);
                    setSaveSuccess(false);
                  }}
                  placeholder="Paste Google Sheet URL here..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
                <button
                  onClick={() => {
                    const cleanUrl = sheetUrlInput.trim();
                    setCustomSheetUrl(cleanUrl || MASTER_GOOGLE_SHEET_URL);
                    setSaveSuccess(true);
                    onManualSync();
                    setTimeout(() => setSaveSuccess(false), 3000);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                >
                  Save & Sync Sheet
                </button>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Note: Ensure the spreadsheet is shared with <strong>"Anyone with the link can view"</strong> (viewer permissions) so the system can retrieve scan records.
              </p>
            </div>

            {/* Status & Sync Trigger (7 Cols) */}
            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Connection Status
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSyncing ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSyncing ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isSyncing ? 'Syncing...' : 'Connected (Master DB Active)'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Last Sync Execution</p>
                  <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {latestLog ? latestLog.timestamp : 'Just Now'}
                  </p>
                </div>

                <button
                  onClick={onManualSync}
                  disabled={isSyncing}
                  className="px-5 py-2.5 rounded-xl liquid-gradient text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing Records...' : 'Manual Sync Now'}
                </button>
              </div>
            </div>

            {/* Auto-Sync Frequency Selector (5 Cols) */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Auto-Sync Interval
                </span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select dynamic polling frequency for Google Sheet change detection:
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: '1s (Live)', value: 1 },
                  { label: '5s', value: 5 },
                  { label: '15s', value: 15 },
                  { label: '30s', value: 30 },
                  { label: '60s', value: 60 },
                  { label: 'Manual', value: 0 }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onSelectInterval(opt.value)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border ${
                      autoSyncInterval === opt.value
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sync Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Total Runs</span>
              <p className="text-xl font-black text-blue-700 dark:text-blue-300">{totalRuns}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Added</span>
              <p className="text-xl font-black text-emerald-700 dark:text-emerald-300">+{totalAdded}</p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Updated</span>
              <p className="text-xl font-black text-indigo-700 dark:text-indigo-300">{totalUpdated}</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">Deleted</span>
              <p className="text-xl font-black text-rose-700 dark:text-rose-300">{totalDeleted}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Deduped</span>
              <p className="text-xl font-black text-amber-700 dark:text-amber-300">{totalSkipped}</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">Avg Speed</span>
              <p className="text-xl font-black text-purple-700 dark:text-purple-300">{avgExecutionMs} ms</p>
            </div>
          </div>

          {/* Sync History Logs Table Header & Actions */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Synchronization Execution History ({filteredLogs.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Filter Pills */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  {(['ALL', 'SUCCESS', 'WARNING', 'ERROR'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        filterStatus === st
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  onClick={exportLogsAsJson}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="Export Logs as JSON"
                >
                  <Download className="w-3.5 h-3.5" /> Export
                </button>

                <button
                  onClick={onClearLogs}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-all border border-rose-500/20"
                  title="Clear Log History"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Time</th>
                      <th className="py-3 px-4">Trigger</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Added</th>
                      <th className="py-3 px-4 text-center">Updated</th>
                      <th className="py-3 px-4 text-center">Deleted</th>
                      <th className="py-3 px-4 text-center">Skipped</th>
                      <th className="py-3 px-4 text-right">Execution</th>
                      <th className="py-3 px-4">Details / Errors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs font-medium">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-gray-400">
                          No sync logs match the selected filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                            {log.timestamp}
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                              {log.triggerType}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            {log.status === 'SUCCESS' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" /> Success
                              </span>
                            )}
                            {log.status === 'WARNING' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-500/20">
                                <AlertTriangle className="w-3 h-3" /> Warning
                              </span>
                            )}
                            {log.status === 'ERROR' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold border border-rose-500/20">
                                <AlertTriangle className="w-3 h-3" /> Error
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-center font-bold text-emerald-600 dark:text-emerald-400">
                            +{log.recordsAdded}
                          </td>

                          <td className="py-3 px-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                            {log.recordsUpdated}
                          </td>

                          <td className="py-3 px-4 text-center font-bold text-rose-600 dark:text-rose-400">
                            {log.recordsDeleted}
                          </td>

                          <td className="py-3 px-4 text-center text-amber-600 dark:text-amber-400 font-bold">
                            {log.duplicatesSkipped}
                          </td>

                          <td className="py-3 px-4 text-right font-mono text-purple-600 dark:text-purple-400 font-bold">
                            {log.executionTimeMs} ms
                          </td>

                          <td className="py-3 px-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                            {log.errorMessage ? (
                              <span className="text-amber-600 dark:text-amber-400 font-semibold">{log.errorMessage}</span>
                            ) : (
                              <span className="text-gray-400 font-normal">Processed {log.totalRecordsProcessed} records cleanly</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 md:px-8 border-t border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Master Google Sheet ID: <code className="font-mono text-blue-600 dark:text-blue-400">19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc</code>
          </p>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
          >
            Close Synchronization Center
          </button>
        </div>
      </div>
    </div>
  );
};
