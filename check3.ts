import fs from 'fs';
import * as cheerio from 'cheerio';
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('tmenu-mobile:', $('.tmenu-mobile').length);
console.log('a[href="#menuopen"]:', $('a[href="#menuopen"]').length);
console.log('Mobile menu button class tn-atom__menu:', $('.tn-atom__menu').length);

