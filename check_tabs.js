
const urls = [
  'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/edit?usp=sharing',
  'https://docs.google.com/spreadsheets/d/1MQFgiFZ_l7baUkmZstVYEhUhVxK6i-7QjcqdDb_IcT8/edit?usp=sharing',
  'https://docs.google.com/spreadsheets/d/1qxQ4m_VXukgkT23SwK3B7uhR2sOp5XH5WqFpcwTu59g/edit?usp=sharing'
];

async function checkSheet(url) {
  console.log(`Checking ${url}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    
    // Look for sheet tab names / bootstrap data
    // In Google Sheets HTML, there's a JSON structure containing sheet names:
    // e.g. "bootstrapData" or similar. Or we can match sheet names in script tags.
    const regex = /"lng":"([^"]+)","sh":true,"id":"([^"]+)"/g;
    let match;
    const sheets = [];
    while ((match = regex.exec(html)) !== null) {
      sheets.push({ name: match[1], gid: match[2] });
    }
    
    // Alternative check for sheet names
    const altRegex = /"1":"([^"]+)","2":true/g;
    // Let's just find matches of the sheet metadata
    console.log('Found sheet names & gids via regex:');
    console.log(sheets);
    
    // Print script tags or small snippets containing sheet metadata if sheets is empty
    if (sheets.length === 0) {
      console.log('No sheets found via regex, searching for script content...');
      const scriptRegex = /_gridData\s*=\s*([^;]+)/;
      const scriptMatch = html.match(scriptRegex);
      if (scriptMatch) {
        console.log('Found _gridData!');
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        console.log(`Page Title: ${titleMatch ? titleMatch[1] : 'No Title'}`);
        if (html.includes('Sign in')) {
          console.log('Page requires Sign-In (Private)');
        }
      }
    }
  } catch (err) {
    console.error('Error checking sheet:', err);
  }
}

async function main() {
  for (const url of urls) {
    await checkSheet(url);
    console.log('-----------------------------------');
  }
}

main();
