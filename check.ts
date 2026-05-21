import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const footer = $('#t-footer');

footer.find('.t396__elem').each((i, el) => {
    let text = $(el).text().trim().replace(/[\r\n\s]+/g, ' ');
    let html = $(el).html();
    console.log($(el).attr('data-elem-id'), $(el).attr('data-elem-type'), text.substring(0, 50));
    if ($(el).attr('data-elem-type') === 'image') {
        console.log('  Image:', $(el).find('img').attr('data-original') || $(el).find('img').attr('src'));
    }
});

console.log('Mobile menu button: ', $('a[href="#menuopen"]').length || 'Removed successfully');
