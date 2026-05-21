import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const bottomFooter = $('#rec1251158121');

bottomFooter.find('.t396__elem').each((i, el) => {
    let text = $(el).text().trim().toLowerCase();
    let type = $(el).attr('data-elem-type');
    let id = $(el).attr('data-elem-id');
    console.log(id, type, !!text ? text : 'NO-TEXT');
});
