import React, { useState } from 'react';
import { Club, ClubCategory } from '../types';
import { Search, Users, Award, Calendar, School, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

interface ClubDirectoryViewProps {
  clubs: Club[];
  totalStudentsCount?: number;
  onSelectClubView?: (club: Club) => void;
  onSelectClubJoin?: (club: Club) => void;
  onViewClub?: (club: Club) => void;
  onJoinClub?: (club: Club) => void;
}

export const ClubDirectoryView: React.FC<ClubDirectoryViewProps> = ({
  clubs,
  totalStudentsCount,
  onSelectClubView,
  onSelectClubJoin,
  onViewClub,
  onJoinClub
}) => {
  const handleView = onViewClub || onSelectClubView || (() => {});
  const handleJoin = onJoinClub || onSelectClubJoin || (() => {});
  const [selectedCategory, setSelectedCategory] = useState<ClubCategory>('All Clubs');

  const [searchQuery, setSearchQuery] = useState('');

  const categories: ClubCategory[] = ['All Clubs', 'Technical', 'Cultural', 'Sports', 'Social', 'Innovation'];

  const filteredClubs = clubs.filter((club) => {
    const matchesCategory = selectedCategory === 'All Clubs' || club.category === selectedCategory;
    const matchesQuery =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const getCategoryBadgeColor = (cat: Club['category']) => {
    switch (cat) {
      case 'Cultural':
        return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Technical':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Innovation':
        return 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'Social':
        return 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'Sports':
        return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="pt-24 md:pt-28 pb-20 space-y-16 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-8 px-4 md:px-16 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-emerald-500/10 border border-blue-500/20 dark:border-emerald-500/20 text-blue-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-widest animate-bounce">
            <Sparkles className="w-3.5 h-3.5" /> Elite Student Ecosystem
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Explore All <span className="text-blue-600 dark:text-blue-400 italic">CaSR Clubs</span>
          </h1>

          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover your passion, find your community, and ignite your campus experience through our elite network of specialized student organizations.
          </p>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center floating-anim border border-white/30 dark:border-white/10">
            <span className="text-4xl md:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {clubs.length}
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Active Clubs
            </span>
          </div>

          <div
            className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center floating-anim border border-white/30 dark:border-white/10"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
              {totalStudentsCount ? `${totalStudentsCount}+` : '2000+'}
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Global Members
            </span>
          </div>

          <div
            className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center floating-anim border border-white/30 dark:border-white/10"
            style={{ animationDelay: '0.8s' }}
          >
            <span className="text-4xl md:text-5xl font-extrabold text-purple-600 dark:text-purple-300">
              200+
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Annual Events
            </span>
          </div>
        </div>
      </section>

      {/* Search & Filters Section */}
      <section className="px-4 md:px-16 max-w-7xl mx-auto w-full">
        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-white/30 dark:border-white/10">
          <div className="relative w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your next passion..."
              className="w-full bg-white/60 dark:bg-[#0c0e15]/60 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-16 pr-6 font-medium text-sm md:text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white dark:bg-emerald-500 dark:text-gray-950 shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20'
                      : 'bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Club Directory Grid */}
      <section className="px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="glass-card rounded-3xl p-5 flex flex-col h-full group hover:scale-[1.02] transition-all duration-300 border border-white/30 dark:border-white/10"
            >
              {/* Club Image Container */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-emerald-500/20">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.img-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'img-fallback w-full h-full flex items-center justify-center text-5xl';
                      fallback.textContent = club.name.match(/\p{Emoji}/u)?.[0] || '🏛️';
                      parent.appendChild(fallback);
                    }
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full border backdrop-blur-md ${getCategoryBadgeColor(
                      club.category
                    )}`}
                  >
                    {club.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-2 pb-4 flex-grow space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
                  {club.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {club.description}
                </p>

                <div className="pt-3 space-y-1.5 border-t border-gray-200/50 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    {club.facultyLead?.includes('Dr. Ritesh Kumar') ? (
                      <img src="/dr_ritesh_kumar.jpg" alt="Dr. Ritesh Kumar" className="w-5 h-5 rounded-full object-cover shrink-0 border border-blue-500/50" />
                    ) : (
                      <School className="w-4 h-4 text-blue-500" />
                    )}
                    <span>Faculty: {club.facultyLead}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    <span>Lead: {club.studentLead}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-3 px-2 pb-1">
                <button
                  onClick={() => handleView(club)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-white/20 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                >
                  View Club
                </button>
                <button
                  onClick={() => handleJoin(club)}
                  className="flex-1 py-2.5 liquid-gradient text-white rounded-xl text-xs font-bold hover:opacity-90 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1"
                >
                  Join Club <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-16 space-y-3 glass-card rounded-3xl p-8">
            <Search className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Clubs Found</h3>
            <p className="text-xs text-gray-500">
              Try adjusting your category filter or search query.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
