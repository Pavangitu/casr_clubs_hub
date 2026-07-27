const { execSync } = require('child_process');
try {
  const output = execSync('npx tsc --noEmit', { encoding: 'utf-8', cwd: __dirname + '/..' });
  console.log('TypeScript Compilation Success! No errors found.');
  console.log(output);
} catch (err) {
  console.log('TypeScript Compilation Errors:');
  console.log(err.stdout || err.message);
}
