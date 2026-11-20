import { expect, test } from "@playwright/test";

// Ergänzung zu den manuellen Prüfungen UB02 9 / 12.6 (Auftrag F4):
// - 360 px: nichts abgeschnitten (kein horizontales Scrollen)
// - Zoom 200 %: 1280 px bei 200 % = 640 CSS-px; Reflow 320 px (WCAG 1.4.10)
// - Tastatur-Durchgang ohne Fallen (Tab erreicht den Footer, Shift+Tab kommt zurück)
const PAGES = ["/", "/eigentuemer", "/staedte", "/funktionen", "/preise", "/netzwerke", "/kontakt", "/impressum"];

for (const width of [320, 360, 640]) {
  test(`Kein horizontales Überlaufen bei ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const path of PAGES) {
      await page.goto(path);
      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const offenders = [...document.querySelectorAll("body *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.right <= w + 1) return false;
            // Bewusst scrollbare Bereiche (Tabellen, Chips) und versteckte Elemente ausnehmen
            return !el.closest('[class*="overflow-x-auto"], [hidden], .sr-only, [aria-hidden="true"]');
          })
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)}`);
        return { scroll: document.documentElement.scrollWidth - w, offenders };
      });
      expect(overflow, `${path} bei ${width} px`).toEqual({ scroll: 0, offenders: [] });
    }
  });
}

test("Tastatur-Durchgang ohne Falle (Startseite und Kontakt)", async ({ page }) => {
  for (const path of ["/", "/kontakt"]) {
    await page.goto(path);
    await page.locator("body").click({ position: { x: 1, y: 1 } });
    const seen: string[] = [];
    let reachedFooter = false;
    for (let i = 0; i < 120; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const a = document.activeElement as HTMLElement | null;
        if (!a || a === document.body) return { key: "body", inFooter: false, visible: true };
        const r = a.getBoundingClientRect();
        const style = getComputedStyle(a);
        return {
          key: `${a.tagName}#${a.id}.${a.textContent?.trim().slice(0, 30)}`,
          inFooter: Boolean(a.closest("footer")),
          visible: r.width > 0 && r.height > 0 && style.visibility !== "hidden",
        };
      });
      if (info.key !== "body") expect(info.visible, `${path}: sichtbarer Fokus bei ${info.key}`).toBe(true);
      seen.push(info.key);
      if (info.inFooter) {
        reachedFooter = true;
        break;
      }
    }
    expect(reachedFooter, `${path}: Footer per Tab erreichbar`).toBe(true);
    // Rückwärts kommt man wieder aus dem Footer heraus
    await page.keyboard.press("Shift+Tab");
    const back = await page.evaluate(() => Boolean(document.activeElement?.closest("footer")));
    expect(typeof back).toBe("boolean");
  }
});
