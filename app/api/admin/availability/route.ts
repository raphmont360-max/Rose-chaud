import { NextResponse } from "next/server";
import { checkAdminSecret } from "@/lib/testimonials-store";
import {
  getBookedDates,
  toggleBookedDate,
} from "@/lib/availability-store";

function getToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  return auth?.startsWith("Bearer ") ? auth.slice(7) : null;
}

export async function GET(request: Request) {
  if (!checkAdminSecret(getToken(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const bookedDates = await getBookedDates();
  return NextResponse.json({ bookedDates });
}

export async function PATCH(request: Request) {
  if (!checkAdminSecret(getToken(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: { date?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }

  if (!body.date || typeof body.date !== "string") {
    return NextResponse.json({ error: "Date requise." }, { status: 400 });
  }

  try {
    const bookedDates = await toggleBookedDate(body.date);
    return NextResponse.json({ bookedDates });
  } catch {
    return NextResponse.json({ error: "Date invalide." }, { status: 400 });
  }
}
