import fs from 'fs';

console.log("=== SVGS ===");
const svgs = fs.readdirSync('public/svgs');
svgs.forEach(f => {
  const content = fs.readFileSync('public/svgs/' + f, 'utf8');
  console.log(f + ': ' + content.substring(0, 150).replace(/[\r\n]+/g, ' '));
});

console.log("\n=== IMAGES ===");
const imgs = fs.readdirSync('public/images');
imgs.forEach(f => {
  const stat = fs.statSync('public/images/' + f);
  console.log(f + ': ' + stat.size + ' bytes');
});
