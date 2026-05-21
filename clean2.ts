import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove menu
$('a[href="#menuopen"]').parent().remove();
$('a[href="#menuopen"]').remove();
$('.tmenu-mobile').remove();
$('.tn-atom__menu').remove();


// Clean bottom footer (rec1251158121)
const bottomFooter = $('#rec1251158121');

bottomFooter.find('.t396__elem').each((i, el) => {
    let text = $(el).text().trim().toLowerCase();
    let shouldKeep = false;
    
    // Privacy / Oferta
    if (text.includes('политика') || text.includes('privacy')) shouldKeep = true;
    if (text.includes('оферт')) shouldKeep = true;
    if (text.includes('блог')) shouldKeep = true;
    
    // Logo
    if ($(el).find('img').length > 0) {
       const src = $(el).find('img').attr('data-original') || $(el).find('img').attr('src');
       if (src && src.toLowerCase().includes('logo')) shouldKeep = true;
    }
    
    const type = $(el).attr('data-elem-type');
    const bg = $(el).find('.tn-atom').attr('data-original');
    
    if (type === 'image' && $(el).html().toLowerCase().includes('logo')) {
        shouldKeep = true;
    }
    
    // Shapes
    if (type === 'shape') {
        if (!bg) {
           shouldKeep = true; // Background shape
        } else if (bg.toLowerCase().includes('logo')) {
           shouldKeep = true; // Logo shape
        }
    }
    
    if (!shouldKeep) {
        $(el).remove();
    }
});

fs.writeFileSync('index.html', $.html());
