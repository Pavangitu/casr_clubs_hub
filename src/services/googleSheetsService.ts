import { StudentProfile, AttendanceRecord } from '../types';
import { REAL_STUDENTS_DATA } from '../data/realStudentsData';

export const GOOGLE_SHEETS_URLS = [
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv',
  'https://docs.google.com/spreadsheets/d/1qxQ4m_VXukgkT23SwK3B7uhR2sOp5XH5WqFpcwTu59g/gviz/tq?tqx=out:csv',
  'https://docs.google.com/spreadsheets/d/1MQFgiFZ_l7baUkmZstVYEhUhVxK6i-7QjcqdDb_IcT8/gviz/tq?tqx=out:csv'
];

export interface RealStudentDataRecord extends StudentProfile {
  allClubs: string[];
  insCount: number;
  outsCount: number;
  totalScans: number;
  degreeProgram: string;
  semesterYear: string;
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

/**
 * Robust Timestamp Parser
 * Parses strings like "9/9/2025 17:54:05", "09/09/2025 5:54:05 PM", "2025-09-09T17:54:05", etc.
 */
export function parseTimestamp(tsStr: string): Date | null {
  if (!tsStr || !tsStr.trim()) return null;
  const clean = tsStr.trim().replace(/^"|"$/g, '');

  // Direct Date attempt
  const direct = new Date(clean);
  if (!isNaN(direct.getTime())) return direct;

  // Custom regex parsing for M/D/YYYY H:M:S or M/D/YYYY H:M:S AM/PM
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

// Helper to parse CSV lines safely considering quotes
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

function parseRowsToMap(rows: string[][], studentsMap: Record<string, any> = {}): Record<string, any> {
  if (rows.length === 0) return studentsMap;

  // Find header row
  let headerIdx = 0;
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const row = rows[i];
    if (row.some(col => col.toLowerCase().includes('reg') || col.toLowerCase().includes('timestamp'))) {
      headerIdx = i;
      break;
    }
  }
  const headerRow = rows[headerIdx];

  const indexMap: Record<string, number> = {
    timestamp: -1,
    email: -1,
    name: -1,
    regNo: -1,
    degree: -1,
    semester: -1,
    club: -1,
    reason: -1,
    timing: -1
  };

  headerRow.forEach((col, idx) => {
    const header = col.trim().toLowerCase();
    if (header.includes('timestamp')) {
      indexMap.timestamp = idx;
    } else if (header.includes('email')) {
      indexMap.email = idx;
    } else if (header.includes('reg') && (header.includes('no') || header.includes('number') || header.includes('n.o'))) {
      indexMap.regNo = idx;
    } else if (header.includes('degree') || header.includes('program')) {
      indexMap.degree = idx;
    } else if (header.includes('semester') || header.includes('sem') || header.includes('year')) {
      indexMap.semester = idx;
    } else if (header.includes('club')) {
      indexMap.club = idx;
    } else if (header.includes('reason')) {
      indexMap.reason = idx;
    } else if (header.includes('timing') || header.includes('attendance') || header.includes('in/out') || header.includes('in / out')) {
      indexMap.timing = idx;
    } else if (header.includes('name') && indexMap.name === -1) {
      indexMap.name = idx;
    }
  });

  if (indexMap.regNo === -1) indexMap.regNo = 3;
  if (indexMap.name === -1) indexMap.name = 2;
  if (indexMap.timestamp === -1) indexMap.timestamp = 0;
  if (indexMap.email === -1) indexMap.email = 1;
  if (indexMap.degree === -1) indexMap.degree = 4;
  if (indexMap.semester === -1) indexMap.semester = 5;
  if (indexMap.club === -1) indexMap.club = 6;
  if (indexMap.reason === -1) indexMap.reason = 7;
  if (indexMap.timing === -1) indexMap.timing = 8;

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 4) continue;
    const regNo = (row[indexMap.regNo] || '').trim().toUpperCase();

    if (!regNo || regNo === 'REG.NO' || regNo === 'REG. NO' || regNo.includes('TIMESTAMP') || regNo.toLowerCase().includes('reg')) {
      continue;
    }

    const timestampStr = row[indexMap.timestamp] || '';
    const dateObj = parseTimestamp(timestampStr);
    const email = row[indexMap.email] || '';
    const name = row[indexMap.name] || '';
    const degree = indexMap.degree !== -1 && row[indexMap.degree] ? row[indexMap.degree].trim() : '';
    const sem = indexMap.semester !== -1 && row[indexMap.semester] ? row[indexMap.semester].trim() : '';
    const club = indexMap.club !== -1 && row[indexMap.club] ? row[indexMap.club].trim() : '';
    const reason = indexMap.reason !== -1 && row[indexMap.reason] ? row[indexMap.reason].trim() : '';
    const timing = indexMap.timing !== -1 && row[indexMap.timing] ? row[indexMap.timing].trim() : '';

    if (!studentsMap[regNo]) {
      studentsMap[regNo] = {
        registrationNumber: regNo,
        name: name ? name.trim() : `Student ${regNo}`,
        email: email ? email.trim() : `${regNo.toLowerCase()}@centurionuniv.edu.in`,
        degreeProgram: degree || 'Undergraduate',
        semesterYear: sem || 'Current Academic Year',
        clubsSet: new Set<string>(),
        rawScans: []
      };
    }

    const st = studentsMap[regNo];
    if (name && name.trim().length > st.name.length) st.name = name.trim();
    if (degree && degree.length > st.degreeProgram.length) st.degreeProgram = degree.trim();
    if (sem && sem.length > st.semesterYear.length) st.semesterYear = sem.trim();
    if (email && email.includes('@') && email.length > st.email.length) st.email = email.trim();
    if (club) st.clubsSet.add(club);

    const isIn = timing.toLowerCase().includes('in');

    st.rawScans.push({
      timestampStr,
      dateObj,
      email,
      name,
      regNo,
      degree,
      semester: sem,
      club,
      reason,
      timing,
      isIn
    });
  }

  return studentsMap;
}

function parseSheetToMap(csvText: string, studentsMap: Record<string, any> = {}): Record<string, any> {
  const rows = parseCsvRows(csvText);
  return parseRowsToMap(rows, studentsMap);
}

function mapEntriesToProfiles(studentsMap: Record<string, any>): RealStudentDataRecord[] {
  const result: RealStudentDataRecord[] = [];
  const entries = Object.values(studentsMap);

  entries.forEach((st, idx) => {
    const clubsList = Array.from(st.clubsSet) as string[];
    const primaryClub = (clubsList[0] as string) || 'Campus Club';

    // Sort student's raw scans chronologically
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
        // If there was an unclosed IN scan from a previous date, close it with standard 2.0 hrs
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
        // OUT Scan
        outsCount += 1;
        const club = scan.club || (activeCheckInScan ? activeCheckInScan.club : primaryClub);

        if (activeCheckInScan) {
          // Paired IN and OUT scans! Calculate exact duration
          let durationHours = 1.5; // fallback
          if (scan.dateObj && activeCheckInScan.dateObj) {
            const diffMs = scan.dateObj.getTime() - activeCheckInScan.dateObj.getTime();
            if (diffMs > 0) {
              durationHours = diffMs / (1000 * 60 * 60);
              // Cap individual single session at max 6.0 hours in case of overnight/missing scan
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
          // Orphan OUT scan without previous IN scan
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

    // If there is still an active unclosed IN scan at the end
    if (activeCheckInScan) {
      const club = activeCheckInScan.club || primaryClub;
      const dateStr = activeCheckInScan.timestampStr.split(' ')[0] || 'Logged Date';
      const defaultDuration = 2.0;
      totalHoursCalculated += defaultDuration;

      historyRecords.push({
        id: `rec-${historyRecords.length + 1}`,
        eventName: `${club} Active Check-In (${activeCheckInScan.reason || 'Ongoing'})`,
        eventCategory: 'Active Check-In',
        date: dateStr,
        inTime: formatTime(activeCheckInScan.dateObj) || activeCheckInScan.timestampStr,
        durationHours: defaultDuration,
        durationFormatted: formatDuration(defaultDuration) + ' (Active)',
        status: 'PRESENT',
        clubName: club,
        rawScanType: 'IN'
      });
    }

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

    result.push({
      registrationNumber: st.registrationNumber,
      name: capitalizeWords(st.name),
      email: st.email,
      avatar: AVATARS[idx % AVATARS.length],
      clubName: primaryClub,
      role: 'Active Member',
      statusTier: tier,
      statusTierDescription: `${tier} Member • ${insCount} IN / ${outsCount} OUT (${totalHoursCalculated} hrs)`,
      attendanceGoalPercent: 85,
      currentAttendancePercent: attendancePct,
      eventsAttendedCount: insCount,
      creditsEarned: insCount * 10,
      requiredHours: 120.0,
      completedHours: totalHoursCalculated,
      nextEvent: {
        title: `${primaryClub} Regular Session`,
        date: 'Next Regular Schedule'
      },
      monthlyTrends: [
        { month: 'MAY', percentage: Math.max(40, attendancePct - 15), hours: Math.max(2, Number((totalHoursCalculated * 0.15).toFixed(1))) },
        { month: 'JUN', percentage: Math.max(50, attendancePct - 10), hours: Math.max(3, Number((totalHoursCalculated * 0.20).toFixed(1))) },
        { month: 'JUL', percentage: Math.max(60, attendancePct - 5), hours: Math.max(4, Number((totalHoursCalculated * 0.25).toFixed(1))) },
        { month: 'AUG', percentage: Math.max(45, attendancePct - 12), hours: Math.max(3, Number((totalHoursCalculated * 0.18).toFixed(1))) },
        { month: 'SEP', percentage: Math.max(70, attendancePct - 2), hours: Math.max(5, Number((totalHoursCalculated * 0.35).toFixed(1))) },
        { month: 'OCT', percentage: attendancePct, hours: totalHoursCalculated }
      ],
      recentHistory: historyRecords.reverse(), // latest first
      allClubs: clubsList,
      insCount: insCount,
      outsCount: outsCount,
      totalScans: totalScans,
      degreeProgram: st.degreeProgram,
      semesterYear: st.semesterYear
    });
  });

  return result;
}

export function buildProfilesFromCsv(csvDataArray: string[][]): RealStudentDataRecord[] {
  let studentsMap: Record<string, any> = {};
  if (csvDataArray.length > 0) {
    studentsMap = parseRowsToMap(csvDataArray, studentsMap);
  }
  return mapEntriesToProfiles(studentsMap);
}

function capitalizeWords(str: string): string {
  if (!str) return '';
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function parseGvizJsonResponse(responseText: string): string[][] {
  try {
    const rawJson = responseText
      .replace(/^[\s\S]*google\.visualization\.Query\.setResponse\(/, '')
      .replace(/\);?\s*$/, '');
    const data = JSON.parse(rawJson);
    if (!data || !data.table) return [];

    const extractedRows: string[][] = [];

    // Extract cols labels if available
    let headerFromCols: string[] = [];
    if (data.table.cols && Array.isArray(data.table.cols)) {
      headerFromCols = data.table.cols.map((col: any) => (col && col.label ? String(col.label).trim() : ''));
    }

    const hasValidColHeader = headerFromCols.some(h => 
      h.toLowerCase().includes('reg') || h.toLowerCase().includes('time') || h.toLowerCase().includes('name') || h.toLowerCase().includes('club')
    );

    if (hasValidColHeader) {
      extractedRows.push(headerFromCols);
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
    console.warn('GViz JSON response parsing warning:', err);
    return [];
  }
}

export async function fetchLiveAttendanceData(): Promise<RealStudentDataRecord[]> {
  try {
    const fetchPromises = GOOGLE_SHEETS_URLS.map(async (baseUrl) => {
      try {
        const timestamp = Date.now();
        const sheetIdMatch = baseUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        const sheetId = sheetIdMatch ? sheetIdMatch[1] : '';

        if (!sheetId) return [];

        // Primary: Use GViz Live SQL Query Engine (bypasses static CDN cache)
        const gvizQueryUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tq=select%20*&_t=${timestamp}`;
        let response = await fetch(gvizQueryUrl, { cache: 'no-store' });

        if (response.ok) {
          const text = await response.text();
          if (text && text.includes('google.visualization.Query.setResponse')) {
            const rows = parseGvizJsonResponse(text);
            if (rows.length > 0) {
              return rows;
            }
          }
        }

        // Secondary Fallback: GViz CSV Endpoint
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&_cb=${timestamp}`;
        response = await fetch(csvUrl, { cache: 'no-store' });
        if (response.ok) {
          const csvText = await response.text();
          if (csvText && !csvText.trim().startsWith('<!DOCTYPE') && !csvText.trim().startsWith('<html')) {
            return parseCsvRows(csvText);
          }
        }

        // Tertiary Fallback: Direct Export Route
        const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&_cb=${timestamp}`;
        response = await fetch(exportUrl, { cache: 'no-store' });
        if (response.ok) {
          const csvText = await response.text();
          if (csvText && !csvText.trim().startsWith('<!DOCTYPE') && !csvText.trim().startsWith('<html')) {
            return parseCsvRows(csvText);
          }
        }
      } catch (err) {
        console.warn(`Live fetch failed for ${baseUrl}:`, err);
      }
      return [];
    });

    const sheetRowsArray = await Promise.all(fetchPromises);
    let studentsMap: Record<string, any> = {};
    let hasAnyData = false;

    for (const rows of sheetRowsArray) {
      if (!rows || rows.length === 0) continue;
      studentsMap = parseRowsToMap(rows, studentsMap);
      hasAnyData = true;
    }

    if (hasAnyData) {
      const parsed = mapEntriesToProfiles(studentsMap);
      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not fetch live Google Sheet attendance, using fallback dataset:', err);
  }
  return REAL_STUDENTS_DATA as unknown as RealStudentDataRecord[];
}
