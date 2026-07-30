# PowerShell script to push CaSR Clubs Hub to GitHub

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Pushing CaSR Clubs Hub to GitHub" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Copying logos to public and assets folders..." -ForegroundColor Gray
if (-not (Test-Path "public")) { New-Item -ItemType Directory -Path "public" | Out-Null }
if (-not (Test-Path "src\assets")) { New-Item -ItemType Directory -Path "src\assets" | Out-Null }

Copy-Item -Force "Logos - 2_20260227_150721_0000.png" "public\logo_casr.png"
Copy-Item -Force "Logos - 2_20260227_150721_0000.png" "src\assets\logo_casr.png"
Copy-Item -Force "images (1).jpeg" "public\logo_centurion.jpeg"
Copy-Item -Force "images (1).jpeg" "src\assets\logo_centurion.jpeg"

Write-Host "Staging all project files..." -ForegroundColor Gray
git add -A

Write-Host "Committing changes..." -ForegroundColor Gray
git commit -m "Update project with bug fixes and data synchronization"

Write-Host "Setting remote URL to https://github.com/Pavangitu/casr-clubs-hub.git..." -ForegroundColor Gray
git remote set-url origin https://github.com/Pavangitu/casr-clubs-hub.git

Write-Host "Pushing local main branch to remote..." -ForegroundColor Gray
git push -u origin main --force

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Process complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Read-Host -Prompt "Press Enter to exit"
