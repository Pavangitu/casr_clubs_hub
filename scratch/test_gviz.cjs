const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    }).on('error', reject);
  });
}

async function testGviz() {
  const sheetId = '19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc';
  const tabs = [
    { name: 'Coding club', gid: '1690195397' },
    { name: 'Robotics Club', gid: '257171211' },
    { name: 'DANCE CLUB', gid: '1747670817' },
  ];

  for (const t of tabs) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=responseHandler:myCallback&gid=${t.gid}`;
    const res = await get(url);
    console.log(`Tab ${t.name} (gid ${t.gid}) status: ${res.status}, body length: ${res.body.length}`);
    const has230101120136 = res.body.includes('230101120136');
    console.log(`Contains 230101120136: ${has230101120136}`);
    console.log('Sample body preview:', res.body.substring(0, 200));
  }
}

testGviz();
