import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'src/assets/logo.png');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_ICO = path.join(PUBLIC_DIR, 'favicon.ico');

/** Sizes embedded in favicon.ico (PNG payloads, Vista+). */
const ICO_SIZES = [16, 32, 48, 96, 144, 192];

/** Larger PNGs for app icons, OG images, Instagram avatars, etc. */
const EXTRA_PNG_SIZES = [512, 1024];

/**
 * Build a multi-resolution .ico with embedded PNGs.
 * @param {Buffer[]} pngBuffers valid PNG files (square)
 */
function createIcoFromPngBuffers(pngBuffers) {
  const n = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(n, 4);

  const parts = [header];
  let offset = 6 + n * 16;

  for (const png of pngBuffers) {
    if (png.length < 24 || png.readUInt32BE(0) !== 0x89504e47) {
      throw new Error('Expected PNG buffer');
    }
    const w = png.readUInt32BE(16);
    const h = png.readUInt32BE(20);
    const entry = Buffer.alloc(16);
    entry.writeUInt8(w >= 256 ? 0 : w, 0);
    entry.writeUInt8(h >= 256 ? 0 : h, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);  // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    parts.push(entry);
    offset += png.length;
  }

  for (const png of pngBuffers) parts.push(png);

  return Buffer.concat(parts);
}

async function pngForSize(size) {
  return sharp(SOURCE)
    .resize(size, size, {
      fit: 'contain',
      position: 'center',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      colors: size <= 48 ? 128 : 256,
    })
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`❌ Missing source: ${SOURCE}`);
    process.exit(1);
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const pngBuffers = await Promise.all(ICO_SIZES.map((s) => pngForSize(s)));
  const icoBuffer = createIcoFromPngBuffers(pngBuffers);

  for (let i = 0; i < ICO_SIZES.length; i++) {
    const size = ICO_SIZES[i];
    fs.writeFileSync(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`), pngBuffers[i]);
  }

  fs.writeFileSync(OUT_ICO, icoBuffer);

  for (const size of EXTRA_PNG_SIZES) {
    const buf = await pngForSize(size);
    fs.writeFileSync(path.join(PUBLIC_DIR, `logo-${size}x${size}.png`), buf);
  }

  const kb = (icoBuffer.length / 1024).toFixed(1);
  console.log(
    `✅ favicon.ico (${ICO_SIZES.join(', ')} px, ${kb} KB) · ` +
    ICO_SIZES.map((s) => `favicon-${s}x${s}.png`).join(', ') + ' · ' +
    EXTRA_PNG_SIZES.map((s) => `logo-${s}x${s}.png`).join(', ')
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
