import { useId } from "react";
import { cn } from "@/lib/cn";
import { LOGO_DATA } from "./logo-data";

type LogoProps = {
  /** «web» unter 40 px Höhe (kräftigere Kontur bei «own»), «original» ab 40 px (UB02 5.2/5.3). */
  variant?: "web" | "original";
  /** Höhe in px. Web-Variante mind. 20 px, Original mind. 40 px. */
  height: number;
  className?: string;
};

/** urbown-Logo als Inline-SVG: «urb» gefüllt, «own» als Kontur (UB02 Abschnitt 5). */
export function Logo({ variant = "web", height, className }: LogoProps) {
  const titleId = useId();
  const data = LOGO_DATA[variant];
  const [, , vbWidth, vbHeight] = data.viewBox.split(" ").map(Number);
  const minHeight = variant === "web" ? 20 : 40;
  const h = Math.max(height, minHeight);
  const w = Math.round((h * vbWidth) / vbHeight);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={data.viewBox}
      width={w}
      height={h}
      role="img"
      aria-labelledby={titleId}
      className={cn("block shrink-0 text-ink", className)}
    >
      <title id={titleId}>urbown</title>
      <g fill="currentColor">
        {data.fill.map((p) => (
          <path key={p.t} transform={p.t} d={p.d} />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={data.strokeWidth} strokeLinejoin="round">
        {data.stroke.map((p) => (
          <path key={p.t} transform={p.t} d={p.d} />
        ))}
      </g>
    </svg>
  );
}
