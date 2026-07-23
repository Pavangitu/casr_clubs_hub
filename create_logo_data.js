import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const owlPath = path.join(__dirname, 'Logos - 2_20260227_150721_0000.png');
const centurionPath = path.join(__dirname, 'images (1).jpeg');

const owlB64 = fs.readFileSync(owlPath).toString('base64');
const centurionB64 = fs.readFileSync(centurionPath).toString('base64');

const tsContent = `// Auto-generated embedded logos for zero 404 / 100% Vercel reliability
export const CASR_OWL_LOGO = "data:image/png;base64,${owlB64}";
export const CENTURION_EMBLEM_LOGO = "data:image/jpeg;base64,${centurionB64}";
`;

const outPath = path.join(__dirname, 'src', 'data', 'logoData.ts');
fs.writeFileSync(outPath, tsContent, 'utf-8');

console.log('Created src/data/logoData.ts successfully!');
