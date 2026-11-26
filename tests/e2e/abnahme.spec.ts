import { test } from "@playwright/test";
import path from "node:path";

// Abnahme-Bildschirmfotos (UB03 Teil F2): jede Hauptseite ganzseitig in 360, 768 und 1280 px.
// npm run abnahme → tests/output/abnahme/ (nicht einchecken)
const PAGES: [string, string][] = [
  ["start", "/"],
  ["eigentuemer", "/eigentuemer"],
  ["staedte", "/staedte"],
  ["funktionen", "/funktionen"],
  ["preise", "/preise"],
  ["netzwerke", "/netzwerke"],
  ["kontakt", "/kontakt"],
];
const WIDTHS = [360, 768, 1280];
const OUT = path.join(import.meta.dirname, "..", "output", "abnahme");

for (const [name, url] of PAGES) {
  for (const width of WIDTHS) {
    test(`${name} ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url);
      // Lazy-Bilder laden: einmal ganz nach unten scrollen
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("load");
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `${name}-${width}.png`), fullPage: true });
    });
  }
}

// Icon-Tafel (K8): alle Icons aus icons.tsx in 24 und 48 px mit Namen, neu gezeichnete markiert (Styleguide auf Port 3103)
test("Icon-Tafel", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("http://localhost:3103/_styleguide#icon-tafel");
  await page.locator("#icon-tafel").screenshot({ path: path.join(OUT, "icons.png") });
});
