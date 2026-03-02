const fs = require('fs');
async function test() {
    const formData = new FormData();
    formData.append('file', new Blob(['Hello World'], { type: 'text/plain' }), 'test.txt');
    try {
        const res = await fetch('http://localhost:3000/api/prep-rfp/parse', {
            method: 'POST',
            body: formData
        });
        const text = await res.text();
        fs.writeFileSync('error_response.html', text);
    } catch (e) {
        console.error(e);
    }
}
test();
