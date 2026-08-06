const fs = require('fs');
const path = require('path');

// Read realStudentsData.ts
const content = fs.readFileSync(path.join(__dirname, '../src/data/realStudentsData.ts'), 'utf-8');
const jsonMatch = content.match(/REAL_STUDENTS_DATA:\s*StudentProfile\[\]\s*=\s*(\[\s*[\s\S]*\]);/);

if (!jsonMatch) {
  console.error('Could not parse REAL_STUDENTS_DATA');
  process.exit(1);
}

try {
  const students = JSON.parse(jsonMatch[1]);
  console.log(`Total students parsed from REAL_STUDENTS_DATA: ${students.length}`);

  const clubs = [
    { id: 'casr-coding-club', name: '💻 Casr coding club' },
    { id: 'csar-take-one-movie-club', name: '🎬 Csar take one movie club' },
    { id: 'csar-frontliners', name: '🛡️ Csar frontliners' },
    { id: 'csar-content-creators', name: '📱 Csar content creators' },
    { id: 'agrifora-students-society', name: '🌱 Agrifora students society' },
    { id: 'eco-sankalp', name: '🌿 Eco sankalp' },
    { id: 'csar-groovers-dance-club', name: '💃 Csar groovers dance club' },
    { id: 'csar-brushers-painting-club', name: '🎨 Csar brushers painting club' },
    { id: 'csar-zyra-fashion-club', name: '👗 Csar zyra fashion club' },
    { id: 'csar-language', name: '🌍 Csar language' },
    { id: 'csar-harmony-music-club', name: '🎵 Csar harmony music club' },
    { id: 'csar-snapshot-photography-club', name: '📸 Csar snapshot photography club' },
    { id: 'csar-animal-allies', name: '🐾 Csar animal allies' },
    { id: 'csar-health-club', name: '❤️ Csar health club' },
    { id: 'csar-curtain-hall-drama-club', name: '🎭 Csar curtain hall drama club' },
    { id: 'csar-science-technology-club', name: '🔬 Csar science and technology club' },
    { id: 'csar-chandrabhanga-creators', name: '✍️ Csar chandrabhanga creators' },
    { id: 'csar-page-turners', name: '📖 Csar page turners' },
    { id: 'csar-robotics-club', name: '🤖 Csar robotics club' },
    { id: 'csar-hackton', name: '🚀 Csar hackton' },
    { id: 'nss', name: '🤝 Nss' },
    { id: 'ncc', name: '🎖️ Ncc' },
    { id: 'yasr-club', name: '🌟 Yasr club' },
    { id: 'drone-club', name: '🛸 Drone club' }
  ];

  const results = {};
  for (const club of clubs) {
    const keywords = club.name.replace(/^[^\w\s]+\s*/, '').toLowerCase().trim()
      .split(/\s+/).filter(w => !['csar', 'casr', 'club', 'society', 'students', 'the'].includes(w));

    const count = students.filter(s => {
      if (!s) return false;
      const pClub = (s.clubName || '').toLowerCase();
      const secondary = Array.isArray(s.allClubs) ? s.allClubs.map(c => (c || '').toLowerCase()).join(' ') : '';
      const historyList = Array.isArray(s.recentHistory) ? s.recentHistory.map(h => (h?.clubName || '').toLowerCase()).join(' ') : '';
      const combined = `${pClub} ${secondary} ${historyList}`;
      return keywords.some(kw => kw.length > 2 && combined.includes(kw));
    }).length;

    results[club.id] = { name: club.name, count };
  }

  console.log(JSON.stringify(results, null, 2));

} catch (err) {
  console.error('Error parsing JSON:', err);
}
