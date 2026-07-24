/**
 * Google Apps Script for CaSR Clubs Hub Real-Time Sheet Synchronization
 * 
 * Instructions:
 * 1. In your Google Sheet (https://docs.google.com/spreadsheets/d/19lL4u-lbfm9CYuOqLozTVQMSE7KtLhiKMLD-nfbcQjc/edit),
 *    click "Extensions" -> "Apps Script".
 * 2. Paste this entire code into `Code.gs`.
 * 3. Click "Deploy" -> "New deployment" -> Select type: "Web app".
 * 4. Set "Execute as": "Me", "Who has access": "Anyone".
 * 5. Click "Deploy" and copy the Web App URL!
 * 6. Paste the Web App URL into the CaSR Clubs Hub website under "Sheet Settings".
 */

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var allData = [];

  sheets.forEach(function(sheet) {
    var sheetName = sheet.getName();
    var data = sheet.getDataRange().getValues();
    if (data && data.length > 0) {
      allData.push({
        sheetName: sheetName,
        rows: data
      });
    }
  });

  var result = JSON.stringify({
    status: "success",
    timestamp: new Date().toISOString(),
    spreadsheetId: ss.getId(),
    totalSheets: sheets.length,
    data: allData
  });

  return ContentService.createTextOutput(result)
    .setMimeType(ContentService.MimeType.JSON);
}

function onEdit(e) {
  // Triggered automatically whenever anyone edits any cell in the sheet
  Logger.log("Sheet edited at " + new Date().toISOString());
}
