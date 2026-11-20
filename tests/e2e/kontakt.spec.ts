import { expect, test, type Page } from "@playwright/test";
import { MAILPIT_URL } from "./helpers";

const SUBMIT = { name: "Anfrage senden" };

const IDS = { Vorname: 'k-vorname', Name: 'k-name', 'Organisation / Stadt': 'k-organisation', Funktion: 'k-funktion', 'E-Mail': 'k-email', Nachricht: 'k-nachricht' } as const;

/** Felder über ihre ID füllen; vorher auf die Hydrierung warten (Turnstile-Feld vorhanden). */
async function fill(page: Page, values: Partial<Record<keyof typeof IDS, string>>) {
  await page.locator('input[name="cf-turnstile-response"]').waitFor({ state: 'attached', timeout: 20_000 });
  for (const [label, value] of Object.entries(values)) {
    await page.locator('#' + IDS[label as keyof typeof IDS]).fill(value);
  }
}

test("Vorauswahl über ?anliegen=", async ({ page }) => {
  await page.goto("/kontakt?anliegen=infopaket");
  await expect(page.getByLabel("Ich interessiere mich für")).toHaveValue("infopaket");
  await page.goto("/kontakt?anliegen=unbekannt");
  await expect(page.getByLabel("Ich interessiere mich für")).toHaveValue("demo");
});

test("Pflichtfelder: Fehlerliste mit Fokus und Meldungen am Feld", async ({ page }) => {
  await page.goto("/kontakt");
  await fill(page, {});
  await page.getByRole("button", SUBMIT).click();
  const summary = page.getByRole("alert").filter({ hasText: "Bitte prüfen Sie die markierten Felder." });
  await expect(summary).toBeVisible();
  await expect(summary).toBeFocused();
  await expect(page.getByText("Bitte geben Sie Ihren Vornamen ein.").first()).toBeVisible();
  await expect(page.getByText("Bitte geben Sie Ihren Namen ein.").first()).toBeVisible();
  await expect(page.getByText("Bitte geben Sie Ihre E-Mail-Adresse ein.").first()).toBeVisible();
  await expect(page.locator("#k-vorname")).toHaveAttribute("aria-invalid", "true");
});

test("Ungültige E-Mail: Meldung am Feld, Fokus im Feld", async ({ page }) => {
  await page.goto("/kontakt");
  await fill(page, { Vorname: "Anna", Name: "Muster", "E-Mail": "anna.muster" });
  await page.getByRole("button", SUBMIT).click();
  await expect(page.locator("#k-email-fehler")).toHaveText(
    "Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@stadt.de.",
  );
  await expect(page.locator("#k-email")).toBeFocused();
  await expect(page.locator("#k-email")).toHaveAttribute("aria-describedby", /k-email-fehler/);
});

test("Erfolg: Mail kommt bei Mailpit an", async ({ page, request }) => {
  const stamp = `Teststadt-${Date.now()}`;
  await page.goto("/kontakt?anliegen=pilot");
  await fill(page, {
    Vorname: "Anna",
    Name: "Muster",
    "Organisation / Stadt": stamp,
    Funktion: "Wirtschaftsförderung",
    "E-Mail": "anna.muster@stadt.example",
    Nachricht: "Wir möchten den Pilot starten.",
  });
  // Turnstile (Testschlüssel) setzt das Token selbständig
  await expect(page.locator('input[name="cf-turnstile-response"]')).not.toHaveValue("", { timeout: 20_000 });
  await page.getByRole("button", SUBMIT).click();
  const success = page.getByRole("status").filter({ hasText: "Danke, Ihre Anfrage ist bei uns." });
  await expect(success).toBeVisible();
  await expect(success).toBeFocused();

  const subject = `Anfrage urbown.com: Pilotangebot – ${stamp}`;
  await expect
    .poll(async () => {
      const res = await request.get(`${MAILPIT_URL}/api/v1/search?query=${encodeURIComponent(`subject:"${stamp}"`)}`);
      const data = (await res.json()) as { messages?: { Subject: string; To: { Address: string }[]; ReplyTo: { Address: string }[]; ID: string }[] };
      return data.messages?.[0] ?? null;
    }, { timeout: 15_000 })
    .toMatchObject({
      Subject: subject,
      To: [{ Address: "info@urbown.com" }],
      ReplyTo: [{ Address: "anna.muster@stadt.example" }],
    });

  const search = await request.get(`${MAILPIT_URL}/api/v1/search?query=${encodeURIComponent(`subject:"${stamp}"`)}`);
  const id = ((await search.json()) as { messages: { ID: string }[] }).messages[0].ID;
  const message = (await (await request.get(`${MAILPIT_URL}/api/v1/message/${id}`)).json()) as { Text: string };
  expect(message.Text).toContain("Neue Anfrage über urbown.com/kontakt");
  expect(message.Text).toContain("Anliegen:      Pilotangebot");
  expect(message.Text).toContain("Funktion:      Wirtschaftsförderung");
  expect(message.Text).toMatch(/Gesendet am \d{2}\.\d{2}\.\d{4} \d{2}:\d{2} \(Europe\/Zurich\)/);
});

test.describe("ohne JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("Server prüft die Pflichtfelder und behält die Eingaben", async ({ page }) => {
    await page.goto("/kontakt?anliegen=partner");
    await expect(page.getByLabel("Ich interessiere mich für")).toHaveValue("partner");
    await page.locator("#k-name").fill("Muster");
    await page.getByRole("button", SUBMIT).click();
    await expect(page.getByText("Bitte prüfen Sie die markierten Felder.")).toBeVisible();
    await expect(page.locator("#k-vorname-fehler")).toHaveText("Bitte geben Sie Ihren Vornamen ein.");
    await expect(page.locator("#k-name")).toHaveValue("Muster");
  });
});
