import { Resend } from "resend";
import { buildConfirmationEmail } from "./email-template";

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
  const fromEmail = `Gastrosinergia <${fromAddress}>`;
  const firstName = nombre.split(" ")[0];

  await getClient().emails.send({
    from: fromEmail,
    to: email,
    subject: `¡Estás participando, ${firstName}! — Sorteo Gastro Sinergia`,
    html: buildConfirmationEmail(firstName),
  });
}
