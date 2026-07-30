import React, { useState } from 'react';
import { Shield, Users, Mail, Phone, Search, Landmark, UserCheck, Award, X, Sparkles, Filter, ChevronRight, ChevronDown } from 'lucide-react';

interface SchoolCoordinator {
  school: string;
  name: string;
  phone: string;
  email: string;
  responsibilities: string;
}

interface FacultyClubInCharge {
  club: string;
  name: string;
  dept: string;
  email: string;
  phone: string;
  responsibilities?: string;
  image?: string;
}

interface StudentCoordinator {
  club: string;
  name: string;
  regNo: string;
  phone: string;
  school: string;
  branch: string;
}

interface SocialOfficer {
  unit: string;
  name: string;
  dept: string;
  phone: string;
  email: string;
}

interface CommitteeViewProps {
  compactPadding?: boolean;
}

export const CommitteeView: React.FC<CommitteeViewProps> = ({ compactPadding = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'SCHOOL' | 'FACULTY_CLUBS' | 'SOCIAL_UNITS' | 'STUDENT_COORDINATORS'>('ALL');

  // 1. CaSR Coordinators of Different Schools
  const schoolCoordinators: SchoolCoordinator[] = [
    {
      school: 'SoET',
      name: 'Mrs. N. Jeevaratnam',
      phone: '8847882452',
      email: 'jeevaratnam@cutm.ac.in',
      responsibilities: 'Responsible for all student activities related to Cultural and Social Responsibility, Extra-curricular and Co-curricular activities along with different student clubs.'
    },
    {
      school: 'MSSSoA',
      name: 'Mrs. Upasana Sahoo',
      phone: '7751875049',
      email: 'upasana.sahoo@cutm.ac.in',
      responsibilities: 'Coordinating and managing all matters related to students\' activities, conduct and discipline. Coordinate with CaSR Coordinator and CaSR Student Coordinators to organize events.'
    },
    {
      school: 'SoVAS',
      name: 'Dr. Gautam Kumar Ginjupalli',
      phone: '7680962616',
      email: 'gaoutam.ginjupalli@cutm.ac.in',
      responsibilities: 'Coordinating different extra-curricular and co-curricular events, activities and competitions in SoVAS.'
    },
    {
      school: 'SoABE',
      name: 'Dr. Pratyush Kumar Das',
      phone: '9776327537',
      email: 'pratyush.das@cutm.ac.in',
      responsibilities: 'Creating awareness of CaSR policy, updating booklets, hour-to-credit conversions, and student attendance recommendation.'
    },
    {
      school: 'SoN',
      name: 'Mrs. Pasupureddi Babyrani',
      phone: '8179613709',
      email: 'Pasupureddi.babyrani@cutm.ac.in',
      responsibilities: 'CaSR activity hour conversion to CaSR credit, final grade sheet publication, and student application recommendations for SoN.'
    },
    {
      school: 'SoM',
      name: 'Dr. Susanta Kumar Patnaik',
      phone: '7978380904',
      email: 'susanta.patnaik@cutm.ac.in',
      responsibilities: 'Forwarding student applications to receive appreciation, awards, and CaSR Cell approvals for SoM.'
    },
    {
      school: 'SoFS',
      name: 'Dr. Iffat Jahan',
      phone: '9820643503',
      email: 'iffat.jahan@cutm.ac.in',
      responsibilities: 'Creating and maintaining database regarding student achievements and cooperating with Faculty In-Charges for event execution.'
    }
  ];

  // 2. Faculty In-Charges of Different Student Clubs
  const facultyClubInCharges: FacultyClubInCharge[] = [
    { club: 'Painting Club', name: 'Dr. Ritesh Kumar', dept: 'MSSSoA', email: 'ritesh.kumar@cutm.ac.in', phone: '8905222857', image: '/dr_ritesh_kumar.jpg' },
    { club: 'Language Club', name: 'Dr. Amir Prasad Behera', dept: 'SoM', email: 'amir.prasad@cutm.ac.in', phone: '9438610887' },
    { club: 'Music Club', name: 'Mr. Bikram Narayan & Dr. Ashirbachan Mahapatra', dept: 'SoET & MSSSoA', email: 'bikram.narayna@cutm.ac.in, ashirbachan.mahapatra@cutm.ac.in', phone: '9439874577 / 7008461263' },
    { club: 'Photography Club', name: 'Dr. Manish K. Yadav & Mr. Chinmay Nanda', dept: 'MSSSoA & SoF', email: 'manish.yadav@cutm.ac.in, chinmaya.nanda@cutm.ac.in', phone: '9696352193 / 9137499183' },
    { club: 'Drama Club', name: 'Mr. Dwity Sundar Rout & Mr. Chandra Sekhar Sahu', dept: 'MSSSoA', email: 'dwity.sundar@cutm.ac.in, chandrasekhar.sahu@cutm.ac.in', phone: '9777726185 / 7978822300' },
    { club: 'Agrifora Club', name: 'Dr. D. J. Gaikwad', dept: 'MSSSoA', email: 'gaikwad@cutm.ac.in', phone: '8093524042' },
    { club: 'Gender Equality Club', name: 'Miss Swapnankita', dept: 'SoM', email: 'swapnankita@cutm.ac.in', phone: '8763620399' },
    { club: 'Science & Technology Club', name: 'Dr. Pratyush Kumar Das & Dr. Bhadram Kalyan', dept: 'SoABE', email: 'pratyush.das@cutm.ac.in, bkalyan.chekraverthy@cutm.ac.in', phone: '9776327537' },
    { club: 'Animal Welfare Club', name: 'Dr. F. Sebastin Raju', dept: 'SoVAS', email: 'sebastin.raju@cutm.ac.in', phone: '8870185123' },
    { club: 'Yoga & Fitness Club', name: 'Dr. Balaji Padhy', dept: 'SoAS', email: 'balaji.padhy@cutm.ac.in', phone: '8093875271' },
    { club: 'Spiritual Club', name: 'Dr. Prafulla Panda', dept: 'SoET', email: 'prafullapanda@cutm.ac.in', phone: '9438269572' },
    { club: 'Fashion Club', name: 'Mr. Victor Pradhan', dept: 'MSSSoA', email: 'victor.pradhan@cutm.ac.in', phone: '9937365635' },
    { club: 'Coding Club', name: 'Dr. Dhawaleswar Rao', dept: 'SoET', email: 'dhawaleswar.rao@cutm.ac.in', phone: '7779871797' },
    { club: 'Robotics Club', name: 'Dr. Prangya Parimita Pradhan & Mrs. N. Jeevaratnam', dept: 'SoET', email: 'prangya.pradhan@cutm.ac.in, jeevaratnam@cutm.ac.in', phone: '7978250836 / 8847882452' },
    { club: 'Hackathon Club', name: 'Dr. Abinash Gaya', dept: 'SoET', email: 'abinash.gaya@cutm.ac.in', phone: '7735363537' },
    { club: 'Health Club', name: 'Mrs. Pasupureddi Babyrani', dept: 'SoN', email: 'Pasupureddi.babyrani@cutm.ac.in', phone: '8179613709' },
    { club: 'EcoSankalp Club', name: 'Dr. Bishnu Prasad Dash', dept: 'MSSSoA', email: 'bishnuprasad.dash@cutm.ac.in', phone: '8338076260' },
    { club: 'Drone Club', name: 'Mr. Sameer Mahapatro', dept: 'MSSSoA', email: 'sameer.mahapatro@cutm.ac.in', phone: '8984139006' },
    { club: 'Dance Club', name: 'Mrs. Upasana Sahoo, Dr. Pratyush Kumar Das, Mr. Sameer Mahapatro', dept: 'MSSSoA', email: 'upasana.sahoo@cutm.ac.in, pratyush.das@cutm.ac.in, sameer.mahapatro@cutm.ac.in', phone: '7751875049 / 9776327537 / 8984139006' }
  ];

  // 3. Social Units & Officers
  const socialOfficers: SocialOfficer[] = [
    { unit: 'NSS Programme Coordinating Officer', name: 'Dr. Nihal R.', dept: 'MSSSoA', phone: '7892922379', email: 'nihal.r@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Dr. Bishnu Prasad Dash', dept: 'MSSSoA', phone: '8338076260', email: 'bishnuprasad.dash@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Dr. D. J. Gaikwad', dept: 'MSSSoA', phone: '8093524042', email: 'gaikwad@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Dr. Prangya Parimita Pradhan', dept: 'SoET', phone: '7978250836', email: 'prangya.pradhan@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Dr. Rajshree Jena', dept: 'SoABE', phone: '-', email: 'rajshree.jena@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Mrs. N. Jeevaratnam', dept: 'SoET', phone: '8847882452', email: 'jeevaratnam@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Miss Swapnankita', dept: 'SoM', phone: '8763620399', email: 'swapnankita@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Mr. Chinmay Nanda', dept: 'SoF', phone: '9137499183', email: 'chinmaya.nanda@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Dr. K. Anthony Raju', dept: 'SoVAS', phone: '7093259970', email: 'anthony.raju@cutm.ac.in' },
    { unit: 'NSS Programme Officer', name: 'Prof. S. N. Sandhya', dept: 'SoN', phone: '76718 63691', email: 'singampalli.sandhya@cutm.ac.in' },
    { unit: 'Finance Manager', name: 'Mr. Dibakar Alyan', dept: 'SoAS', phone: '9078580209', email: 'dibakar.allyana@cutm.ac.in' },
    { unit: 'NCC Officers', name: 'Dr. Parle Kalyan Chakravarty & Miss Hauzoukim', dept: 'SoM & SoF', phone: '9439331442 / 8131903630', email: 'pkchakravarty@cutm.ac.in, hauzoukim@cutm.ac.in' },
    { unit: 'YRC Coordinator', name: 'Dr. Susanta Kumar Patnaik', dept: 'SoM', phone: '9437203916', email: 'susanta.patnaik@cutm.ac.in' },
    { unit: 'Convenor: Cultural', name: 'Dr. Ashirbachan Mahapatra & Dr. Susanta Kumar Patnaik', dept: 'MSSSoA & SoM', phone: '7008461263 / 9437203916', email: 'ashirbachan.mahapatra@cutm.ac.in, susanta.patnaik@cutm.ac.in' },
    { unit: 'Convenor: Social Responsibilities', name: 'Dr. Parle Kalyan Chakravarty', dept: 'SoM', phone: '9439331442', email: 'pkchakravarty@cutm.ac.in' },
    { unit: 'Chandrabhasa Magazine In-Charge', name: 'Dr. Manish K. Yadav', dept: 'MSSSoA', phone: '9696352193', email: 'manish.yadav@cutm.ac.in' }
  ];

  // 4. Student Club Coordinators
  const studentCoordinators: StudentCoordinator[] = [
    { club: 'Dance Club', name: 'Jayshree Pradhan', regNo: '230804130174', phone: '+91 95082 14671', school: 'MSSSoA', branch: 'B.Sc. (Hons.) Agriculture' },
    { club: 'Dance Club', name: 'R. Yeswanth', regNo: '234723100066', phone: '7842292460', school: 'SoVAS', branch: 'BVSC & AH' },
    { club: 'Dance Club', name: 'Snehasree Hotta (Co-Coordinator)', regNo: '230804130045', phone: '+91 98611 65776', school: 'MSSSoA', branch: 'B.Sc. (Hons.) Agriculture' },
    { club: 'Music Club', name: 'Subhranshu Sekhar Dash', regNo: '230804130033', phone: '7894398250', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Music Club', name: 'Omm Sai Janmajaya Mishra', regNo: '234723100008', phone: '94370 15101', school: 'SoVAS', branch: 'BVSC' },
    { club: 'Movie Club', name: 'G. Pavan Datta', regNo: '230101120031', phone: '+91 82493 97556', school: 'SoET', branch: 'B.Tech CSE' },
    { club: 'Movie Club', name: 'Krutisundar Behera', regNo: '250804130042', phone: '9861153067', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Photography Club', name: 'Tarun Teja Patra', regNo: '230101120008', phone: '+91 93901 04679', school: 'SoET', branch: 'B.Tech CSE' },
    { club: 'Photography Club', name: 'Sudip Ghosh', regNo: '240804130123', phone: '+91 83880 49602', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Photography Club', name: 'Buddiga Venkata Nikhil', regNo: '240804130099', phone: '+91 93478 75676', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Painting Club', name: 'Kuriti Tarun', regNo: '230804130155', phone: '9515247618', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Painting Club', name: 'Smita Rani', regNo: '250804130252', phone: '9142122013', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Painting Club', name: 'Jahnavi Dandi (Co-Coordinator)', regNo: '230804130189', phone: '7671830438', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Fashion Club', name: 'Srija Majumder', regNo: '240804130051', phone: '+91 81169 77448', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Drama Club', name: 'Krishnakumari Panigrahi', regNo: '230804130096', phone: '7849017273', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Drama Club', name: 'Jagyanseni Adhikari', regNo: '230804130041', phone: '8917535842', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Agrifora', name: 'U. Venktesh Dora', regNo: '240804130023', phone: '9777554894', school: 'MSSSoA', branch: 'B.Sc. Agriculture (3rd Year)' },
    { club: 'Agrifora', name: 'Shradhanjali Das', regNo: '240804130017', phone: '9438568932', school: 'MSSSoA', branch: 'B.Sc. Agriculture (3rd Year)' },
    { club: 'Agrifora', name: 'Sourava Sahu', regNo: '250804130137', phone: '6372516398', school: 'MSSSoA', branch: 'B.Sc. Agriculture (2nd Year)' },
    { club: 'Agrifora', name: 'Debasmita Parida', regNo: '250804130133', phone: '6370638666', school: 'MSSSoA', branch: 'B.Sc. Agriculture (2nd Year)' },
    { club: 'Agrifora', name: 'Subham Patel', regNo: '250804130135', phone: '9337149949', school: 'MSSSoA', branch: 'B.Sc. Agriculture (2nd Year)' }
  ];

  const filteredSchoolCoordinators = schoolCoordinators.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFacultyClubs = facultyClubInCharges.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSocial = socialOfficers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = studentCoordinators.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${compactPadding ? 'pt-4 md:pt-6 pb-12' : 'pt-24 md:pt-28 pb-20'} px-4 md:px-16 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" /> Official Directory (Letter No: CUTM/Reg.Off./CASR/154/2026)
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          CaSR Execution Committee (CaEC)
        </h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Centurion University of Technology and Management, Paralakhemundi Campus official committee coordinators, faculty in-charges, and student leaders.
        </p>
      </div>

      {/* Step-wise Leadership Command Structure */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            Governing Hierarchy & Execution Flow
          </span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
            Leadership Command Structure
          </h2>
        </div>

        <div className="relative space-y-4 pt-2">
          {/* Step 1: Registrar */}
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-purple-500/5 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-5 group hover:border-purple-500/60 transition-all">
            <div className="relative shrink-0">
              <img
                src="/dr_anita_patra.jpg"
                alt="Dr. Anita Patra"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover object-center border-2 border-purple-500/60 shadow-lg group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                1
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-xl">Dr. Anita Patra</h3>
                <span className="px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
                  Registrar • Top Authority
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Governing approval, administrative validation, policy authorization, and official certification lead for all CaSR programs across Centurion University.
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          {/* Connector 1 -> 2 */}
          <div className="flex justify-center -my-2 z-10 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center shadow">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Step 2: Dean, Students' Affairs */}
          <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-blue-500/5 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-5 group hover:border-blue-500/60 transition-all">
            <div className="relative shrink-0">
              <img
                src="/dr_ritesh_kumar.jpg"
                alt="Dr. Ritesh Kumar"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover object-center border-2 border-blue-500/60 shadow-lg group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                2
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-xl">Dr. Ritesh Kumar</h3>
                <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                  Dean, Students' Affairs • Executive Lead
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Responsible for overall planning, strategic coordination, and effective execution of campus-level CaSR initiatives, events, and student affairs.
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Connector 2 -> 3 */}
          <div className="flex justify-center -my-2 z-10 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center shadow">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Step 3: Nodal Intern */}
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-5 group hover:border-emerald-500/60 transition-all">
            <div className="relative shrink-0">
              <img
                src="/paladugu_deep_joel.jpg"
                alt="Mr. Paladugu Deep Joel"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover object-center border-2 border-emerald-500/60 shadow-lg group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                3
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-xl">Mr. Paladugu Deep Joel</h3>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                  CaSR Intern & Nodal Point • Operational Contact
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Nodal point of contact for execution coordination, daily operational management, and student communication. <span className="font-bold text-emerald-600 dark:text-emerald-400">Mob: 7382719395 • paladugudeep.joel@cutm.ac.in</span>
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Directory Search & Filter Tabs */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="relative flex items-center bg-white/70 dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 transition-all shadow-md focus-within:shadow-lg focus-within:border-blue-500">
          <Search className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coordinators, faculty club in-charges, schools, units..."
            className="w-full bg-transparent border-none text-xs md:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Section Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'ALL'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            All Committee Members
          </button>
          <button
            onClick={() => setActiveTab('SCHOOL')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'SCHOOL'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            School Coordinators ({schoolCoordinators.length})
          </button>
          <button
            onClick={() => setActiveTab('FACULTY_CLUBS')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'FACULTY_CLUBS'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Faculty In-Charges ({facultyClubInCharges.length})
          </button>
          <button
            onClick={() => setActiveTab('SOCIAL_UNITS')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'SOCIAL_UNITS'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Social Units & NCC/YRC ({socialOfficers.length})
          </button>
          <button
            onClick={() => setActiveTab('STUDENT_COORDINATORS')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'STUDENT_COORDINATORS'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Student Coordinators ({studentCoordinators.length})
          </button>
        </div>
      </div>

      {/* Main Sections */}
      <div className="space-y-14">
        {/* 1. School Coordinators */}
        {(activeTab === 'ALL' || activeTab === 'SCHOOL') && filteredSchoolCoordinators.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-white/10 pb-2 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-500" /> CaSR Coordinators of Different Schools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchoolCoordinators.map((c) => (
                <div key={c.school} className="glass-card p-5 rounded-2xl border border-white/20 space-y-3 flex flex-col justify-between hover:shadow-xl transition-all">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">
                      {c.school}
                    </span>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">{c.name}</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed pt-1">{c.responsibilities}</p>
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-gray-200/40 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      <span>{c.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-purple-500" />
                      <a href={`mailto:${c.email}`} className="hover:underline hover:text-blue-500 font-semibold">{c.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Faculty In-Charges of Student Clubs */}
        {(activeTab === 'ALL' || activeTab === 'FACULTY_CLUBS') && filteredFacultyClubs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-white/10 pb-2">
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" /> Faculty In-Charges of Student Clubs
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300">
                19 Clubs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacultyClubs.map((fc, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border border-white/20 space-y-3 flex flex-col justify-between hover:shadow-xl transition-all">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 font-extrabold uppercase tracking-wider">
                        {fc.club}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 font-mono">{fc.dept}</span>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      {fc.image && (
                        <img 
                          src={fc.image} 
                          alt={fc.name} 
                          className="w-12 h-12 rounded-xl object-cover object-center border-2 border-purple-500/50 shadow-md shrink-0"
                        />
                      )}
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base leading-snug">
                        {fc.name}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-gray-200/40 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{fc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Mail className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <a href={`mailto:${fc.email.split(',')[0]}`} className="hover:underline hover:text-blue-500 font-semibold truncate">
                        {fc.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. In-Charge of Social Units & NCC/YRC/Convenors */}
        {(activeTab === 'ALL' || activeTab === 'SOCIAL_UNITS') && filteredSocial.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-white/10 pb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" /> In-Charge of Social Units, NCC, YRC & Convenors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSocial.map((c, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border border-white/20 space-y-3 flex flex-col justify-between hover:shadow-xl transition-all">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-bold uppercase tracking-wider">
                      {c.unit}
                    </span>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{c.name}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase">Department: {c.dept}</p>
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-gray-200/40 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                    {c.phone !== '-' && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-blue-500" />
                        <span>{c.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Mail className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <a href={`mailto:${c.email.split(',')[0]}`} className="hover:underline hover:text-blue-500 font-semibold truncate">{c.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Student Club Coordinators */}
        {(activeTab === 'ALL' || activeTab === 'STUDENT_COORDINATORS') && filteredStudents.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-white/10 pb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" /> Official Student Club Coordinators
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 dark:bg-slate-900/80 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[11px] border-b border-gray-200/50 dark:border-white/10">
                    <th className="p-4">Sl.</th>
                    <th className="p-4">Student Coordinator</th>
                    <th className="p-4">Club / Unit</th>
                    <th className="p-4 font-mono">Reg. Number</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">School & Branch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-white/5 text-gray-600 dark:text-gray-300 font-medium">
                  {filteredStudents.map((s, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-semibold text-gray-400">{idx + 1}</td>
                      <td className="p-4 font-bold text-gray-900 dark:text-white">{s.name}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 font-bold text-[11px]">
                          {s.club}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200">{s.regNo}</td>
                      <td className="p-4">{s.phone}</td>
                      <td className="p-4 text-[11px]">{s.school} • {s.branch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
