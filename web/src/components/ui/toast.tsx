"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icons";

type ToastInput = {
  text: string;
  kind?: "info" | "error";
  action?: { label: string; onClick: () => void };
};
type ToastState = ToastInput & { id: number };

const ToastContext = createContext<((t: ToastInput) => void) | null>(null);

const DURATION = 5000;

/** Toast-Anbieter (UB02 8.12): immer nur ein Toast, 5 s, pausiert bei Hover/Fokus. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [paused, setPaused] = useState(false);
  const remaining = useRef(DURATION);
  const started = useRef(0);

  const show = useCallback((t: ToastInput) => {
    remaining.current = DURATION;
    setPaused(false);
    setToast({ ...t, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast || paused) return;
    started.current = Date.now();
    const timer = window.setTimeout(() => setToast(null), remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current -= Date.now() - started.current;
    };
  }, [toast, paused]);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {/* Live-Region bleibt im DOM, damit Screenreader die Meldung zuverlässig ansagen */}
      <div aria-live="polite" className="contents">
        {toast ? (
          <div
            key={toast.id}
            role={toast.kind === "error" ? "alert" : "status"}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="fixed bottom-[calc(var(--tabbar-h)+env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-(--z-toast) flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-3 rounded-md bg-ink py-1 pr-1 pl-4 font-medium text-white lg:bottom-6"
          >
            {toast.kind === "error" ? <Icon name="alert" size={18} /> : null}
            <span className="py-1.5">{toast.text}</span>
            {toast.action ? (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  setToast(null);
                }}
                className="min-h-11 cursor-pointer px-1.5 font-medium text-white underline underline-offset-[3px] hover:decoration-2 focus-visible:outline-white"
              >
                {toast.action.label}
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Meldung schliessen"
              onClick={() => setToast(null)}
              className="inline-grid size-11 cursor-pointer place-items-center rounded-md text-white hover:bg-ink-hover focus-visible:outline-white"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

/** Toast anzeigen: const toast = useToast(); toast({ text: "Fläche gespeichert" }). */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast() nur innerhalb von <ToastProvider> verwenden.");
  return ctx;
}
