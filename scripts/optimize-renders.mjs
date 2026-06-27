import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = './public/images/renders';
const THUMB_DIR = './public/images/renders/thumbs';
const FULL_DIR = './public/images/renders/full';

const THUMB_WIDTH = 900;
const FULL_WIDTH = 1920;
const THUMB_QUALITY = 80;
const FULL_QUALITY = 85;

await mkdir(THUMB_DIR, { recursive: true });
await mkdir(FULL_DIR, { recursive: true });

const files = await readdir(INPUT_DIR);
const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

console.log(`\nOptimizando ${imageFiles.length} imágenes...\n`);

let totalOriginal = 0;
let totalThumb = 0;
let totalFull = 0;

for (const file of imageFiles) {
  const inputPath = join(INPUT_DIR, file);
  const name = basename(file, extname(file));
  const thumbPath = join(THUMB_DIR, `${name}.webp`);
  const fullPath = join(FULL_DIR, `${name}.webp`);

  const meta = await sharp(inputPath).metadata();
  const originalSize = meta.size ?? 0;
  totalOriginal += originalSize;

  await sharp(inputPath)
    .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY })
    .toFile(thumbPath);

  await sharp(inputPath)
    .resize(FULL_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: FULL_QUALITY })
    .toFile(fullPath);

  const thumbMeta = await sharp(thumbPath).metadata();
  const fullMeta = await sharp(fullPath).metadata();
  totalThumb += thumbMeta.size ?? 0;
  totalFull += fullMeta.size ?? 0;

  const origMB = (originalSize / 1024 / 1024).toFixed(2);
  const thumbKB = ((thumbMeta.size ?? 0) / 1024).toFixed(0);
  const fullKB = ((fullMeta.size ?? 0) / 1024).toFixed(0);
  console.log(`  ${file.padEnd(45)} ${origMB} MB → thumb: ${thumbKB} KB | full: ${fullKB} KB`);
}

console.log(`\n${'─'.repeat(70)}`);
console.log(`  Original total:  ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
console.log(`  Thumbs total:    ${(totalThumb / 1024 / 1024).toFixed(1)} MB`);
console.log(`  Full total:      ${(totalFull / 1024 / 1024).toFixed(1)} MB`);
console.log(`  Ahorro thumb:    ${(100 - (totalThumb / totalOriginal) * 100).toFixed(0)}%`);
console.log(`  Ahorro full:     ${(100 - (totalFull / totalOriginal) * 100).toFixed(0)}%`);
console.log('');
