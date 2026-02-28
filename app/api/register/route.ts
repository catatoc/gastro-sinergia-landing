import { NextResponse } from "next/server";
import { z } from "zod";
import { sendConfirmationEmail } from "@/lib/resend";
import { appendToNotion } from "@/lib/notion";

const registerSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido").trim(),
  email: z.string().email("Email inválido").trim(),
  telefono: z
    .string()
    .trim()
    .regex(
      /^\+\d{1,3}\s\d{10}$/,
      "Teléfono debe tener código de país y 10 dígitos"
    ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    console.log("[REGISTRO]", JSON.stringify({
      timestamp: new Date().toISOString(),
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
    }));

    const results = await Promise.allSettled([
      sendConfirmationEmail(data.nombre, data.email),
      appendToNotion({
        ...data,
        telefono: data.telefono.replace(/[+\s]/g, ""),
      }),
    ]);

    const emailResult = results[0];
    const notionResult = results[1];

    if (emailResult.status === "rejected") {
      console.error("[REGISTRO][EMAIL_FAIL]", JSON.stringify({
        timestamp: new Date().toISOString(),
        nombre: data.nombre,
        email: data.email,
        error: String(emailResult.reason),
      }));
    }
    if (notionResult.status === "rejected") {
      console.error("[REGISTRO][NOTION_FAIL]", JSON.stringify({
        timestamp: new Date().toISOString(),
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        error: String(notionResult.reason),
      }));
    }

    // Return success even if one service fails - the registration is recorded
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error("[REGISTRO][FATAL]", JSON.stringify({
      timestamp: new Date().toISOString(),
      error: String(error),
    }));
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
