// Erzeugt das Infopaket-PDF aus der HTML-Quelle (Playwright/Chromium).
// Aufruf: node make-infopaket.mjs <quelle.html> <ziel.pdf>
import { chromium } from "playwright";
import path from "node:path";

const [src, out] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
const page = await browser.newPage();
await page.goto("file://" + path.resolve(src), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const footer = `<div style="width:100%;font-family:Inter,Arial,sans-serif;font-size:7.5pt;color:#55554F;padding:0 17mm;display:flex;justify-content:space-between">
<span>urbown · Infopaket für Städte, Gemeinden und Ämter · Stand November 2026</span>
<span>Seite <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;
await page.pdf({
  path: out,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate: footer,
  tagged: true,
  outline: true,
});
await browser.close();
console.log("ok", out);
