/** Stadtname → Kürzel für app.urbown.com/… (UB03 3.1): klein, ä→a, ö→o, ü→u, ß→ss, Rest → «-». */
export function citySlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
