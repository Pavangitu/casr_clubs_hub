import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  Download, 
  Edit3, 
  Trash2, 
  LogOut, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  X, 
  Building2, 
  BookOpen, 
  UserPlus, 
  Loader2,
  User,
  Sparkles,
  Award,
  Info
} from 'lucide-react';
import { AcademicStudentProfile } from '../types';
import { AboutView } from './AboutView';
import { CreditTrackModal } from './CreditTrackModal';

interface AdminDashboardViewProps {
  students: AcademicStudentProfile[];
  onLogout: () => void;
  onAddStudent: (student: Partial<AcademicStudentProfile>) => Promise<void>;
  onEditStudent: (regNo: string, updated: Partial<AcademicStudentProfile>) => Promise<void>;
  onDeleteStudent: (regNo: string) => Promise<void>;
  onExportData: () => Promise<void>;
  onAwardCredits?: (regNo: string, amount: number, reason: string, awardedBy?: string, clubName?: string) => Promise<void> | void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  students,
  onLogout,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onExportData,
  onAwardCredits
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [lowAttendanceOnly, setLowAttendanceOnly] = useState(false);
  const [creditModalStudent, setCreditModalStudent] = useState<AcademicStudentProfile | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRegNo, setEditingRegNo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Delete confirm state
  const [deletingStudent, setDeletingStudent] = useState<AcademicStudentProfile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Export loading
  const [isExporting, setIsExporting] = useState(false);

  // Form Fields
  const [formRegNo, setFormRegNo] = useState('');
  const [formName, setFormName] = useState('');
  const [formRollNo, setFormRollNo] = useState('');
  const [formBranch, setFormBranch] = useState('Computer Science & Engineering');
  const [formDepartment, setFormDepartment] = useState('Dept. of Computer Science & Engineering');
  const [formSemester, setFormSemester] = useState<number | string>(5);
  const [formSection, setFormSection] = useState('Sec A');
  const [formAcademicYear, setFormAcademicYear] = useState('2024 - 2025');
  const [formOverallAttendance, setFormOverallAttendance] = useState(90);
  const [formTodayStatus, setFormTodayStatus] = useState<'Present' | 'Absent' | 'Excused'>('Present');
  const [formTotalClasses, setFormTotalClasses] = useState(250);
  const [formAttendedClasses, setFormAttendedClasses] = useState(225);

  const openAddModal = () => {
    setEditingRegNo(null);
    setFormRegNo('');
    setFormName('');
    setFormRollNo('');
    setFormBranch('Computer Science & Engineering');
    setFormDepartment('Dept. of Computer Science & Engineering');
    setFormSemester(5);
    setFormSection('Sec A');
    setFormAcademicYear('2024 - 2025');
    setFormOverallAttendance(90);
    setFormTodayStatus('Present');
    setFormTotalClasses(250);
    setFormAttendedClasses(225);
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (s: AcademicStudentProfile) => {
    setEditingRegNo(s.registrationNumber);
    setFormRegNo(s.registrationNumber);
    setFormName(s.name);
    setFormRollNo(s.rollNumber);
    setFormBranch(s.branch);
    setFormDepartment(s.department);
    setFormSemester(s.semester);
    setFormSection(s.section);
    setFormAcademicYear(s.academicYear);
    setFormOverallAttendance(s.overallAttendancePercentage);
    setFormTodayStatus((s.todayAttendanceStatus as 'Present' | 'Absent' | 'Excused') || 'Present');
    setFormTotalClasses(s.totalClasses);
    setFormAttendedClasses(s.classesAttended);
    setModalError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    if (!formRegNo.trim() || !formName.trim()) {
      setModalError('Registration Number and Student Name are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const missed = Math.max(0, Number(formTotalClasses) - Number(formAttendedClasses));
      const payload: Partial<AcademicStudentProfile> = {
        registrationNumber: formRegNo.trim(),
        name: formName.trim(),
        rollNumber: formRollNo.trim() || formRegNo.trim(),
        branch: formBranch,
        department: formDepartment,
        semester: Number(formSemester),
        section: formSection,
        academicYear: formAcademicYear,
        overallAttendancePercentage: Number(formOverallAttendance),
        todayAttendanceStatus: formTodayStatus,
        totalClasses: Number(formTotalClasses),
        classesAttended: Number(formAttendedClasses),
        classesMissed: missed
      };

      if (editingRegNo) {
        await onEditStudent(editingRegNo, payload);
      } else {
        await onAddStudent(payload);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      setModalError(err.message || 'Failed to save student record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);
    try {
      await onDeleteStudent(deletingStudent.registrationNumber);
      setDeletingStudent(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete student.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExportData();
    } catch (err: any) {
      alert(err.message || 'Failed to export data.');
    } finally {
      setIsExporting(false);
    }
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = departmentFilter === 'All' || s.department.includes(departmentFilter);
    const matchesLow = !lowAttendanceOnly || s.overallAttendancePercentage < 75;

    return matchesSearch && matchesDept && matchesLow;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const avgAttendance = totalStudents > 0
    ? Math.round(students.reduce((acc, curr) => acc + curr.overallAttendancePercentage, 0) / totalStudents)
    : 0;
  const lowAttendanceCount = students.filter((s) => s.overallAttendancePercentage < 75).length;
  const presentTodayCount = students.filter((s) => s.todayAttendanceStatus === 'Present').length;

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl bg-zinc-900/80 border border-amber-500/30 p-5 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl glass-neo-icon text-amber-500 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Faculty / Admin Management Portal
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Attendance Management Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAboutModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-500/25 border border-amber-300/40 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Info className="w-4 h-4 text-white shrink-0" />
              <span>About Activity Centre</span>
            </button>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> : <Download className="w-4 h-4 text-amber-400" />}
              <span>Export CSV</span>
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white text-sm font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Record</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-slate-300 text-sm font-semibold transition-all duration-200 border border-amber-500/20"
            >
              <LogOut className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900/80 border border-amber-500/20 backdrop-blur-xl p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Enrolled</span>
              <span className="w-7 h-7 rounded-lg glass-neo-icon text-amber-500 dark:text-amber-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-white">{totalStudents}</div>
            <p className="text-xs text-slate-400 mt-1">Students registered in system</p>
          </div>

          <div className="bg-zinc-900/80 border border-amber-500/20 backdrop-blur-xl p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Average Attendance</span>
              <span className="w-7 h-7 rounded-lg glass-neo-icon text-amber-500 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-white">{avgAttendance}%</div>
            <p className="text-xs text-slate-400 mt-1">Across all departments</p>
          </div>

          <div className="bg-zinc-900/80 border border-amber-500/20 backdrop-blur-xl p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Low Attendance (&lt;75%)</span>
              <span className="w-7 h-7 rounded-lg glass-neo-icon text-amber-500 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-amber-400">{lowAttendanceCount}</div>
            <p className="text-xs text-slate-400 mt-1">Students requiring intervention</p>
          </div>

          <div className="bg-zinc-900/80 border border-amber-500/20 backdrop-blur-xl p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Present Today</span>
              <span className="w-7 h-7 rounded-lg glass-neo-icon text-amber-500 dark:text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-amber-400">{presentTodayCount}</div>
            <p className="text-xs text-slate-400 mt-1">Out of {totalStudents} total students</p>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="backdrop-blur-xl bg-zinc-900/80 border border-amber-500/20 p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Reg No or Name..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/80 border border-amber-500/30 rounded-2xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-zinc-950/80 border border-amber-500/30 rounded-2xl px-3 py-2 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-transparent text-slate-200 font-medium focus:outline-none"
              >
                <option value="All" className="bg-zinc-900 text-slate-200">All Departments</option>
                <option value="Computer Science" className="bg-zinc-900 text-slate-200">CSE Department</option>
                <option value="ECE" className="bg-zinc-900 text-slate-200">ECE Department</option>
                <option value="Mechanical" className="bg-zinc-900 text-slate-200">Mechanical Dept</option>
                <option value="Information Tech" className="bg-zinc-900 text-slate-200">IT Department</option>
              </select>
            </div>

            <button
              onClick={() => setLowAttendanceOnly(!lowAttendanceOnly)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all border ${
                lowAttendanceOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-zinc-950/80 text-slate-400 border-amber-500/20 hover:text-slate-200'
              }`}
            >
              ⚠️ Low Attendance Only (&lt;75%)
            </button>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div className="backdrop-blur-xl bg-zinc-900/80 border border-amber-500/20 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-zinc-950/90 border-b border-amber-500/20 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="py-4 px-6">Student Information</th>
                  <th className="py-4 px-6">Registration No / Roll</th>
                  <th className="py-4 px-6">Branch & Semester</th>
                  <th className="py-4 px-6">Overall Attendance</th>
                  <th className="py-4 px-6">Credits Track</th>
                  <th className="py-4 px-6">Today's Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      No matching student attendance records found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.registrationNumber} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{s.name}</p>
                            <p className="text-xs text-slate-400">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs">
                        <span className="font-bold text-amber-300">{s.registrationNumber}</span>
                        <p className="text-slate-400">Roll: {s.rollNumber}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-xs font-semibold text-white">{s.branch}</p>
                        <p className="text-xs text-slate-400">Sem {s.semester} • {s.section}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`text-base font-bold font-mono ${
                            s.overallAttendancePercentage >= 75
                              ? 'text-amber-400'
                              : 'text-amber-500/70'
                          }`}>
                            {s.overallAttendancePercentage}%
                          </span>
                          {s.overallAttendancePercentage < 75 && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                              Low
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {s.classesAttended} / {s.totalClasses} classes
                        </p>
                      </td>
                      <td className="py-4 px-6 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-black text-amber-400">
                            {s.creditsEarned !== undefined ? s.creditsEarned : 0}
                          </span>
                          <span className="text-xs text-slate-400 font-bold">Credits</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {s.creditLogs?.length || 0} manual awards
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${
                          s.todayAttendanceStatus === 'Present'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-zinc-800 text-slate-400 border border-zinc-700'
                        }`}>
                          {s.todayAttendanceStatus === 'Present' ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <XCircle className="w-3.5 h-3.5" />}
                          {s.todayAttendanceStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setCreditModalStudent(s)}
                          className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors border border-amber-500/30"
                          title="Faculty Credit Track & Award Module"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 transition-colors border border-amber-500/20"
                          title="Edit Student Attendance"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingStudent(s)}
                          className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-900/40 text-rose-400 transition-colors border border-slate-700 hover:border-rose-500/30"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Credit Track Modal for Faculty */}
        {creditModalStudent && (
          <CreditTrackModal
            isOpen={!!creditModalStudent}
            onClose={() => setCreditModalStudent(null)}
            studentName={creditModalStudent.name}
            registrationNumber={creditModalStudent.registrationNumber}
            avatar={creditModalStudent.avatar}
            currentCredits={creditModalStudent.creditsEarned !== undefined ? creditModalStudent.creditsEarned : 0}
            creditLogs={creditModalStudent.creditLogs || []}
            isFaculty={true}
            onAwardCredits={onAwardCredits}
            defaultClubName={creditModalStudent.branch || 'Campus Club'}
          />
        )}
      </div>

      {/* Add / Edit Student Attendance Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 glass-neo-icon text-blue-600 dark:text-blue-400 rounded-2xl">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {editingRegNo ? 'Edit Student Attendance Record' : 'Add New Student Record'}
                    </h3>
                    <p className="text-xs text-slate-400">Faculty Management Portal</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Registration Number *
                    </label>
                    <input
                      type="text"
                      value={formRegNo}
                      onChange={(e) => setFormRegNo(e.target.value)}
                      disabled={!!editingRegNo}
                      placeholder="e.g. 23CSE12345"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Pavan Datta Gedila"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      value={formRollNo}
                      onChange={(e) => setFormRollNo(e.target.value)}
                      placeholder="e.g. 230101042"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Semester
                    </label>
                    <input
                      type="number"
                      value={formSemester}
                      onChange={(e) => setFormSemester(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={formBranch}
                      onChange={(e) => setFormBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formDepartment}
                      onChange={(e) => setFormDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Overall Attendance %
                    </label>
                    <input
                      type="number"
                      value={formOverallAttendance}
                      onChange={(e) => setFormOverallAttendance(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Today's Status
                    </label>
                    <select
                      value={formTodayStatus}
                      onChange={(e) => setFormTodayStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500 font-semibold"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Excused">Excused</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Total Classes Conducted
                    </label>
                    <input
                      type="number"
                      value={formTotalClasses}
                      onChange={(e) => setFormTotalClasses(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Classes Attended
                    </label>
                    <input
                      type="number"
                      value={formAttendedClasses}
                      onChange={(e) => setFormAttendedClasses(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {modalError && (
                  <p className="text-xs font-semibold text-rose-400 mt-2">⚠️ {modalError}</p>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all"
                  >
                    {isSubmitting ? 'Saving...' : editingRegNo ? 'Save Changes' : 'Create Student Record'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Confirm Delete Record</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Are you sure you want to delete attendance record for <strong className="text-blue-300">{deletingStudent.name}</strong> ({deletingStudent.registrationNumber})? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeletingStudent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Record'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Centre Modal Overlay */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl relative my-8"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800 mb-4 px-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Odra Udaya Student Activity Centre
                </span>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <AboutView />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
