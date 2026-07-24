## CaSR Clubs Hub — Complete Sync & Automation Guide

### ✅ What Was Set Up

**The Problem:** The Google Sheet has **11 separate club tabs** (each club has its own tab). The website was only looking at the default first tab, so new data wasn't being picked up.

**The Fix:**
1. **`sync-sheet-data.js`** — A Node.js script that fetches data from ALL 11 club tabs and regenerates `realStudentsData.ts`
2. **`sync-and-deploy.bat`** — One-click batch file that syncs + pushes to GitHub (website rebuilds automatically)
3. **`googleSheetsService.ts`** — Updated to fetch from all 11 GID-based tab URLs in parallel

---

### 🚀 How To Update The Website

**Every time you add new data to the Google Sheet:**

1. **Double-click `sync-and-deploy.bat`** (in your project folder)
2. Wait ~2 minutes
3. Website is updated! ✅

---

### 📋 Club Tabs Configured

| Club | GID |
|------|-----|
| Agrifora Club | 1997413871 |
| DANCE CLUB | 1747670817 |
| Drama Club | 1824463464 |
| Fashion Club | 1336789504 |
| Language Club | 2060228171 |
| Literature Club | 578752662 |
| MOVIE CLUB | 1476951718 |
| Photography Club | 1771686445 |
| Painting Club | 700032659 |
| Music Club | 1198898863 |

---

### ⚠️ First Run — Required Steps

1. **Make the Google Sheet publicly accessible:**
   - Open the sheet → Click **Share** (top right)
   - Click "Change to anyone with the link"  
   - Set to **Viewer** access → Click **Done**

2. **Run the sync for the first time:**
   - Open a Command Prompt in the project folder
   - Run: `node sync-sheet-data.js`
   - Then: `git add src/data/realStudentsData.ts && git commit -m "Sync data" && git push`
   - OR just double-click `sync-and-deploy.bat`

---

### 🔄 Automation Options

| Method | How Often | Setup Required |
|--------|-----------|----------------|
| **Manual** (double-click bat file) | When you remember | Nothing |
| **Windows Task Scheduler** | Daily/hourly | Set up Task Scheduler |
| **GitHub Actions** (best) | Every push or scheduled | Add `.github/workflows/sync.yml` |
