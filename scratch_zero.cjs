const fs = require('fs');
const path = require('path');

const realDataPath = path.join(__dirname, 'src', 'data', 'realStudentsData.ts');
let content = fs.readFileSync(realDataPath, 'utf8');

// Replace all "creditsEarned": <number> with "creditsEarned": 0
const updated = content.replace(/"creditsEarned":\s*\d+(\.\d+)?/g, '"creditsEarned": 0');

fs.writeFileSync(realDataPath, updated, 'utf8');
console.log('Successfully set all creditsEarned to 0 in realStudentsData.ts');
