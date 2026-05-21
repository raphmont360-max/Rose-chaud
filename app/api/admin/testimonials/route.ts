import { NextResponse } from "next/server";
import {
  checkAdminSecret,
  listSubmitted,
} from "@/lib/testimonials-store";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!checkAdminSecret(token)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const testimonials = await listSubmitted();
  return NextResponse.json({ testimonials });
}
