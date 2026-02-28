import { NextResponse } from "next/server";
import { z } from "zod";
import { sendConfirmationEmail } from "@/lib/resend";
import { appendToSheet } from "@/lib/google-sheets";

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

    const results = await Promise.allSettled([
      sendConfirmationEmail(data.nombre, data.email),
      appendToSheet(data),
    ]);

    const emailResult = results[0];
    const sheetsResult = results[1];

    if (emailResult.status === "rejected") {
      console.error("Resend error:", emailResult.reason);
    }
    if (sheetsResult.status === "rejected") {
      console.error("Google Sheets error:", sheetsResult.reason);
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

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
