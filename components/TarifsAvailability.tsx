"use client";

import { useEffect, useState } from "react";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

type TarifsAvailabilityProps = {
  initialBookedDates: string[];
  onDark?: boolean;
};

export default function TarifsAvailability({
  initialBookedDates,
  onDark = false,
}: TarifsAvailabilityProps) {
  const [bookedDates, setBookedDates] = useState(initialBookedDates);

  useEffect(() => {
    setBookedDates(initialBookedDates);
  }, [initialBookedDates]);

  useEffect(() => {
    let cancelled = false;
    async function refresh() {
      try {
        const res = await fetch("/api/availability", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setBookedDates(data.bookedDates ?? []);
      } catch {
        /* garde les données initiales */
      }
    }
    refresh();
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return <AvailabilityCalendar bookedDates={bookedDates} onDark={onDark} />;
}
