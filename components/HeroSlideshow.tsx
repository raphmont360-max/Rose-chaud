"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type HeroSlide = {
  place: string;
  tag: string;
  quote: string;
  gradient: string;
  image?: string;
};

const slides: HeroSlide[] = [
  {
    place: "Château de Vaux",
    tag: "Mariage",
    quote: "« 600 personnes debout pendant 4 heures. »",
    gradient: "from-ink-800 via-ink-900 to-rose-700",
  },
  {
    place: "Domaine de Roussas",
    tag: "Vin d'honneur",
    quote: "« Un coucher de soleil, un jazz doux, et tout le monde debout. »",
    gradient: "from-rose-400 via-rose-500 to-ink-800",
  },
  {
    place: "Mas Provençal · Luberon",
    tag: "Cérémonie",
    quote: "« La version acoustique qui a fait pleurer toute la famille. »",
    gradient: "from-rose-300 via-rose-400 to-ink-900",
  },
  {
    place: "Bastide en Provence",
    tag: "Soirée dansante",
    quote: "« Personne assis après le premier riff de September. »",
    gradient: "from-ink-800 via-ink-900 to-rose-500",
  },
  {
    place: "Manoir en Bretagne",
    tag: "Grand Bal",
    quote: "« Les cuivres ont mis le feu — bis à minuit, sans hésiter. »",
    gradient: "from-rose-500 via-rose-700 to-ink-900",
  },
  {
    place: "Villa Côte d'Azur",
    tag: "Cocktail",
    quote: "« Quartet acoustique, champagne, et sourires jusqu'au bout de la nuit. »",
    gradient: "from-rose-200 via-rose-400 to-ink-900",
  },
];

const INTERVAL_MS = 5500;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-ink-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.place + slide.quote}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide.image ? (
              <Image
                src={slide.image}
                alt={slide.place}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={i === 0}
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,181,204,0.35),transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
          </div>
        );
      })}

      {/* Contenu texte */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
        <div className="transition-opacity duration-500">
          <span className="badge !border-white/30 !text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            {slides[index].tag} · {slides[index].place}
          </span>
          <p className="mt-4 font-display text-2xl italic leading-snug text-white sm:text-3xl lg:text-4xl">
            {slides[index].quote}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Voir la photo ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-rose-400"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={prev}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-rose-400 hover:bg-rose-400 hover:text-ink-900"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Photo suivante"
              onClick={next}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-rose-400 hover:bg-rose-400 hover:text-ink-900"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <Link
              href="/galerie"
              className="ml-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 transition hover:text-rose-400"
            >
              Galerie →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
