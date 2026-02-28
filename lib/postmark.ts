import { ServerClient } from "postmark";

const LOGO_URL = "https://amedi.sfo3.cdn.digitaloceanspaces.com/gastrosinergia/logo_transparent.png";

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
  const firstName = nombre.split(" ")[0];

  await getClient().sendEmailWithTemplate({
    From: fromEmail,
    To: email,
    TemplateAlias: "sorteo-confirmacion",
    TemplateModel: {
      firstName,
      logoUrl: LOGO_URL,
    },
    MessageStream: "outbound",
  });
}
