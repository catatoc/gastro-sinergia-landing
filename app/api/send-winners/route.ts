import { NextResponse } from "next/server";
import { z } from "zod";
import { sendWinnerEmail } from "@/lib/resend";

const schema = z.object({
  winners: z.array(
    z.object({
      nombre: z.string(),
      email: z.string().email(),
    })
  ),
  taller: z.union([z.literal(1), z.literal(2)]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { winners, taller } = schema.parse(body);

    const results = await Promise.allSettled(
      winners.map((w) => sendWinnerEmail(w.nombre, w.email, taller))
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    if (failed > 0) {
      const errors = results
        .map((r, i) =>
          r.status === "rejected"
            ? `${winners[i].email}: ${String(r.reason)}`
            : null
        )
        .filter(Boolean);
      console.error("[SEND_WINNERS][PARTIAL_FAIL]", JSON.stringify({ taller, sent, failed, errors }));
    }

    return NextResponse.json({ sent, failed });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("[SEND_WINNERS][FATAL]", String(error));
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
