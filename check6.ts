import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const footer = $('#t-footer');
footer.find('.t-rec').each((i, el) => {
    let id = $(el).attr('id');
    let logo = $(el).find('[data-elem-id="175613056989646590"]').length;
    let privacy = $(el).find('[data-elem-id="175613056987939910"]').length;
    let forms = $(el).find('form').length;
    console.log(id, 'Logo:', logo, 'Privacy:', privacy, 'Forms:', forms);
});
