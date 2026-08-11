import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Compass,
  Music,
  Palette,
  Film,
  Camera,
  BookOpen,
  Clapperboard,
  Heart,
  Flame,
  Award,
  Users,
  Target,
  Rocket,
  ShieldCheck,
  ChevronRight,
  Sparkle,
  UserCheck
} from 'lucide-react';

interface AboutViewProps {
  onNavigateToClubs?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateToClubs }) => {
  // Interactive 3D Tilt State for Hero Card
  const [heroTilt, setHeroTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setHeroTilt({ rotateX, rotateY, glowX, glowY });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  const clubSpaces = [
    {
      title: 'Music Club',
      icon: Music,
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      description: 'A space for budding vocalists and instrumentalists to practice and perform across traditional and contemporary genres.'
    },
    {
      title: 'Dance Club',
      icon: Heart,
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      description: 'Encourages expressive movement through classical, folk, and modern dance forms.'
    },
    {
      title: 'Drama Club',
      icon: Clapperboard,
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      description: 'Provides opportunities to explore acting, scriptwriting, direction, and stagecraft.'
    },
    {
      title: 'Painting & Art Club',
      icon: Palette,
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      description: 'Promotes visual creativity through sketching, painting, and experimental art.'
    },
    {
      title: 'Movie Club',
      icon: Film,
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      description: 'Encourages cinematic discussions, film screenings, and short-film production.'
    },
    {
      title: 'Studio & Media Club',
      icon: Camera,
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      description: 'Supports photography, video editing, digital storytelling, and other audio-visual activities.'
    },
    {
      title: 'Literature Club',
      icon: BookOpen,
      color: 'from-amber-500 to-yellow-400',
      shadow: 'shadow-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      description: 'Cultivates a passion for language, poetry, creative writing, and literary discussion.'
    }
  ];

  return (
    <div className="pt-24 md:pt-28 px-4 md:px-8 max-w-7xl mx-auto pb-20 space-y-12 animate-in fade-in duration-500">
      {/* 3D Floating Prism Crystals in Background */}
      <div className="fixed top-24 left-10 w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 backdrop-blur-2xl border border-amber-500/30 shadow-2xl prism-float-3d pointer-events-none hidden lg:block" />
      <div className="fixed bottom-24 right-10 w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-600/20 to-yellow-500/20 backdrop-blur-2xl border border-amber-500/30 shadow-2xl prism-float-3d pointer-events-none hidden lg:block" style={{ animationDelay: '-4s' }} />

      {/* Hero Header with 3D Tilt Card */}
      <motion.div
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        animate={{ rotateX: heroTilt.rotateX, rotateY: heroTilt.rotateY }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        className="glass-card backdrop-blur-3xl bg-white/95 dark:bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-slate-900 dark:text-white"
      >
        {/* Dynamic Specular Light Glare Follower */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${heroTilt.glowX}% ${heroTilt.glowY}%, rgba(245, 158, 11, 0.3) 0%, rgba(251, 191, 36, 0.15) 35%, transparent 70%)`
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Official Student Activity Centre</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            About <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400 bg-clip-text text-transparent">Odra Udaya</span> Student Activity Centre
          </h1>

          <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 max-w-3xl mx-auto font-extrabold leading-relaxed">
            Centurion University of Technology and Management, Paralakhemundi Campus
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 shadow-sm">
              <Compass className="w-4 h-4 text-amber-500" /> Creative Leadership
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 shadow-sm">
              <Flame className="w-4 h-4 text-amber-500" /> Cultural Expression
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 shadow-sm">
              <Rocket className="w-4 h-4 text-amber-500" /> Innovation & Development
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Narrative Section: Rising Spirit & Cultural Heartbeat (3D Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Symbol of Odra Udaya */}
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-white/90 dark:bg-zinc-950 text-slate-900 dark:text-white shadow-xl space-y-4 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-md">
            <Flame className="w-6 h-6" />
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            The Rising Spirit of Odisha
          </h2>

          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
            The term <strong className="text-amber-600 dark:text-amber-400 font-extrabold">“Odra Udaya”</strong> symbolizes the rising spirit of Odisha—a confluence of cultural heritage, creative expression, and youthful energy. The Centre provides an inclusive platform where tradition meets innovation, encouraging students to explore their talents and express themselves beyond the boundaries of academics.
          </p>

          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold pt-1">
            Odra Udaya Student Activity Centre is a vibrant hub for creative leadership, cultural expression, innovation, and holistic student development at Centurion University of Technology and Management, Paralakhemundi Campus.
          </p>
        </motion.div>

        {/* Card 2: Cultural Heartbeat */}
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-white/90 dark:bg-zinc-950 text-slate-900 dark:text-white shadow-xl space-y-4 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6" />
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            Creative & Cultural Heartbeat
          </h2>

          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
            The Centre serves as the creative and cultural heartbeat of student life, offering dedicated spaces for artistic, literary, and performance-based activities. It brings together students from diverse disciplines and provides opportunities to develop their skills through collaboration, experimentation, and self-driven initiatives.
          </p>

          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold pt-1">
            Students actively engage with the Centre beyond their academic hours through club meetings, rehearsals, collaborative sessions, workshops, performances, and creative projects. It provides a supportive environment where students can pursue their passions, build confidence, discover their voices, and refine their skills.
          </p>
        </motion.div>
      </div>

      {/* Clubs & Creative Spaces Showcase Grid */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-wider mb-1">
              <Users className="w-3.5 h-3.5" /> Campus Creative Ecosystem
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              Our Clubs & Creative Spaces
            </h2>
          </div>
          {onNavigateToClubs && (
            <button
              onClick={onNavigateToClubs}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white text-xs font-black shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Clubs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubSpaces.map((space, idx) => {
            const IconComp = space.icon;
            return (
              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5, scale: 1.015 }}
                className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-white/90 dark:bg-zinc-950 text-slate-900 dark:text-white shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-sm">
                      Active Space
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                    {space.title}
                  </h3>

                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                    {space.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* University Leadership Spotlight: Dr. Anita Patra */}
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-white/95 dark:bg-zinc-950 text-slate-900 dark:text-white shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
      >
        <div className="relative shrink-0">
          <img
            src="/dr_anita_patra.jpg"
            alt="Dr. Anita Patra"
            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
          />
          <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-black rounded-full shadow-lg">
            PATRON
          </span>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-black border border-amber-500/30">
            <Award className="w-3.5 h-3.5" /> University Leadership & Institutional Patron
          </div>
          <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white">
            Dr. Anita Patra
          </h3>
          <p className="text-xs md:text-sm font-bold text-amber-600 dark:text-amber-400">
            Registrar, Centurion University of Technology and Management
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl">
            Championing Cultural and Social Responsibility (CaSR) across all academic domains, guiding student development, and steering campus community excellence.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1 justify-center md:justify-start">
            <span className="text-slate-700 dark:text-slate-200">
              📧 registrar@cutm.ac.in
            </span>
            <span className="text-slate-700 dark:text-slate-200">
              📞 09437424149 / 07077580377
            </span>
          </div>
        </div>
      </motion.div>
      {/* University Leadership Spotlight: Dr. Ritesh Kumar */}
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-white/95 dark:bg-zinc-950 text-slate-900 dark:text-white shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
      >
        <div className="relative shrink-0">
          <img
            src="/dr_ritesh_kumar.jpg"
            alt="Dr. Ritesh Kumar"
            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
          />
          <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-black rounded-full shadow-lg">
            DEAN
          </span>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-black border border-amber-500/30">
            <Users className="w-3.5 h-3.5" /> Dean – Students' Affairs & Faculty Lead
          </div>
          <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white">
            Dr. Ritesh Kumar
          </h3>
          <p className="text-xs md:text-sm font-bold text-amber-600 dark:text-amber-400">
            Dean – Students' Affairs • Faculty In-Charge, CaSR Brushers Painting Club
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl">
            Overseeing student welfare, club operations, and artistic achievements across campus organizations while fostering student leadership and creative expression.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1 justify-center md:justify-start">
            <span className="text-slate-700 dark:text-slate-200">
              📧 ritesh.kumar@cutm.ac.in
            </span>
            <span className="text-slate-700 dark:text-slate-200">
              📞 8905222857
            </span>
          </div>
        </div>
      </motion.div>
      {/* CaSR Coordinator Spotlight: Mr. Deep Joel. P */}
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-white/95 dark:bg-zinc-950 text-slate-900 dark:text-white shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
      >
        <div className="relative shrink-0">
          <img
            src="/paladugu_deep_joel.jpg"
            alt="Mr. Deep Joel. P"
            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
          />
          <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-black rounded-full shadow-lg">
            COORDINATOR
          </span>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-black border border-amber-500/30">
            <UserCheck className="w-3.5 h-3.5" /> CaSR Coordinator & Event Executive
          </div>
          <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white">
            Mr. Deep Joel. P
          </h3>
          <p className="text-xs md:text-sm font-bold text-amber-600 dark:text-amber-400">
            CaSR Coordinator • Office of Dean – Students' Affairs
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl">
            Managing day-to-day student activity operations, hour-to-credit auditing, Google Sheet attendance syncs, and event executions across campus clubs.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1 justify-center md:justify-start">
            <span className="text-slate-700 dark:text-slate-200">
              📧 paladugudeep.joel@cutm.ac.in
            </span>
            <span className="text-slate-700 dark:text-slate-200">
              📞 8919108486
            </span>
          </div>
        </div>
      </motion.div>

      {/* Our Vision Card with Glassmorphic Prism & 3D Accent */}
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card p-8 md:p-12 rounded-3xl border border-amber-500/30 bg-white/95 dark:bg-zinc-950 text-slate-900 dark:text-white shadow-2xl space-y-6 relative overflow-hidden"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-md">
            <Target className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
              Core Mission & Philosophy
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mt-0.5">
              Our Vision
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold max-w-4xl">
          <p>
            <strong className="text-amber-600 dark:text-amber-400 font-extrabold">Odra Udaya</strong> is more than just a physical activity centre—it is a movement that empowers students to discover, create, collaborate, and contribute to the cultural identity of the campus.
          </p>
          <p>
            Through creativity, teamwork, leadership, and cultural engagement, the Centre reflects Centurion University’s commitment to developing well-rounded individuals who are prepared not only academically, but also creatively and socially.
          </p>
        </div>

        {/* 3D Glowing Banner Quote */}
        <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-center relative overflow-hidden shadow-md">
          <p className="text-sm md:text-lg font-black tracking-wide text-amber-700 dark:text-amber-300">
            “Odra Udaya — Where Creativity Meets Culture, Collaboration, and Student Leadership.”
          </p>
        </div>
      </motion.div>
    </div>
  );
};
