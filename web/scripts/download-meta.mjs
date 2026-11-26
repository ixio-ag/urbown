// Metadaten der Downloads zur Build-Zeit (UB04 Teil C2): Grösse und bei PDFs die Seitenzahl.
//   node scripts/download-meta.mjs   (läuft automatisch als «prebuild» vor next build)
// Liest web/public/downloads/*, schreibt web/src/content/downloads.meta.json.
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(WEB, "public", "downloads");
const OUT = path.join(WEB, "src", "content", "downloads.meta.json");

const TYPES = { ".pdf": "PDF", ".docx": "Word" };

/** «206 KB», «1,2 MB» (1 KB = 1024 Byte, aufgerundet wie im Datei-Explorer). */
function formatSize(bytes) {
  const kb = bytes / 1024;
  if (kb < 1000) return `${Math.max(1, Math.ceil(kb))} KB`;
  const mb = kb / 1024;
  return `${mb.toLocaleString("de-CH", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MB`;
}

const meta = {};
for (const name of (await readdir(DIR)).sort()) {
  const ext = path.extname(name).toLowerCase();
  if (!TYPES[ext]) continue;
  const file = path.join(DIR, name);
  const { size } = await stat(file);
  const entry = { type: TYPES[ext], bytes: size, size: formatSize(size) };
  if (ext === ".pdf") {
    const pdf = await PDFDocument.load(await readFile(file), { updateMetadata: false });
    entry.pages = pdf.getPageCount();
  }
  meta[name] = entry;
}

await writeFile(OUT, `${JSON.stringify(meta, null, 2)}\n`);
console.log(`Download-Metadaten: ${Object.keys(meta).length} Dateien → src/content/downloads.meta.json`);
