import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
const footer = $('#t-footer');

footer.find('.t396__elem').each((i, el) => {
    let type = $(el).attr('data-elem-type');
    let bgimg = $(el).find('.tn-atom').attr('data-original');
    console.log($(el).attr('data-elem-id'), type, bgimg);
});
