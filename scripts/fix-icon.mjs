import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const input = "public/icon.png";

/** Mantém só pixels dourados do brasão; remove xadrez claro/escuro e cinzas. */
function isLogoPixel(r, g, b, a) {
  if (a < 12) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const avg = (r + g + b) / 3;

  // Dourado / bronze (R dominante, cor saturada)
  if (diff >= 22 && r >= 70 && r >= g && g >= b - 8) return true;
  if (r >= 120 && diff >= 18 && r > g) return true;

  // Fundo xadrez e halos cinza
  if (diff < 32 && avg >= 40 && avg <= 210) return false;
  if (min >= 185 && diff < 30) return false;

  return diff >= 30;
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (!isLogoPixel(r, g, b, data[i + 3])) {
    data[i + 3] = 0;
  }
}

const trimmed = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toBuffer()
  .then((buf) => sharp(buf).trim({ threshold: 8 }).toBuffer());

const meta = await sharp(trimmed).metadata();
const pad = Math.max(12, Math.round(Math.max(meta.width, meta.height) * 0.08));

const out = await sharp(trimmed)
  .extend({
    top: pad,
    bottom: pad,
    left: pad,
    right: pad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toBuffer();

writeFileSync(input, out);
console.log(`icon.png → ${meta.width}x${meta.height} (+${pad}px pad)`);
