import { AcademicStudentProfile } from '../types';

export const INITIAL_ACADEMIC_STUDENTS: AcademicStudentProfile[] = [
  {
    registrationNumber: "23CSE12345",
    name: "Pavan Datta Gedila",
    rollNumber: "230101042",
    branch: "Computer Science & Engineering",
    department: "Dept. of Computer Science & Engineering",
    semester: 5,
    section: "Sec A",
    academicYear: "2024 - 2025",
    email: "pavan.gedila@casr.edu.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    overallAttendancePercentage: 92,
    todayAttendanceStatus: "Present",
    totalClasses: 250,
    classesAttended: 230,
    classesMissed: 20,
    subjectWiseAttendance: [
      {
        subjectCode: "CS501",
        subjectName: "Computer Networks",
        attendedClasses: 48,
        totalClasses: 50,
        percentage: 95,
        facultyName: "Dr. A. K. Sharma"
      },
      {
        subjectCode: "CS502",
        subjectName: "DBMS",
        attendedClasses: 46,
        totalClasses: 50,
        percentage: 91,
        facultyName: "Prof. S. R. Rao"
      },
      {
        subjectCode: "CS503",
        subjectName: "Operating Systems",
        attendedClasses: 47,
        totalClasses: 50,
        percentage: 94,
        facultyName: "Dr. Nihal R."
      },
      {
        subjectCode: "CS504",
        subjectName: "Artificial Intelligence",
        attendedClasses: 48,
        totalClasses: 50,
        percentage: 96,
        facultyName: "Dr. Pratyush Kumar Das"
      },
      {
        subjectCode: "CS505",
        subjectName: "Java Programming",
        attendedClasses: 45,
        totalClasses: 50,
        percentage: 90,
        facultyName: "Mrs. Upasana Sahoo"
      }
    ],
    monthlyAttendance: [
      { month: "May", percentage: 90, attended: 45, total: 50 },
      { month: "Jun", percentage: 92, attended: 46, total: 50 },
      { month: "Jul", percentage: 94, attended: 47, total: 50 },
      { month: "Aug", percentage: 91, attended: 45, total: 50 },
      { month: "Sep", percentage: 95, attended: 47, total: 50 }
    ],
    recentLogs: [
      { id: "log-1", date: "Today", subject: "Computer Networks", status: "Present", time: "09:30 AM" },
      { id: "log-2", date: "Today", subject: "DBMS", status: "Present", time: "11:00 AM" },
      { id: "log-3", date: "Yesterday", subject: "Operating Systems", status: "Present", time: "10:15 AM" },
      { id: "log-4", date: "Yesterday", subject: "Java Programming", status: "Present", time: "02:00 PM" },
      { id: "log-5", date: "23 Jul 2026", subject: "Artificial Intelligence", status: "Present", time: "01:15 PM" }
    ]
  },
  {
    registrationNumber: "230101120031",
    name: "G Pavan Datta",
    rollNumber: "230101120031",
    branch: "Computer Science & Engineering",
    department: "Dept. of Computer Science & Engineering",
    semester: 5,
    section: "Sec B",
    academicYear: "2024 - 2025",
    email: "pavandattagedila@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    overallAttendancePercentage: 88,
    todayAttendanceStatus: "Present",
    totalClasses: 250,
    classesAttended: 220,
    classesMissed: 30,
    subjectWiseAttendance: [
      { subjectCode: "CS501", subjectName: "Computer Networks", attendedClasses: 45, totalClasses: 50, percentage: 90, facultyName: "Dr. A. K. Sharma" },
      { subjectCode: "CS502", subjectName: "DBMS", attendedClasses: 43, totalClasses: 50, percentage: 86, facultyName: "Prof. S. R. Rao" },
      { subjectCode: "CS503", subjectName: "Operating Systems", attendedClasses: 44, totalClasses: 50, percentage: 88, facultyName: "Dr. Nihal R." },
      { subjectCode: "CS504", subjectName: "Artificial Intelligence", attendedClasses: 46, totalClasses: 50, percentage: 92, facultyName: "Dr. Pratyush Kumar Das" },
      { subjectCode: "CS505", subjectName: "Java Programming", attendedClasses: 42, totalClasses: 50, percentage: 84, facultyName: "Mrs. Upasana Sahoo" }
    ],
    monthlyAttendance: [
      { month: "May", percentage: 86, attended: 43, total: 50 },
      { month: "Jun", percentage: 88, attended: 44, total: 50 },
      { month: "Jul", percentage: 90, attended: 45, total: 50 },
      { month: "Aug", percentage: 86, attended: 43, total: 50 },
      { month: "Sep", percentage: 90, attended: 45, total: 50 }
    ],
    recentLogs: [
      { id: "glog-1", date: "Today", subject: "Computer Networks", status: "Present", time: "09:30 AM" },
      { id: "glog-2", date: "Today", subject: "DBMS", status: "Present", time: "11:00 AM" },
      { id: "glog-3", date: "Yesterday", subject: "Operating Systems", status: "Present", time: "10:15 AM" }
    ]
  },
  {
    registrationNumber: "23CSE12346",
    name: "Ananya Sharma",
    rollNumber: "230101043",
    branch: "Computer Science & Engineering",
    department: "Dept. of Computer Science & Engineering",
    semester: 5,
    section: "Sec A",
    academicYear: "2024 - 2025",
    email: "ananya.sharma@casr.edu.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    overallAttendancePercentage: 96,
    todayAttendanceStatus: "Present",
    totalClasses: 250,
    classesAttended: 240,
    classesMissed: 10,
    subjectWiseAttendance: [
      { subjectCode: "CS501", subjectName: "Computer Networks", attendedClasses: 49, totalClasses: 50, percentage: 98, facultyName: "Dr. A. K. Sharma" },
      { subjectCode: "CS502", subjectName: "DBMS", attendedClasses: 48, totalClasses: 50, percentage: 96, facultyName: "Prof. S. R. Rao" },
      { subjectCode: "CS503", subjectName: "Operating Systems", attendedClasses: 47, totalClasses: 50, percentage: 94, facultyName: "Dr. Nihal R." },
      { subjectCode: "CS504", subjectName: "Artificial Intelligence", attendedClasses: 48, totalClasses: 50, percentage: 96, facultyName: "Dr. Pratyush Kumar Das" },
      { subjectCode: "CS505", subjectName: "Java Programming", attendedClasses: 48, totalClasses: 50, percentage: 96, facultyName: "Mrs. Upasana Sahoo" }
    ],
    monthlyAttendance: [
      { month: "May", percentage: 94, attended: 47, total: 50 },
      { month: "Jun", percentage: 96, attended: 48, total: 50 },
      { month: "Jul", percentage: 98, attended: 49, total: 50 },
      { month: "Aug", percentage: 96, attended: 48, total: 50 },
      { month: "Sep", percentage: 96, attended: 48, total: 50 }
    ],
    recentLogs: [
      { id: "anlog-1", date: "Today", subject: "Computer Networks", status: "Present", time: "09:30 AM" },
      { id: "anlog-2", date: "Today", subject: "DBMS", status: "Present", time: "11:00 AM" }
    ]
  },
  {
    registrationNumber: "23ECE10022",
    name: "Rahul Verma",
    rollNumber: "230102015",
    branch: "Electronics & Communication Eng.",
    department: "Dept. of ECE",
    semester: 5,
    section: "Sec A",
    academicYear: "2024 - 2025",
    email: "rahul.verma@casr.edu.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    overallAttendancePercentage: 71,
    todayAttendanceStatus: "Absent",
    totalClasses: 250,
    classesAttended: 178,
    classesMissed: 72,
    subjectWiseAttendance: [
      { subjectCode: "EC501", subjectName: "Digital Signal Processing", attendedClasses: 35, totalClasses: 50, percentage: 70, facultyName: "Dr. V. K. Mishra" },
      { subjectCode: "EC502", subjectName: "VLSI Design", attendedClasses: 36, totalClasses: 50, percentage: 72, facultyName: "Prof. M. B. Sen" },
      { subjectCode: "EC503", subjectName: "Microcontrollers", attendedClasses: 34, totalClasses: 50, percentage: 68, facultyName: "Dr. Ritesh Kumar" },
      { subjectCode: "EC504", subjectName: "Electromagnetic Fields", attendedClasses: 38, totalClasses: 50, percentage: 76, facultyName: "Dr. Manish K. Yadav" },
      { subjectCode: "EC505", subjectName: "Communication Systems", attendedClasses: 35, totalClasses: 50, percentage: 70, facultyName: "Mr. Victor Pradhan" }
    ],
    monthlyAttendance: [
      { month: "May", percentage: 70, attended: 35, total: 50 },
      { month: "Jun", percentage: 68, attended: 34, total: 50 },
      { month: "Jul", percentage: 74, attended: 37, total: 50 },
      { month: "Aug", percentage: 72, attended: 36, total: 50 },
      { month: "Sep", percentage: 72, attended: 36, total: 50 }
    ],
    recentLogs: [
      { id: "rvlog-1", date: "Today", subject: "Digital Signal Processing", status: "Absent", time: "09:30 AM" }
    ]
  },
  {
    registrationNumber: "23ME10015",
    name: "Siddharth Patel",
    rollNumber: "230103008",
    branch: "Mechanical Engineering",
    department: "Dept. of Mechanical Eng.",
    semester: 5,
    section: "Sec B",
    academicYear: "2024 - 2025",
    email: "siddharth.patel@casr.edu.in",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300",
    overallAttendancePercentage: 84,
    todayAttendanceStatus: "Present",
    totalClasses: 250,
    classesAttended: 210,
    classesMissed: 40,
    subjectWiseAttendance: [
      { subjectCode: "ME501", subjectName: "Thermodynamics II", attendedClasses: 42, totalClasses: 50, percentage: 84, facultyName: "Dr. B. K. Jena" },
      { subjectCode: "ME502", subjectName: "Fluid Mechanics", attendedClasses: 43, totalClasses: 50, percentage: 86, facultyName: "Prof. S. K. Mahapatra" },
      { subjectCode: "ME503", subjectName: "Kinematics of Machines", attendedClasses: 41, totalClasses: 50, percentage: 82, facultyName: "Dr. H. N. Sahoo" },
      { subjectCode: "ME504", subjectName: "Heat & Mass Transfer", attendedClasses: 42, totalClasses: 50, percentage: 84, facultyName: "Dr. P. C. Roy" },
      { subjectCode: "ME505", subjectName: "Manufacturing Tech", attendedClasses: 42, totalClasses: 50, percentage: 84, facultyName: "Mr. A. K. Behera" }
    ],
    monthlyAttendance: [
      { month: "May", percentage: 82, attended: 41, total: 50 },
      { month: "Jun", percentage: 84, attended: 42, total: 50 },
      { month: "Jul", percentage: 86, attended: 43, total: 50 },
      { month: "Aug", percentage: 84, attended: 42, total: 50 },
      { month: "Sep", percentage: 84, attended: 42, total: 50 }
    ],
    recentLogs: [
      { id: "splog-1", date: "Today", subject: "Thermodynamics II", status: "Present", time: "09:30 AM" }
    ]
  },
  {
    registrationNumber: "23IT10088",
    name: "Priya Nambiar",
    rollNumber: "230104052",
    branch: "Information Technology",
    department: "Dept. of Information Tech",
    semester: 5,
    section: "Sec A",
    academicYear: "2024 - 2025",
    email: "priya.nambiar@casr.edu.in",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    overallAttendancePercentage: 89,
    todayAttendanceStatus: "Present",
    totalClasses: 250,
    classesAttended: 223,
    classesMissed: 27,
    subjectWiseAttendance: [
      { subjectCode: "IT501", subjectName: "Web Technologies", attendedClasses: 46, totalClasses: 50, percentage: 92, facultyName: "Mrs. S. Mohanty" },
      { subjectCode: "IT502", subjectName: "Software Engineering", attendedClasses: 44, totalClasses: 50, percentage: 88, facultyName: "Dr. K. L. Swain" },
      { subjectCode: "IT503", subjectName: "Cloud Computing", attendedClasses: 45, totalClasses: 50, percentage: 90, facultyName: "Prof. N. K. Tripathy" },
      { subjectCode: "IT504", subjectName: "Cyber Security", attendedClasses: 43, totalClasses: 50, percentage: 86, facultyName: "Dr. R. C. Panda" },
      { subjectCode: "IT505", subjectName: "Data Warehousing", attendedClasses: 45, totalClasses: 50, percentage: 90, facultyName: "Mrs. T. Das" }
    ],
    monthlyAttendance: [
      { month: "May", percentage: 88, attended: 44, total: 50 },
      { month: "Jun", percentage: 90, attended: 45, total: 50 },
      { month: "Jul", percentage: 90, attended: 45, total: 50 },
      { month: "Aug", percentage: 88, attended: 44, total: 50 },
      { month: "Sep", percentage: 89, attended: 45, total: 50 }
    ],
    recentLogs: [
      { id: "pnlog-1", date: "Today", subject: "Web Technologies", status: "Present", time: "10:30 AM" }
    ]
  }
];
