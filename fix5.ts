import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// fix tn-atom'field=
html = html.replace(/'tn-atom'field=/g, "'tn-atom' field=");

// and let's catch any other potential missing whitespaces globally just in case
html = html.replace(/"target="/g, '" target="');
html = html.replace(/"style="/g, '" style="');
html = html.replace(/'style="/g, "' style=\"");

fs.writeFileSync('index.html', html);
console.log('Fixed parsing errors');
