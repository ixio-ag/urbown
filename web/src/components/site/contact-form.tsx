"use client";

import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Select, Textarea, describedBy } from "@/components/ui/form";
import { ANLIEGEN, type Anliegen } from "@/content/contact";
import {
  FIELD_LABEL,
  FIELD_ORDER,
  MSG,
  readContactForm,
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/contact-schema";
import { sendContact, type ContactState } from "@/app/(site)/kontakt/actions";
import { NoJsNote } from "./no-js-note";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const subscribeNothing = () => () => {};

const INITIAL: ContactState = { status: "idle" };

/** Kontaktformular (UB03 3.7): Server Action, Prüfung im Browser und auf dem Server, Turnstile, ohne JS lauffähig. */
export function ContactForm({ siteKey, defaultAnliegen }: { siteKey: string; defaultAnliegen: Anliegen }) {
  const [state, formAction, pending] = useActionState(sendContact, INITIAL);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const [seenNonce, setSeenNonce] = useState(state.nonce);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  // Erst nach der Hydrierung gesetzt: unterscheidet beim Server «ohne JavaScript» von «Turnstile fehlgeschlagen» (K5)
  const hydrated = useSyncExternalStore(subscribeNothing, () => true, () => false);

  // Neue Server-Antwort: Browser-Fehler verwerfen (Zustand aus der Antwort ableiten)
  if (state.nonce !== seenNonce) {
    setSeenNonce(state.nonce);
    setClientErrors(null);
  }

  const errors: FieldErrors = clientErrors ?? state.fieldErrors ?? {};
  const errorFields = FIELD_ORDER.filter((f) => errors[f]);
  const values = state.values ?? {};

  // Turnstile explizit rendern, nach jeder Server-Antwort zurücksetzen (Token gilt nur einmal)
  useEffect(() => {
    if (!turnstileReady || !turnstileRef.current || !window.turnstile) return;
    if (widgetId.current) {
      window.turnstile.reset(widgetId.current);
      return;
    }
    widgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      language: "de",
      theme: "light",
      appearance: "interaction-only",
      "response-field-name": "cf-turnstile-response",
    });
  }, [turnstileReady, siteKey, state.nonce]);

  // Fokus: Erfolg → Meldung; mehrere Fehler → Fehlerliste; ein Fehler → Feld
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status, state.nonce]);

  useEffect(() => {
    if (errorFields.length > 1) summaryRef.current?.focus();
    else if (errorFields.length === 1) document.getElementById(`k-${errorFields[0]}`)?.focus();
    // nur nach Absenden (Fehler neu gesetzt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientErrors, state.nonce]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const checked = validateContact(readContactForm(new FormData(e.currentTarget)));
    if (!checked.ok) {
      e.preventDefault();
      setClientErrors(checked.errors);
    } else {
      setClientErrors(null);
    }
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col gap-2 border-[1.5px] border-ink bg-white p-5.5 focus-visible:outline-offset-4"
      >
        <p className="font-display text-xl font-bold">Danke, Ihre Anfrage ist bei uns.</p>
        <p className="text-ink-2">Wir melden uns innerhalb von zwei Werktagen.</p>
      </div>
    );
  }

  const err = (f: ContactField) => errors[f];
  const aria = (f: ContactField, hint = false) => ({
    "aria-invalid": err(f) ? (true as const) : undefined,
    "aria-describedby": describedBy(`k-${f}`, { error: Boolean(err(f)), hint }),
  });

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setTurnstileReady(true)}
      />
      <form
        action={formAction}
        onSubmit={onSubmit}
        noValidate
        aria-label="Kontaktformular"
        className="relative grid grid-cols-1 gap-4 border-[1.5px] border-ink bg-white p-5.5 sm:grid-cols-2"
      >
        {errorFields.length > 1 ? (
          <div ref={summaryRef} role="alert" tabIndex={-1} className="flex flex-col gap-1.5 border-2 border-ink p-3.5 sm:col-span-full">
            <p className="font-semibold">{MSG.mehrere}</p>
            <ul className="list-disc pl-5 text-sm">
              {errorFields.map((f) => (
                <li key={f}>
                  <a href={`#k-${f}`} className="underline underline-offset-[3px] hover:decoration-2">
                    {FIELD_LABEL[f]}: {errors[f]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div key={state.nonce ?? 0} className="contents">
          <Field id="k-anliegen" label="Ich interessiere mich für" className="sm:col-span-full">
            <Select id="k-anliegen" name="anliegen" shape="site" defaultValue={values.anliegen || defaultAnliegen}>
              {ANLIEGEN.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="k-vorname" label="Vorname" error={err("vorname")}>
            <Input id="k-vorname" name="vorname" shape="site" required maxLength={80} autoComplete="given-name" defaultValue={values.vorname} {...aria("vorname")} />
          </Field>
          <Field id="k-name" label="Name" error={err("name")}>
            <Input id="k-name" name="name" shape="site" required maxLength={80} autoComplete="family-name" defaultValue={values.name} {...aria("name")} />
          </Field>
          <Field id="k-organisation" label="Organisation / Stadt" optional error={err("organisation")}>
            <Input id="k-organisation" name="organisation" shape="site" maxLength={120} autoComplete="organization" defaultValue={values.organisation} {...aria("organisation")} />
          </Field>
          <Field id="k-funktion" label="Funktion" optional error={err("funktion")}>
            <Input
              id="k-funktion"
              name="funktion"
              shape="site"
              maxLength={120}
              placeholder="z. B. Wirtschaftsförderung"
              autoComplete="organization-title"
              defaultValue={values.funktion}
              {...aria("funktion")}
            />
          </Field>
          <Field id="k-email" label="E-Mail" error={err("email")} className="sm:col-span-full">
            <Input id="k-email" name="email" type="email" shape="site" required maxLength={200} autoComplete="email" defaultValue={values.email} {...aria("email")} />
          </Field>
          <Field id="k-nachricht" label="Nachricht" optional error={err("nachricht")} className="sm:col-span-full">
            <Textarea id="k-nachricht" name="nachricht" shape="site" maxLength={4000} rows={5} defaultValue={values.nachricht} {...aria("nachricht")} />
          </Field>
        </div>

        {/* Honigtopf: für Menschen unsichtbar, nicht fokussierbar */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="k-website">Website</label>
          <input id="k-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        {hydrated ? <input type="hidden" name="js" value="1" /> : null}

        <div ref={turnstileRef} className="sm:col-span-full empty:hidden" />

        <div className="flex flex-col items-start gap-3 sm:col-span-full">
          <div role="alert" className="empty:hidden">
            {state.formError ? <FieldError id="k-formfehler">{state.formError}</FieldError> : null}
            {state.noJs ? <NoJsNote /> : null}
          </div>
          <Button type="submit" size="lg" lift loading={pending} loadingText="Wird gesendet …" className="w-full sm:w-auto">
            Anfrage senden
          </Button>
          <p className="text-sm text-ink-2">
            Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten. Mehr dazu in der{" "}
            <Link href="/datenschutz" className="text-ink underline underline-offset-[3px] hover:decoration-2">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}
