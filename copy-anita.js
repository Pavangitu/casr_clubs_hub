import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'WhatsApp Image 2026-07-27 at 3.38.35 PM.jpeg');
const destPublic = path.join(__dirname, 'public', 'dr_anita_patra.jpg');
const destAssets = path.join(__dirname, 'src', 'assets', 'dr_anita_patra.jpg');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destPublic);
    fs.copyFileSync(src, destAssets);
    console.log('Successfully copied Dr. Anita Patra photo!');
  } else {
    console.error('Source image WhatsApp Image 2026-07-27 at 3.38.35 PM.jpeg not found!');
  }
} catch (err) {
  console.error('Error copying file:', err);
}
