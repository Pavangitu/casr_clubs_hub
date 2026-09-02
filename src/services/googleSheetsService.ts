import { StudentProfile, AttendanceRecord } from '../types';
import { REAL_STUDENTS_DATA } from '../data/realStudentsData';

export const MASTER_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/edit?usp=sharing';
export const SECONDARY_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1hoZ-fFzukaS9THOGSbCilfISj1t5taf3/edit?usp=sharing';
export const THIRD_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM/edit?usp=sharing';

export const MASTER_SHEETS_LIST = [
  { name: 'Google Sheet 1 (Main Attendance)', id: '19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc', url: MASTER_GOOGLE_SHEET_URL },
  { name: 'Google Sheet 2 (Student Records)', id: '1hoZ-fFzukaS9THOGSbCilfISj1t5taf3', url: SECONDARY_GOOGLE_SHEET_URL },
  { name: 'Google Sheet 3 (Master Registry)', id: '11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM', url: THIRD_GOOGLE_SHEET_URL }
];

// Known club tabs from the master Google Sheet (19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc)
export const KNOWN_CLUB_TABS = [
  { name: 'Robotics Club',     gid: '257171211' },
  { name: 'Coding club',       gid: '1690195397' },
  { name: 'DANCE CLUB',        gid: '1747670817' },
  { name: 'Agrifora Club',     gid: '1997413871' },
  { name: 'Drama Club',        gid: '1824463464' },
  { name: 'Fashion Club',      gid: '1336789504' },
  { name: 'Language Club',     gid: '2060228171' },
  { name: 'Literature Club',   gid: '578752662' },
  { name: 'MOVIE CLUB',        gid: '1476951718' },
  { name: 'Photography Club',  gid: '1771686445' },
  { name: 'Painting Club',     gid: '700032659' },
  { name: 'Music Club',        gid: '1198898863' },
  { name: 'Responses',         gid: '620675621' },
  { name: 'Default Tab',       gid: '0' },
];

export const GID_TO_CLUB: Record<string, string> = {
  '257171211':  'Robotics Club',
  '1690195397': 'Coding Club',
  '1747670817': 'DANCE CLUB',
  '1997413871': 'Agrifora Club',
  '1824463464': 'Drama Club',
  '1336789504': 'Fashion Club',
  '2060228171': 'Language Club',
  '578752662':  'Literature Club',
  '1476951718': 'MOVIE CLUB',
  '1771686445': 'Photography Club',
  '700032659':  'Painting Club',
  '1198898863': 'Music Club',
  '620675621':  'Responses',
  '0':          'Campus Club',
};

// All club tab URLs, each with a specific GID so we fetch every club's data
export const GOOGLE_SHEETS_URLS = [
  // Primary Sheet 1 (19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc)
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=0',          // Default tab
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=257171211',  // Robotics Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1690195397', // Coding club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1997413871', // Agrifora Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1747670817', // DANCE CLUB
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1824463464', // Drama Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1336789504', // Fashion Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=2060228171', // Language Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=578752662',  // Literature Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1476951718', // MOVIE CLUB
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1771686445', // Photography Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=700032659',  // Painting Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=1198898863', // Music Club
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv&gid=620675621',  // Responses tab

  // Primary Sheet 2 (1hoZ-fFzukaS9THOGSbCilfISj1t5taf3)
  'https://docs.google.com/spreadsheets/d/1hoZ-fFzukaS9THOGSbCilfISj1t5taf3/gviz/tq?tqx=out:csv&gid=0',
  'https://docs.google.com/spreadsheets/d/1hoZ-fFzukaS9THOGSbCilfISj1t5taf3/gviz/tq?tqx=out:csv',

  // Primary Sheet 3 (11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM)
  'https://docs.google.com/spreadsheets/d/11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM/gviz/tq?tqx=out:csv&gid=0',
  'https://docs.google.com/spreadsheets/d/11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM/gviz/tq?tqx=out:csv',

  // Secondary spreadsheet
  'https://docs.google.com/spreadsheets/d/1qxQ4m_VXukgkT23SwK3B7uhR2sOp5XH5WqFpcwTu59g/gviz/tq?tqx=out:csv'
];

export let APPS_SCRIPT_WEBAPP_URL = '';

export function getCustomSheetUrl(): string {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('CASR_CUSTOM_GOOGLE_SHEET_URL');
    if (saved && saved.trim()) return saved.trim();
  }
  return MASTER_GOOGLE_SHEET_URL;
}

export function setCustomSheetUrl(url: string): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('CASR_CUSTOM_GOOGLE_SHEET_URL', url.trim());
  }
}

export interface RealStudentDataRecord extends StudentProfile {
  allClubs: string[];
  insCount: number;
  outsCount: number;
  totalScans: number;
  degreeProgram: string;
  semesterYear: string;
  sectionCode?: string;
}

interface RawScan {
  timestampStr: string;
  dateObj: Date | null;
  email: string;
  name: string;
  regNo: string;
  degree: string;
  semester: string;
  club: string;
  reason: string;
  timing: string;
  isIn: boolean;
}

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
];

export function parseTimestamp(tsStr: string): Date | null {
  if (!tsStr || !tsStr.trim()) return null;
  const clean = tsStr.trim().replace(/^"|"$/g, '');

  const direct = new Date(clean);
  if (!isNaN(direct.getTime())) return direct;

  const match = clean.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM))?)?$/i);
  if (match) {
    const month = parseInt(match[1], 10) - 1;
    const day = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    let hour = match[4] ? parseInt(match[4], 10) : 0;
    const minute = match[5] ? parseInt(match[5], 10) : 0;
    const second = match[6] ? parseInt(match[6], 10) : 0;
    const ampm = match[7] ? match[7].toUpperCase() : null;
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return new Date(year, month, day, hour, minute, second);
  }

  return null;
}

export function formatTime(date: Date | null): string {
  if (!date) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDuration(hoursNum: number): string {
  if (hoursNum <= 0) return '0 mins';
  const totalMins = Math.round(hoursNum * 60);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hrs === 0) return `${mins} mins`;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  return `${hrs} hr${hrs > 1 ? 's' : ''} ${mins} min${mins > 1 ? 's' : ''}`;
}

function parseCsvRows(csvText: string): string[][] {
  const lines = csvText.split('\n');
  const result: string[][] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const row: string[] = [];
    let insideQuote = false;
    let current = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        row.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim().replace(/^"|"$/g, ''));
    result.push(row);
  }
  return result;
}

function capitalizeWords(str: string): string {
  if (!str) return '';
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function parseRowsToMap(rows: string[][], studentsMap: Record<string, any> = {}, clubHint = ''): Record<string, any> {
  if (rows.length === 0) return studentsMap;

  // Find header row within first 5 rows
  let headerIdx = 0;
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const row = rows[i];
    if (row.some(col => {
      const c = col.toLowerCase().trim();
      return c.includes('reg') || c === 'timestamp' || c.includes('email') || c === 'name' || c === 'timeing';
    })) {
      headerIdx = i;
      break;
    }
  }

  const headerRow = rows[headerIdx];
  const indexMap: Record<string, number> = {
    timestamp: -1, email: -1, name: -1, regNo: -1,
    degree: -1, semester: -1, club: -1, reason: -1, timing: -1,
    section: -1
  };

  headerRow.forEach((col, idx) => {
    const header = col.trim().toLowerCase();
    if ((header === 'timestamp' || header === 'timeing' || header.startsWith('time') || header.includes('date')) && indexMap.timestamp === -1) {
      indexMap.timestamp = idx;
    } else if (header.includes('email') && indexMap.email === -1) {
      indexMap.email = idx;
    } else if ((header === 'reg.no' || header === 'reg. no' || header.includes('reg') || header.includes('roll') || header.includes('registration')) && indexMap.regNo === -1) {
      indexMap.regNo = idx;
    } else if ((header.includes('degree') || header.includes('program') || header.includes('branch') || header.includes('course')) && indexMap.degree === -1) {
      indexMap.degree = idx;
    } else if ((header.includes('semester') || header.includes('sem') || header === 'year') && indexMap.semester === -1) {
      indexMap.semester = idx;
    } else if ((header.includes('section') || header === 'sec') && indexMap.section === -1) {
      indexMap.section = idx;
    } else if ((header === 'club' || header.includes('club name') || header.includes('activity')) && indexMap.club === -1) {
      indexMap.club = idx;
    } else if ((header === 'reason' || header.includes('purpose') || header.includes('event')) && indexMap.reason === -1) {
      indexMap.reason = idx;
    } else if ((header.includes('mark attendance') || header.includes('in/out') || header.includes('in / out') || header === 'timing' || header === 'attendance') && indexMap.timing === -1) {
      indexMap.timing = idx;
    } else if ((header === 'name' || header === 'student name') && indexMap.name === -1) {
      indexMap.name = idx;
    }
  });

  // Fallbacks for common column order
  if (indexMap.timestamp === -1) indexMap.timestamp = 0;
  if (indexMap.email === -1) indexMap.email = 1;
  if (indexMap.name === -1) indexMap.name = 2;
  if (indexMap.regNo === -1) indexMap.regNo = 3;
  if (indexMap.degree === -1) indexMap.degree = 4;
  if (indexMap.semester === -1) indexMap.semester = 5;
  if (indexMap.club === -1) indexMap.club = 6;
  if (indexMap.reason === -1) indexMap.reason = 7;
  if (indexMap.timing === -1) indexMap.timing = 8;

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 3) continue;
    const regNo = (row[indexMap.regNo] || '').trim().toUpperCase();
    if (!regNo) continue;
    const regLower = regNo.toLowerCase();
    if (regLower.includes('reg') || regLower.includes('timestamp') || regLower === 'name') continue;

    const timestampStr = row[indexMap.timestamp] || '';
    const dateObj = parseTimestamp(timestampStr);
    const email = row[indexMap.email] || '';
    const name = row[indexMap.name] || '';
    const degree = indexMap.degree !== -1 && row[indexMap.degree] ? row[indexMap.degree].trim() : '';
    const sem = indexMap.semester !== -1 && row[indexMap.semester] ? row[indexMap.semester].trim() : '';
    const section = indexMap.section !== -1 && row[indexMap.section] ? row[indexMap.section].trim() : '';
    let club = indexMap.club !== -1 && row[indexMap.club] ? row[indexMap.club].trim() : '';
    // Fall back to the tab's club name hint when the row has no club column
    if (!club) club = clubHint;
    const reason = indexMap.reason !== -1 && row[indexMap.reason] ? row[indexMap.reason].trim() : '';
    const timing = indexMap.timing !== -1 && row[indexMap.timing] ? row[indexMap.timing].trim() : '';

    if (!studentsMap[regNo]) {
      studentsMap[regNo] = {
        registrationNumber: regNo,
        name: name ? name.trim() : `Student ${regNo}`,
        email: email ? email.trim() : `${regNo.toLowerCase()}@centurionuniv.edu.in`,
        degreeProgram: degree || 'Undergraduate',
        semesterYear: sem || 'Current Academic Year',
        sectionCode: section || 'Sec A',
        clubsSet: new Set<string>(),
        rawScans: []
      };
    }

    const st = studentsMap[regNo];
    if (name && name.trim().length > st.name.length) st.name = name.trim();
    if (degree && degree.length > st.degreeProgram.length) st.degreeProgram = degree.trim();
    if (sem && sem.length > st.semesterYear.length) st.semesterYear = sem.trim();
    if (section && section.length > (st.sectionCode || '').length) st.sectionCode = section.trim();
    if (email && email.includes('@') && email.length > st.email.length) st.email = email.trim();
    if (club) st.clubsSet.add(club);

    const timLower = timing.toLowerCase();
    const isIn = timLower.includes('in') && !timLower.includes('out');

    st.rawScans.push({
      timestampStr, dateObj, email, name, regNo, degree,
      semester: sem, club, reason, timing, isIn
    });
  }

  return studentsMap;
}

function parseSheetToMap(csvText: string, studentsMap: Record<string, any> = {}, clubHint = ''): Record<string, any> {
  const rows = parseCsvRows(csvText);
  return parseRowsToMap(rows, studentsMap, clubHint);
}

function mapEntriesToProfiles(studentsMap: Record<string, any>): RealStudentDataRecord[] {
  const result: RealStudentDataRecord[] = [];
  const entries = Object.values(studentsMap);

  entries.forEach((st, idx) => {
    const clubsList = Array.from(st.clubsSet) as string[];
    const primaryClub = (clubsList[0] as string) || 'Campus Club';

    const rawScans: RawScan[] = st.rawScans || [];
    rawScans.sort((a, b) => {
      const timeA = a.dateObj ? a.dateObj.getTime() : 0;
      const timeB = b.dateObj ? b.dateObj.getTime() : 0;
      return timeA - timeB;
    });

    let insCount = 0;
    let outsCount = 0;
    const historyRecords: AttendanceRecord[] = [];
    let totalHoursCalculated = 0;
    let activeCheckInScan: RawScan | null = null;

    for (const scan of rawScans) {
      if (scan.isIn) {
        insCount += 1;
        if (activeCheckInScan) {
          const club = activeCheckInScan.club || primaryClub;
          const dateStr = activeCheckInScan.timestampStr.split(' ')[0] || 'Logged Date';
          const defaultDuration = 2.0;
          totalHoursCalculated += defaultDuration;
          historyRecords.push({
            id: `rec-${historyRecords.length + 1}`,
            eventName: `${club} Session (${activeCheckInScan.reason || 'Check-In'})`,
            eventCategory: 'Check-In Session',
            date: dateStr,
            inTime: formatTime(activeCheckInScan.dateObj) || activeCheckInScan.timestampStr,
            durationHours: defaultDuration,
            durationFormatted: formatDuration(defaultDuration),
            status: 'PRESENT',
            clubName: club,
            rawScanType: 'IN'
          });
        }
        activeCheckInScan = scan;
      } else {
        outsCount += 1;
        const club = scan.club || (activeCheckInScan ? activeCheckInScan.club : primaryClub);
        if (activeCheckInScan) {
          let durationHours = 1.5;
          if (scan.dateObj && activeCheckInScan.dateObj) {
            const diffMs = scan.dateObj.getTime() - activeCheckInScan.dateObj.getTime();
            if (diffMs > 0) {
              durationHours = diffMs / (1000 * 60 * 60);
              if (durationHours > 6.0) durationHours = 2.5;
            }
          }
          durationHours = Number(durationHours.toFixed(2));
          totalHoursCalculated += durationHours;
          const dateStr = activeCheckInScan.timestampStr.split(' ')[0] || scan.timestampStr.split(' ')[0] || 'Session Date';
          historyRecords.push({
            id: `rec-${historyRecords.length + 1}`,
            eventName: `${club} Session${scan.reason ? ' (' + scan.reason + ')' : ''}`,
            eventCategory: 'Check-In/Out Paired',
            date: dateStr,
            inTime: formatTime(activeCheckInScan.dateObj) || activeCheckInScan.timestampStr,
            outTime: formatTime(scan.dateObj) || scan.timestampStr,
            durationHours: durationHours,
            durationFormatted: formatDuration(durationHours),
            status: 'PRESENT',
            clubName: club,
            rawScanType: 'PAIRED'
          });
          activeCheckInScan = null;
        } else {
          const defaultDuration = 1.0;
          totalHoursCalculated += defaultDuration;
          const dateStr = scan.timestampStr.split(' ')[0] || 'Logged Date';
          historyRecords.push({
            id: `rec-${historyRecords.length + 1}`,
            eventName: `${club} Session (Check-Out)`,
            eventCategory: 'Check-Out',
            date: dateStr,
            outTime: formatTime(scan.dateObj) || scan.timestampStr,
            durationHours: defaultDuration,
            durationFormatted: formatDuration(defaultDuration),
            status: 'EXCUSED',
            clubName: club,
            rawScanType: 'OUT'
          });
        }
      }
    }

    if (activeCheckInScan) {
      const club = activeCheckInScan.club || primaryClub;
      const dateStr = activeCheckInScan.timestampStr.split(' ')[0] || 'Logged Date';
      const defaultDuration = 2.0;
      totalHoursCalculated += defaultDuration;
      historyRecords.push({
        id: `rec-${historyRecords.length + 1}`,
        eventName: `${club} Session (${activeCheckInScan.reason || 'Check-In'})`,
        eventCategory: 'Active Check-In',
        date: dateStr,
        inTime: formatTime(activeCheckInScan.dateObj) || activeCheckInScan.timestampStr,
        durationHours: defaultDuration,
        durationFormatted: formatDuration(defaultDuration),
        status: 'PRESENT',
        clubName: club,
        rawScanType: 'IN'
      });
      activeCheckInScan = null;
    }

    // Deduplicate history
    const uniqueHistoryMap = new Map<string, AttendanceRecord>();
    for (const rec of historyRecords) {
      const uKey = `${rec.date}_${rec.eventName}_${rec.inTime || ''}_${rec.outTime || ''}`;
      if (!uniqueHistoryMap.has(uKey)) uniqueHistoryMap.set(uKey, rec);
    }
    const cleanHistoryRecords = Array.from(uniqueHistoryMap.values());

    const totalScans = rawScans.length;
    totalHoursCalculated = Number(totalHoursCalculated.toFixed(1));

    const expectedSessions = Math.max(12, insCount);
    let attendancePct = Math.min(100, Math.round((insCount / expectedSessions) * 100));
    if (insCount >= 15) attendancePct = Math.max(attendancePct, 88);
    else if (insCount >= 8) attendancePct = Math.max(attendancePct, 76);
    else if (insCount >= 3) attendancePct = Math.max(attendancePct, 65);

    let tier: 'Elite' | 'Standard' | 'Pro' | 'Veteran' = 'Standard';
    if (attendancePct >= 85) tier = 'Elite';
    else if (attendancePct >= 70) tier = 'Pro';
    else if (attendancePct >= 50) tier = 'Veteran';

    let savedCreditsEarned = 0;
    let savedCreditLogs: any[] = [];
    try {
      const savedCreditsMap = JSON.parse(localStorage.getItem('casr_student_credits') || '{}');
      const cleanReg = (st.registrationNumber || '').trim().toLowerCase();
      const saved = savedCreditsMap[cleanReg] || savedCreditsMap[st.registrationNumber];
      if (saved) {
        savedCreditsEarned = saved.creditsEarned || 0;
        savedCreditLogs = saved.creditLogs || [];
      }
    } catch (e) {}

    result.push({
      registrationNumber: st.registrationNumber,
      name: capitalizeWords(st.name),
      email: st.email,
      avatar: '',
      clubName: primaryClub,
      role: 'Active Member',
      statusTier: tier,
      statusTierDescription: `${tier} Member • ${insCount} IN / ${outsCount} OUT (${totalHoursCalculated} hrs)`,
      attendanceGoalPercent: 85,
      currentAttendancePercent: attendancePct,
      eventsAttendedCount: insCount,
      creditsEarned: savedCreditsEarned,
      creditLogs: savedCreditLogs,
      requiredHours: 120.0,
      completedHours: totalHoursCalculated,
      nextEvent: {
        title: `${primaryClub} Regular Session`,
        date: 'Next Regular Schedule'
      },
      monthlyTrends: [
        { month: 'MAY', percentage: Math.max(40, attendancePct - 15), hours: Math.max(2, Number((totalHoursCalculated * 0.15).toFixed(1))) },
        { month: 'JUN', percentage: Math.max(50, attendancePct - 10), hours: Math.max(3, Number((totalHoursCalculated * 0.20).toFixed(1))) },
        { month: 'JUL', percentage: Math.max(60, attendancePct - 5),  hours: Math.max(4, Number((totalHoursCalculated * 0.25).toFixed(1))) },
        { month: 'AUG', percentage: Math.max(45, attendancePct - 12), hours: Math.max(3, Number((totalHoursCalculated * 0.18).toFixed(1))) },
        { month: 'SEP', percentage: Math.max(70, attendancePct - 2),  hours: Math.max(5, Number((totalHoursCalculated * 0.35).toFixed(1))) },
        { month: 'OCT', percentage: attendancePct,                    hours: totalHoursCalculated }
      ],
      recentHistory: cleanHistoryRecords.sort((a, b) => {
        const timeA = a.date ? new Date(a.date).getTime() : 0;
        const timeB = b.date ? new Date(b.date).getTime() : 0;
        return timeB - timeA;
      }),
      allClubs: clubsList,
      insCount,
      outsCount,
      totalScans,
      degreeProgram: st.degreeProgram,
      semesterYear: st.semesterYear,
      sectionCode: st.sectionCode
    });
  });

  return result;
}

export function buildProfilesFromCsv(csvDataArray: string[][]): RealStudentDataRecord[] {
  let studentsMap: Record<string, any> = {};
  if (csvDataArray.length > 0) {
    for (const csvData of csvDataArray) {
      if (csvData && csvData.length > 0) {
        studentsMap = parseSheetToMap(csvData.join('\n'), studentsMap);
      }
    }
  }
  return mapEntriesToProfiles(studentsMap);
}

// Parse GViz JSON JSONP response
function parseGvizJsonResponse(responseText: string): string[][] {
  try {
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) return [];

    const jsonStr = responseText.substring(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);
    if (!data || !data.table) return [];

    const extractedRows: string[][] = [];
    if (data.table.cols && Array.isArray(data.table.cols)) {
      const headers = data.table.cols.map((col: any) => col && col.label ? String(col.label).trim() : '');
      if (headers.some((h: string) => h.toLowerCase().includes('reg') || h.toLowerCase().includes('time') || h.toLowerCase().includes('name') || h.toLowerCase().includes('club'))) {
        extractedRows.push(headers);
      }
    }

    if (data.table.rows && Array.isArray(data.table.rows)) {
      for (const r of data.table.rows) {
        if (!r || !r.c) continue;
        const rowCells: string[] = r.c.map((cell: any) => {
          if (!cell) return '';
          if (cell.f !== undefined && cell.f !== null) return String(cell.f).trim();
          if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
          return '';
        });
        extractedRows.push(rowCells);
      }
    }

    return extractedRows;
  } catch (err) {
    return [];
  }
}

// JSONP-based GViz fetch (works in browser without CORS)
// Each call uses a UNIQUE global callback name to avoid race conditions
// when multiple tabs are fetched in parallel.
function fetchGvizJsonp(sheetId: string, tabParam = ''): Promise<string[][]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve([]);
      return;
    }

    const timestamp = Date.now();
    const rand = Math.random().toString(36).substring(2, 8);
    // Unique callback name prevents race conditions with parallel calls
    const callbackName = `_casrCb_${timestamp}_${rand}`;
    const script = document.createElement('script');
    let timer: ReturnType<typeof setTimeout>;

    const cleanup = () => {
      clearTimeout(timer);
      try { delete (window as any)[callbackName]; } catch (e) {}
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    (window as any)[callbackName] = (response: any) => {
      cleanup();
      try {
        if (!response || !response.table) { resolve([]); return; }
        const extractedRows: string[][] = [];
        let headerFromCols: string[] = [];
        if (response.table.cols && Array.isArray(response.table.cols)) {
          headerFromCols = response.table.cols.map((col: any) => (col && col.label ? String(col.label).trim() : ''));
        }
        // Always push the header row (even if headers don't match keywords)
        // so parseRowsToMap can detect the correct column positions
        if (headerFromCols.length > 0) {
          extractedRows.push(headerFromCols);
        }
        if (response.table.rows && Array.isArray(response.table.rows)) {
          for (const r of response.table.rows) {
            if (!r || !r.c) continue;
            const rowCells: string[] = r.c.map((cell: any) => {
              if (!cell) return '';
              if (cell.f !== undefined && cell.f !== null) return String(cell.f).trim();
              if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
              return '';
            });
            extractedRows.push(rowCells);
          }
        }
        resolve(extractedRows);
      } catch (e) {
        resolve([]);
      }
    };

    // Use the unique callback name in the tqx parameter
    script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=responseHandler:${callbackName}${tabParam ? '&' + tabParam : ''}&_t=${timestamp}&r=${rand}`;
    script.onerror = () => { cleanup(); resolve([]); };
    timer = setTimeout(() => { cleanup(); resolve([]); }, 8000);
    document.head.appendChild(script);
  });
}

// Fetch all rows for a given GID tab
async function fetchRowsForGid(sheetId: string, gid: string | null): Promise<string[][]> {
  const timestamp = Date.now();
  const gidParam = gid ? `gid=${gid}` : '';
  const cacheBusterHeaders = {
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };

  // JSONP approach (no CORS issues)
  try {
    const rows = await fetchGvizJsonp(sheetId, gidParam);
    if (rows && rows.length > 1) return rows;
  } catch (e) {}

  // Direct GViz fetch
  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=reqId:${timestamp}${gidParam ? '&' + gidParam : ''}&tq=select%20*&_t=${timestamp}&r=${Math.random()}`;
    const response = await fetch(gvizUrl, { cache: 'no-store', headers: cacheBusterHeaders });
    if (response.ok) {
      const text = await response.text();
      if (text && text.includes('google.visualization.Query.setResponse')) {
        const rows = parseGvizJsonResponse(text);
        if (rows.length > 1) return rows;
      }
    }
  } catch (e) {}

  // CORS proxy fallbacks
  const corsProxies = [
    (url: string) => url,
    (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  ];

  for (const proxyFn of corsProxies) {
    try {
      const exportUrl = proxyFn(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gid ? '&gid=' + gid : ''}&_cb=${timestamp}&r=${Math.random()}`);
      const response = await fetch(exportUrl, { cache: 'no-store' });
      if (response.ok) {
        const csvText = await response.text();
        if (csvText && !csvText.trim().startsWith('<!DOCTYPE') && !csvText.trim().startsWith('<html')) {
          const rows = parseCsvRows(csvText);
          if (rows.length > 1) return rows;
        }
      }
    } catch (e) {}
  }

  return [];
}

export function getCachedLiveAttendanceData(): StudentProfile[] | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem('CASR_LIVE_STUDENTS_CACHE');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return null;
}

export async function discoverLiveTabs(sheetId: string): Promise<{ name: string; gid: string }[]> {
  const allDiscovered: { name: string; gid: string }[] = [];
  const seenGids = new Set<string>();

  const addTab = (name: string, gid: string) => {
    if (!gid || seenGids.has(gid)) return;
    seenGids.add(gid);
    allDiscovered.push({ name: name.trim(), gid: gid.trim() });
  };

  // 1. Check local Vite dev middleware endpoint (100% reliable, zero CORS)
  try {
    const devRes = await fetch(`/api/live-tabs?sheetId=${encodeURIComponent(sheetId)}&_t=${Date.now()}`);
    if (devRes.ok) {
      const devData = await devRes.json();
      if (devData.success && Array.isArray(devData.tabs)) {
        for (const t of devData.tabs) {
          addTab(t.name, t.gid);
        }
      }
    }
  } catch (e) {}

  // 2. Try CORS proxies if not running in dev or dev returned empty
  if (allDiscovered.length === 0) {
    const htmlviewUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/htmlview?_cb=${Date.now()}`;
    const corsProxies = [
      (url: string) => url,
      (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
      (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
    ];

    for (const proxyFn of corsProxies) {
      try {
        const targetUrl = proxyFn(htmlviewUrl);
        const res = await fetch(targetUrl, { cache: 'no-store' });
        if (res.ok) {
          const html = await res.text();
          if (html && html.includes('items.push')) {
            const regex = /items\.push\(\{\s*name:\s*"([^"]+)",\s*pageUrl:\s*"[^"]+",\s*gid:\s*"([^"]+)"/g;
            let match;
            while ((match = regex.exec(html)) !== null) {
              const name = match[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, grp) => String.fromCharCode(parseInt(grp, 16)));
              addTab(name, match[2]);
            }
            if (allDiscovered.length > 0) break;
          }
        }
      } catch (e) {}
    }
  }

  // 3. Load previously remembered discovered tabs from localStorage
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem('CASR_DISCOVERED_TABS');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          for (const t of parsed) {
            addTab(t.name, t.gid);
          }
        }
      }
    } catch (e) {}
  }

  // 4. Always include all KNOWN_CLUB_TABS as guaranteed foundation
  for (const t of KNOWN_CLUB_TABS) {
    addTab(t.name, t.gid);
  }

  // 5. Save back to localStorage so any new tab discovered is permanently remembered
  if (typeof localStorage !== 'undefined' && allDiscovered.length > 0) {
    try {
      localStorage.setItem('CASR_DISCOVERED_TABS', JSON.stringify(allDiscovered));
    } catch (e) {}
  }

  return allDiscovered;
}

export async function fetchLiveAttendanceData(forceRefresh = false): Promise<StudentProfile[]> {
  try {
    const customUrl = getCustomSheetUrl();
    const customIdMatch = customUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const targetSheetId = customIdMatch ? customIdMatch[1] : '19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc';

    // Discover all tabs for the primary sheet
    const discovered = await discoverLiveTabs(targetSheetId);
    let activeTabs: { name: string; gid: string | null; sheetId: string }[] = [];

    // Map discovered tabs
    if (discovered.length > 0) {
      activeTabs = discovered.map(t => ({
        name: t.name || (t.gid ? (GID_TO_CLUB[t.gid] || 'Campus Club') : 'Campus Club'),
        gid: t.gid,
        sheetId: targetSheetId
      }));
    } else {
      activeTabs = KNOWN_CLUB_TABS.map(t => ({
        name: t.name,
        gid: t.gid,
        sheetId: targetSheetId
      }));
    }

    // Append secondary sheets from static list (like primary sheet 2, 3, etc.)
    const otherTabs = GOOGLE_SHEETS_URLS.filter(url => !url.includes('19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc')).map(url => {
      const sheetIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const sheetId = sheetIdMatch ? sheetIdMatch[1] : '';
      const gidMatch = url.match(/[?&]gid=(\d+)/);
      const gid = gidMatch ? gidMatch[1] : null;
      return { name: gid ? (GID_TO_CLUB[gid] || 'Campus Club') : 'Campus Club', gid, sheetId };
    });

    // Deduplicate active tabs by sheetId + gid
    const uniqueTabsMap = new Map<string, { name: string; gid: string | null; sheetId: string }>();
    for (const tab of [...activeTabs, ...otherTabs]) {
      if (!tab.sheetId) continue;
      const key = `${tab.sheetId}_${tab.gid || 'default'}`;
      if (!uniqueTabsMap.has(key)) {
        uniqueTabsMap.set(key, tab);
      }
    }
    const finalTabsList = Array.from(uniqueTabsMap.values());

    // Fetch all club tabs in parallel using GID-specific URLs
    const fetchPromises = finalTabsList.map(async (tab) => {
      if (!tab.sheetId) return { rows: [], clubHint: '' };
      const rows = await fetchRowsForGid(tab.sheetId, tab.gid);
      return { rows, clubHint: tab.name };
    });

    const sheetRowsArray = await Promise.allSettled(fetchPromises);
    let studentsMap: Record<string, any> = {};
    let hasAnyData = false;

    for (const result of sheetRowsArray) {
      if (result.status !== 'fulfilled') continue;
      const { rows, clubHint } = result.value;
      if (!rows || rows.length <= 1) continue;
      studentsMap = parseRowsToMap(rows, studentsMap, clubHint);
      hasAnyData = true;
    }

    if (hasAnyData) {
      const parsed = mapEntriesToProfiles(studentsMap);
      if (parsed.length > 0) {
        if (typeof localStorage !== 'undefined') {
          try {
            localStorage.setItem('CASR_LIVE_STUDENTS_CACHE', JSON.stringify(parsed));
            localStorage.setItem('CASR_LIVE_STUDENTS_CACHE_TIME', String(Date.now()));
          } catch (e) {}
        }
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not fetch live Google Sheet attendance, using fallback dataset:', err);
  }

  // Check if we have a fresh cache (within last 5 minutes)
  if (!forceRefresh) {
    const cached = getCachedLiveAttendanceData();
    if (cached) {
      const cacheTime = Number(localStorage.getItem('CASR_LIVE_STUDENTS_CACHE_TIME') || 0);
      if (Date.now() - cacheTime < 5 * 60 * 1000) {
        return cached;
      }
    }
  }

  return REAL_STUDENTS_DATA as unknown as StudentProfile[];
}
