const xlsx = require('xlsx');

function loadExcel(filePath) {
 const workbook = xlsx.readFile(filePath);
 const sheetName = workbook.SheetNames[0];
 return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

module.exports = loadExcel;
