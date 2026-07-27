import React, { useState } from 'react';
import { CampusEvent, ClubCategory, StudentProfile } from '../types';
import { Calendar, MapPin, Clock, Award, Users, Check, Sparkles, QrCode, X } from 'lucide-react';

interface EventsViewProps {
  events: CampusEvent[];
  currentStudent?: StudentProfile;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, currentStudent }) => {
  const [selectedCategory, setSelectedCategory] = useState<ClubCategory>('All Clubs');
  const [rsvpSuccessId, setRsvpSuccessId] = useState<string | null>(null);
  const [activePassEvent, setActivePassEvent] = useState<CampusEvent | null>(null);

  const categories: ClubCategory[] = ['All Clubs', 'Technical', 'Cultural', 'Sports', 'Social', 'Innovation'];

  const filteredEvents = events.filter((e) => {
    return selectedCategory === 'All Clubs' || e.clubCategory === selectedCategory;
  });

  const handleRSVP = (evt: CampusEvent) => {
    setRsvpSuccessId(evt.id);
    setActivePassEvent(evt);
  };

  return (
    <div className="pt-24 md:pt-28 pb-20 px-4 md:px-16 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" /> Campus Schedule
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Upcoming Campus Events & Workshops
        </h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Earn participation credits, expand your network, and attend hands-on workshops.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white dark:bg-emerald-500 dark:text-gray-950 shadow-lg'
                : 'bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-white/90 border border-gray-200 dark:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => {
          const isRSVPed = rsvpSuccessId === evt.id;

          return (
            <div
              key={evt.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/30 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> {evt.clubName}
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-md">
                    +{evt.creditsAwarded} Credits
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200/50 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span>Capacity: {evt.registeredCount}/{evt.maxCapacity} seats filled</span>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          );
        })}
      </div>


    </div>
  );
};
