import { AcademicStudentProfile, AuthSession, UserRole } from '../types';

const TOKEN_KEY = 'univ_attendance_token';
const ROLE_KEY = 'univ_attendance_role';
const REG_KEY = 'univ_attendance_reg';

export const attendanceApiService = {
  // Get stored session credentials
  getStoredSession(): { token: string | null; role: UserRole | null; registrationNumber: string | null } {
    const token = localStorage.getItem(TOKEN_KEY);
    const role = localStorage.getItem(ROLE_KEY) as UserRole | null;
    const registrationNumber = localStorage.getItem(REG_KEY);
    return { token, role, registrationNumber };
  },

  // Save session credentials
  saveSession(token: string, role: UserRole, registrationNumber?: string) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    if (registrationNumber) {
      localStorage.setItem(REG_KEY, registrationNumber);
    } else {
      localStorage.removeItem(REG_KEY);
    }
  },

  // Clear session
  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(REG_KEY);
  },

  // Student Login (Registration Number ONLY)
  async studentLogin(registrationNumber: string): Promise<AuthSession> {
    const response = await fetch('/api/auth/student-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationNumber })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Invalid Registration Number.');
    }

    this.saveSession(data.token, 'student', data.registrationNumber);

    return {
      token: data.token,
      userRole: 'student',
      registrationNumber: data.registrationNumber
    };
  },

  // Admin Login (Admin ID & Password)
  async adminLogin(adminId: string, password: string): Promise<AuthSession> {
    const response = await fetch('/api/auth/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Invalid Admin Credentials.');
    }

    this.saveSession(data.token, 'admin');

    return {
      token: data.token,
      userRole: 'admin',
      adminId: data.adminId
    };
  },

  // Logout
  async logout(): Promise<void> {
    const { token } = this.getStoredSession();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        console.warn('Logout notification error:', err);
      }
    }
    this.clearSession();
  },

  // Get Logged In Student's Dashboard Data (Strict Data Isolation)
  async getStudentDashboard(): Promise<AcademicStudentProfile> {
    const { token } = this.getStoredSession();

    if (!token) {
      throw new Error('HTTP 403 Forbidden: No authenticated session found.');
    }

    const response = await fetch('/api/student/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.status === 403) {
      throw new Error('HTTP 403 Forbidden: Unauthorized access to student dashboard.');
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to retrieve student attendance details.');
    }

    return data.studentProfile;
  },

  // Faculty/Admin: Get All Students
  async getAllStudentsAdmin(): Promise<AcademicStudentProfile[]> {
    const { token } = this.getStoredSession();

    if (!token) {
      throw new Error('HTTP 403 Forbidden: Admin authorization token required.');
    }

    const response = await fetch('/api/admin/students', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.status === 403) {
      throw new Error('HTTP 403 Forbidden: Faculty / Admin access required.');
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to retrieve student directory.');
    }

    return data.students || [];
  },

  // Faculty/Admin: Add Student / Attendance Record
  async addStudentAdmin(student: Partial<AcademicStudentProfile>): Promise<AcademicStudentProfile> {
    const { token } = this.getStoredSession();

    const response = await fetch('/api/admin/students', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create student record.');
    }

    return data.student;
  },

  // Faculty/Admin: Edit Student / Attendance Record
  async editStudentAdmin(regNo: string, updatedData: Partial<AcademicStudentProfile>): Promise<AcademicStudentProfile> {
    const { token } = this.getStoredSession();

    const response = await fetch(`/api/admin/students/${encodeURIComponent(regNo)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update student record.');
    }

    return data.student;
  },

  // Faculty/Admin: Delete Student Record
  async deleteStudentAdmin(regNo: string): Promise<string> {
    const { token } = this.getStoredSession();

    const response = await fetch(`/api/admin/students/${encodeURIComponent(regNo)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete student record.');
    }

    return regNo;
  },

  // Faculty/Admin: Export Attendance Data CSV
  async exportAttendanceAdmin(): Promise<void> {
    const { token } = this.getStoredSession();

    const response = await fetch('/api/admin/export', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 403) {
      throw new Error('HTTP 403 Forbidden: You do not have permission to export attendance data.');
    }

    if (!response.ok) {
      throw new Error('Failed to generate export file.');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `University_Attendance_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
};
