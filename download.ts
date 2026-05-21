import fs from 'fs';

async function download() {
    const res = await fetch('https://orthoimplant.kz/all-on-6-all-on-4');
    const text = await res.text();
    fs.writeFileSync('index.html', text);
    console.log('Downloaded');
}
download();
