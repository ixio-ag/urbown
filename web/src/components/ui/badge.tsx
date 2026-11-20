import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Icon } from "./icons";

/** Badge (UB02 8.8). Der Text trägt die Bedeutung, nicht die Füllung. Landing-«Tag» = gleiche Komponente. */
export const badgeVariants = cva(
  "inline-flex items-center gap-1 self-start rounded-xs border px-1.5 py-px font-mono text-micro tracking-badge whitespace-nowrap uppercase",
  {
    variants: {
      variant: {
        outline: "border-ink text-ink",
        solid: "border-ink bg-ink text-white",
        soft: "border-line text-ink-2",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

type BadgeProps = VariantProps<typeof badgeVariants> & { children: ReactNode; className?: string };

export function Badge({ variant, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}

/** «urbown-weit»: Inhalt für alle urbown-Mitglieder sichtbar. */
export function BadgeUrbownWeit() {
  return (
    <span className={badgeVariants({ variant: "soft" })} title="Für alle urbown-Mitglieder sichtbar">
      <Icon name="globe" size={12} />
      <span aria-hidden="true">urbown-weit</span>
      <span className="sr-only">Für alle urbown-Mitglieder sichtbar</span>
    </span>
  );
}

/** «wartet auf Freigabe» (Moderation). */
export function BadgeWartet() {
  return (
    <span className={badgeVariants({ variant: "outline" })}>
      <Icon name="clock" size={12} />
      wartet auf Freigabe
    </span>
  );
}

/** «ausgeblendet» (Moderation). */
export function BadgeAusgeblendet() {
  return (
    <span className={badgeVariants({ variant: "soft" })}>
      <Icon name="eye-off" size={12} />
      ausgeblendet
    </span>
  );
}

export type RoleBadge = "eigentuemer" | "mitarbeiter_stadt" | "gewerbe" | "partner";

const ROLE_LABEL: Record<RoleBadge, string> = {
  eigentuemer: "Eigentümer",
  mitarbeiter_stadt: "Mitarbeiter Stadt",
  gewerbe: "Gewerbe",
  partner: "Partner",
};

/** Rollen-Badge: «Mitarbeiter Stadt» gefüllt, übrige als Kontur (UB01 3.4, UB02 8.8). */
export function BadgeRole({ role }: { role: RoleBadge }) {
  return <Badge variant={role === "mitarbeiter_stadt" ? "solid" : "outline"}>{ROLE_LABEL[role]}</Badge>;
}
