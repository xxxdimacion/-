import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Total records in body:', $('.t-rec').length);
console.log('Total records in footer:', $('#t-footer .t-rec').length);

const footerIds = [];
$('#t-footer .t-rec').each((i, el) => {
    footerIds.push($(el).attr('id'));
});
console.log(footerIds);

const bodyIds = [];
$('.t-rec').each((i, el) => {
    bodyIds.push($(el).attr('id'));
});
console.log('First few body ids:', bodyIds.slice(0, 10));

