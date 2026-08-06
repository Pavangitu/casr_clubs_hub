const https = require('https');

const sheetUrl = 'https://docs.google.com/spreadsheets/d/11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM/gviz/tq?tqx=out:csv';

function fetchCsv(url) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return fetchCsv(res.headers.location);
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`Status Code: ${res.statusCode}`);
      console.log('--- CSV HEAD (FIRST 1500 CHARS) ---');
      console.log(data.slice(0, 1500));
      
      // Parse rows & count unique club names
      const lines = data.split('\n');
      console.log(`\nTotal Lines in CSV: ${lines.length}`);
      
      const clubMap = {};
      lines.forEach((line, idx) => {
        if (idx === 0) return;
        const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        // Find columns matching club name
        cols.forEach(col => {
          if (col.toLowerCase().includes('club') || col.toLowerCase().includes('coding') || col.toLowerCase().includes('robotics')) {
            clubMap[col] = (clubMap[col] || 0) + 1;
          }
        });
      });
      
      console.log('\n--- DISCOVERED CLUBS IN GOOGLE SHEET ---');
      console.log(clubMap);
    });
  }).on('error', (err) => {
    console.error('Fetch Error:', err);
  });
}

fetchCsv(sheetUrl);
