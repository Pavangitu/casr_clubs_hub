@echo off
echo ==========================================
echo   Pushing CaSR Clubs Hub to GitHub
echo ==========================================
echo.

echo Staging files...
git add .

echo Committing changes...
git commit -m "Update EntranceView logos and tagline to Cultural and Social Responsibility (CaSR)"

echo Pushing local main branch to remote...
git push -u origin main --force

echo.
echo ==========================================
echo Process complete! Project pushed successfully.
echo ==========================================
pause
