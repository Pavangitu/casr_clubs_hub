import fetch from 'node-fetch';

async function testFetch() {
  const url = 'https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/gviz/tq?tqx=out:csv';
  console.log('Fetching:', url);
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log('Response length:', text.length);
    console.log('First 500 chars:\n', text.substring(0, 500));
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

testFetch();
