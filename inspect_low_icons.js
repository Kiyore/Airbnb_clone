import fs from 'fs';

const svgs = fs.readdirSync('public/svgs');
svgs.filter(f => !f.startsWith('icon-1')).forEach(f => {
  const content = fs.readFileSync('public/svgs/' + f, 'utf8');
  console.log(`${f}: ${content.replace(/[\r\n\t ]+/g, ' ').substring(0, 150)}`);
});
