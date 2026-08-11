import React, { useState } from 'react';
import { Shield, Users, Mail, Phone, Search, Landmark, UserCheck, Award, X, Sparkles, Filter, ChevronRight, ChevronDown } from 'lucide-react';

interface SchoolCoordinator {
  school: string;
  name: string;
  phone: string;
  email: string;
  responsibilities: string;
  image?: string;
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
  image?: string;
}

interface SocialOfficer {
  unit: string;
  name: string;
  dept: string;
  phone: string;
  email: string;
  image?: string;
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
      responsibilities: 'Responsible for all student activities related to Cultural and Social Responsibility, Extra-curricular and Co-curricular activities along with different student clubs.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    {
      school: 'MSSSoA',
      name: 'Mrs. Upasana Sahoo',
      phone: '7751875049',
      email: 'upasana.sahoo@cutm.ac.in',
      responsibilities: 'Coordinating and managing all matters related to students\' activities, conduct and discipline. Coordinate with CaSR Coordinator and CaSR Student Coordinators to organize events.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    {
      school: 'SoVAS',
      name: 'Dr. Gautam Kumar Ginjupalli',
      phone: '7680962616',
      email: 'gaoutam.ginjupalli@cutm.ac.in',
      responsibilities: 'Coordinating different extra-curricular and co-curricular events, activities and competitions in SoVAS.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    {
      school: 'SoABE',
      name: 'Dr. Pratyush Kumar Das',
      phone: '9776327537',
      email: 'pratyush.das@cutm.ac.in',
      responsibilities: 'Creating awareness of CaSR policy, updating booklets, hour-to-credit conversions, and student attendance recommendation.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      school: 'SoN',
      name: 'Mrs. Pasupureddi Babyrani',
      phone: '8179613709',
      email: 'Pasupureddi.babyrani@cutm.ac.in',
      responsibilities: 'CaSR activity hour conversion to CaSR credit, final grade sheet publication, and student application recommendations for SoN.',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200'
    },
    {
      school: 'SoM',
      name: 'Dr. Susanta Kumar Patnaik',
      phone: '7978380904',
      email: 'susanta.patnaik@cutm.ac.in',
      responsibilities: 'Forwarding student applications to receive appreciation, awards, and CaSR Cell approvals for SoM.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    {
      school: 'SoFS',
      name: 'Dr. Iffat Jahan',
      phone: '9820643503',
      email: 'iffat.jahan@cutm.ac.in',
      responsibilities: 'Creating and maintaining database regarding student achievements and cooperating with Faculty In-Charges for event execution.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    }
  ];

  // 2. Faculty In-Charges of Different Student Clubs
  const facultyClubInCharges: FacultyClubInCharge[] = [
    { club: 'CaSR brushers painting club', name: 'Dr. Ritesh Kumar', dept: 'MSSSoA', email: 'ritesh.kumar@cutm.ac.in', phone: '8905222857', image: '/dr_ritesh_kumar.jpg' },
    { club: 'CaSR language', name: 'Dr. Amir Prasad Behera', dept: 'SoM', email: 'amir.prasad@cutm.ac.in', phone: '9438610887', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR harmony music club', name: 'Mr. Bikram Narayan & Dr. Ashirbachan Mahapatra', dept: 'SoET & MSSSoA', email: 'bikram.narayna@cutm.ac.in, ashirbachan.mahapatra@cutm.ac.in', phone: '9439874577 / 7008461263', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR snapshot photography club', name: 'Dr. Manish K. Yadav & Mr. Chinmay Nanda', dept: 'MSSSoA & SoF', email: 'manish.yadav@cutm.ac.in, chinmaya.nanda@cutm.ac.in', phone: '9696352193 / 9137499183', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR curtain hall drama club', name: 'Mr. Dwity Sundar Rout & Mr. Chandra Sekhar Sahu', dept: 'MSSSoA', email: 'dwity.sundar@cutm.ac.in, chandrasekhar.sahu@cutm.ac.in', phone: '9777726185 / 7978822300', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200' },
    { club: 'Agrifora students society', name: 'Dr. D. J. Gaikwad', dept: 'MSSSoA', email: 'gaikwad@cutm.ac.in', phone: '8093524042', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR frontliners', name: 'Dr. Parle Kalyan Chakravarty', dept: 'SoM', email: 'pkchakravarty@cutm.ac.in', phone: '9439331442', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR science and technology club', name: 'Dr. Pratyush Kumar Das & Dr. Bhadram Kalyan', dept: 'SoABE', email: 'pratyush.das@cutm.ac.in, bkalyan.chekraverthy@cutm.ac.in', phone: '9776327537', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR animal allies', name: 'Dr. F. Sebastin Raju', dept: 'SoVAS', email: 'sebastin.raju@cutm.ac.in', phone: '8870185123', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR content creators', name: 'Dr. Manish K. Yadav', dept: 'MSSSoA', email: 'manish.yadav@cutm.ac.in', phone: '9696352193', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR page turners', name: 'Dr. Anita Patra', dept: 'Humanities', email: 'anita.patra@cutm.ac.in', phone: '9438269572', image: '/dr_anita_patra.jpg' },
    { club: 'CaSR zyra fashion club', name: 'Mr. Victor Pradhan', dept: 'MSSSoA', email: 'victor.pradhan@cutm.ac.in', phone: '9937365635', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR coding club', name: 'Dr. Dhawaleswar Rao', dept: 'SoET', email: 'dhawaleswar.rao@cutm.ac.in', phone: '7779871797', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR robotics club', name: 'Dr. Prangya Parimita Pradhan & Mrs. N. Jeevaratnam', dept: 'SoET', email: 'prangya.pradhan@cutm.ac.in, jeevaratnam@cutm.ac.in', phone: '7978250836 / 8847882452', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR hackton', name: 'Dr. Abinash Gaya', dept: 'SoET', email: 'abinash.gaya@cutm.ac.in', phone: '7735363537', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR health club', name: 'Mrs. Pasupureddi Babyrani', dept: 'SoN', email: 'Pasupureddi.babyrani@cutm.ac.in', phone: '8179613709', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200' },
    { club: 'Eco sankalp', name: 'Dr. Bishnu Prasad Dash', dept: 'MSSSoA', email: 'bishnuprasad.dash@cutm.ac.in', phone: '8338076260', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { club: 'Drone club', name: 'Mr. Sameer Mahapatro', dept: 'MSSSoA', email: 'sameer.mahapatro@cutm.ac.in', phone: '8984139006', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR groovers dance club', name: 'Mrs. Upasana Sahoo, Dr. Pratyush Kumar Das, Mr. Sameer Mahapatro', dept: 'MSSSoA', email: 'upasana.sahoo@cutm.ac.in, pratyush.das@cutm.ac.in, sameer.mahapatro@cutm.ac.in', phone: '7751875049 / 9776327537 / 8984139006', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' }
  ];

  // 3. Social Units & Officers
  const socialOfficers: SocialOfficer[] = [
    { unit: 'NSS Programme Coordinating Officer', name: 'Dr. Nihal R.', dept: 'MSSSoA', phone: '7892922379', email: 'nihal.r@cutm.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Dr. Bishnu Prasad Dash', dept: 'MSSSoA', phone: '8338076260', email: 'bishnuprasad.dash@cutm.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Dr. D. J. Gaikwad', dept: 'MSSSoA', phone: '8093524042', email: 'gaikwad@cutm.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Dr. Prangya Parimita Pradhan', dept: 'SoET', phone: '7978250836', email: 'prangya.pradhan@cutm.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Dr. Rajshree Jena', dept: 'SoABE', phone: '-', email: 'rajshree.jena@cutm.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Mrs. N. Jeevaratnam', dept: 'SoET', phone: '8847882452', email: 'jeevaratnam@cutm.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Miss Swapnankita', dept: 'SoM', phone: '8763620399', email: 'swapnankita@cutm.ac.in', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Mr. Chinmay Nanda', dept: 'SoF', phone: '9137499183', email: 'chinmaya.nanda@cutm.ac.in', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Dr. K. Anthony Raju', dept: 'SoVAS', phone: '7093259970', email: 'anthony.raju@cutm.ac.in', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NSS Programme Officer', name: 'Prof. S. N. Sandhya', dept: 'SoN', phone: '76718 63691', email: 'singampalli.sandhya@cutm.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
    { unit: 'Finance Manager', name: 'Mr. Dibakar Alyan', dept: 'SoAS', phone: '9078580209', email: 'dibakar.allyana@cutm.ac.in', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
    { unit: 'NCC Officers', name: 'Dr. Parle Kalyan Chakravarty & Miss Hauzoukim', dept: 'SoM & SoF', phone: '9439331442 / 8131903630', email: 'pkchakravarty@cutm.ac.in, hauzoukim@cutm.ac.in', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
    { unit: 'YASR Coordinator', name: 'Dr. Susanta Kumar Patnaik', dept: 'SoM', phone: '9437203916', email: 'susanta.patnaik@cutm.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { unit: 'Convenor: Cultural', name: 'Dr. Ashirbachan Mahapatra & Dr. Susanta Kumar Patnaik', dept: 'MSSSoA & SoM', phone: '7008461263 / 9437203916', email: 'ashirbachan.mahapatra@cutm.ac.in, susanta.patnaik@cutm.ac.in', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
    { unit: 'Convenor: Social Responsibilities', name: 'Dr. Parle Kalyan Chakravarty', dept: 'SoM', phone: '9439331442', email: 'pkchakravarty@cutm.ac.in', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
    { unit: 'CaSR chandrabhanga creators In-Charge', name: 'Dr. Manish K. Yadav', dept: 'MSSSoA', phone: '9696352193', email: 'manish.yadav@cutm.ac.in', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' }
  ];

  // 4. Student Club Coordinators
  const studentCoordinators: StudentCoordinator[] = [
    { club: 'CaSR groovers dance club', name: 'Jayshree Pradhan', regNo: '230804130174', phone: '+91 95082 14671', school: 'MSSSoA', branch: 'B.Sc. (Hons.) Agriculture', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR groovers dance club', name: 'R. Yeswanth', regNo: '234723100066', phone: '7842292460', school: 'SoVAS', branch: 'BVSC & AH', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR groovers dance club', name: 'Snehasree Hotta (Co-Coordinator)', regNo: '230804130045', phone: '+91 98611 65776', school: 'MSSSoA', branch: 'B.Sc. (Hons.) Agriculture', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR harmony music club', name: 'Subhranshu Sekhar Dash', regNo: '230804130033', phone: '7894398250', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR harmony music club', name: 'Omm Sai Janmajaya Mishra', regNo: '234723100008', phone: '94370 15101', school: 'SoVAS', branch: 'BVSC', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR take one movie club', name: 'G. Pavan Datta', regNo: '230101120031', phone: '+91 82493 97556', school: 'SoET', branch: 'B.Tech CSE', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR take one movie club', name: 'Krutisundar Behera', regNo: '250804130042', phone: '9861153067', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR snapshot photography club', name: 'Tarun Teja Patra', regNo: '230101120008', phone: '+91 93901 04679', school: 'SoET', branch: 'B.Tech CSE', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR snapshot photography club', name: 'Sudip Ghosh', regNo: '240804130123', phone: '+91 83880 49602', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR snapshot photography club', name: 'Buddiga Venkata Nikhil', regNo: '240804130099', phone: '+91 93478 75676', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR brushers painting club', name: 'Kuriti Tarun', regNo: '230804130155', phone: '9515247618', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR brushers painting club', name: 'Smita Rani', regNo: '250804130252', phone: '9142122013', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR brushers painting club', name: 'Jahnavi Dandi (Co-Coordinator)', regNo: '230804130189', phone: '7671830438', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR zyra fashion club', name: 'Srija Majumder', regNo: '240804130051', phone: '+91 81169 77448', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR curtain hall drama club', name: 'Krishnakumari Panigrahi', regNo: '230804130096', phone: '7849017273', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
    { club: 'CaSR curtain hall drama club', name: 'Jagyanseni Adhikari', regNo: '230804130041', phone: '8917535842', school: 'MSSSoA', branch: 'B.Sc. Agriculture', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { club: 'Agrifora students society', name: 'U. Venktesh Dora', regNo: '240804130023', phone: '9777554894', school: 'MSSSoA', branch: 'B.Sc. Agriculture (3rd Year)', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
    { club: 'Agrifora students society', name: 'Shradhanjali Das', regNo: '240804130017', phone: '9438568932', school: 'MSSSoA', branch: 'B.Sc. Agriculture (3rd Year)', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200' },
    { club: 'Agrifora students society', name: 'Sourava Sahu', regNo: '250804130137', phone: '6372516398', school: 'MSSSoA', branch: 'B.Sc. Agriculture (2nd Year)', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { club: 'Agrifora students society', name: 'Debasmita Parida', regNo: '250804130133', phone: '6370638666', school: 'MSSSoA', branch: 'B.Sc. Agriculture (2nd Year)', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
    { club: 'Agrifora students society', name: 'Subham Patel', regNo: '250804130135', phone: '9337149949', school: 'MSSSoA', branch: 'B.Sc. Agriculture (2nd Year)', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }
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
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
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
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-500 dark:text-amber-400">
            Governing Hierarchy & Execution Flow
          </span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
            Leadership Command Structure
          </h2>
        </div>

        <div className="relative space-y-4 pt-2">
          {/* Step 1: Registrar */}
          <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-5 group hover:border-amber-500/60 transition-all">
            <div className="relative shrink-0">
              <img
                src="/dr_anita_patra.jpg"
                alt="Dr. Anita Patra"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-lg group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
                1
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-xl">Dr. Anita Patra</h3>
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  Registrar
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                Registrar, Centurion University of Technology & Management, Odisha
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-gray-600 dark:text-gray-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>09437424149, 07077580377</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <a href="mailto:registrar@cutm.ac.in" className="hover:underline font-semibold text-amber-600 dark:text-amber-400">
                    registrar@cutm.ac.in
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          {/* Connector 1 -> 2 */}
          <div className="flex justify-center -my-2 z-10 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-800 text-amber-500 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shadow">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Step 2: Dean, Students' Affairs */}
          <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-5 group hover:border-amber-500/60 transition-all">
            <div className="relative shrink-0">
              <img
                src="/dr_ritesh_kumar.jpg"
                alt="Dr. Ritesh Kumar"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-lg group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
                2
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-xl">Dr. Ritesh Kumar</h3>
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  Dean – Students Affairs
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                Dean-Students Affairs
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-gray-600 dark:text-gray-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>8905222857</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <a href="mailto:ritesh.kumar@cutm.ac.in" className="hover:underline font-semibold text-amber-600 dark:text-amber-400">
                    ritesh.kumar@cutm.ac.in
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Connector 2 -> 3 */}
          <div className="flex justify-center -my-2 z-10 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-800 text-amber-500 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shadow">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Step 3: Nodal Intern */}
          <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-5 group hover:border-amber-500/60 transition-all">
            <div className="relative shrink-0">
              <img
                src="/paladugu_deep_joel.jpg"
                alt="Mr. Deep Joel. P"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-lg group-hover:scale-105 transition-all duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
                3
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-xl">Mr. Deep Joel. P</h3>
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  CaSR Coordinator
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                CaSR Coordinator • Office of Dean – Students Affairs
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-gray-600 dark:text-gray-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>8919108486</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <a href="mailto:paladugudeep.joel@cutm.ac.in" className="hover:underline font-semibold text-amber-600 dark:text-amber-400">
                    paladugudeep.joel@cutm.ac.in
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-400 shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-amber-500/20">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, school, club, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-100 dark:bg-zinc-900/80 border border-gray-200 dark:border-amber-500/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 justify-center text-xs">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'ALL'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 border border-amber-500/20'
            }`}
          >
            All Members
          </button>
          <button
            onClick={() => setActiveTab('SCHOOL')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'SCHOOL'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 border border-amber-500/20'
            }`}
          >
            School Coordinators ({schoolCoordinators.length})
          </button>
          <button
            onClick={() => setActiveTab('FACULTY_CLUBS')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'FACULTY_CLUBS'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 border border-amber-500/20'
            }`}
          >
            Faculty In-Charges ({facultyClubInCharges.length})
          </button>
          <button
            onClick={() => setActiveTab('SOCIAL_UNITS')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'SOCIAL_UNITS'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 border border-amber-500/20'
            }`}
          >
            Social Officers ({socialOfficers.length})
          </button>
          <button
            onClick={() => setActiveTab('STUDENT_COORDINATORS')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'STUDENT_COORDINATORS'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 border border-amber-500/20'
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
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-extrabold text-xs shadow-sm">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">
                          {c.school}
                        </span>
                        <h4 className="font-bold text-gray-900 dark:text-white text-base leading-snug">{c.name}</h4>
                      </div>
                    </div>
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
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-extrabold text-xs shadow-sm">
                        <Users className="w-5 h-5" />
                      </div>
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
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-bold uppercase tracking-wider">
                      {c.unit}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-extrabold text-xs shadow-sm">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base leading-snug">{c.name}</h4>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">Department: {c.dept}</p>
                      </div>
                    </div>
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
                      <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-extrabold text-xs shadow-sm">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <span>{s.name}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold text-[11px]">
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
