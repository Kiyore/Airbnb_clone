import fs from 'fs';

const items = JSON.parse(fs.readFileSync('svg_map.json', 'utf8'));

// Print each file and its path data or characteristics
items.forEach(it => {
  // Check common characteristics
  console.log(`${it.file} (${it.length}b): ${it.preview.substring(0, 180)}`);
});
