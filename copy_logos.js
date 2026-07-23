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

if (fs.existsSync(logo1)) {
  fs.copyFileSync(logo1, path.join(publicDir, 'logo_casr.png'));
  fs.copyFileSync(logo1, path.join(assetsDir, 'logo_casr.png'));
  console.log('Copied logo_casr.png to public/ and src/assets/');
}

if (fs.existsSync(logo2)) {
  fs.copyFileSync(logo2, path.join(publicDir, 'logo_centurion.jpeg'));
  fs.copyFileSync(logo2, path.join(assetsDir, 'logo_centurion.jpeg'));
  console.log('Copied logo_centurion.jpeg to public/ and src/assets/');
}
