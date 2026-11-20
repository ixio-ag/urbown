// Start-Prüfungen (läuft einmal beim Start des Servers).
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV === "production") {
    const { assertTurnstileConfigured } = await import("@/lib/server/turnstile");
    assertTurnstileConfigured();
  }
}
