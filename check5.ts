import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const footer = $('#t-footer');
footer.find('.t-rec').each((i, el) => {
    let type = $(el).attr('data-record-type');
    let id = $(el).attr('id');
    console.log(id, type);
});
