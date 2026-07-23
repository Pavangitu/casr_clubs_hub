import React, { useState } from 'react';
import { Shield, Users, Mail, Phone, Search, Landmark, UserCheck, Award, X } from 'lucide-react';

interface SchoolCoordinator {
  school: string;
  name: string;
  phone: string;
  email: string;
  responsibilities: string;
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

export const CommitteeView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const schoolCoordinators: SchoolCoordinator[] = [
    { school: 'SoET', name: 'Mrs. N. Jeevaratnam', phone: '8847882452', email: 'jeevartnam@cutm.ac.in', responsibilities: 'Responsible for all student activities related to Cultural, Social Responsibility, Extra-curricular, and Co-curricular activities in SoET.' },
    { school: 'MSSSoA', name: 'Mrs. Upasana Sahoo', phone: '7751875049', email: 'upasana.sahoo@cutm.ac.in', responsibilities: 'Coordinating and managing all matters related to students\' activities, conduct, and discipline in MSSSoA.' },
    { school: 'SoVAS', name: 'Dr. Gautam Kumar Ginjupalli', phone: '7680962616', email: 'gaoutam.ginjupalli@cutm.ac.in', responsibilities: 'Coordinating different extra-curricular and co-curricular events, competitions, and student affairs in SoVAS.' },
    { school: 'SoABE', name: 'Dr. Pratyush Kumar Das', phone: '9776327537', email: 'pratyush.das@cutm.ac.in', responsibilities: 'Coordinating CaSR policies, student activity participation, and hourly credits conversion in SoABE.' },
    { school: 'SoN', name: 'Mrs. Babyrani Pasupureddi', phone: '8179613709', email: 'Pasupureddi.babyrani@cutm.ac.in', responsibilities: 'Managing CaSR grades, student activity files, and record coordination for SoN.' },
    { school: 'SoM', name: 'Dr. Susanta Kumar Patnaik', phone: '7978380904', email: 'susanta.patnaik@cutm.ac.in', responsibilities: 'Overseeing CaSR cell approvals, student appreciation awards, and recommendations for SoM.' },
    { school: 'SoFS', name: 'Dr. Iffat Jahan', phone: '9820643503', email: 'iffat.jahan@cutm.ac.in', responsibilities: 'Maintaining CaSR databases, records, database audits, and event scheduling for SoFS.' }
  ];

  const studentCoordinators: StudentCoordinator[] = [
    { club: 'Dance Club', name: 'Jayshree Pradhan', regNo: '230804130174', phone: '+91 95082 14671', school: 'MSSSoA', branch: 'B.Sc. (Hons.) Agriculture' },
    { club: 'Dance Club', name: 'R. Yeswanth', regNo: '234723100066', phone: '7842292460', school: 'SoVAS', branch: 'BVSC & AH' },
    { club: 'Dance Club', name: 'Snehasree Hotta (Co-Coordinator)', regNo: '230804130045', phone: '+91 98611 65776', school: 'MSSSoA', branch: 'B.Sc. (Hons.) Agriculture' },
    { club: 'Music Club', name: 'Subhranshu Sekhar Dash', regNo: '230804130033', phone: '7894398250', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Music Club', name: 'Omm Sai Janmajaya Mishra', regNo: '234723100008', phone: '94370 15101', school: 'SoVAS', branch: 'BVSC' },
    { club: 'Movie Club', name: 'G. Pavan Datta', regNo: '230101120031', phone: '+91 82493 97556', school: 'SoET', branch: 'B.Tech CSE' },
    { club: 'Movie Club', name: 'Krutisundar Behera', regNo: '250804130042', phone: '9861153067', school: 'MSSSOA', branch: 'B.Sc. Agriculture' },
    { club: 'Photography Club', name: 'Tarun Teja Patra', regNo: '230101120008', phone: '+91 93901 04679', school: 'SoET', branch: 'B.Tech CSE' },
    { club: 'Photography Club', name: 'Sudip Ghosh', regNo: '240804130123', phone: '+91 83880 49602', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Photography Club', name: 'Buddiga Venkata Nikhil', regNo: '240804130099', phone: '+91 93478 75676', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Painting Club', name: 'Kuriti Tarun', regNo: '230804130155', phone: '9515247618', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Painting Club', name: 'Smita Rani', regNo: '250804130252', phone: '9142122013', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Painting Club', name: 'Jahnavi Dandi (Co-Coordinator)', regNo: '230804130189', phone: '7671830438', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Fashion Club', name: 'Srija Majumder', regNo: '240804130051', phone: '+91 81169 77448', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Drama Club', name: 'Krishnakumari Panigrahi', regNo: '230804130096', phone: '7849017273', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Drama Club', name: 'Jagyanseni Adhikari', regNo: '230804130041', phone: '8917535842', school: 'MSSSoA', branch: 'B.Sc. Agriculture' },
    { club: 'Agrifora', name: 'U. Venktesh Dora', regNo: '240804130023', phone: '9777554894', school: 'MSSSOA', branch: 'B.Sc. Agriculture (3rd Year)' },
    { club: 'Agrifora', name: 'Shradhanjali Das', regNo: '240804130017', phone: '9438568932', school: 'MSSSOA', branch: 'B.Sc. Agriculture (3rd Year)' },
    { club: 'Agrifora', name: 'Sourava Sahu', regNo: '250804130137', phone: '6372516398', school: 'MSSSOA', branch: 'B.Sc. Agriculture (2nd Year)' },
    { club: 'Agrifora', name: 'Debasmita Parida', regNo: '250804130133', phone: '6370638666', school: 'MSSSOA', branch: 'B.Sc. Agriculture (2nd Year)' },
    { club: 'Agrifora', name: 'Subham Patel', regNo: '250804130135', phone: '9337149949', school: 'MSSSOA', branch: 'B.Sc. Agriculture (2nd Year)' }
  ];

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
    { unit: 'NCC Officer', name: 'Dr. Parle Kalyan Chakravarty', dept: 'SoM & SoF', phone: '9439331442', email: 'pkchakravartey@cutm.ac.in' },
    { unit: 'NCC Officer', name: 'Miss Hauzoukim', dept: 'SoM & SoF', phone: '8131903630', email: 'hauzoukim@cutm.ac.in' },
    { unit: 'YRC Coordinator', name: 'Dr. Susanta Kumar Patnaik', dept: 'SoM', phone: '9437203916', email: 'susanta.patnaik@cutm.ac.in' }
  ];

  const filteredCoordinators = schoolCoordinators.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = studentCoordinators.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSocial = socialOfficers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 md:pt-28 pb-20 px-4 md:px-16 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" /> CaSR Governing Council
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          CaSR Execution Committee (CaEC)
        </h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Centurion University, Paralakhemundi Campus official committee in-charges and student club leaders directory.
        </p>
      </div>

      {/* Leadership Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="glass-card p-6 rounded-3xl border border-white/20 flex flex-col items-center text-center space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full flex items-center justify-center text-blue-600">
            <Award className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Dr. Ritesh Kumar</h3>
          <p className="text-xs text-blue-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Dean, Students\' Affairs</p>
          <p className="text-[11px] text-gray-500">Responsible for overall planning, coordination, and effective implementation of campus level CaSR initiatives.</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/20 flex flex-col items-center text-center space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full flex items-center justify-center text-emerald-600">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Mr. Paladugu Deep Joel</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">CaSR Intern & Nodal Point</p>
          <p className="text-[11px] text-gray-500">Nodal point of contact for execution coordination. Mob: 7382719395 • paladugudeep.joel@cutm.ac.in</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/20 flex flex-col items-center text-center space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full flex items-center justify-center text-purple-600">
            <Shield className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Dr. Anita Patra</h3>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">Registrar</p>
          <p className="text-[11px] text-gray-500">Governing approval, administrative validation, and official certification lead for CaSR programs.</p>
        </div>
      </section>

      {/* Directory Search */}
      <div className="max-w-md mx-auto relative flex items-center bg-white/60 dark:bg-slate-900/40 border border-gray-200 dark:border-white/10 rounded-full px-4 py-2.5 transition-all shadow-sm focus-within:shadow-md focus-within:shadow-blue-500/10">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, school, unit, or club..."
          className="w-full bg-transparent border-none text-xs md:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none font-medium"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Grid of Sub-Directories */}
      <div className="space-y-12">
        {/* School Coordinators */}
        {filteredCoordinators.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-white/10 pb-2">
              CaSR Coordinators of Different Schools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoordinators.map((c) => (
                <div key={c.school} className="glass-card p-5 rounded-2xl border border-white/20 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      {c.school}
                    </span>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{c.name}</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed pt-1">{c.responsibilities}</p>
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-gray-200/40 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      <span>{c.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-purple-500" />
                      <a href={`mailto:${c.email}`} className="hover:underline hover:text-blue-500">{c.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Units and Convenors */}
        {filteredSocial.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-white/10 pb-2">
              In-Charge of Social Units & NCC/YRC
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSocial.map((c, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border border-white/20 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300 font-bold uppercase tracking-wider">
                      {c.unit}
                    </span>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{c.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Department: {c.dept}</p>
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-gray-200/40 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400">
                    {c.phone !== '-' && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-blue-500" />
                        <span>{c.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-purple-500" />
                      <a href={`mailto:${c.email}`} className="hover:underline hover:text-blue-500">{c.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Club Coordinators */}
        {filteredStudents.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-white/10 pb-2">
              Official Student Club Coordinators
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-200/50 dark:border-white/10">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 dark:bg-slate-900/60 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200/50 dark:border-white/10">
                    <th className="p-4">Sl.</th>
                    <th className="p-4">Student Coordinator</th>
                    <th className="p-4">Club / Unit</th>
                    <th className="p-4 font-mono">Reg. Number</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">School & Branch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-white/5 text-gray-600 dark:text-gray-300">
                  {filteredStudents.map((s, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/20 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="p-4 font-medium">{idx + 1}</td>
                      <td className="p-4 font-bold text-gray-900 dark:text-white">{s.name}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-emerald-400 font-semibold text-[10px]">
                          {s.club}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-medium">{s.regNo}</td>
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
