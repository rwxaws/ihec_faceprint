function processEntry(empId, empName, imageData, lat, lng) {
  // sleep to prevent duplicate entries
  Utilities.sleep(5000);
  
  const folder = DriveApp.getFolderById('1yJIovbDheVa7Tg7L37whATspfBIZWEdO');
  const timestamp = Utilities.formatDate(new Date(), 'GMT+3', 'yyyy-MM-dd hh:mm:ss a');
  const fileName = `${empId}_entry_${timestamp}.jpg`;
  const userAgent = HtmlService.getUserAgent();
  const loc       = `https://maps.google.com/?q=${lat},${lng}`;

  // Convert base64 image to blob
  const imageBlob = Utilities.newBlob(Utilities.base64Decode(imageData.split(',')[1]), 'image/jpeg', fileName);
  
  const file = folder.createFile(imageBlob);
  const datetime = new Date();
  const empInfo = {
    'emp_gov_num': empId,
    'emp_name': empName,
    'date': Utilities.formatDate(datetime, 'GMT+3', 'yyyy-MM-dd'),
    'entry_time': datetime,
    'entry_image_url': file.getUrl(),
    'entry_agent': userAgent,
    'entry_loc': loc
  }

  processFaceprint(empInfo, "entry");
}