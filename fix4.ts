import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/"target="_blank"/g, '" target="_blank"');
html = html.replace(/"style="color:/g, '" style="color:');
html = html.replace(/"\s+target="_blank"style="/g, '" target="_blank" style="');

// Wait let's just do a generic replace
// It often looks like %3B70000001064485609"target="_blank"style="color: inherit"
html = html.replace(/"target="_blank"style="color: inherit"/g, '" target="_blank" style="color: inherit"');
html = html.replace(/"style="color: inherit"/g, '" style="color: inherit"');
html = html.replace(/"target="_blank"/g, '" target="_blank"');

// And remove mobile menu button which was original request
// But we want to wipe it completely
// The button is <a class='tn-atom' href="#menuopen">...
// Wait, in Tilda, it's inside a t396__elem
// Let's use cheerio to cleanly remove it.

fs.writeFileSync('index.html', html);
