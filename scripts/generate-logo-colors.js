import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'src/assets/logo-favicon.svg');
const OUT_DIR = path.join(ROOT, 'public/logo');

const SIZES = [512, 1024];

/**
 * Brand palette — must stay in sync with --tokens in src/pages/index.astro.
 * "transparent" is also exported as the canonical no-bg variant.
 */
const BACKGROUNDS = [
  { name: 'transparent', hex: null,        rgba: { r: 0, g: 0, b: 0, alpha: 0 } },
  { name: 'cream',       hex: '#FFFBF2',   note: '--bg · landing default' },
  { name: 'paper',       hex: '#FFFFFF',   note: 'pure white · prints / docs' },
  { name: 'ink',         hex: '#0E3B43',   note: '--ink · footer / dark mode' },
  { name: 'yellow',      hex: '#FFD23F',   note: '--yellow · social posts / stickers' },
  { name: 'magenta',     hex: '#E8336B',   note: '--magenta · CTAs · DOES NOT WORK (bubble blends)' },
  { name: 'cream-2',     hex: '#F5F0E0',   note: '--bg-2 · subtle off-cream' },
  { name: 'sun-cream',   hex: '#FFF5D6',   note: '--cream · stat card' },
];

function hexToRgba(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    alpha: 1,
  };
}

async function renderVariant(size, bg) {
  const background = bg.hex ? hexToRgba(bg.hex) : bg.rgba;

  // Render the SVG to a tight square, then composite on a colored canvas.
  // Padding gives the rotated tile + shadow room to breathe (~12% on each side).
  const padding = Math.round(size * 0.12);
  const inner = size - padding * 2;

  const logoBuf = await sharp(SOURCE)
    .resize(inner, inner, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: logoBuf, gravity: 'center' }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`❌ Missing source: ${SOURCE}`);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const written = [];
  for (const bg of BACKGROUNDS) {
    for (const size of SIZES) {
      const buf = await renderVariant(size, bg);
      const filename = `logo-${bg.name}-${size}.png`;
      const outPath = path.join(OUT_DIR, filename);
      fs.writeFileSync(outPath, buf);
      written.push({ filename, kb: (buf.length / 1024).toFixed(1), bg: bg.hex || 'transparent' });
    }
  }

  console.log(`✅ Wrote ${written.length} files to public/logo/\n`);
  for (const w of written) {
    console.log(`   ${w.filename.padEnd(36)}  ${w.bg.padEnd(10)}  ${w.kb} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
