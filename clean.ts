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

const keeps = [];
bottomFooter.find('.t396__elem').each((i, el) => {
    let text = $(el).text().trim().toLowerCase();
    let shouldKeep = false;
    
    // Privacy / Oferta
    if (text.includes('политика') || text.includes('privacy')) shouldKeep = true;
    if (text.includes('оферт')) shouldKeep = true;
    
    // Logo
    if ($(el).find('img').length > 0) {
       const src = $(el).find('img').attr('data-original') || $(el).find('img').attr('src');
       if (src && src.toLowerCase().includes('logo')) shouldKeep = true;
    }
    
    // Shapes are needed for background
    if ($(el).attr('data-elem-type') === 'shape') {
        // Only keep if it doesn't have an image (meaning it's not a social icon)
        let bg = $(el).find('.tn-atom').attr('data-original');
        if (!bg) {
           shouldKeep = true;
        } else {
           console.log('Skipping shape image:', bg);
        }
    }
    
    if (!shouldKeep) {
        console.log('Removing from bottom footer:', text || '[No text]', $(el).attr('data-elem-id'));
        $(el).remove();
    }
});

fs.writeFileSync('index.html', $.html());
