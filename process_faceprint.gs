function processFaceprint(empInfo, printType) {
  const ss = SpreadsheetApp.openById('1D5Kp6YgcuFmAJFLOEUeq_rV-DfQgqC3nAPy7aoYoaJs');
  const sheet = ss.getSheetByName('report');
  const data = sheet.getDataRange().getValues().slice(1); // get rid of the header column

  const dateFormat = 'yyyy-MM-dd';
  const targetDate = Utilities.formatDate(new Date(), 'GMT+3', dateFormat).toString().trim();

  const voterNumCol   = 1;
  const empNameCol    = 2;
  const dateCol       = 3;
  const entryTimeCol  = 4
  const entryImageCol = 5;
  const leaveTimeCol  = 6;
  const leaveImageCol = 7;
  const entryAgentCol = 8;
  const entryLocCol   = 9;
  const leaveAgentCol = 10;
  const leaveLocCol   = 11;

  let matchingRowIndex = null;

  for (let i = data.length - 1; i >= 0; i--) {
    const rowDate = Utilities.formatDate(new Date(data[i][2]), 'GMT+3', dateFormat).toString().trim();
    const rowEmpId = data[i][0].toString().trim();

    // break early
    if (rowDate !== targetDate) {
      break;
    }

    if (rowDate === targetDate && empInfo['emp_gov_num'].toString() === rowEmpId) {
      // account for 1-based indexing of sheets and the header row
      matchingRowIndex = i + 2;
      break;
    }
  }


  if (matchingRowIndex) {
    if (printType === 'entry') {
      sheet.getRange(matchingRowIndex, entryTimeCol).setValue(empInfo['entry_time']);
      sheet.getRange(matchingRowIndex, entryImageCol).setValue(empInfo['entry_image_url']);

      sheet.getRange(matchingRowIndex, entryAgentCol).setValue(empInfo['entry_agent']);
      sheet.getRange(matchingRowIndex, entryLocCol).setValue(empInfo['entry_loc']);
    } else {
      sheet.getRange(matchingRowIndex, leaveTimeCol).setValue(empInfo['leave_time']);
      sheet.getRange(matchingRowIndex, leaveImageCol).setValue(empInfo['leave_image_url']);

      sheet.getRange(matchingRowIndex, leaveAgentCol).setValue(empInfo['leave_agent']);
      sheet.getRange(matchingRowIndex, leaveLocCol).setValue(empInfo['leave_loc']);
    }
  } else {
    const newRow = [
      empInfo['emp_gov_num'],
      empInfo['emp_name'],
      empInfo['date'],
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
