const https = require('https');

const sheetUrl = 'https://docs.google.com/spreadsheets/d/11RUWQreYoN48-mmWR_9wsRcO6wkEzrU0JQaFIUuqNlM/edit?usp=sharing';

https.get(sheetUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log('Redirecting to:', res.headers.location);
    return;
  }
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log(`Received HTML length: ${html.length}`);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'Unknown');

    // Search for tab names and GIDs in bootstrap data
    const regex = /"1":"([^"]+)","2":true/g;
    let match;
    const tabNames = [];
    while ((match = regex.exec(html)) !== null) {
      tabNames.push(match[1]);
    }
    console.log('Discovered tab names:', tabNames);

    // Search for GIDs pattern
    const gidRegex = /"sheetId":(\d+),"name":"([^"]+)"/g;
    let gMatch;
    const gids = [];
    while ((gMatch = gidRegex.exec(html)) !== null) {
      gids.push({ gid: gMatch[1], name: gMatch[2] });
    }
    console.log('Discovered GIDs:', gids);
  });
}).on('error', err => console.error(err));
