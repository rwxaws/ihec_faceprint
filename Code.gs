function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Employee Attendance System');
}

function getEmployees() {
  const ss = SpreadsheetApp.openById('1D5Kp6YgcuFmAJFLOEUeq_rV-DfQgqC3nAPy7aoYoaJs');
  const sheet = ss.getSheetByName('emp_db');
  const data = sheet.getDataRange().getValues().slice(1); // Skip header row
  
  return data.map(row => ({
    emp_gov_num: row[0],
    emp_name: row[1]
  }));
}