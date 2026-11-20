/** Sprunglink «Zum Inhalt springen» – erstes Element, nur bei Fokus sichtbar (UB02 7.1). */
export function SkipLink({ href = "#main" }: { href?: string }) {
  return (
    <a
      href={href}
      className="sr-only rounded-md bg-ink px-4 py-2.5 font-semibold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-(--z-toast) focus:inline-flex focus:min-h-11 focus:items-center"
    >
      Zum Inhalt springen
    </a>
  );
}
