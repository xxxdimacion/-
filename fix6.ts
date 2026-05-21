import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Replace any occurrence of `"something="` with `" something="` or `'something='` with `' something='`
html = html.replace(/(["'])([a-zA-Z\-]+)=/g, '$1 $2=');

// But wait, there might be legitimate cases? Like `href="https://link.com"target="..."` => we want space.
// What if it is `<a href="test">`? It finds `"test">`.
// The regex `(["'])([a-zA-Z\-]+)=` matches `"`, then an attribute name, then `=`. This is EXACTLY `"[attr]=`.
// It avoids `">` or `" ` because of the `=`.
// This is perfect!

fs.writeFileSync('index.html', html);
console.log('Fixed parsing errors globally');
