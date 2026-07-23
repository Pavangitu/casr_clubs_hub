import React from 'react';
import { Club } from '../types';
import { X, School, UserCheck, Users, Calendar, MapPin, Sparkles, Tag, ArrowRight } from 'lucide-react';

interface ViewClubModalProps {
  club: Club;
  onClose: () => void;
  onJoin: () => void;
}

export const ViewClubModal: React.FC<ViewClubModalProps> = ({ club, onClose, onJoin }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-gray-900 dark:text-white border border-white/20 dark:border-white/10 shadow-2xl">
        {/* Header Image */}
        <div className="relative h-56 w-full bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-emerald-600/30">
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                {club.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">{club.name}</h2>
            </div>
            <span className="text-xs text-gray-300 font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
              Est. {club.foundedYear}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Active Members & Leads */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Active Members</p>
                <p className="text-base font-bold">{club.activeMembers}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <School className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Faculty Lead</p>
                <p className="text-xs font-bold line-clamp-1">{club.facultyLead}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Student Lead</p>
                <p className="text-xs font-bold line-clamp-1">{club.studentLead}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-blue-600 dark:text-emerald-400 uppercase tracking-wider">
              About the Organization
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {club.fullDescription || club.description}
            </p>
          </div>

          {/* Meeting Schedule & Venue */}
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-500/20 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
              <Calendar className="w-4 h-4" /> Meeting Schedule: {club.meetingSchedule}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-emerald-500" /> Venue: {club.location}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Domain Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {club.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-semibold"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onJoin();
              }}
              className="flex-1 py-3 rounded-2xl liquid-gradient text-white text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              Apply to Join <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
