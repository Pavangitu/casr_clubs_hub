@echo off
chcp 65001 >nul
echo.
echo ============================================================
echo   CaSR Clubs Hub - STEP 1: Sync Excel/Google Sheet Data
echo ============================================================
echo.
echo Fetching latest data from ALL club tabs in Google Sheet...
echo (Agrifora, Dance, Drama, Fashion, Language, Literature,
echo  Movie, Photography, Painting, Music clubs)
echo.

node sync-sheet-data.js

if %ERRORLEVEL% neq 0 (
    echo.
    echo *** SYNC FAILED ***
    echo.
    echo To fix this, open the Google Sheet and:
    echo   1. Click the green Share button (top right)
    echo   2. Click "Change to anyone with the link"
    echo   3. Make sure it says "Viewer" access
    echo   4. Click Done, then run this file again
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   STEP 2: Pushing to GitHub (website auto-rebuilds)
echo ============================================================
echo.

git add src/data/realStudentsData.ts
git commit -m "Auto-sync: Update student data from Google Sheet - %DATE% %TIME%"
git remote set-url origin https://github.com/Pavangitu/casr_clubs_hub.git
git push -u origin main

if %ERRORLEVEL% neq 0 (
    echo.
    echo *** GIT PUSH FAILED ***
    echo The student data WAS updated locally.
    echo Run:  git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS!
echo   - Student data fetched from Google Sheet
echo   - Changes pushed to GitHub
echo   - Website will update in 1-2 minutes automatically!
echo ============================================================
echo.
pause
