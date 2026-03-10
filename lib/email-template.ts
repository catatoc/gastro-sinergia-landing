const LOGO_URL = "https://amedi.sfo3.cdn.digitaloceanspaces.com/gastrosinergia/logo_transparent.png";
const CDN_BASE = "https://amedi.sfo3.cdn.digitaloceanspaces.com/gastrosinergia";

const TALLER_CONFIG = {
  1: {
    image: `${CDN_BASE}/golden-ticket-taller1.png`,
    date: "16 de marzo 2026",
    dateShort: "16 marzo",
  },
  2: {
    image: `${CDN_BASE}/golden-ticket-taller2.png`,
    date: "23 de marzo 2026",
    dateShort: "23 marzo",
  },
} as const;

export function buildConfirmationEmail(firstName: string): string {
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
              <img src="${LOGO_URL}" alt="Gastro Sinergia" width="220" style="width:220px;height:auto;display:block;margin:0 auto;" />
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
                Gracias por registrarte en el sorteo de <strong style="color:#1e1e1e;">Gastro Sinergia</strong>. Ya estás dentro para ganar la oportunidad de vivir una experiencia diseñada alrededor de la cocina.
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
                <tr>
                  <td align="center" style="padding:16px 0 0;">
                    <a href="https://gastrosinergia.info/nosotros" target="_blank" rel="noopener" style="font-size:14px;font-weight:500;color:#2d9e90;text-decoration:none;">
                      Conoce nuestra propuesta &rarr;
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
              <p style="margin:8px 0 0;font-size:12px;font-style:italic;color:#8c8c8c;line-height:1.6;">
                Porque la cocina no solo se enseña. Se vive, se piensa y se comparte.
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

export function buildWinnerEmail(firstName: string, taller: 1 | 2 = 1): string {
  const config = TALLER_CONFIG[taller];
  const confirmSubject = encodeURIComponent(`Confirmo asistencia - Taller de Panaderia ${config.dateShort}`);
  const confirmBody = encodeURIComponent(`Hola, soy ${firstName} y confirmo mi asistencia al Taller de Panaderia del ${config.dateShort}.`);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GOLDEN TICKET - Taller de Panaderia</title>
</head>
<body style="margin:0;padding:0;background:#3d4f6f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1e1e1e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#3d4f6f;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.2);">

          <!-- Logo -->
          <tr>
            <td style="background:#faf9f7;padding:28px 32px 20px;text-align:center;">
              <img src="${LOGO_URL}" alt="Gastro Sinergia" width="180" style="width:180px;height:auto;display:block;margin:0 auto;" />
            </td>
          </tr>

          <!-- Golden Ticket Image -->
          <tr>
            <td style="padding:0;text-align:center;background:#3d4f6f;">
              <img src="${config.image}" alt="Golden Ticket - Taller de Panaderia - ${config.date} - 04:30 pm" width="600" style="width:100%;max-width:600px;height:auto;display:block;" />
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="background:#17324a;padding:28px 32px;text-align:center;">
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
                Felicidades, <span style="color:#f0c75e;">${firstName}</span>!
              </h1>
              <p style="margin:8px 0 0;font-size:16px;color:#c0c8d4;line-height:1.5;">
                Has sido seleccionado en nuestro sorteo
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#555555;">
                Ganaste un cupo para participar en el <strong style="color:#1e1e1e;">Taller de Panaderia</strong> de Gastro Sinergia, completamente <strong style="color:#e5651c;">gratuito</strong>.
              </p>

              <!-- Event Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;border-radius:12px;margin:24px 0;border:1px solid #eee;">
                <tr>
                  <td style="padding:24px 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 12px;">
                          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8c8c8c;margin-bottom:4px;">Fecha</div>
                          <div style="font-size:18px;font-weight:700;color:#17324a;">${config.date}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;border-top:1px solid #e8e8e8;padding-top:12px;">
                          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8c8c8c;margin-bottom:4px;">Hora</div>
                          <div style="font-size:18px;font-weight:700;color:#17324a;">04:30 pm</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;border-top:1px solid #e8e8e8;padding-top:12px;">
                          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8c8c8c;margin-bottom:4px;">Ubicacion</div>
                          <div style="font-size:16px;font-weight:600;color:#17324a;">Gastro Sinergia</div>
                          <a href="https://www.google.com/maps/place/Gesti%C3%B3n+Inmobiliaria+Monta%C3%B1a+Creativa,+C.A/data=!4m2!3m1!1s0x0:0xae83a8ac776a55c0" target="_blank" rel="noopener" style="font-size:13px;color:#2d9e90;text-decoration:none;margin-top:4px;display:inline-block;">Ver en mapa &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#555555;">
                Por favor <strong>confirma tu asistencia</strong> lo antes posible para reservar tu lugar.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="background:#e5651c;border-radius:100px;padding:14px 36px;">
                    <a href="mailto:Info@gastrosinergia.com?subject=${confirmSubject}&body=${confirmBody}" style="font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;display:inline-block;">
                      Confirmar Asistencia
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
                Gastro Sinergia &middot; Centro de Estudios Gastron&oacute;micos &middot; Caracas, Venezuela
              </p>
              <p style="margin:8px 0 0;font-size:12px;font-style:italic;color:#8c8c8c;line-height:1.6;">
                Porque la cocina no solo se ense&ntilde;a. Se vive, se piensa y se comparte.
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
