import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<footer id="t-footer"[\s\S]*?<\/footer>/);
if (match) {
  console.log(match[0].length);
  fs.writeFileSync('footer.html', match[0]);
}
