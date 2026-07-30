import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'IMG-20260727-WA0060.jpg');
const destPublic = path.join(__dirname, 'public', 'dr_ritesh_kumar.jpg');
const destAssets = path.join(__dirname, 'src', 'assets', 'dr_ritesh_kumar.jpg');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destPublic);
    fs.copyFileSync(src, destAssets);
    console.log('Successfully copied Dr. Ritesh Kumar photo!');
  } else {
    console.error('Source image IMG-20260727-WA0060.jpg not found!');
  }
} catch (err) {
  console.error('Error copying file:', err);
}
