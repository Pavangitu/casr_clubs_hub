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

async function check() {
  const sheetId = '19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc';
  const htmlRes = await get('https://docs.google.com/spreadsheets/d/' + sheetId + '/htmlview');
  const regex = /items\.push\(\{\s*name:\s*"([^"]+)",\s*pageUrl:\s*"[^"]+",\s*gid:\s*"([^"]+)"/g;
  let match;
  const tabs = [];
  while ((match = regex.exec(htmlRes.body)) !== null) {
    const name = match[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, grp) => String.fromCharCode(parseInt(grp, 16)));
    tabs.push({ name: name.trim(), gid: match[2] });
  }
  console.log(JSON.stringify(tabs, null, 2));
}

check();
