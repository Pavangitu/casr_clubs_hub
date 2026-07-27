import React from 'react';
import { NavTab } from '../types';
import { MapPin, Globe, Shield, ExternalLink, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onSelectTab?: (tab: NavTab) => void;
  setActiveTab?: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, setActiveTab: propSetActiveTab }) => {
  const setActiveTab = onSelectTab || propSetActiveTab || (() => {});
  return (
    <footer className="bg-gray-100/80 dark:bg-slate-950 border-t border-gray-200/50 dark:border-white/10 w-full transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 py-12 max-w-7xl mx-auto">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYWoxaLgUQRGQM_9JBtxJgHEHgpjdREMXzL_js7eoNvyd8XxkwTW3PqaEuV0CQS2AMXjSQ-J8m1JFSZQPe8FuJbzKVd4wJvrwp60973PJKtLSEFCfc50GblC-DzW1lAgVyuMcM_EsVzNekBU-kEMGsNr4O_qim7-1akytGwFPJYT6q_6YwcYtezMyFyh28GsHaMthPdSt8iWnsBNY7JT7Ue4SG9KeBMEIHr_kSsVhkkfaOaYt9jTb8jqNW4ORb5NLusN2QgwaS_xtN"
              alt="Footer Logo"
              className="h-7 w-7 object-contain opacity-90"
            />
            <span className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
              CaSR Clubs Hub
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            © 2024 CaSR Clubs Hub.
            <br />
            Engineered for Campus Community Excellence.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-blue-600 dark:text-emerald-400 uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hover:text-blue-600 dark:hover:text-emerald-400 transition-colors hover:underline"
              >
                Dashboard Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('clubs')}
                className="hover:text-blue-600 dark:hover:text-emerald-400 transition-colors hover:underline"
              >
                Club Directory
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('events')}
                className="hover:text-blue-600 dark:hover:text-emerald-400 transition-colors hover:underline"
              >
                Campus Events
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('directory')}
                className="hover:text-blue-600 dark:hover:text-emerald-400 transition-colors hover:underline"
              >
                Student Attendance Module
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('committee')}
                className="hover:text-blue-600 dark:hover:text-emerald-400 transition-colors hover:underline"
              >
                Execution Committee
              </button>
            </li>
          </ul>
        </div>

        {/* Social Connect */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-blue-600 dark:text-emerald-400 uppercase tracking-wider">
            Social Connect
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a
                href="https://www.instagram.com/cutm_casr_pkd?igsh=MXQ1eWdmbTdzOThmbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-emerald-400 transition-colors hover:underline flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/share/1G6WTEZ8uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-emerald-400 transition-colors hover:underline flex items-center gap-2"
              >
                <Facebook className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Facebook</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Location Map Preview */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-blue-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Campus Location
          </h4>
          <div className="w-full h-32 rounded-2xl overflow-hidden relative shadow-md group border border-gray-300/40 dark:border-white/10">
            <div
              className="bg-cover bg-center w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIUpFnXewSGpT20MZRX-EngDj_bihd0X75kCeN5L7RYHlUnvs3pofb1Lj4LrCbaP-4W5LQzDTEyd98SwyILqoOxzEDCVX7zk5NRqt7j54YBoDH68oA4p5fNgkr2fEYLKSyc3tvB9MwKK9bIaF477C5QFidqsZ_ykZ1pv0krS8poXEff8ZAsTRcaXlYqGEl5FgqZm7YXuMdTM7mHwV_-jFmo_jm-xYSfGYA8T8D4_SdjgEIAIXf0D2B6WH6ZJvWUHVn3wpGAs38jNRC')`
              }}
            />
            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
              <span className="bg-black/70 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-semibold border border-white/20 flex items-center gap-1 shadow-lg">
                <MapPin className="w-3 h-3 text-emerald-400 animate-bounce" /> CaSR Central Campus
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
