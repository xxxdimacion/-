import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const footer = $('#t-footer');

footer.find('.t396__elem').each((i, el) => {
    let type = $(el).attr('data-elem-type');
    let text = $(el).text().trim().replace(/[\n\r\s]+/g, ' ');
    let html = $(el).html();
    console.log($(el).attr('data-elem-id'), type, text.substring(0, 30));
});
