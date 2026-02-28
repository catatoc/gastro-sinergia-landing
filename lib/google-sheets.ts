import { google } from "googleapis";

function getAuth() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials not configured");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToSheet(data: {
  nombre: string;
  email: string;
  telefono: string;
}): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not set");
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("es-VE", {
    timeZone: "America/Caracas",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Registros!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[timestamp, data.nombre, data.email, data.telefono]],
    },
  });
}
