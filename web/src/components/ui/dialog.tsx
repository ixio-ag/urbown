"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button, IconButton } from "./button";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  /** Fusszeile (Formulare): Aktionen rechts, Handy untereinander. */
  footer?: ReactNode;
  /** Breite Variante für lange Formulare. */
  wide?: boolean;
  /** Ungespeicherte Eingaben: Klick auf den Hintergrund schliesst nicht. */
  dirty?: boolean;
  /** Rolle «alertdialog» für Bestätigungen. */
  role?: "dialog" | "alertdialog";
  describedBy?: string;
};

/**
 * Modal/Sheet mit nativem <dialog> + showModal() (UB02 8.11): Fokus bleibt im Dialog, Esc schliesst,
 * Fokus kehrt zum Auslöser zurück. Unter 680 px Sheet von unten, ab 680 px mittig.
 */
export function Dialog({ open, onClose, title, children, footer, wide, dirty, role = "dialog", describedBy }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      role={role === "alertdialog" ? "alertdialog" : undefined}
      aria-labelledby={titleId}
      aria-describedby={describedBy}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current && !dirty) onClose();
      }}
      className={cn(
        "m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-auto rounded-t-lg border border-ink bg-white p-0 text-ink",
        "md:m-auto md:rounded-lg",
        wide ? "md:max-w-modal-wide" : "md:max-w-modal",
        "motion-safe:open:animate-sheet-in",
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-white py-1.5 pr-1.5 pl-4">
        <h2 id={titleId} className="text-xl font-bold">
          {title}
        </h2>
        <IconButton icon="close" label="Schliessen" onClick={onClose} />
      </div>
      <div className="flex flex-col gap-3.5 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
      {footer ? (
        <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-line bg-white px-4 py-3 md:flex-row md:justify-end">
          {footer}
        </div>
      ) : null}
    </dialog>
  );
}

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** Titel als Frage, z. B. «Fläche löschen?» */
  title: string;
  /** Ein Satz zu den Folgen. */
  text: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
};

/** Bestätigungsdialog (UB02 8.11): keine rote Farbe, Fokus startet auf «Abbrechen». */
export function ConfirmDialog({ open, onClose, onConfirm, title, text, confirmLabel, cancelLabel = "Abbrechen" }: ConfirmDialogProps) {
  const textId = useId();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      role="alertdialog"
      describedBy={textId}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} autoFocus className="w-full md:w-auto">
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full md:w-auto"
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p id={textId}>{text}</p>
    </Dialog>
  );
}
