@echo off
echo ==========================================
echo   Pushing CaSR Clubs Hub to GitHub
echo ==========================================
echo.

echo 1. Initializing local Git repository...
git init

echo.
echo 2. Setting main branch...
git branch -M main

echo.
echo 3. Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/Pavangitu/casr-clubs-hub.git

echo.
echo 4. Staging files...
git add .

echo.
echo 5. Creating initial commit...
git commit -m "Initial commit - CaSR Clubs Hub project"

echo.
echo 6. Pushing to GitHub (https://github.com/Pavangitu/casr-clubs-hub.git)...
git push -u origin main

echo.
echo ==========================================
echo Process complete!
echo ==========================================
pause
