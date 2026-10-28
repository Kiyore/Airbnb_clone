import fs from 'fs';

const svgs = fs.readdirSync('public/svgs');
const list = [];
svgs.forEach(f => {
  const content = fs.readFileSync('public/svgs/' + f, 'utf8');
  list.push({ file: f, length: content.length, preview: content.replace(/[\r\n\t]+/g, ' ') });
});

// Let's write this out to a readable json
fs.writeFileSync('svg_map.json', JSON.stringify(list, null, 2));
console.log(`Mapped ${list.length} svgs to svg_map.json`);
