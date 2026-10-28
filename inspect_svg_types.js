import fs from 'fs';

const svgs = fs.readdirSync('public/svgs');
const details = [];

svgs.forEach(f => {
  const content = fs.readFileSync('public/svgs/' + f, 'utf8');
  let type = 'unknown';
  if (content.includes('M1494.71')) type = 'airbnb-full-logo';
  else if (content.includes('M15.4895')) type = 'airbnb-symbol';
  else if (content.includes('clip-path') || f.includes('discount')) type = 'discount';
  
  details.push({ file: f, length: content.length, type, snippet: content.replace(/[\r\n\t ]+/g, ' ').substring(0, 120) });
});

console.log(JSON.stringify(details.slice(0, 30), null, 2));
