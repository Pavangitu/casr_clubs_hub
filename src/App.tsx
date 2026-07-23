import React, { useState, useEffect } from 'react';
import { NavTab, ThemeMode, StudentProfile, Club, CampusEvent } from './types';
import { MOCK_CLUBS, MOCK_STUDENTS, MOCK_EVENTS, MOCK_NOTIFICATIONS } from './data/mockData';
import { fetchLiveAttendanceData } from './services/googleSheetsService';
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

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(MOCK_STUDENTS);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(MOCK_STUDENTS[0]);
  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);
  const [events, setEvents] = useState<CampusEvent[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Modals
  const [viewingClub, setViewingClub] = useState<Club | null>(null);
  const [joiningClub, setJoiningClub] = useState<Club | null>(null);
  const [viewingHistoryStudent, setViewingHistoryStudent] = useState<StudentProfile | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Live Google Sheets sync states
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  const loadLiveAttendance = async () => {
    setIsSyncingSheets(true);
    try {
      const liveStudents = await fetchLiveAttendanceData();
      if (liveStudents && liveStudents.length > 0) {
        setAllStudents(liveStudents);
        setCurrentStudent((prev) => {
          const matched = liveStudents.find(
            (s) => s.registrationNumber.toLowerCase() === prev.registrationNumber.toLowerCase()
          );
          return matched || liveStudents[0];
        });
        setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.warn('Live Google Sheets fetch failed, keeping fallback students:', err);
    } finally {
      setIsSyncingSheets(false);
    }
  };

  // Fetch live Google Sheets attendance data on mount and set auto-polling every 3s
  useEffect(() => {
    let isMounted = true;
    loadLiveAttendance();

    // Live auto-sync interval (every 3 seconds for instant real-time responsiveness)
    const intervalId = setInterval(() => {
      if (isMounted) loadLiveAttendance();
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Sync theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-[#faf9ff] dark:bg-[#0b0d13] relative text-gray-900 dark:text-gray-100 selection:bg-blue-500 selection:text-white overflow-x-hidden font-sans transition-colors duration-300">
      {/* Aurora WebGL Background */}
      <AuroraCanvas theme={theme} />

      {!isEntered ? (
        <EntranceView
          students={allStudents}
          theme={theme}
          toggleTheme={toggleTheme}
          onEnter={(student) => {
            setCurrentStudent(student);
            setIsEntered(true);
          }}
        />
      ) : (
        <>
          {/* Floating Navigation Header */}
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
          />

          {/* Main View Area */}
          <main className="min-h-[80vh]">
            {activeTab === 'directory' && (
              <CheckAttendanceView
                currentStudent={currentStudent}
                allStudents={allStudents}
                onOpenHistoryModal={(st) => setViewingHistoryStudent(st)}
                isSyncingSheets={isSyncingSheets}
                lastSyncedTime={lastSyncedTime}
                onManualSync={loadLiveAttendance}
              />
            )}

            {activeTab === 'clubs' && (
              <ClubDirectoryView
                clubs={clubs}
                onSelectClubView={(club) => setViewingClub(club)}
                onSelectClubJoin={(club) => setJoiningClub(club)}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardView
                currentStudent={currentStudent}
                clubs={clubs}
                events={events}
                setActiveTab={setActiveTab}
                onOpenHistoryModal={(st) => setViewingHistoryStudent(st)}
                onOpenJoinModal={(club) => setJoiningClub(club)}
              />
            )}

            {activeTab === 'events' && (
              <EventsView events={events} />
            )}

            {activeTab === 'committee' && (
              <CommitteeView />
            )}
          </main>

          {/* Footer */}
          <Footer setActiveTab={setActiveTab} />

          {/* Modals */}
          {viewingClub && (
            <ViewClubModal
              club={viewingClub}
              onClose={() => setViewingClub(null)}
              onJoin={() => setJoiningClub(viewingClub)}
            />
          )}

          {joiningClub && (
            <JoinClubModal
              club={joiningClub}
              student={currentStudent}
              onClose={() => setJoiningClub(null)}
            />
          )}

          {viewingHistoryStudent && (
            <HistoryModal
              student={viewingHistoryStudent}
              onClose={() => setViewingHistoryStudent(null)}
            />
          )}

          {showSearchModal && (
            <GlobalSearchModal
              students={allStudents}
              clubs={clubs}
              events={events}
              onClose={() => setShowSearchModal(false)}
              onSelectStudent={setCurrentStudent}
              onSelectClub={(club) => {
                setViewingClub(club);
                setActiveTab('clubs');
              }}
              setActiveTab={setActiveTab}
            />
          )}
        </>
      )}
    </div>
  );
}
