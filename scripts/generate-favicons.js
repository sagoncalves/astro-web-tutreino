import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE_LARGE = path.join(ROOT, 'src/assets/logo-favicon.svg');
const SOURCE_SMALL = path.join(ROOT, 'src/assets/logo-favicon-small.svg');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_ICO = path.join(PUBLIC_DIR, 'favicon.ico');

/** Sizes embedded in favicon.ico (PNG payloads, Vista+). */
const ICO_SIZES = [16, 32, 48, 96, 144, 192];

/** Larger PNGs for app icons, OG images, Instagram avatars, etc. */
const EXTRA_PNG_SIZES = [512, 1024];

/** Below this threshold, use the small (no-shadow) source for legibility. */
const SHADOW_THRESHOLD = 144;

/** Transparent canvas — the SVG carries its own tile + shadow. */
const CANVAS = { r: 0, g: 0, b: 0, alpha: 0 };

function sourceForSize(size) {
  return size >= SHADOW_THRESHOLD ? SOURCE_LARGE : SOURCE_SMALL;
}

/**
 * Build a multi-resolution .ico with embedded PNGs (small on disk vs BMP/DIB).
 * @param {Buffer[]} pngBuffers valid PNG files (square recommended)
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
    entry.writeUInt8(0, 2); // no palette in directory
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // “32 bpp” (conventional for PNG-in-ICO)
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    parts.push(entry);
    offset += png.length;
  }

  for (const png of pngBuffers) {
    parts.push(png);
  }

  return Buffer.concat(parts);
}

async function pngForSize(size) {
  return sharp(sourceForSize(size))
    .resize(size, size, {
      fit: 'contain',
      position: 'center',
      background: CANVAS,
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
  for (const src of [SOURCE_LARGE, SOURCE_SMALL]) {
    if (!fs.existsSync(src)) {
      console.error(`❌ Missing source: ${src}`);
      process.exit(1);
    }
  }

  const pngBuffers = await Promise.all(ICO_SIZES.map((s) => pngForSize(s)));
  const icoBuffer = createIcoFromPngBuffers(pngBuffers);

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  for (let i = 0; i < ICO_SIZES.length; i++) {
    const size = ICO_SIZES[i];
    const outPng = path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`);
    fs.writeFileSync(outPng, pngBuffers[i]);
  }

  fs.writeFileSync(OUT_ICO, icoBuffer);

  // Larger app-icon / social-avatar sizes (not embedded in .ico).
  for (const size of EXTRA_PNG_SIZES) {
    const buf = await pngForSize(size);
    const outPng = path.join(PUBLIC_DIR, `logo-${size}x${size}.png`);
    fs.writeFileSync(outPng, buf);
  }

  const kb = (icoBuffer.length / 1024).toFixed(1);
  console.log(
    `✅ Wrote ${OUT_ICO} (${ICO_SIZES.join(', ')} px, ${kb} KB) + ${ICO_SIZES.map((s) => `favicon-${s}x${s}.png`).join(', ')} + ${EXTRA_PNG_SIZES.map((s) => `logo-${s}x${s}.png`).join(', ')}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
