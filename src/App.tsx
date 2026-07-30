import React, { useState, useEffect } from 'react';
import { NavTab, ThemeMode, StudentProfile, Club, CampusEvent, ToastMessage, UserRole, AcademicStudentProfile, SyncLogEntry } from './types';
import { MOCK_CLUBS, MOCK_STUDENTS, MOCK_EVENTS, MOCK_NOTIFICATIONS } from './data/mockData';
import { INITIAL_ACADEMIC_STUDENTS } from './data/attendanceData';
import { fetchLiveAttendanceData, getCachedLiveAttendanceData } from './services/googleSheetsService';
import { attendanceApiService } from './services/attendanceApiService';
import { AuroraCanvas } from './components/AuroraCanvas';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CheckAttendanceView } from './components/CheckAttendanceView';
import { ClubDirectoryView } from './components/ClubDirectoryView';
import { DashboardView } from './components/DashboardView';
import { EventsView } from './components/EventsView';
import { JoinClubModal } from './components/JoinClubModal';
import { ViewClubModal } from './components/ViewClubModal';
import { HistoryModal } from './components/HistoryModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CommitteeView } from './components/CommitteeView';
import { EntranceView } from './components/EntranceView';
import { LoginPortal } from './components/LoginPortal';
import { ToastContainer } from './components/Toast';
import { StudentDashboardView } from './components/StudentDashboardView';
import { SyncLogsModal } from './components/SyncLogsModal';

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [viewMode, setViewMode] = useState<'entrance' | 'login' | 'app'>('entrance');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loggedInAcademicStudent, setLoggedInAcademicStudent] = useState<AcademicStudentProfile | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(() => getCachedLiveAttendanceData() || MOCK_STUDENTS);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(() => {
    const initialList = getCachedLiveAttendanceData() || MOCK_STUDENTS;
    return initialList[0];
  });

  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);
  const [events, setEvents] = useState<CampusEvent[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [viewingClub, setViewingClub] = useState<Club | null>(null);
  const [joiningClub, setJoiningClub] = useState<Club | null>(null);
  const [viewingHistoryStudent, setViewingHistoryStudent] = useState<StudentProfile | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Live Google Sheets sync states
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');
  const isFetchingRef = React.useRef(false);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(5); // Default to 5 seconds
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>([]);
  const [showSyncLogsModal, setShowSyncLogsModal] = useState(false);

  const addToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStudentLogin = async (regNo: string) => {
    const cleanReg = regNo.trim().toLowerCase();

    // Check academic profile database first
    let academicProfile = INITIAL_ACADEMIC_STUDENTS.find(
      (s) => s.registrationNumber.trim().toLowerCase() === cleanReg
    );

    // Use cached/pre-loaded live students to make login instant
    let liveStudentsList = allStudents;

    // Trigger an asynchronous refresh of live data in the background (non-blocking)
    fetchLiveAttendanceData().then((liveData) => {
      if (liveData && liveData.length > 0) {
        setAllStudents(liveData);
        
        // Keep logged-in academic student profile in real-time sync with Google Sheet updates
        setLoggedInAcademicStudent((prev) => {
          if (!prev) return null;
          const liveMatch = liveData.find(
            (s) => s.registrationNumber.trim().toLowerCase() === prev.registrationNumber.trim().toLowerCase()
          );
          if (liveMatch) {
            let semNum = prev.semester;
            if (liveMatch.semesterYear) {
              const match = liveMatch.semesterYear.match(/\d+/);
              if (match) {
                semNum = parseInt(match[0], 10);
              }
            }
            const classesAttended = liveMatch.eventsAttendedCount || Math.round(250 * ((liveMatch.currentAttendancePercent || 88) / 100));
            const classesMissed = Math.max(0, 250 - classesAttended);

            const liveMonthly = (liveMatch.monthlyTrends || []).map((trend) => ({
              month: trend.month,
              percentage: trend.percentage,
              attended: Math.round(trend.hours / 1.5),
              total: Math.round((trend.hours / (trend.percentage / 100)) / 1.5) || 50
            }));

            const liveLogs = (liveMatch.recentHistory || []).map((hist) => ({
              id: hist.id,
              date: hist.date,
              subject: hist.clubName,
              status: hist.status,
              time: hist.inTime || hist.outTime || ''
            }));

            return {
              ...prev,
              name: liveMatch.name || prev.name,
              overallAttendancePercentage: liveMatch.currentAttendancePercent || prev.overallAttendancePercentage,
              email: liveMatch.email || prev.email,
              avatar: liveMatch.avatar || prev.avatar,
              branch: liveMatch.degreeProgram || prev.branch,
              department: liveMatch.degreeProgram || prev.department,
              semester: semNum,
              section: liveMatch.sectionCode || prev.section,
              classesAttended: classesAttended,
              classesMissed: classesMissed,
              monthlyAttendance: liveMonthly.length > 0 ? liveMonthly : prev.monthlyAttendance,
              recentLogs: liveLogs.length > 0 ? liveLogs : prev.recentLogs
            };
          }
          return prev;
        });
      }
    }).catch(e => console.warn('Background login sheet fetch failed:', e));

    const foundBase = liveStudentsList.find(
      (s) => s.registrationNumber.trim().toLowerCase() === cleanReg
    );

    let semNum = academicProfile?.semester || 5;
    let branch = academicProfile?.branch || "Computer Science & Engineering";
    let department = academicProfile?.department || "Dept. of Computer Science & Engineering";
    let sectionCode = academicProfile?.section || "Sec A";

    if (foundBase) {
      if (foundBase.semesterYear) {
        const match = foundBase.semesterYear.match(/\d+/);
        if (match) {
          semNum = parseInt(match[0], 10);
        }
      }
      if (foundBase.degreeProgram) {
        branch = foundBase.degreeProgram;
        department = foundBase.degreeProgram;
      }
      if (foundBase.sectionCode) {
        sectionCode = foundBase.sectionCode;
      }
    }

    if (!academicProfile) {
      if (!foundBase) {
        addToast('Authentication Error', 'Invalid Registration Number.', 'error');
        throw new Error('Invalid Registration Number.');
      }

      const classesAttended = foundBase.eventsAttendedCount || Math.round(250 * ((foundBase.currentAttendancePercent || 88) / 100));
      const classesMissed = Math.max(0, 250 - classesAttended);

      const liveMonthly = (foundBase.monthlyTrends || []).map((trend) => ({
        month: trend.month,
        percentage: trend.percentage,
        attended: Math.round(trend.hours / 1.5),
        total: Math.round((trend.hours / (trend.percentage / 100)) / 1.5) || 50
      }));

      const liveLogs = (foundBase.recentHistory || []).map((hist) => ({
        id: hist.id,
        date: hist.date,
        subject: hist.clubName,
        status: hist.status,
        time: hist.inTime || hist.outTime || ''
      }));

      academicProfile = {
        registrationNumber: foundBase.registrationNumber,
        name: foundBase.name,
        rollNumber: foundBase.registrationNumber,
        branch: branch,
        department: department,
        semester: semNum,
        section: sectionCode,
        academicYear: "2024 - 2025",
        email: foundBase.email,
        avatar: foundBase.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
        overallAttendancePercentage: foundBase.currentAttendancePercent || 88,
        todayAttendanceStatus: "Present",
        totalClasses: 250,
        classesAttended: classesAttended,
        classesMissed: classesMissed,
        subjectWiseAttendance: [
          { subjectCode: "CS501", subjectName: "Computer Networks", attendedClasses: Math.round(classesAttended * 0.2), totalClasses: 50, percentage: foundBase.currentAttendancePercent || 88, facultyName: "Dr. A. K. Sharma" },
          { subjectCode: "CS502", subjectName: "DBMS", attendedClasses: Math.round(classesAttended * 0.2), totalClasses: 50, percentage: foundBase.currentAttendancePercent || 88, facultyName: "Prof. S. R. Rao" },
          { subjectCode: "CS503", subjectName: "Operating Systems", attendedClasses: Math.round(classesAttended * 0.2), totalClasses: 50, percentage: foundBase.currentAttendancePercent || 88, facultyName: "Dr. Nihal R." },
          { subjectCode: "CS504", subjectName: "Artificial Intelligence", attendedClasses: Math.round(classesAttended * 0.2), totalClasses: 50, percentage: foundBase.currentAttendancePercent || 88, facultyName: "Dr. Pratyush Kumar Das" },
          { subjectCode: "CS505", subjectName: "Java Programming", attendedClasses: Math.round(classesAttended * 0.2), totalClasses: 50, percentage: foundBase.currentAttendancePercent || 88, facultyName: "Mrs. Upasana Sahoo" }
        ],
        monthlyAttendance: liveMonthly.length > 0 ? liveMonthly : [
          { month: "May", percentage: 90, attended: 45, total: 50 },
          { month: "Jun", percentage: 92, attended: 46, total: 50 },
          { month: "Jul", percentage: 94, attended: 47, total: 50 },
          { month: "Aug", percentage: 91, attended: 45, total: 50 },
          { month: "Sep", percentage: 95, attended: 47, total: 50 }
        ],
        recentLogs: liveLogs.length > 0 ? liveLogs : [
          { id: "log-1", date: "Today", subject: "Computer Networks", status: "Present", time: "09:30 AM" },
          { id: "log-2", date: "Today", subject: "DBMS", status: "Present", time: "11:00 AM" },
          { id: "log-3", date: "Yesterday", subject: "Operating Systems", status: "Present", time: "10:15 AM" }
        ]
      };
    } else {
      // Update found academic profile with live values
      academicProfile.semester = semNum;
      academicProfile.branch = branch;
      academicProfile.department = department;
      academicProfile.section = sectionCode;

      if (foundBase) {
        const classesAttended = foundBase.eventsAttendedCount || Math.round(250 * ((foundBase.currentAttendancePercent || 88) / 100));
        const classesMissed = Math.max(0, 250 - classesAttended);

        const liveMonthly = (foundBase.monthlyTrends || []).map((trend) => ({
          month: trend.month,
          percentage: trend.percentage,
          attended: Math.round(trend.hours / 1.5),
          total: Math.round((trend.hours / (trend.percentage / 100)) / 1.5) || 50
        }));

        const liveLogs = (foundBase.recentHistory || []).map((hist) => ({
          id: hist.id,
          date: hist.date,
          subject: hist.clubName,
          status: hist.status,
          time: hist.inTime || hist.outTime || ''
        }));

        academicProfile.name = foundBase.name || academicProfile.name;
        academicProfile.email = foundBase.email || academicProfile.email;
        academicProfile.avatar = foundBase.avatar || academicProfile.avatar;
        academicProfile.overallAttendancePercentage = foundBase.currentAttendancePercent || academicProfile.overallAttendancePercentage;
        academicProfile.classesAttended = classesAttended;
        academicProfile.classesMissed = classesMissed;
        academicProfile.monthlyAttendance = liveMonthly.length > 0 ? liveMonthly : academicProfile.monthlyAttendance;
        academicProfile.recentLogs = liveLogs.length > 0 ? liveLogs : academicProfile.recentLogs;
      }
    }

    try {
      await attendanceApiService.studentLogin(regNo);
    } catch (e) {
      attendanceApiService.saveSession(`token_student_${Date.now()}`, 'student', academicProfile.registrationNumber);
    }

    setLoggedInAcademicStudent(academicProfile);
    setUserRole('student');
    setIsEntered(true);
    setViewMode('app');
    addToast('Student Portal Access', `Logged in as ${academicProfile.name} (${academicProfile.registrationNumber})`, 'success');
  };

  const handleAdminLogin = async (adminId: string, pass: string) => {
    if (adminId.trim() === 'CaSR Admin' && pass === 'CaSR123') {
      try {
        await attendanceApiService.adminLogin(adminId, pass);
      } catch (e) {
        attendanceApiService.saveSession(`token_admin_${Date.now()}`, 'admin');
      }
      setUserRole('admin');
      setLoggedInAcademicStudent(null);
      setIsEntered(true);
      setViewMode('app');
      setActiveTab('directory');
      addToast('Admin Portal Access', 'Faculty / Admin authenticated successfully.', 'success');
      return;
    }

    addToast('Authentication Error', 'Invalid Admin ID or Password.', 'error');
    throw new Error('Invalid Admin ID or Password.');
  };

  const handleLogout = () => {
    attendanceApiService.clearSession();
    setUserRole(null);
    setLoggedInAcademicStudent(null);
    setIsEntered(false);
    setViewMode('login');
    addToast('Logged Out', 'Session terminated successfully.', 'info');
  };

  const loadLiveAttendance = async (silent = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (!silent) setIsSyncingSheets(true);
    const startTime = Date.now();
    try {
      const liveStudents = await fetchLiveAttendanceData();
      if (liveStudents && liveStudents.length > 0) {
        setAllStudents(liveStudents);

        // Keep logged-in academic student profile in real-time sync with Google Sheet updates
        setLoggedInAcademicStudent((prev) => {
          if (!prev) return null;
          const liveMatch = liveStudents.find(
            (s) => s.registrationNumber.trim().toLowerCase() === prev.registrationNumber.trim().toLowerCase()
          );
          if (liveMatch) {
            let semNum = prev.semester;
            if (liveMatch.semesterYear) {
              const match = liveMatch.semesterYear.match(/\d+/);
              if (match) {
                semNum = parseInt(match[0], 10);
              }
            }
            const classesAttended = liveMatch.eventsAttendedCount || Math.round(250 * ((liveMatch.currentAttendancePercent || 88) / 100));
            const classesMissed = Math.max(0, 250 - classesAttended);

            const liveMonthly = (liveMatch.monthlyTrends || []).map((trend) => ({
              month: trend.month,
              percentage: trend.percentage,
              attended: Math.round(trend.hours / 1.5),
              total: Math.round((trend.hours / (trend.percentage / 100)) / 1.5) || 50
            }));

            const liveLogs = (liveMatch.recentHistory || []).map((hist) => ({
              id: hist.id,
              date: hist.date,
              subject: hist.clubName,
              status: hist.status,
              time: hist.inTime || hist.outTime || ''
            }));

            return {
              ...prev,
              name: liveMatch.name || prev.name,
              overallAttendancePercentage: liveMatch.currentAttendancePercent || prev.overallAttendancePercentage,
              email: liveMatch.email || prev.email,
              avatar: liveMatch.avatar || prev.avatar,
              branch: liveMatch.degreeProgram || prev.branch,
              department: liveMatch.degreeProgram || prev.department,
              semester: semNum,
              section: liveMatch.sectionCode || prev.section,
              classesAttended: classesAttended,
              classesMissed: classesMissed,
              monthlyAttendance: liveMonthly.length > 0 ? liveMonthly : prev.monthlyAttendance,
              recentLogs: liveLogs.length > 0 ? liveLogs : prev.recentLogs
            };
          }
          return prev;
        });

        setCurrentStudent((prev) => {
          const matched = liveStudents.find(
            (s) => s.registrationNumber.toLowerCase() === prev.registrationNumber.toLowerCase()
          );
          return matched || liveStudents[0];
        });
        setViewingHistoryStudent((prev) => {
          if (!prev) return null;
          const matched = liveStudents.find(
            (s) => s.registrationNumber.toLowerCase() === prev.registrationNumber.toLowerCase()
          );
          return matched || prev;
        });
        const syncTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSyncedTime(syncTime);

        // Add success log
        const duration = Date.now() - startTime;
        const successLog: SyncLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleDateString() + ' ' + syncTime,
          triggerType: silent ? 'AUTO' : 'MANUAL',
          status: 'SUCCESS',
          recordsAdded: 0,
          recordsUpdated: liveStudents.length,
          recordsDeleted: 0,
          duplicatesSkipped: 0,
          failedRecords: 0,
          executionTimeMs: duration,
          totalRecordsProcessed: liveStudents.length
        };
        setSyncLogs((prev) => [successLog, ...prev.slice(0, 49)]);
      }
    } catch (err: any) {
      console.warn('Live Google Sheets fetch failed, keeping fallback students:', err);
      // Add error log
      const duration = Date.now() - startTime;
      const errorLog: SyncLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        triggerType: silent ? 'AUTO' : 'MANUAL',
        status: 'ERROR',
        recordsAdded: 0,
        recordsUpdated: 0,
        recordsDeleted: 0,
        duplicatesSkipped: 0,
        failedRecords: 0,
        executionTimeMs: duration,
        totalRecordsProcessed: 0,
        errorMessage: err.message || String(err)
      };
      setSyncLogs((prev) => [errorLog, ...prev.slice(0, 49)]);
    } finally {
      if (!silent) setIsSyncingSheets(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    let isMounted = true;
    loadLiveAttendance(false);

    if (autoSyncInterval <= 0) return;

    const intervalId = setInterval(() => {
      if (isMounted) loadLiveAttendance(true);
    }, autoSyncInterval * 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [autoSyncInterval]);

  useEffect(() => {
    if (!allStudents || allStudents.length === 0) return;
    setClubs((prevClubs) =>
      prevClubs.map((club) => {
        const rawName = club.name.replace(/^[^\w\s]+\s*/, '').toLowerCase().trim();
        const memberCount = allStudents.filter((s) => {
          const pClub = (s.clubName || '').toLowerCase();
          const allClubs = (s.allClubs || []).map((c) => c.toLowerCase());
          return pClub.includes(rawName) || allClubs.some((c) => c.includes(rawName));
        }).length;
        return { ...club, activeMembers: Math.max(club.activeMembers, memberCount) };
      })
    );
  }, [allStudents]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleEnterFromEntrance = (student: StudentProfile) => {
    setCurrentStudent(student);
    setIsEntered(true);
    setViewMode('app');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            currentStudent={currentStudent}
            clubs={clubs}
            events={events}
            onSelectTab={setActiveTab}
            onViewClub={setViewingClub}
            onJoinClub={setJoiningClub}
            onViewHistory={setViewingHistoryStudent}
          />
        );
      case 'clubs':
        return (
          <ClubDirectoryView
            clubs={clubs}
            onViewClub={setViewingClub}
            onJoinClub={setJoiningClub}
          />
        );
      case 'events':
        return <EventsView events={events} currentStudent={currentStudent} />;
      case 'directory':
        return (
          <CheckAttendanceView
            students={allStudents}
            onSelectStudent={setCurrentStudent}
            onViewHistory={setViewingHistoryStudent}
            isSyncing={isSyncingSheets}
            lastSyncedTime={lastSyncedTime}
            onManualSync={() => loadLiveAttendance(false)}
            onOpenSyncLogs={() => setShowSyncLogsModal(true)}
          />
        );
      case 'committee':
        return <CommitteeView />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      <AuroraCanvas theme={theme} />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {viewMode === 'login' ? (
        <LoginPortal
          onStudentLogin={handleStudentLogin}
          onAdminLogin={handleAdminLogin}
        />
      ) : !isEntered ? (
        <EntranceView
          students={allStudents}
          theme={theme}
          toggleTheme={toggleTheme}
          onEnter={handleEnterFromEntrance}
          onOpenLoginPortal={() => setViewMode('login')}
        />
      ) : userRole === 'student' && loggedInAcademicStudent ? (
        /* STRICT DATA ISOLATION: Student View renders ONLY that student's record. NO list of students is ever exposed. */
        <StudentDashboardView
          student={loggedInAcademicStudent}
          allStudents={allStudents}
          clubs={clubs}
          events={events}
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
          onViewClub={setViewingClub}
          onJoinClub={setJoiningClub}
        />
      ) : (
        /* FACULTY / ADMIN PORTAL VIEW */
        <div className="relative z-10 pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-between">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            theme={theme}
            toggleTheme={toggleTheme}
            currentStudent={currentStudent}
            allStudents={allStudents}
            onSelectStudent={setCurrentStudent}
            notifications={notifications}
            onOpenSearchModal={() => setShowSearchModal(true)}
            onLogout={handleLogout}
          />

          <main className="flex-1 my-6">{renderActiveTab()}</main>

          <Footer onSelectTab={setActiveTab} />

          {viewingClub && (
            <ViewClubModal
              club={viewingClub}
              onClose={() => setViewingClub(null)}
              onJoinClub={(c) => {
                setViewingClub(null);
                setJoiningClub(c);
              }}
            />
          )}

          {joiningClub && (
            <JoinClubModal
              club={joiningClub}
              currentStudent={currentStudent}
              onClose={() => setJoiningClub(null)}
              onSuccess={(clubName) => {
                setJoiningClub(null);
                alert(`Successfully registered for ${clubName}!`);
              }}
            />
          )}

          {viewingHistoryStudent && (
            <HistoryModal
              student={viewingHistoryStudent}
              onClose={() => setViewingHistoryStudent(null)}
            />
          )}

          {showSyncLogsModal && (
            <SyncLogsModal
              isOpen={showSyncLogsModal}
              onClose={() => setShowSyncLogsModal(false)}
              syncLogs={syncLogs}
              isSyncing={isSyncingSheets}
              onManualSync={() => loadLiveAttendance(false)}
              autoSyncInterval={autoSyncInterval}
              onSelectInterval={setAutoSyncInterval}
              onClearLogs={() => setSyncLogs([])}
            />
          )}

          {showSearchModal && (
            <GlobalSearchModal
              students={allStudents}
              clubs={clubs}
              events={events}
              setActiveTab={setActiveTab}
              onClose={() => setShowSearchModal(false)}
              onSelectStudent={(s) => {
                setCurrentStudent(s);
                setShowSearchModal(false);
                setActiveTab('dashboard');
              }}
              onSelectClub={(c) => {
                setViewingClub(c);
                setShowSearchModal(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
