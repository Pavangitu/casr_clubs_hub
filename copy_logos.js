import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const logo1 = path.join(__dirname, 'Logos - 2_20260227_150721_0000.png');
const logo2 = path.join(__dirname, 'images (1).jpeg');
const candidates = [
  'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784890934445.png',
  'C:/Users/pavan/Downloads/WhatsApp Image 2026-07-20 at 10.47.07 AM.jpeg',
  'C:/Users/pavan/Downloads/WhatsApp Image 2026-07-12 at 8.33.51 PM.jpeg',
  path.join(__dirname, 'Picsart_25-05-01_15-35-34-079.jpg'),
  path.join(__dirname, 'IMG-20250329-WA0009.jpg')
];

let copied = false;
for (const cand of candidates) {
  if (fs.existsSync(cand)) {
    fs.copyFileSync(cand, path.join(publicDir, 'dr_ritesh_kumar.jpg'));
    fs.copyFileSync(cand, path.join(assetsDir, 'dr_ritesh_kumar.jpg'));
    console.log(`Successfully updated Dr. Ritesh Kumar photo from: ${cand}`);
    copied = true;
    break;
  }
}
if (!copied) {
  console.log('No new photo candidate found for Dr. Ritesh Kumar');
}

const joelPhotoCandidates = [
  'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784891426123.png',
  'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784890920527.png'
];
for (const jcand of joelPhotoCandidates) {
  if (fs.existsSync(jcand)) {
    fs.copyFileSync(jcand, path.join(publicDir, 'paladugu_deep_joel.jpg'));
    fs.copyFileSync(jcand, path.join(assetsDir, 'paladugu_deep_joel.jpg'));
    console.log(`Successfully updated Mr. Paladugu Deep Joel photo from: ${jcand}`);
    break;
  }
}
