import { Resend } from "resend";
import { buildConfirmationEmail, buildWinnerEmail } from "./email-template";

let client: Resend | null = null;

function getClient(): Resend {
  if (!client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    client = new Resend(key);
  }
  return client;
}

export async function sendConfirmationEmail(
  nombre: string,
  email: string
): Promise<void> {
  const fromAddress = process.env.RESEND_FROM_EMAIL || "sorteo@gastrosinergia.info";
  const fromEmail = `Gastro Sinergia <${fromAddress}>`;
  const firstName = nombre.split(" ")[0];

  await getClient().emails.send({
    from: fromEmail,
    to: email,
    subject: `¡Estás participando, ${firstName}! — Sorteo Gastro Sinergia`,
    html: buildConfirmationEmail(firstName),
  });
}

export async function sendWinnerEmail(
  nombre: string,
  email: string,
  taller: 1 | 2 = 1
): Promise<void> {
  const fromAddress = process.env.RESEND_FROM_EMAIL || "sorteo@gastrosinergia.info";
  const fromEmail = `Gastro Sinergia <${fromAddress}>`;
  const firstName = nombre.split(" ")[0];

  await getClient().emails.send({
    from: fromEmail,
    to: email,
    subject: `GOLDEN TICKET — ${firstName}, ganaste un cupo en el Taller de Panaderia!`,
    html: buildWinnerEmail(firstName, taller),
  });
}
