const fs = require('fs');
const path = require('path');

const dirs = ['different', 'difficulty', 'dream', 'stand', 'trend'];
const colors = { different: 'teal', difficulty: 'orange', dream: 'purple', stand: 'indigo', trend: 'sky' };

dirs.forEach(d => {
    const dPath = path.join(process.cwd(), 'src/components/wizard', d);
    if (!fs.existsSync(dPath)) return;

    fs.readdirSync(dPath).filter(f => f.endsWith('.tsx')).forEach(file => {
        let fPath = path.join(dPath, file);
        let content = fs.readFileSync(fPath, 'utf8');
        const c = colors[d];

        let newContent = content
            .replace(new RegExp(`bg-${c}-50`, 'g'), 'bg-blue-50')
            .replace(new RegExp(`text-${c}-900`, 'g'), 'text-blue-900')
            .replace(new RegExp(`border-${c}-100`, 'g'), 'border-blue-100')
            .replace(new RegExp(`bg-${c}-600`, 'g'), 'bg-blue-600')
            .replace(new RegExp(`hover:bg-${c}-700`, 'g'), 'hover:bg-blue-700')
            .replace(new RegExp(`shadow-${c}-200`, 'g'), 'shadow-blue-200')
            .replace(/💡 주장을 가장/g, '💡 Tip: 주장을 가장');

        if (content !== newContent) {
            fs.writeFileSync(fPath, newContent, 'utf8');
            console.log('Updated: ' + fPath);
        }
    });
});
console.log('Update Complete');
