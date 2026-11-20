"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { MAIN_NAV, MOBILE_NAV } from "@/content/navigation";

/**
 * Navigation der Landingpage (UB03 2.2): ab 900 px Links + «Demo anfragen», darunter Button «Menü».
 * Aktiver Link mit aria-current und Unterstreichung. Menü schliesst bei Seitenwechsel und mit Esc.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Seitenwechsel schliesst das Menü (Zustand aus dem Pfad abgeleitet, ohne Effekt)
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-button")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
        {MAIN_NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center rounded-sm px-3 font-medium no-underline transition-colors duration-150",
                active
                  ? "text-ink underline decoration-2 underline-offset-[6px]"
                  : "text-ink-2 hover:bg-paper hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/kontakt"
          aria-current={isActive("/kontakt") ? "page" : undefined}
          className={cn(buttonVariants({ variant: "primary", size: "md", lift: true }), "ml-2 rounded-sm")}
        >
          Demo anfragen
        </Link>
      </nav>

      <button
        id="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          setOpenedAt(pathname);
          setOpen((v) => !v);
        }}
        className="inline-flex min-h-11 cursor-pointer items-center rounded-sm border-[1.5px] border-ink bg-white px-3.5 font-semibold transition-colors duration-150 hover:bg-muted lg:hidden"
      >
        Menü
      </button>

      <nav
        id="mobile-menu"
        aria-label="Navigation Handy"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-line border-b border-b-ink bg-white lg:hidden"
      >
        <ul className="band mx-auto max-w-site pt-2 pb-4">
          {MOBILE_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center font-display text-2xl font-bold no-underline",
                    active && "underline decoration-2 underline-offset-[6px]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
