import fs from 'fs';
import path from 'path';

const source = "C:\\Users\\pavan\\.gemini\\antigravity-ide\\brain\\adbfce04-9fef-4bc2-a0a9-490337544135\\media__1785139954985.png";
const dests = [
  "c:\\Users\\pavan\\Downloads\\casr-clubs-hub\\Logos - 2_20260227_150721_0000.png",
  "c:\\Users\\pavan\\Downloads\\casr-clubs-hub\\public\\logo_casr.png",
  "c:\\Users\\pavan\\Downloads\\casr-clubs-hub\\src\\assets\\logo_casr.png"
];

try {
  if (!fs.existsSync(source)) {
    console.error("Source file does not exist:", source);
    process.exit(1);
  }

  for (const dest of dests) {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(source, dest);
    console.log("Successfully copied to:", dest);
  }
  console.log("All logo copies completed successfully.");
} catch (err) {
  console.error("Error copying file:", err);
  process.exit(1);
}
