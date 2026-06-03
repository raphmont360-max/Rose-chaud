import { Resend } from "resend";
import { NextResponse } from "next/server";

/** Seule adresse qui reçoit les demandes de devis */
const QUOTE_INBOX = "contact.rosechaud@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  place?: string;
  formula?: string;
  message?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM?.trim() ?? "Rose chaud <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY manquante sur le serveur");
    return NextResponse.json(
      {
        error:
          "RESEND_API_KEY n'est pas configurée sur Vercel. Ajoutez-la dans Environment Variables (Production), puis Redeploy.",
      },
      { status: 503 }
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const date = body.date?.trim() ?? "";
  const place = body.place?.trim() ?? "";
  const formula = body.formula?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) {
    return NextResponse.json({ error: "Nom requis." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (!date) {
    return NextResponse.json({ error: "Date requise." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Message requis." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const rows = [
    ["Nom", name],
    ["Email", email],
    ["Téléphone", phone || "—"],
    ["Date du mariage", date],
    ["Lieu / région", place || "—"],
    ["Formule", formula || "—"],
    ["Message", message],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#525252;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const { error: inboxError } = await resend.emails.send({
    from,
    to: [QUOTE_INBOX],
    replyTo: email,
    subject: `[Rose chaud] Devis — ${name} (${date})`,
    text,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;color:#000">
        <p style="font-size:18px;margin:0 0 16px">Nouvelle demande de devis</p>
        <table style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;border-collapse:collapse">
          ${htmlRows}
        </table>
      </div>
    `,
  });

  if (inboxError) {
    console.error("Resend inbox error:", inboxError);
    return NextResponse.json(
      { error: "Impossible d'envoyer le message. Réessayez ou écrivez-nous par email." },
      { status: 502 }
    );
  }

  const confirmationText = `Bonjour ${name},

Merci pour votre confiance. Nous avons bien reçu votre demande de devis pour le ${date}${place ? ` (${place})` : ""}.

Nous revenons vers vous dans les plus brefs délais !

À très bientôt,
Rose chaud
contact.rosechaud@gmail.com`;

  const { error: autoReplyError } = await resend.emails.send({
    from,
    to: [email],
    replyTo: QUOTE_INBOX,
    subject: "Rose chaud — nous avons bien reçu votre demande",
    text: confirmationText,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;color:#000;line-height:1.6">
        <p style="font-size:22px;font-style:italic;margin:0 0 20px">Rose chaud</p>
        <p>Bonjour ${escapeHtml(name)},</p>
        <p>Merci pour votre confiance. Nous avons bien reçu votre demande de devis pour le <strong>${escapeHtml(date)}</strong>${place ? ` (${escapeHtml(place)})` : ""}.</p>
        <p>Nous revenons vers vous dans les plus brefs délais !</p>
        <p style="margin-top:28px">À très bientôt,<br><em>Rose chaud</em><br>
        <a href="mailto:${QUOTE_INBOX}" style="color:#E58AAB">${QUOTE_INBOX}</a></p>
      </div>
    `,
  });

  if (autoReplyError) {
    console.warn("Accusé de réception non envoyé au client:", autoReplyError.message);
  }

  return NextResponse.json({ ok: true });
}
