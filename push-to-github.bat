@echo off
echo ==========================================
echo   Pushing CaSR Clubs Hub to GitHub
echo ==========================================
echo.

echo Staging files...
git add .

echo Committing changes...
git commit -m "Fix entrance page logos framing, alignment and cropping"

echo Pushing local main branch to remote...
git push -u origin main

echo.
echo ==========================================
echo Process complete! Project pushed successfully.
echo ==========================================
pause

