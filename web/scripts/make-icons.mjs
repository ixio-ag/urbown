// Erzeugt Favicons, PWA-Icons und das Open-Graph-Bild aus den Logo-SVGs (UB02 5.4).
// Ausführen im Stammordner oder in web/: node web/scripts/make-icons.mjs
// Ergebnis wird eingecheckt (web/public/).
import { readFile, writeFile, copyFile, mkdtemp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { inflateSync } from "node:zlib";
import path from "node:path";
import sharp from "sharp";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = path.join(WEB, "public", "brand");
const OUT = path.join(WEB, "public");
const INK = "#111111";
const INK2 = "#55554F";
const WHITE = "#FFFFFF";

const icon = await readFile(path.join(BRAND, "urbown-icon.svg"));
const maskable = await readFile(path.join(BRAND, "urbown-icon-maskable.svg"));
const logo = await readFile(path.join(BRAND, "urbown-logo.svg"));

const png = (svg, size) => sharp(svg, { density: 600 }).resize(size, size).flatten({ background: WHITE }).png().toBuffer();

// ICO mit eingebetteten PNG (32 und 48 px)
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const files = [];
async function write(name, data) {
  await writeFile(path.join(OUT, name), data);
  files.push(name);
}

await write("favicon.ico", ico([
  { size: 32, data: await png(icon, 32) },
  { size: 48, data: await png(icon, 48) },
]));
await copyFile(path.join(BRAND, "urbown-icon.svg"), path.join(OUT, "icon.svg"));
files.push("icon.svg");
await write("apple-touch-icon.png", await png(icon, 180));
await write("icon-192.png", await png(icon, 192));
await write("icon-512.png", await png(icon, 512));
await write("icon-maskable-512.png", await png(maskable, 512));
// Quadrat-Logo als PNG für JSON-LD «Organization.logo» (UB03 2.4)
const quadrat = await readFile(path.join(BRAND, "urbown-quadrat.svg"));
await write("brand/urbown-quadrat.png", await png(quadrat, 512));

// Open-Graph-Bild 1200 × 630: Original-Logo auf Weiss, Claim in Archivo 800, Mono-Zeile «urbown.com»
// Pango (sharp) liest nur TTF/OTF: WOFF aus @fontsource in eine temporäre TTF-Datei umwandeln.
function woffToSfnt(buf) {
  const numTables = buf.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const o = 44 + i * 20;
    tables.push({
      tag: buf.subarray(o, o + 4),
      offset: buf.readUInt32BE(o + 4),
      compLength: buf.readUInt32BE(o + 8),
      origLength: buf.readUInt32BE(o + 12),
      checksum: buf.readUInt32BE(o + 16),
    });
  }
  const entrySelector = Math.floor(Math.log2(numTables));
  const searchRange = 2 ** entrySelector * 16;
  const head = Buffer.alloc(12 + 16 * numTables);
  head.writeUInt32BE(buf.readUInt32BE(4), 0);
  head.writeUInt16BE(numTables, 4);
  head.writeUInt16BE(searchRange, 6);
  head.writeUInt16BE(entrySelector, 8);
  head.writeUInt16BE(numTables * 16 - searchRange, 10);
  let offset = head.length;
  const parts = tables.map((t, i) => {
    let data = buf.subarray(t.offset, t.offset + t.compLength);
    if (t.compLength < t.origLength) data = inflateSync(data);
    const pad = (4 - (data.length % 4)) % 4;
    t.tag.copy(head, 12 + i * 16);
    head.writeUInt32BE(t.checksum, 12 + i * 16 + 4);
    head.writeUInt32BE(offset, 12 + i * 16 + 8);
    head.writeUInt32BE(t.origLength, 12 + i * 16 + 12);
    offset += data.length + pad;
    return Buffer.concat([data, Buffer.alloc(pad)]);
  });
  return Buffer.concat([head, ...parts]);
}

const fontTmp = await mkdtemp(path.join(tmpdir(), "urbown-fonts-"));
async function fontFile(pkg, file) {
  const ttf = path.join(fontTmp, file.replace(/\.woff$/, ".ttf"));
  await writeFile(ttf, woffToSfnt(await readFile(path.join(WEB, "node_modules", "@fontsource", pkg, "files", file))));
  return ttf;
}
const archivo800 = await fontFile("archivo", "archivo-latin-800-normal.woff");
const plexMono400 = await fontFile("ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff");

const W = 1200;
const H = 630;
const M = 88;
const logoH = 132;
const logoPng = await sharp(logo, { density: Math.ceil((72 * logoH * 2) / 755) }).resize({ height: logoH }).png().toBuffer();

// Text als Maske setzen (mit rgba ignoriert Pango die Fontdatei) und über den Alphakanal einfärben.
async function textImage(text, font, fontfile, color, spacing = 0) {
  const { data, info } = await sharp({ text: { text, font, fontfile, dpi: 72, spacing } })
    .extractChannel(0)
    .raw()
    .toBuffer({ resolveWithObject: true });
  return sharp({ create: { width: info.width, height: info.height, channels: 3, background: color } })
    .joinChannel(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
}

const claim = await textImage("Das geschlossene Netzwerk\nfür Ihre Innenstadt", "Archivo ExtraBold 60", archivo800, INK, -6);
const domain = await textImage("urbown.com", "IBM Plex Mono 30", plexMono400, INK2);

const claimMeta = await sharp(claim).metadata();
const domainMeta = await sharp(domain).metadata();

const og = await sharp({ create: { width: W, height: H, channels: 3, background: WHITE } })
  .composite([
    { input: logoPng, top: M, left: M },
    { input: claim, top: H - M - domainMeta.height - 36 - claimMeta.height, left: M },
    { input: domain, top: H - M - domainMeta.height, left: M },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer();
await write("og-image.png", og);

await rm(fontTmp, { recursive: true, force: true });
console.log(`Erzeugt in web/public/: ${files.join(", ")}`);
