const fs = require('fs');
const path = require('path');

const files = ['step-example.tsx', 'step-point.tsx', 'step-point-re.tsx', 'step-reason.tsx'];
const dir = path.join(process.cwd(), 'src/components/wizard');

files.forEach(file => {
    const fPath = path.join(dir, file);
    if (!fs.existsSync(fPath)) return;

    let content = fs.readFileSync(fPath, 'utf8');
    let newContent = content
        .replace(/bg-emerald-50/g, 'bg-blue-50')
        .replace(/text-emerald-900/g, 'text-blue-900')
        .replace(/border-emerald-100/g, 'border-blue-100')
        .replace(/bg-emerald-600/g, 'bg-blue-600')
        .replace(/hover:bg-emerald-700/g, 'hover:bg-blue-700')
        .replace(/shadow-emerald-200/g, 'shadow-blue-200')
        .replace(/💡 주장을 가장/g, '💡 Tip: 주장을 가장');

    if (content !== newContent) {
        fs.writeFileSync(fPath, newContent, 'utf8');
        console.log('Updated: ' + fPath);
    }
});
console.log('Main Wizard Components Updated');
