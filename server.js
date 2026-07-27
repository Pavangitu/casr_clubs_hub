import express from 'express';
import cors from 'cors';
import { INITIAL_ACADEMIC_STUDENTS } from './src/data/attendanceData.js';

const app = express();
app.use(express.json());
app.use(cors());

// In-memory datastore seeded with initial students
let studentsDatabase = [...INITIAL_ACADEMIC_STUDENTS];

// Session token store for authorization verification
const activeSessions = new Map(); // token -> { role, registrationNumber, adminId, createdAt }

// Helper function to generate tokens
function createToken(payload) {
  const prefix = payload.role === 'admin' ? 'admin' : 'student';
  const token = `token_${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  activeSessions.set(token, { ...payload, createdAt: Date.now() });
  return token;
}

// Middleware: Authenticate & Verify Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication token required.' });
  }

  const session = activeSessions.get(token);
  if (!session) {
    return res.status(403).json({ error: 'Invalid or expired session. HTTP 403 Forbidden' });
  }

  req.user = session;
  next();
}

// Middleware: Enforce Student Role Only
function requireStudentRole(req, res, next) {
  if (req.user?.role !== 'student') {
    return res.status(403).json({ error: 'HTTP 403 Forbidden: Student access required.' });
  }
  next();
}

// Middleware: Enforce Admin Role Only
function requireAdminRole(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'HTTP 403 Forbidden: Faculty / Admin access required.' });
  }
  next();
}

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// Student Login (Registration Number ONLY, No Password)
app.post('/api/auth/student-login', (req, res) => {
  const { registrationNumber } = req.body;

  if (!registrationNumber || typeof registrationNumber !== 'string' || !registrationNumber.trim()) {
    return res.status(400).json({ error: 'Registration Number is required.' });
  }

  const cleanedRegNo = registrationNumber.trim().toLowerCase();

  // Search database strictly for that Registration Number
  const student = studentsDatabase.find(
    (s) => s.registrationNumber.trim().toLowerCase() === cleanedRegNo
  );

  if (!student) {
    return res.status(404).json({ error: 'Invalid Registration Number.' });
  }

  // Create secure session token
  const token = createToken({
    role: 'student',
    registrationNumber: student.registrationNumber
  });

  return res.status(200).json({
    message: 'Login successful',
    token,
    userRole: 'student',
    registrationNumber: student.registrationNumber
  });
});

// Admin Login (Admin ID & Password)
app.post('/api/auth/admin-login', (req, res) => {
  const { adminId, password } = req.body;

  if (!adminId || !password) {
    return res.status(400).json({ error: 'Admin ID and Password are required.' });
  }

  if (adminId.trim() === 'CaSR Admin' && password === 'CaSR123') {
    const token = createToken({
      role: 'admin',
      adminId: 'CaSR Admin'
    });

    return res.status(200).json({
      message: 'Admin authentication successful',
      token,
      userRole: 'admin',
      adminId: 'CaSR Admin'
    });
  }

  return res.status(401).json({ error: 'Invalid Admin ID or Password.' });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    activeSessions.delete(token);
  }
  res.status(200).json({ message: 'Logged out successfully.' });
});

// ==========================================
// STUDENT DASHBOARD ENDPOINT (STRICT DATA ISOLATION)
// ==========================================

// Query ONLY the logged-in student's record using session token
app.get('/api/student/dashboard', authenticateToken, requireStudentRole, (req, res) => {
  const loggedInRegNo = req.user.registrationNumber;

  // Strict Security: Search database ONLY for LoggedInRegistrationNumber
  const studentRecord = studentsDatabase.find(
    (s) => s.registrationNumber.trim().toLowerCase() === loggedInRegNo.trim().toLowerCase()
  );

  if (!studentRecord) {
    return res.status(404).json({ error: 'Student record not found.' });
  }

  // Return ONLY this student's data. DO NOT include list of other students.
  return res.status(200).json({
    studentProfile: studentRecord
  });
});

// Attempting to request cross-student data manually triggers 403 Forbidden
app.get('/api/student/records/:requestedRegNo', authenticateToken, requireStudentRole, (req, res) => {
  const loggedInRegNo = req.user.registrationNumber;
  const requestedRegNo = req.params.requestedRegNo;

  if (loggedInRegNo.trim().toLowerCase() !== requestedRegNo.trim().toLowerCase()) {
    return res.status(403).json({ error: 'HTTP 403 Forbidden: You are not authorized to view other students data.' });
  }

  const studentRecord = studentsDatabase.find(
    (s) => s.registrationNumber.trim().toLowerCase() === loggedInRegNo.trim().toLowerCase()
  );

  return res.status(200).json({ studentProfile: studentRecord });
});

// ==========================================
// ADMIN ENDPOINTS (FACULTY / ADMIN ROLE)
// ==========================================

// View All Students
app.get('/api/admin/students', authenticateToken, requireAdminRole, (req, res) => {
  return res.status(200).json({
    students: studentsDatabase,
    totalCount: studentsDatabase.length
  });
});

// Add New Student
app.post('/api/admin/students', authenticateToken, requireAdminRole, (req, res) => {
  const newStudent = req.body;

  if (!newStudent.registrationNumber || !newStudent.name) {
    return res.status(400).json({ error: 'Registration Number and Student Name are required.' });
  }

  const exists = studentsDatabase.some(
    (s) => s.registrationNumber.trim().toLowerCase() === newStudent.registrationNumber.trim().toLowerCase()
  );

  if (exists) {
    return res.status(409).json({ error: 'A student with this Registration Number already exists.' });
  }

  const completeProfile = {
    registrationNumber: newStudent.registrationNumber.trim(),
    name: newStudent.name.trim(),
    rollNumber: newStudent.rollNumber || newStudent.registrationNumber,
    branch: newStudent.branch || 'Computer Science & Engineering',
    department: newStudent.department || 'Dept. of Computer Science & Engineering',
    semester: newStudent.semester || 5,
    section: newStudent.section || 'Sec A',
    academicYear: newStudent.academicYear || '2024 - 2025',
    email: newStudent.email || `${newStudent.registrationNumber.toLowerCase()}@casr.edu.in`,
    avatar: newStudent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    overallAttendancePercentage: Number(newStudent.overallAttendancePercentage) || 85,
    todayAttendanceStatus: newStudent.todayAttendanceStatus || 'Present',
    totalClasses: Number(newStudent.totalClasses) || 200,
    classesAttended: Number(newStudent.classesAttended) || 170,
    classesMissed: Number(newStudent.classesMissed) || 30,
    subjectWiseAttendance: newStudent.subjectWiseAttendance || [
      { subjectCode: 'CS501', subjectName: 'Computer Networks', attendedClasses: 45, totalClasses: 50, percentage: 90 },
      { subjectCode: 'CS502', subjectName: 'DBMS', attendedClasses: 43, totalClasses: 50, percentage: 86 },
      { subjectCode: 'CS503', subjectName: 'Operating Systems', attendedClasses: 44, totalClasses: 50, percentage: 88 },
      { subjectCode: 'CS504', subjectName: 'Artificial Intelligence', attendedClasses: 46, totalClasses: 50, percentage: 92 },
      { subjectCode: 'CS505', subjectName: 'Java Programming', attendedClasses: 42, totalClasses: 50, percentage: 84 }
    ],
    monthlyAttendance: newStudent.monthlyAttendance || [
      { month: 'May', percentage: 85, attended: 42, total: 50 },
      { month: 'Jun', percentage: 86, attended: 43, total: 50 },
      { month: "Jul", percentage: 88, attended: 44, total: 50 }
    ],
    recentLogs: newStudent.recentLogs || [
      { id: `log-${Date.now()}`, date: 'Today', subject: 'Computer Networks', status: 'Present', time: '09:30 AM' }
    ]
  };

  studentsDatabase.push(completeProfile);
  return res.status(201).json({ message: 'Student record added successfully', student: completeProfile });
});

// Edit Student Record
app.put('/api/admin/students/:regNo', authenticateToken, requireAdminRole, (req, res) => {
  const regNo = req.params.regNo;
  const updatedData = req.body;

  const index = studentsDatabase.findIndex(
    (s) => s.registrationNumber.trim().toLowerCase() === regNo.trim().toLowerCase()
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Student record not found.' });
  }

  studentsDatabase[index] = {
    ...studentsDatabase[index],
    ...updatedData
  };

  return res.status(200).json({
    message: 'Student record updated successfully',
    student: studentsDatabase[index]
  });
});

// Delete Student Record
app.delete('/api/admin/students/:regNo', authenticateToken, requireAdminRole, (req, res) => {
  const regNo = req.params.regNo;

  const index = studentsDatabase.findIndex(
    (s) => s.registrationNumber.trim().toLowerCase() === regNo.trim().toLowerCase()
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Student record not found.' });
  }

  const deletedStudent = studentsDatabase.splice(index, 1)[0];
  return res.status(200).json({
    message: `Student ${deletedStudent.name} (${deletedStudent.registrationNumber}) deleted successfully.`,
    registrationNumber: regNo
  });
});

// Export Attendance Data (CSV)
app.get('/api/admin/export', authenticateToken, requireAdminRole, (req, res) => {
  let csv = 'Registration Number,Student Name,Roll Number,Branch,Department,Semester,Overall Attendance %,Today Status,Total Classes,Attended,Missed\n';
  studentsDatabase.forEach((s) => {
    csv += `"${s.registrationNumber}","${s.name}","${s.rollNumber}","${s.branch}","${s.department}","${s.semester}","${s.overallAttendancePercentage}%","${s.todayAttendanceStatus}",${s.totalClasses},${s.classesAttended},${s.classesMissed}\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="university_attendance_report.csv"');
  return res.status(200).send(csv);
});

export { app, studentsDatabase };
