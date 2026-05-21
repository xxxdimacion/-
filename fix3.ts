import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('dl=0 type="video/mp4"', 'dl=0" type="video/mp4"');

fs.writeFileSync('index.html', html);
console.log('Fixed missing quote');
