import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BadgeRole, type RoleBadge } from "./badge";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type AvatarProps = { name: string; size?: "md" | "sm"; className?: string };

/** Avatar 36 px bzw. 28 px mit Initialen (UB02 8.9). Fotos kommen mit der App (UB13). */
export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full border border-ink bg-white font-display font-bold",
        size === "md" ? "size-9 text-sm" : "size-7 text-micro",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

type PersonProps = {
  name: string;
  href?: string;
  role?: RoleBadge;
  company?: ReactNode;
  size?: "md" | "sm";
};

/** Person-Zeile: Avatar + Name (Link) + Rollen-Badge + optional Unternehmen. */
export function Person({ name, href, role, company, size = "md" }: PersonProps) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar name={name} size={size} />
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center gap-1.5">
          {href ? (
            <Link href={href} className="font-semibold underline-offset-[3px] hover:underline">
              {name}
            </Link>
          ) : (
            <span className="font-semibold">{name}</span>
          )}
          {role ? <BadgeRole role={role} /> : null}
        </div>
        {company ? <span className="text-sm text-ink-2">{company}</span> : null}
      </div>
    </div>
  );
}
