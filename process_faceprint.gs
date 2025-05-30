function processFaceprint(empInfo, printType) {
  const ss = SpreadsheetApp.openById(SHEETID);
  const sheet = ss.getSheetByName('report');
  const data = sheet.getDataRange().getValues().slice(1); // get rid of the header column

  const dateFormat = 'yyyy-MM-dd';
  const targetDate = Utilities.formatDate(new Date(), 'GMT+3', dateFormat).toString().trim();

  let matchingRowIndex = null;

  for (let i = data.length - 1; i >= 0; i--) {
    const rowDate = Utilities.formatDate(new Date(data[i][2]), 'GMT+3', dateFormat).toString().trim();
    const rowEmpId = data[i][0].toString().trim();

    // break early
    if (rowDate !== targetDate) {
      break;
    }

    if (rowDate === targetDate && empInfo['emp_voter_num'].toString() === rowEmpId) {
      // account for 1-based indexing of sheets and the header row
      matchingRowIndex = i + 2;
      break;
    }
  }


  if (matchingRowIndex) {
    if (printType === 'entry') {
      sheet.getRange(matchingRowIndex, REPORTCOLS.entry_time).setValue(empInfo['entry_time']);
      sheet.getRange(matchingRowIndex, REPORTCOLS.entry_image_url).setValue(empInfo['entry_image_url']);

      sheet.getRange(matchingRowIndex, REPORTCOLS.entry_agent).setValue(empInfo['entry_agent']);
      sheet.getRange(matchingRowIndex, REPORTCOLS.entry_loc).setValue(empInfo['entry_loc']);
    } else {
      sheet.getRange(matchingRowIndex, REPORTCOLS.leave_time).setValue(empInfo['leave_time']);
      sheet.getRange(matchingRowIndex, REPORTCOLS.leave_image_url).setValue(empInfo['leave_image_url']);

      sheet.getRange(matchingRowIndex, REPORTCOLS.leave_agent).setValue(empInfo['leave_agent']);
      sheet.getRange(matchingRowIndex, REPORTCOLS.leave_loc).setValue(empInfo['leave_loc']);
    }
  } else {
    const newRow = [
      empInfo['emp_voter_num'],
      empInfo['emp_name'],
      empInfo['date'],
      empInfo['emp_center'],
      empInfo['entry_time'],
      empInfo['entry_image_url'],
      empInfo['leave_time'],
      empInfo['leave_image_url'],
      empInfo['entry_agent'],
      empInfo['entry_loc'],
      empInfo['leave_agent'],
      empInfo['leave_loc']
    ]

    sheet.appendRow(newRow);
  }
}