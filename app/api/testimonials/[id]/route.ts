import { NextResponse } from "next/server";
import {
  checkAdminSecret,
  deleteTestimonial,
} from "@/lib/testimonials-store";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!checkAdminSecret(token)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const deleted = await deleteTestimonial(params.id);
  if (!deleted) {
    return NextResponse.json(
      { error: "Commentaire introuvable." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
