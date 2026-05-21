import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Remove the navigation button (three bars)
// The user says "удали кнопку с навигацией где три полоски"
// Usually this is a button with an image or svg for a hamburger menu, or an href="#menuopen"
$('a[href="#menuopen"]').parent().remove(); // The outer `.t396__elem` usually contains it

// We also have to keep only Logo, Privacy Policy, and Public Offer in the footer
// The footer has id="t-footer"
const footer = $('#t-footer');

// Let's find exactly what to keep in the footer.
// Let's see what is inside the footer.
let keeps: any[] = [];
footer.find('a').each((i, el) => {
  const href = $(el).attr('href');
  const text = $(el).text().trim().toLowerCase();
  
  // Public Offer -> href "/oferta" or text "оферта"
  // Privacy Policy -> href "/privacy-policy" or text "политика конфиденциальности"
  // Logo -> img with src matching logo
  
  if (href === '/privacy-policy') {
    keeps.push($(el).parent('.t396__elem')); // keep the whole block
  }
  if (href === '/oferta') {
    keeps.push($(el).parent('.t396__elem'));
  }
  if (href === '/') {
    // Check if it has an image (logo)
    if ($(el).find('img').length > 0 && String($(el).find('img').attr('src')).includes('Logo')) {
      keeps.push($(el).parent('.t396__elem'));
    }
    if ($(el).find('.tn-atom__img').length > 0 && String($(el).find('img').attr('src')).includes('Logo')) {
        keeps.push($(el).parent('.t396__elem'));
    }
  }
});

console.log('Keeps found:', keeps.length);

// What if they are inside a container? They are usually .t396__elem
// Let's write script to find all .t396__elem in footer and remove those that are not in keeps.
let elemCount = 0;
let removedCount = 0;
footer.find('.t396__elem').each((i, el) => {
  elemCount++;
  // Does this elem contain one of the keeps?
  let shouldKeep = false;
  keeps.forEach(keepEl => {
    if (keepEl[0] === el || $(el).find(keepEl).length > 0 || keepEl.find(el).length > 0) {
      shouldKeep = true;
    }
  });

  const text = $(el).text().trim().toLowerCase();
  if (text.includes("политика") || text.includes("privacy")) shouldKeep = true;
  if (text.includes("оферт")) shouldKeep = true;
  
  if ($(el).find('img').length > 0) {
      const src = String($(el).find('img').attr('src')).toLowerCase() || String($(el).find('img').attr('data-original')).toLowerCase();
      if (src.includes('logo')) shouldKeep = true;
  }

  // Also keep background rectangles if necessary? Or maybe remove them?
  // The user says "удали из нижнего футера все кроме логотипа полики конф и оферты"
  // Usually this means removing other text links, phone numbers, addresses, social icons.
  // So we only keep background shape, logo, privacy policy, offer.
  const type = $(el).attr('data-elem-type');
  if (type === 'shape') {
     shouldKeep = true; // keep shapes for background/layout
  }

  // wait, what about the t396__carrier and t396__filter? They don't have .t396__elem class so they are kept.

  if (!shouldKeep) {
    $(el).remove();
    removedCount++;
  }
});

console.log('Total elems in footer', elemCount, 'Removed', removedCount);

fs.writeFileSync('index.html', $.html());
