const NOTION_API = "https://api.notion.com/v1";
const DATABASE_ID = "3158af9a4f7180a1bd3afb6fc6c2b049";

export async function appendToNotion(data: {
  nombre: string;
  email: string;
  telefono: string;
}): Promise<void> {
  const token = process.env.NOTION_API_KEY;
  if (!token) {
    throw new Error("NOTION_API_KEY is not set");
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: DATABASE_ID },
      properties: {
        NOMBRE: {
          title: [{ text: { content: data.nombre } }],
        },
        "CORREO ELECTRÓNICO": {
          rich_text: [{ text: { content: data.email } }],
        },
        TELÉFONO: {
          rich_text: [{ text: { content: data.telefono } }],
        },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`Notion API error: ${res.status} ${body.message || ""}`);
  }
}
