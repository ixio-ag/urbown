// Bildschirmfotos für den Bereich «Einblick» der Landingpage (UB03 Abschnitt 5).
//   npm run screenshots -- --source=prototype   (bis UB24: freigegebener Prototyp im Demo-Modus)
//   npm run screenshots -- --source=demo        (ab UB24: DEMO_URL, DEMO_EMAIL, DEMO_PASSWORD aus der Umgebung)
// Ergebnis: web/src/assets/screens/{dashboard,flaechen,umfrage,karte,dokumente}.png (Computer 2×, Handy 3×)
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "@playwright/test";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const PROTO_DIR = path.join(ROOT, "docs", "grundlagen", "prototyp");
const OUT_DIR = path.join(ROOT, "web", "src", "assets", "screens");

const arg = process.argv.find((a) => a.startsWith("--source="));
const source = arg ? arg.split("=")[1] : "prototype";
if (!["prototype", "demo"].includes(source)) {
  console.error("Parameter --source=prototype|demo");
  process.exit(1);
}

const DESKTOP = { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 };
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

// Kartenkacheln in Graustufen (UB02 8.14), Prototyp-Leiste ausblenden
const SHOT_CSS = `
  .leaflet-tile-pane { filter: grayscale(1) contrast(1.05) brightness(1.03); }
  .leaflet-control-attribution { filter: grayscale(1); }
  .side { top: 0 !important; height: 100vh !important; }
  .mob-top { top: 0 !important; }
  .shell { min-height: 100% !important; }
  #proto, .proto { display: none !important; }
  .toast { display: none !important; }
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
`;

// Beispieldaten des Prototyps vor jeder Aufnahme korrigieren (K3, K4). Die Prototyp-Datei bleibt unverändert.
// - Prototyp-Hinweis unter der Karte ausblenden
// - «ß» → «ss» (Schweizer Schreibweise)
// - Dezimalpunkt → Komma bei Zahlen mit Einheit («11.5 m» → «11,5 m») und bei Kennzahlen («4.2»); Datumsangaben (TT.MM.JJJJ) nicht
function fixPrototypeText() {
  for (const p of document.querySelectorAll("p")) {
    if (p.textContent.trim().startsWith("Echte Karte (OpenStreetMap)")) p.style.display = "none";
  }
  const unit = /(?<![\d.])(\d+)\.(\d+)(?![\d.])(?=\s?(?:m²|m2|m\b|km\b|%|€|CHF|Std\b|h\b))/g;
  const figure = /^(\s*)(\d+)\.(\d+)(\s*)$/;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let changed = 0;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const before = node.nodeValue;
    let after = before.replaceAll("ß", "ss").replace(unit, "$1,$2");
    if (!/\d+\.\d+\.\d+/.test(after)) after = after.replace(figure, "$1$2,$3$4");
    if (after !== before) {
      node.nodeValue = after;
      changed += 1;
    }
  }
  for (const el of document.querySelectorAll("input, textarea")) {
    if (el.value.includes("ß")) el.value = el.value.replaceAll("ß", "ss");
  }
  return changed;
}

// Nach der Korrektur: kein «ß» und kein Dezimalpunkt mit Einheit mehr sichtbar (sonst Abbruch)
function findLeftovers() {
  const text = document.body.innerText;
  const hits = [];
  if (text.includes("ß")) hits.push("ß");
  const m = text.match(/(?<![\d.])\d+\.\d+(?![\d.])(?=\s?(?:m²|m\b|%|km\b|€))/);
  if (m) hits.push(m[0]);
  return hits;
}

const SHOTS = [
  { name: "dashboard", device: DESKTOP, route: "start" },
  { name: "flaechen", device: PHONE, route: "flaechen" },
  { name: "umfrage", device: PHONE, route: "start", scrollTo: ".poll" },
  { name: "karte", device: DESKTOP, route: "karte", waitTiles: true },
  { name: "dokumente", device: DESKTOP, route: "dokumente" },
];

function serveStatic(dir) {
  const types = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml" };
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const file = path.join(dir, decodeURIComponent(url.pathname === "/" ? "/netzwerk-app.html" : url.pathname));
      if (!file.startsWith(dir)) throw new Error("ausserhalb");
      const data = await readFile(file);
      res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

async function loginPrototype(page, baseUrl) {
  // Demo-Modus einschalten: CITY im Prototyp ersetzen (CITY.demo = true)
  await page.route(`${baseUrl}/netzwerk-app.html`, async (route) => {
    const res = await route.fetch();
    const body = (await res.text()).replace(
      /const CITY = \{[^}]*\};/,
      'const CITY = { name: "Demo", sub: "demo", demo: true };',
    ).replace('<title>', '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>');
    await route.fulfill({ response: res, body });
  });
  await page.goto(`${baseUrl}/netzwerk-app.html`);
  // Prototyp-Ablauf: E-Mail → Passwort → Netzwerk wählen (Mitglied)
  await page.fill("#lmail", "anna.becker@beispiel.de");
  await page.click("#lf button[type=submit]");
  await page.click("#pwf button[type=submit]");
  const pick = page.locator('[data-pick="demo"]');
  if (await pick.count()) await pick.click();
  await page.waitForSelector("#app aside, #app .tabbar", { state: "attached", timeout: 10000 });
}

async function loginDemo(page) {
  const { DEMO_URL, DEMO_EMAIL, DEMO_PASSWORD } = process.env;
  if (!DEMO_URL || !DEMO_EMAIL || !DEMO_PASSWORD) {
    throw new Error("Für --source=demo DEMO_URL, DEMO_EMAIL und DEMO_PASSWORD setzen (Demo-Zugang Mitglied, UB24).");
  }
  // Login-Ablauf der App (UB06): E-Mail → Passwort. Selektoren in UB24 an die fertige App anpassen.
  await page.goto(DEMO_URL);
  await page.getByLabel("E-Mail").fill(DEMO_EMAIL);
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByLabel("Passwort").fill(DEMO_PASSWORD);
  await page.getByRole("button", { name: "Anmelden" }).click();
  await page.waitForLoadState("networkidle");
}

async function goRoute(page, baseUrl, route) {
  if (source === "prototype") {
    await page.evaluate((r) => {
      location.hash = r;
    }, route);
  } else {
    await page.goto(`${process.env.DEMO_URL.replace(/\/$/, "")}/${route === "start" ? "" : route}`);
  }
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();
const server = source === "prototype" ? await serveStatic(PROTO_DIR) : null;
const baseUrl = server ? `http://127.0.0.1:${server.address().port}` : "";
await mkdir(OUT_DIR, { recursive: true });

try {
  for (const shot of SHOTS) {
    const context = await browser.newContext({ ...shot.device, locale: "de-DE", timezoneId: "Europe/Berlin" });
    const page = await context.newPage();
    if (source === "prototype") await loginPrototype(page, baseUrl);
    else await loginDemo(page);
    await page.addStyleTag({ content: SHOT_CSS });
    await goRoute(page, baseUrl, shot.route);
    await page.addStyleTag({ content: SHOT_CSS });
    if (shot.waitTiles) {
      await page.waitForLoadState("networkidle").catch(() => {});
      await page.waitForTimeout(1500);
    }
    if (shot.scrollTo) {
      await page.locator(shot.scrollTo).first().evaluate((el) => {
        const card = el.closest("article, .card") ?? el;
        card.scrollIntoView({ block: "start" });
        window.scrollBy(0, -72);
      });
      await page.waitForTimeout(200);
    } else {
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    const fixed = await page.evaluate(fixPrototypeText);
    const leftovers = await page.evaluate(findLeftovers);
    if (leftovers.length) throw new Error(`${shot.name}: noch sichtbar: ${leftovers.join(", ")}`);
    const file = path.join(OUT_DIR, `${shot.name}.png`);
    await page.screenshot({ path: file });
    console.log(`✓ ${shot.name}.png (${fixed} Textstellen korrigiert, ${shot.device.viewport.width}×${shot.device.viewport.height}, ${shot.device.deviceScaleFactor}×)`);
    await context.close();
  }
} finally {
  await browser.close();
  server?.close();
}
console.log(`Bildschirmfotos (${source}) in web/src/assets/screens/`);
