import "server-only";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export type MailMessage = { to: string; replyTo?: string; subject: string; text: string };

type Transport = "console" | "smtp" | "resend";

function transport(): Transport {
  const t = process.env.MAIL_TRANSPORT?.trim();
  if (t === "console" || t === "smtp" || t === "resend") return t;
  return process.env.NODE_ENV === "production" ? "resend" : "console";
}

function from(): string {
  return process.env.MAIL_FROM?.trim() || "urbown <no-reply@urbown.com>";
}

/** Mail versenden über MAIL_TRANSPORT: console (Entwicklung), smtp (Mailpit lokal), resend (Server). */
export async function sendMail(msg: MailMessage): Promise<void> {
  const t = transport();
  if (t === "console") {
    console.info(
      `\n— Mail (MAIL_TRANSPORT=console) —\nVon: ${from()}\nAn: ${msg.to}\nAntwort an: ${msg.replyTo ?? "–"}\nBetreff: ${msg.subject}\n\n${msg.text}\n— Ende —\n`,
    );
    return;
  }
  if (t === "smtp") {
    const url = process.env.SMTP_URL?.trim() || "smtp://localhost:1125";
    const mailer = nodemailer.createTransport(url);
    await mailer.sendMail({ from: from(), to: msg.to, replyTo: msg.replyTo, subject: msg.subject, text: msg.text });
    return;
  }
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) throw new Error("RESEND_API_KEY fehlt (MAIL_TRANSPORT=resend).");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: from(),
    to: msg.to,
    replyTo: msg.replyTo,
    subject: msg.subject,
    text: msg.text,
  });
  if (error) throw new Error(`Resend: ${error.name}`);
}
