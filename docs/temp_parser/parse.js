const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const docDir = path.join(__dirname, '..');

try {
    const xlsxPath = path.join(docDir, '000_M-PREP_NewBook_템플릿.xlsx');
    if (fs.existsSync(xlsxPath)) {
        const workbook = xlsx.readFile(xlsxPath);
        let excelText = '';
        workbook.SheetNames.forEach(sheetName => {
            excelText += `\n--- Sheet: ${sheetName} ---\n`;
            const sheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
            json.forEach(row => {
                excelText += row.join('\t') + '\n';
            });
        });
        fs.writeFileSync(path.join(docDir, 'excel_text.txt'), excelText);
        console.log('Excel parsed successfully.');
    } else {
        console.log('Excel not found.');
    }
} catch (err) {
    console.error('Error parsing files:', err);
}
