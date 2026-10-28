import fs from 'fs';

// Check JPEG image headers for width/height
function getJpegSize(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 2;
  while (pos < buf.length) {
    if (buf[pos] !== 0xFF) break;
    const marker = buf[pos + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buf.readUInt16BE(pos + 5);
      const width = buf.readUInt16BE(pos + 7);
      return { width, height };
    }
    const len = buf.readUInt16BE(pos + 2);
    pos += 2 + len;
  }
  return { width: 0, height: 0 };
}

const files = fs.readdirSync('public/images');
files.forEach(f => {
  if (f.endsWith('.jpeg') || f.endsWith('.jpg')) {
    const sz = getJpegSize('public/images/' + f);
    console.log(`${f}: ${sz.width}x${sz.height}`);
  }
});
