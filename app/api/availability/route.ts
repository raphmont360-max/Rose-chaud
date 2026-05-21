import { NextResponse } from "next/server";
import { getBookedDates } from "@/lib/availability-store";

export async function GET() {
  const bookedDates = await getBookedDates();
  return NextResponse.json({ bookedDates });
}
