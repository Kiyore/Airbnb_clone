import fs from 'fs';

const files = fs.readdirSync('public/images');
console.log("Images found in public/images:");
files.forEach(f => {
  const stat = fs.statSync('public/images/' + f);
  console.log(`- ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
});
