import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge kennt die eigenen Tokens aus globals.css nicht von selbst.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ["white", "paper", "muted", "hover", "fill", "line", "field", "ink-3", "ink-2", "ink-hover", "ink", "scrim"],
      text: ["micro", "xs", "sm", "ui", "base", "lg", "xl", "2xl", "3xl", "h1-sm", "4xl", "login-sm", "5xl", "lead", "display-2", "display-1", "nano"],
      radius: ["xs", "sm", "md", "lg", "full"],
      breakpoint: ["sm", "md", "lg", "xl"],
    },
    classGroups: {
      "font-family": ["font-display", "font-display-black", "font-sans", "font-mono"],
    },
  },
});

/** Klassen zusammenführen (clsx + tailwind-merge), UB02 Abschnitt 4. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
