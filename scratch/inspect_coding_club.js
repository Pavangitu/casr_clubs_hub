const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/data/realStudentsData.ts'), 'utf-8');
const jsonMatch = content.match(/REAL_STUDENTS_DATA:\s*StudentProfile\[\]\s*=\s*(\[\s*[\s\S]*\]);/);

if (jsonMatch) {
  const students = JSON.parse(jsonMatch[1]);
  console.log(`Total Students in Database: ${students.length}`);

  const codingClubStudents = students.filter(s => {
    const pClub = (s.clubName || '').toLowerCase();
    const secondary = Array.isArray(s.allClubs) ? s.allClubs.map(c => (c || '').toLowerCase()).join(' ') : '';
    const historyList = Array.isArray(s.recentHistory) ? s.recentHistory.map(h => (h?.clubName || '').toLowerCase()).join(' ') : '';
    const combined = `${pClub} ${secondary} ${historyList}`;
    return combined.includes('coding');
  });

  console.log(`\n=== CODING CLUB REGISTERED MEMBERS (${codingClubStudents.length}) ===`);
  codingClubStudents.forEach((st, idx) => {
    console.log(`${idx + 1}. Name: ${st.name} | RegNo: ${st.registrationNumber} | Primary Club: ${st.clubName}`);
  });
} else {
  console.error('Failed to parse REAL_STUDENTS_DATA');
}
