import fs from 'fs';

async function run() {
  try {
    const response = await fetch('https://orthoimplant.kz/all-on-6-all-on-4');
    const text = await response.text();
    fs.writeFileSync('index.html', text);
    console.log('Successfully downloaded the site code into index.html (' + text.length + ' bytes)');
  } catch(e) {
    console.error('Failed to fetch:', e);
  }
}
run();
