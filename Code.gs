function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Employee Attendance System');
}

function getEmployees() {
  const ss = SpreadsheetApp.openById(SHEETID);
  const sheet = ss.getSheetByName('emp_db');
  const data = sheet.getDataRange().getValues().slice(1); // Skip header row
  
  return data.map(row => ({
    emp_voter_num: row[0],
    emp_name: row[1],
    emp_center: row[2],
  }));
}


function getCenters() {
  return CENTERS;
}