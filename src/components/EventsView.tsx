import React, { useState } from 'react';
import { CampusEvent, ClubCategory, StudentProfile } from '../types';
import { Calendar, MapPin, Clock, Award, Users, Check, Sparkles, QrCode, X, Trophy, Phone, UserCheck, HelpCircle, ChevronDown, ChevronUp, Star, Flag, FileText } from 'lucide-react';

interface EventsViewProps {
  events: CampusEvent[];
  currentStudent?: StudentProfile;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, currentStudent }) => {
  const [selectedCategory, setSelectedCategory] = useState<ClubCategory>('All Clubs');
  const [rsvpSuccessId, setRsvpSuccessId] = useState<string | null>(null);
  const [activePassEvent, setActivePassEvent] = useState<CampusEvent | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [selectedDetailEvent, setSelectedDetailEvent] = useState<CampusEvent | null>(null);

  const categories: ClubCategory[] = ['All Clubs', 'Technical', 'Cultural', 'Sports', 'Social', 'Innovation'];

  const filteredEvents = events.filter((e) => {
    return selectedCategory === 'All Clubs' || e.clubCategory === selectedCategory;
  });

  const handleRSVP = (evt: CampusEvent) => {
    setRsvpSuccessId(evt.id);
    setActivePassEvent(evt);
    window.open('https://forms.gle/6ezyppJgi7nngwTh6', '_blank');
  };

  const toggleExpand = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div className="pt-24 md:pt-28 pb-20 px-4 md:px-16 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" /> Campus Schedule & Competitions
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Upcoming Campus Events & Competitions
        </h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Earn participation credits, compete in sub-challenges, win award titles, and connect with event coordinators.
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
          const isExpanded = expandedEventId === evt.id;

          return (
            <div
              key={evt.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/30 dark:border-white/10 hover:shadow-2xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/10 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {evt.clubName}
                  </div>


                  {evt.theme && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-medium text-amber-300 border border-amber-500/30 flex items-center gap-2">
                      <Flag className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{evt.theme}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mt-2">
                      {evt.description}
                    </p>
                  </div>

                  {/* Basic Schedule & Venue Meta */}
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 dark:text-gray-300 pt-3 border-t border-gray-200/50 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="font-medium">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span>Capacity: {evt.registeredCount}/{evt.maxCapacity} registered</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {evt.tags && evt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {evt.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Sub-Events or Stages Highlights */}
                  {evt.subEvents && (
                    <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 rounded-2xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-amber-700 dark:text-amber-300 font-bold text-xs">
                        <span className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" /> Sub-Challenges ({evt.subEvents.length}):
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[11px] text-gray-700 dark:text-gray-300">
                        {evt.subEvents.slice(0, isExpanded ? evt.subEvents.length : 3).map((sub, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{sub}</span>
                          </div>
                        ))}
                        {!isExpanded && evt.subEvents.length > 3 && (
                          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium italic pt-0.5">
                            + {evt.subEvents.length - 3} more challenges (click Details below to view all)
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {evt.stages && (
                    <div className="bg-purple-500/10 dark:bg-purple-500/5 border border-purple-500/20 rounded-2xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-purple-700 dark:text-purple-300 font-bold text-xs">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-purple-500" /> Competition Stages ({evt.stages.length}):
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[11px] text-gray-700 dark:text-gray-300">
                        {evt.stages.slice(0, isExpanded ? evt.stages.length : 2).map((stg, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-purple-500 font-bold">➢</span>
                            <span>{stg}</span>
                          </div>
                        ))}
                        {!isExpanded && evt.stages.length > 2 && (
                          <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium italic pt-0.5">
                            + {evt.stages.length - 2} more stages (click Details to expand)
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Award Titles */}
                  {evt.awardTitles && (
                    <div className="bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-3.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> Special Award Titles:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {evt.awardTitles.map((title) => (
                          <span key={title} className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300/40">
                            🏆 {title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guidelines section when expanded */}
                  {isExpanded && evt.guidelines && (
                    <div className="bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20 rounded-2xl p-3.5 space-y-1.5 animate-in fade-in duration-300">
                      <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-bold text-xs">
                        <Check className="w-3.5 h-3.5 text-blue-500" /> Event Guidelines:
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-gray-700 dark:text-gray-300 space-y-1">
                        {evt.guidelines.map((g, idx) => (
                          <li key={idx}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Coordinators summary */}
                  <div className="pt-2 border-t border-gray-200/50 dark:border-white/10 text-xs space-y-1">
                    {evt.facultyCoordinators && (
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        <strong className="text-gray-700 dark:text-gray-300">Faculty In-Charge:</strong> {evt.facultyCoordinators.join(', ')}
                      </div>
                    )}
                    {evt.studentCoordinators && (
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        <strong className="text-gray-700 dark:text-gray-300">Student Coordinators:</strong>{' '}
                        {evt.studentCoordinators.map(c => `${c.name}${c.phone ? ` (${c.phone})` : ''}`).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setSelectedDetailEvent(evt)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  View Full Details
                </button>
                <button
                  onClick={() => handleRSVP(evt)}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                    isRSVPed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {isRSVPed ? (
                    <>
                      <Check className="w-4 h-4" /> Registered
                    </>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Event Details Modal */}
      {selectedDetailEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedDetailEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {selectedDetailEvent.clubName}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {selectedDetailEvent.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                {selectedDetailEvent.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-xs">
              <div>
                <span className="text-gray-400 font-medium">Date:</span>
                <p className="font-bold text-gray-800 dark:text-gray-100">{selectedDetailEvent.date}</p>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Venue:</span>
                <p className="font-bold text-gray-800 dark:text-gray-100">{selectedDetailEvent.venue}</p>
              </div>

              <div>
                <span className="text-gray-400 font-medium">Expected Duration:</span>
                <p className="font-bold text-gray-800 dark:text-gray-100">{selectedDetailEvent.durationHours} Hours</p>
              </div>
            </div>

            {selectedDetailEvent.theme && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Flag className="w-4 h-4" /> Theme:
                </h4>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{selectedDetailEvent.theme}</p>
              </div>
            )}

            {selectedDetailEvent.subEvents && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" /> Sub-Events & Competitions:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedDetailEvent.subEvents.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-xs font-medium text-gray-800 dark:text-gray-200">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedDetailEvent.stages && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" /> Stage Progression:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedDetailEvent.stages.map((stg, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-900 dark:text-purple-200">
                      {stg}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedDetailEvent.awardTitles && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Award Titles Presented:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDetailEvent.awardTitles.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-500/40">
                      🏆 {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedDetailEvent.guidelines && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" /> Guidelines & Rules:
                </h4>
                <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 space-y-1.5 pl-2">
                  {selectedDetailEvent.guidelines.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Coordinators Contact Box */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-3">
              <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Event Organizing Team
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {selectedDetailEvent.facultyCoordinators && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Faculty In-Charge:</span>
                    {selectedDetailEvent.facultyCoordinators.map((f, i) => (
                      <p key={i} className="text-gray-600 dark:text-gray-300">{f}</p>
                    ))}
                  </div>
                )}
                {selectedDetailEvent.studentCoordinators && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Student Coordinators:</span>
                    {selectedDetailEvent.studentCoordinators.map((s, i) => (
                      <p key={i} className="text-gray-600 dark:text-gray-300 flex items-center justify-between">
                        <span>{s.name}</span>
                        {s.phone && <span className="font-mono text-blue-600 dark:text-blue-400 font-bold ml-2">{s.phone}</span>}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDetailEvent(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleRSVP(selectedDetailEvent);
                  setSelectedDetailEvent(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-lg"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Event Pass Modal */}
      {activePassEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-white/20 rounded-3xl max-w-md w-full p-6 text-center space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActivePassEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Registration Confirmed!</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your entry pass for <span className="font-semibold text-gray-800 dark:text-gray-200">{activePassEvent.title}</span> has been generated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 space-y-3">
              <QrCode className="w-24 h-24 mx-auto text-gray-800 dark:text-white" />
              <p className="text-[11px] font-mono font-bold text-gray-600 dark:text-gray-300">
                PASS-{activePassEvent.id.toUpperCase()}-2026
              </p>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200/50 dark:border-white/10">
                Show this QR pass at {activePassEvent.venue} on {activePassEvent.date}
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="https://forms.gle/6ezyppJgi7nngwTh6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                Open Google Registration Form ↗
              </a>
              <button
                onClick={() => setActivePassEvent(null)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-lg"
              >
                Done & Return to Events
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
