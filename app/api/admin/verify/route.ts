import { NextResponse } from "next/server";
import { checkAdminSecret } from "@/lib/testimonials-store";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = body.password?.toString() ?? "";
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json(
      {
        error:
          "ADMIN_SECRET n'est pas configuré sur le serveur. Ajoutez-le dans .env.local",
      },
      { status: 503 }
    );
  }

  if (!checkAdminSecret(password)) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
