function processLeave(empId, empName, imageData, lat, lng) {
// sleep to prevent duplicate entries
  Utilities.sleep(5000);

  const folder = DriveApp.getFolderById('1yJIovbDheVa7Tg7L37whATspfBIZWEdO');
  const timestamp = Utilities.formatDate(new Date(), 'GMT+3', 'yyyy-MM-dd hh:mm:ss a');
  const fileName = `${empId}_leave_${timestamp}.jpg`;
  const userAgent = HtmlService.getUserAgent();
  const loc       = `https://maps.google.com/?q=${lat},${lng}`;

  
  const imageBlob = Utilities.newBlob(Utilities.base64Decode(imageData.split(',')[1]), 'image/jpeg', fileName);
  
  const file = folder.createFile(imageBlob);
  const datetime = new Date();
  const empInfo = {
    'emp_gov_num': empId,
    'emp_name': empName,
    'date': Utilities.formatDate(datetime, 'GMT+3', 'yyyy-MM-dd'),
    'leave_time': datetime,
    'leave_image_url': file.getUrl(),
    'leave_agent': userAgent,
    'leave_loc': loc
  }

  processFaceprint(empInfo, "leave");
}