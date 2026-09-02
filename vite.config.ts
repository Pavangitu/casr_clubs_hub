import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { defineConfig, Plugin } from 'vite';

// Auto-copy new logo and generate embedded logoData.ts
try {
  const logoSource = 'C:/Users/pavan/.gemini/antigravity-ide/brain/adbfce04-9fef-4bc2-a0a9-490337544135/media__1785139954985.png';
  if (fs.existsSync(logoSource)) {
    fs.copyFileSync(logoSource, path.resolve(__dirname, 'Logos - 2_20260227_150721_0000.png'));
    fs.copyFileSync(logoSource, path.resolve(__dirname, 'public', 'logo_casr.png'));
    fs.copyFileSync(logoSource, path.resolve(__dirname, 'src', 'assets', 'logo_casr.png'));
    console.log('Successfully auto-copied new CaSR logo!');

    // Regenerate src/data/logoData.ts
    const owlPath = path.resolve(__dirname, 'Logos - 2_20260227_150721_0000.png');
    const centurionPath = path.resolve(__dirname, 'images (1).jpeg');
    if (fs.existsSync(owlPath) && fs.existsSync(centurionPath)) {
      const owlB64 = fs.readFileSync(owlPath).toString('base64');
      const centurionB64 = fs.readFileSync(centurionPath).toString('base64');
      const tsContent = `// Auto-generated embedded logos for zero 404 / 100% Vercel reliability
export const CASR_OWL_LOGO = "data:image/png;base64,${owlB64}";
export const CENTURION_EMBLEM_LOGO = "data:image/jpeg;base64,${centurionB64}";
`;
      const outPath = path.resolve(__dirname, 'src', 'data', 'logoData.ts');
      fs.writeFileSync(outPath, tsContent, 'utf-8');
      console.log('Regenerated src/data/logoData.ts successfully!');
    }
  }
} catch (e) {
  console.error('Logo copy/generation notice:', e);
}

// Auto-copy Dr. Ritesh Kumar photo
try {
  const candidatePhotos = [
    path.resolve(__dirname, 'IMG-20260727-WA0060.jpg'),
    'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784890934445.png',
    path.resolve(__dirname, 'Picsart_25-05-01_15-35-34-079.jpg'),
    'C:/Users/pavan/.gemini/antigravity-ide/brain/a01c71ff-b8b6-4b78-bf81-200f76ea257c/media__1784889985119.jpg',
    path.resolve(__dirname, 'IMG-20250329-WA0009.jpg')
  ];
  const destPublic = path.resolve(__dirname, 'public', 'dr_ritesh_kumar.jpg');
  const destAssets = path.resolve(__dirname, 'src', 'assets', 'dr_ritesh_kumar.jpg');
  for (const src of candidatePhotos) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destPublic);
      fs.copyFileSync(src, destAssets);
      break;
    }
  }

  const joelPhotoCandidates = [
    'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784891426123.png',
    'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784890920527.png'
  ];
  for (const jcand of joelPhotoCandidates) {
    if (fs.existsSync(jcand)) {
      fs.copyFileSync(jcand, path.resolve(__dirname, 'public', 'paladugu_deep_joel.jpg'));
      break;
    }
  }

  // Auto-copy Dr. Anita Patra photo
  const anitaPhotoCandidates = [
    path.resolve(__dirname, 'WhatsApp Image 2026-07-27 at 3.38.35 PM.jpeg')
  ];
  const destPublicAnita = path.resolve(__dirname, 'public', 'dr_anita_patra.jpg');
  const destAssetsAnita = path.resolve(__dirname, 'src', 'assets', 'dr_anita_patra.jpg');
  for (const src of anitaPhotoCandidates) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destPublicAnita);
      fs.copyFileSync(src, destAssetsAnita);
      break;
    }
  }
} catch (e) {
  console.error('Photo copy notice:', e);
}

// Dev server plugin for direct, live Google Sheets tab discovery with zero CORS issues
function googleSheetsDevPlugin(): Plugin {
  return {
    name: 'google-sheets-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/live-tabs')) {
          try {
            const urlObj = new URL(req.url, 'http://localhost:3000');
            const sheetId = urlObj.searchParams.get('sheetId') || '19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc';
            const htmlViewUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/htmlview?_t=${Date.now()}`;

            const fetchHtml = (targetUrl: string, redirects = 0): Promise<string> => {
              if (redirects > 5) return Promise.resolve('');
              return new Promise((resolve) => {
                https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (resp) => {
                  if (resp.statusCode && resp.statusCode >= 300 && resp.statusCode < 400 && resp.headers.location) {
                    return fetchHtml(resp.headers.location, redirects + 1).then(resolve);
                  }
                  let data = '';
                  resp.on('data', chunk => data += chunk);
                  resp.on('end', () => resolve(data));
                  resp.on('error', () => resolve(''));
                }).on('error', () => resolve(''));
              });
            };

            const html = await fetchHtml(htmlViewUrl);
            const regex = /items\.push\(\{\s*name:\s*"([^"]+)",\s*pageUrl:\s*"[^"]+",\s*gid:\s*"([^"]+)"/g;
            let match;
            const tabs: { name: string; gid: string }[] = [];
            while ((match = regex.exec(html)) !== null) {
              const name = match[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, grp) => String.fromCharCode(parseInt(grp, 16)));
              tabs.push({ name: name.trim(), gid: match[2] });
            }

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ success: true, sheetId, tabs }));
            return;
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: e?.message || 'Error', tabs: [] }));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), googleSheetsDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

