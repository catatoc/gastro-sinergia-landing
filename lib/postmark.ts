import { ServerClient } from "postmark";
import { buildConfirmationEmail } from "./email-template";

let client: ServerClient | null = null;

function getClient(): ServerClient {
  if (!client) {
    const token = process.env.POSTMARK_SERVER_TOKEN;
    if (!token) throw new Error("POSTMARK_SERVER_TOKEN is not set");
    client = new ServerClient(token);
  }
  return client;
}

export async function sendConfirmationEmail(
  nombre: string,
  email: string
): Promise<void> {
  const fromEmail = process.env.POSTMARK_FROM_EMAIL || "sorteo@gastrosinergia.info";
  const htmlBody = buildConfirmationEmail(nombre);

  await getClient().sendEmail({
    From: fromEmail,
    To: email,
    Subject: `¡Estás participando, ${nombre.split(" ")[0]}! — Sorteo Gastro Sinergia`,
    HtmlBody: htmlBody,
    MessageStream: "outbound",
  });
}
