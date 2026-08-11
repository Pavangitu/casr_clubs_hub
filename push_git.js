import { execSync } from 'child_process';

try {
  console.log('--- Staging files ---');
  execSync('git add -A', { stdio: 'inherit' });

  console.log('--- Committing changes ---');
  try {
    execSync('git commit -m "Update website color palette, legibility, Dr Anita Patra, Dr Ritesh Kumar, Mr Deep Joel P profiles, and Google Sheet integration"', { stdio: 'inherit' });
  } catch (e) {
    console.log('Commit note: Nothing new to commit or already committed.');
  }

  console.log('--- Setting Remote URL ---');
  execSync('git remote set-url origin https://github.com/Pavangitu/casr_clubs_hub.git', { stdio: 'inherit' });

  console.log('--- Pushing to GitHub ---');
  const pushOut = execSync('git push -u origin main', { encoding: 'utf8' });
  console.log(pushOut);
  console.log('SUCCESS: Pushed to GitHub repository https://github.com/Pavangitu/casr_clubs_hub.git');
} catch (err) {
  console.error('Git operation error:', err.message);
}
