import { expect, test } from "@playwright/test";

test.describe("Menü (Handy)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("öffnet per Tastatur und schliesst mit Esc", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menü" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    // Tastatur: Sprunglink → Logo → Menü
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Zum Inhalt springen" })).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const menu = page.getByRole("navigation", { name: "Navigation Handy" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link")).toHaveCount(7);
    await page.keyboard.press("Tab");
    await expect(menu.getByRole("link", { name: "Start" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("schliesst beim Seitenwechsel", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menü" }).click();
    await page.getByRole("navigation", { name: "Navigation Handy" }).getByRole("link", { name: "Preise" }).click();
    await expect(page).toHaveURL(/\/preise$/);
    await expect(page.getByRole("button", { name: "Menü" })).toHaveAttribute("aria-expanded", "false");
  });
});

test("Desktop-Navigation markiert die aktive Seite", async ({ page }) => {
  await page.goto("/funktionen");
  const nav = page.getByRole("navigation", { name: "Hauptnavigation" });
  await expect(nav.getByRole("link", { name: "Funktionen" })).toHaveAttribute("aria-current", "page");
  await expect(nav.getByRole("link", { name: "Preise" })).not.toHaveAttribute("aria-current", "page");
});

test("Adress-Kasten: Stadtname wird zum Kürzel", async ({ page }) => {
  await page.goto("/");
  const field = page.getByLabel("Wie heisst Ihre Stadt?");
  const address = page.locator("p[aria-live=polite]", { hasText: "app.urbown.com/" });
  await expect(address).toHaveText("app.urbown.com/ihrestadt");
  await field.fill("Zürich");
  await expect(address).toHaveText("app.urbown.com/zurich");
  await expect(page.getByText("Kurzadresse zurich.urbown.com")).toBeVisible();
  await field.fill("Bad Homburg");
  await expect(address).toHaveText("app.urbown.com/bad-homburg");
  await field.fill("Großenhain");
  await expect(address).toHaveText("app.urbown.com/grossenhain");
  await field.fill("");
  await expect(address).toHaveText("app.urbown.com/ihrestadt");
});

test("Kopfzeilen-Button «Demo anfragen» mit aria-current auf /kontakt (K10)", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const nav = page.getByRole("navigation", { name: "Hauptnavigation" });
  for (const url of ["/kontakt", "/kontakt?anliegen=infopaket", "/kontakt/pilot"]) {
    await page.goto(url);
    await expect(nav.getByRole("link", { name: "Demo anfragen" }), url).toHaveAttribute("aria-current", "page");
  }
  await page.goto("/staedte");
  await expect(nav.getByRole("link", { name: "Demo anfragen" })).not.toHaveAttribute("aria-current", "page");
});
