import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('#t-footer .t-rec').each((i, el) => {
    let id = $(el).attr('id');
    let elemsCount = $(el).find('.t396__elem').length;
    let type = $(el).attr('data-record-type');
    console.log(id, 'type:', type, 'elems count:', elemsCount);
});
