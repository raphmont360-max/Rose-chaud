import { NextResponse } from "next/server";
import { addTestimonial, getAllTestimonials } from "@/lib/testimonials-store";
import {
  averageRating,
  parseRatingsFromBody,
} from "@/lib/testimonial-ratings";

export async function GET() {
  const testimonials = await getAllTestimonials();
  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const couple = body.couple?.toString().trim();
  const date = body.date?.toString().trim();
  const place = body.place?.toString().trim();
  const short = body.short?.toString().trim();
  const quote = body.quote?.toString().trim();
  const ratings = parseRatingsFromBody(body.ratings);

  if (!couple || !date || !place || !short || !quote) {
    return NextResponse.json(
      { error: "Tous les champs sont obligatoires." },
      { status: 400 }
    );
  }

  if (!ratings) {
    return NextResponse.json(
      { error: "Merci de noter les 4 critères (1 à 5 étoiles)." },
      { status: 400 }
    );
  }

  const entry = await addTestimonial({
    couple,
    date,
    place,
    short,
    quote,
    ratings,
    rating: averageRating(ratings),
  });

  return NextResponse.json({ testimonial: entry }, { status: 201 });
}
