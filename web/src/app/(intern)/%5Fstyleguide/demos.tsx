"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog, Dialog } from "@/components/ui/dialog";
import { Field, Input, Textarea } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast";

/** Interaktive Vorführungen für /_styleguide (Dialog, Bestätigung, Toast, Laden). */
export function OverlayDemos() {
  const [modal, setModal] = useState(false);
  const [wide, setWide] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => setModal(true)} aria-haspopup="dialog">
        Modal / Sheet öffnen
      </Button>
      <Button variant="secondary" onClick={() => setWide(true)} aria-haspopup="dialog">
        Breites Modal öffnen
      </Button>
      <Button variant="secondary" onClick={() => setConfirm(true)} aria-haspopup="dialog">
        Bestätigung öffnen
      </Button>
      <Button variant="secondary" onClick={() => toast({ text: "E-Mail mit Code gesendet" })}>
        Toast zeigen
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ text: "Fläche gelöscht", action: { label: "Rückgängig", onClick: () => toast({ text: "Wiederhergestellt" }) } })}
      >
        Toast mit Aktion
      </Button>
      <Button variant="secondary" onClick={() => toast({ text: "Speichern fehlgeschlagen", kind: "error" })}>
        Fehler-Toast
      </Button>

      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        title="Vakante Fläche inserieren"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(false)} className="w-full md:w-auto">
              Abbrechen
            </Button>
            <Button onClick={() => setModal(false)} className="w-full md:w-auto">
              Speichern
            </Button>
          </>
        }
      >
        <Field id="sg-modal-titel" label="Titel">
          <Input id="sg-modal-titel" defaultValue="Ladenfläche mit Eckschaufenster" />
        </Field>
        <Field id="sg-modal-text" label="Kurzbeschreibung" optional>
          <Textarea id="sg-modal-text" />
        </Field>
      </Dialog>

      <Dialog open={wide} onClose={() => setWide(false)} title="Langes Formular" wide>
        <p>Breite Variante für lange Formulare (max. 832 px).</p>
      </Dialog>

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => toast({ text: "Fläche gelöscht" })}
        title="Fläche löschen?"
        text="Das Inserat und alle Anfragen werden entfernt."
        confirmLabel="Endgültig löschen"
      />
    </div>
  );
}

export function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      loadingText="Wird gespeichert …"
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 2000);
      }}
    >
      Speichern
    </Button>
  );
}
