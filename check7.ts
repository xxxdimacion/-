import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const ids = ['rec1251158096', 'rec1251158106', 'rec1251158101', 'rec1251210626', 'rec1251158111', 'rec1251158116', 'rec1251158121', 'rec1251182506', 'rec1251191466', 'rec1251214301'];

ids.forEach(id => {
    let el = $('#' + id);
    let text = $(el).text().trim().replace(/[\n\r\s]+/g, ' ');
    console.log(id, text.substring(0, 100));
});
