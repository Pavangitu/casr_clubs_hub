@echo off
echo Running build...
call npm run build > build_log.txt 2>&1
echo Done! Build log written to build_log.txt.
pause
