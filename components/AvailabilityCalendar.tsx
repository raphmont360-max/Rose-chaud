"use client";

import { useMemo, useState } from "react";
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  buildMonthGrid,
  isPastDateKey,
  todayKey,
} from "@/lib/calendar-utils";

const MONTHS_AHEAD = 24;

type AvailabilityCalendarProps = {
  bookedDates: string[];
  interactive?: boolean;
  onToggleDate?: (date: string) => void;
  togglingDate?: string | null;
  onDark?: boolean;
};

export default function AvailabilityCalendar({
  bookedDates,
  interactive = false,
  onToggleDate,
  togglingDate = null,
  onDark = false,
}: AvailabilityCalendarProps) {
  const today = useMemo(() => todayKey(), []);
  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);

  const [monthOffset, setMonthOffset] = useState(0);

  const viewDate = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  }, [monthOffset]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const label = `${MONTH_LABELS[month]} ${year}`;

  const canGoPrev = monthOffset > 0;
  const canGoNext = monthOffset < MONTHS_AHEAD - 1;

  return (
    <div className="mx-auto max-w-md">
      <div
        className={`mb-8 flex flex-wrap items-center justify-center gap-6 text-sm ${
          onDark ? "text-white/60" : "text-ink-400"
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className={`h-4 w-4 rounded-md ${
              onDark
                ? "border border-white/30 bg-white/10"
                : "border border-ink-900/15 bg-white"
            }`}
          />
          Disponible
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-rose-500" />
          Déjà réservé
        </span>
        <span className="flex items-center gap-2">
          <span
            className={`h-4 w-4 rounded-md ${
              onDark
                ? "border-2 border-white bg-transparent"
                : "border-2 border-ink-900 bg-white"
            }`}
          />
          Aujourd&apos;hui
        </span>
      </div>

      <div
        className={`rounded-3xl border p-5 sm:p-6 ${
          onDark
            ? "border-white/10 bg-white/5 backdrop-blur-sm"
            : "border-ink-900/10 bg-bone"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setMonthOffset((o) => o - 1)}
            disabled={!canGoPrev}
            aria-label="Mois précédent"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
              onDark
                ? "border-white/25 bg-white/10 text-white hover:border-rose-400 hover:bg-rose-400/20"
                : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/30"
            }`}
          >
            <span aria-hidden className="text-lg leading-none">
              ‹
            </span>
          </button>

          <p
            className={`font-display text-center text-xl capitalize sm:text-2xl ${
              onDark ? "text-white" : "text-ink-900"
            }`}
          >
            {label}
          </p>

          <button
            type="button"
            onClick={() => setMonthOffset((o) => o + 1)}
            disabled={!canGoNext}
            aria-label="Mois suivant"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
              onDark
                ? "border-white/25 bg-white/10 text-white hover:border-rose-400 hover:bg-rose-400/20"
                : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/30"
            }`}
          >
            <span aria-hidden className="text-lg leading-none">
              ›
            </span>
          </button>
        </div>

        <MonthGrid
          year={year}
          month={month}
          label={label}
          today={today}
          bookedSet={bookedSet}
          interactive={interactive}
          onToggleDate={onToggleDate}
          togglingDate={togglingDate}
          onDark={onDark}
        />
      </div>
    </div>
  );
}

function MonthGrid({
  year,
  month,
  label,
  today,
  bookedSet,
  interactive,
  onToggleDate,
  togglingDate,
  onDark,
}: {
  year: number;
  month: number;
  label: string;
  today: string;
  bookedSet: Set<string>;
  interactive?: boolean;
  onToggleDate?: (date: string) => void;
  togglingDate?: string | null;
  onDark?: boolean;
}) {
  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);

  return (
    <div className="mt-6 grid grid-cols-7 gap-1.5 text-center">
      {WEEKDAY_LABELS.map((wd) => (
        <span
          key={wd}
          className={`pb-1 text-[10px] font-medium uppercase tracking-[0.18em] ${
            onDark ? "text-white/50" : "text-ink-400"
          }`}
        >
          {wd}
        </span>
      ))}
      {cells.map((cell) => {
        const isBooked = bookedSet.has(cell.key);
        const isToday = cell.key === today;
        const isPast = isPastDateKey(cell.key, today);
        const canToggle = interactive && cell.inMonth && !!onToggleDate;

        const className = [
          "flex aspect-square items-center justify-center rounded-md text-sm transition-colors",
          !cell.inMonth && (onDark ? "text-white/20" : "text-ink-200/80"),
          cell.inMonth &&
            !isBooked &&
            !isPast &&
            (onDark ? "text-white" : "text-ink-900"),
          cell.inMonth &&
            isPast &&
            !isBooked &&
            (onDark ? "text-white/35" : "text-ink-300"),
          isBooked && "bg-rose-500 font-medium text-white",
          !isBooked &&
            cell.inMonth &&
            !isPast &&
            (onDark ? "bg-white/10" : "bg-white"),
          isToday &&
            (onDark
              ? "ring-2 ring-white ring-offset-1 ring-offset-ink-900"
              : "ring-2 ring-ink-900 ring-offset-1 ring-offset-bone"),
          canToggle && "cursor-pointer hover:opacity-90",
          togglingDate === cell.key && "animate-pulse",
        ]
          .filter(Boolean)
          .join(" ");

        if (canToggle) {
          return (
            <button
              key={cell.key}
              type="button"
              aria-label={`${cell.day} ${label}${isBooked ? ", réservé" : ", disponible"}`}
              aria-pressed={isBooked}
              disabled={togglingDate === cell.key}
              className={className}
              onClick={() => onToggleDate(cell.key)}
            >
              {cell.day}
            </button>
          );
        }

        return (
          <span key={cell.key} className={className} aria-hidden={!cell.inMonth}>
            {cell.day}
          </span>
        );
      })}
    </div>
  );
}
