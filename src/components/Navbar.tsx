import React, { useState } from 'react';
import { NavTab, ThemeMode, StudentProfile, NotificationItem } from '../types';
import { Moon, Sun, Bell, Search, CheckCircle, Calendar, Users, X, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  currentStudent: StudentProfile;
  allStudents: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  notifications: NotificationItem[];
  onOpenSearchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  currentStudent,
  allStudents,
  onSelectStudent,
  notifications,
  onOpenSearchModal
}) => {
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full border border-white/20 dark:border-white/10 bg-white/70 dark:bg-[#11131a]/70 backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,74,198,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] flex justify-between items-center px-6 md:px-8 py-3 z-50 transition-all duration-300">
      {/* Brand Logo & Name */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setActiveTab('dashboard')}
      >
        <div className="w-9 h-9 rounded-full bg-primary-container/10 flex items-center justify-center border border-primary/20 p-1 group-hover:scale-105 transition-transform">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYWoxaLgUQRGQM_9JBtxJgHEHgpjdREMXzL_js7eoNvyd8XxkwTW3PqaEuV0CQS2AMXjSQ-J8m1JFSZQPe8FuJbzKVd4wJvrwp60973PJKtLSEFCfc50GblC-DzW1lAgVyuMcM_EsVzNekBU-kEMGsNr4O_qim7-1akytGwFPJYT6q_6YwcYtezMyFyh28GsHaMthPdSt8iWnsBNY7JT7Ue4SG9KeBMEIHr_kSsVhkkfaOaYt9jTb8jqNW4ORb5NLusN2QgwaS_xtN"
            alt="CaSR Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400 bg-clip-text text-transparent">
          CaSR Clubs Hub
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {(
          [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'clubs', label: 'Clubs' },
            { id: 'events', label: 'Events' },
            { id: 'directory', label: 'Directory' },
            { id: 'committee', label: 'Committee' }
          ] as { id: NavTab; label: string }[]
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-medium text-sm md:text-base transition-all duration-300 relative py-1 hover:scale-105 ${
                isActive
                  ? 'text-blue-600 dark:text-emerald-400 font-bold border-b-2 border-blue-600 dark:border-emerald-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Header Controls */}
      <div className="flex items-center gap-3 md:gap-4 relative">
        {/* Quick Search */}
        <button
          onClick={onOpenSearchModal}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title="Search Student or Club"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifPopover(!showNotifPopover);
            }}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifPopover && (
            <div className="absolute right-0 mt-3 w-80 md:w-96 rounded-2xl glass-card p-4 shadow-2xl border border-white/20 dark:border-white/10 z-50 text-gray-900 dark:text-white animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-3 border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-500" /> Notifications
                </h4>
                <button
                  onClick={() => setShowNotifPopover(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-gray-100/70 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-gray-700/60 transition-colors text-xs space-y-1"
                  >
                    <div className="flex justify-between font-semibold text-blue-600 dark:text-emerald-400">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-gray-400 font-normal">{n.timeAgo}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>


      </div>
    </nav>
  );
};
