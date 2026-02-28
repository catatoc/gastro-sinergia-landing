import { LOGO_BASE64 } from "./logo";

export function buildConfirmationEmail(nombre: string): string {
  const firstName = nombre.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>¡Estás participando!</title>
</head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1e1e1e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(23,50,74,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#faf9f7;padding:28px 32px 20px;text-align:center;">
              <img src="${LOGO_BASE64}" alt="Gastro Sinergia" width="220" style="width:220px;height:auto;display:block;margin:0 auto;" />
            </td>
          </tr>
          <tr>
            <td style="background:#17324a;padding:28px 32px 28px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:600;color:#ffffff;line-height:1.3;">
                ¡Estás participando, <span style="color:#f27d3a;">${firstName}</span>!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#555555;">
                Gracias por registrarte en el sorteo de <strong style="color:#1e1e1e;">Gastro Sinergia</strong>. Ya estás dentro para ganar uno de nuestros cupos gratuitos.
              </p>

              <!-- Stats -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;border-radius:12px;margin:24px 0;">
                <tr>
                  <td align="center" style="padding:20px 12px;width:33.33%;border-right:1px solid rgba(23,50,74,0.07);">
                    <div style="font-size:28px;font-weight:700;color:#17324a;line-height:1;">12</div>
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8c8c8c;margin-top:4px;">Cupos</div>
                  </td>
                  <td align="center" style="padding:20px 12px;width:33.33%;border-right:1px solid rgba(23,50,74,0.07);">
                    <div style="font-size:28px;font-weight:700;color:#17324a;line-height:1;">100%</div>
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8c8c8c;margin-top:4px;">Gratis</div>
                  </td>
                  <td align="center" style="padding:20px 12px;width:33.33%;">
                    <div style="font-size:28px;font-weight:700;color:#17324a;line-height:1;">&infin;</div>
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8c8c8c;margin-top:4px;">Sabor</div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#555555;">
                Te contactaremos pronto con los resultados. Mientras tanto, síguenos en Instagram para conocer más sobre nuestros talleres y la experiencia Gastro Sinergia.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="background:#e5651c;border-radius:100px;padding:14px 32px;">
                    <a href="https://www.instagram.com/gastrosinergia" target="_blank" rel="noopener" style="font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;display:inline-block;">
                      Síguenos en Instagram
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid rgba(23,50,74,0.07);text-align:center;">
              <p style="margin:0;font-size:12px;color:#8c8c8c;line-height:1.6;">
                Gastro Sinergia · Centro de Estudios Gastronómicos · Caracas, Venezuela
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#bbbbbb;">
                Recibiste este correo porque te registraste en nuestro sorteo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
