// Lighthouse mobil gegen «next start» (UB03 Teil E8/F3). Vorher: npm --prefix web run build.
//   npm run lighthouse
// Misst die 7 Hauptseiten mit SITE_INDEXABLE=true und schreibt tests/output/lighthouse/ergebnis.md (+ JSON je Seite).
import { spawn, spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = path.join(ROOT, "tests", "output", "lighthouse");
const PORT = 3104;
const BASE = `http://localhost:${PORT}`;
const PAGES = ["/", "/eigentuemer", "/staedte", "/funktionen", "/preise", "/netzwerke", "/kontakt"];
const CATS = ["performance", "accessibility", "best-practices", "seo"];
// Ladezeit (K9): Master-Vorgabe «< 1,5 s mobil» – FCP/LCP in Sekunden, TBT in ms, CLS
const METRICS = [
  ["fcp", "first-contentful-paint", (v) => `${(v / 1000).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`],
  ["lcp", "largest-contentful-paint", (v) => `${(v / 1000).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`],
  ["tbt", "total-blocking-time", (v) => `${Math.round(v)} ms`],
  ["cls", "cumulative-layout-shift", (v) => v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 3 })],
];
const TARGET = { performance: 90, accessibility: 95, "best-practices": 90, seo: 90 };

async function waitFor(url, ms = 60_000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server nicht erreichbar: ${url}`);
}

await mkdir(OUT, { recursive: true });
try {
  await fetch(`${BASE}/`);
  console.error(`Port ${PORT} ist belegt – bitte den alten Server beenden.`);
  process.exit(1);
} catch {}
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: path.join(ROOT, "web"),
  shell: true,
  env: { ...process.env, SITE_INDEXABLE: "true", TURNSTILE_ALLOW_TEST_KEYS: "true", MAIL_TRANSPORT: "console" },
  stdio: "ignore",
});

let chrome;
const rows = [];
try {
  await waitFor(`${BASE}/`);
  chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });
  for (const page of PAGES) {
    const result = await lighthouse(`${BASE}${page}`, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: CATS,
      formFactor: "mobile",
    });
    const lhr = result.lhr;
    const scores = Object.fromEntries(CATS.map((c) => [c, Math.round((lhr.categories[c]?.score ?? 0) * 100)]));
    const metrics = Object.fromEntries(METRICS.map(([k, id, fmt]) => [k, fmt(lhr.audits[id]?.numericValue ?? 0)]));
    rows.push({ page, ...scores, ...metrics });
    const file = page === "/" ? "start" : page.slice(1);
    await writeFile(path.join(OUT, `${file}.json`), result.report);
    console.log(`${page.padEnd(14)} ${CATS.map((c) => `${c}: ${scores[c]}`).join(" · ")} · ${METRICS.map(([k]) => `${k.toUpperCase()} ${metrics[k]}`).join(" · ")}`);
  }
} finally {
  await chrome?.kill();
  if (process.platform === "win32" && server.pid) spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  else server.kill();
}

const ok = (c, v) => (v >= TARGET[c] ? `${v}` : `**${v}** ✗`);
const md = [
  `# Lighthouse mobil – ${new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" })}`,
  "",
  "Gemessen gegen `next start` mit `SITE_INDEXABLE=true`, Lighthouse-Standard «mobil» (gedrosselt).",
  `Ziel: Performance ≥ ${TARGET.performance}, Accessibility ≥ ${TARGET.accessibility}, Best Practices ≥ ${TARGET["best-practices"]}, SEO ≥ ${TARGET.seo}.`,
  "",
  "| Seite | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |",
  "|---|---|---|---|---|---|---|---|---|",
  ...rows.map((r) => `| ${r.page} | ${ok("performance", r.performance)} | ${ok("accessibility", r.accessibility)} | ${ok("best-practices", r["best-practices"])} | ${ok("seo", r.seo)} | ${r.fcp} | ${r.lcp} | ${r.tbt} | ${r.cls} |`),
  "",
].join("\n");
await writeFile(path.join(OUT, "ergebnis.md"), md);
console.log(`\nTabelle: tests/output/lighthouse/ergebnis.md`);
process.exit(0);
