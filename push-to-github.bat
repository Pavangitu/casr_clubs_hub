@echo off
echo ==========================================
echo   Pushing CaSR Clubs Hub to GitHub
echo ==========================================
echo.

echo Copying logos to public and assets folders for Vercel...
if not exist "public" mkdir "public"
if not exist "src\assets" mkdir "src\assets"
copy /Y "Logos - 2_20260227_150721_0000.png" "public\logo_casr.png"
copy /Y "Logos - 2_20260227_150721_0000.png" "src\assets\logo_casr.png"
copy /Y "images (1).jpeg" "public\logo_centurion.jpeg"
copy /Y "images (1).jpeg" "src\assets\logo_centurion.jpeg"

echo Staging all project files...
git add -A

echo Committing changes...
git commit -m "Update project with bug fixes and data synchronization"

echo Setting remote URL...
git remote set-url origin https://github.com/Pavangitu/casr-clubs-hub.git

echo Pushing local main branch to remote...
git push -u origin main --force

echo.
echo ==========================================
echo Process complete! Project pushed successfully.
echo ==========================================
pause

