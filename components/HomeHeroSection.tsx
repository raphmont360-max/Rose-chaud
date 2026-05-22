"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    place: "Château de Vaux",
    tag: "Mariage",
    gradient: "from-ink-800 via-ink-900 to-rose-700",
  },
  {
    place: "Domaine de Roussas",
    tag: "Vin d'honneur",
    gradient: "from-rose-400 via-rose-500 to-ink-800",
  },
  {
    place: "Mas Provençal · Luberon",
    tag: "Cérémonie",
    gradient: "from-rose-300 via-rose-400 to-ink-900",
  },
  {
    place: "Bastide en Provence",
    tag: "Soirée dansante",
    gradient: "from-ink-800 via-ink-900 to-rose-500",
  },
  {
    place: "Manoir en Bretagne",
    tag: "Grand Bal",
    gradient: "from-rose-500 via-rose-700 to-ink-900",
  },
  {
    place: "Villa Côte d'Azur",
    tag: "Cocktail",
    gradient: "from-rose-200 via-rose-400 to-ink-900",
  },
] as const;

const INTERVAL_MS = 5500;

export default function HomeHeroSection() {
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
    <section
      className="relative min-h-[92vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fond diaporama */}
      <div className="absolute inset-0 bg-ink-900" aria-hidden>
        {slides.map((slide, i) => (
          <div
            key={slide.place}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,181,204,0.3),transparent_55%)]" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/75 via-ink-900/55 to-ink-900/90" />
      </div>

      {/* Contenu accueil */}
      <div className="container-page relative z-10 flex min-h-[92vh] flex-col justify-between py-12 sm:py-16 lg:py-20">
        <div>
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-rose-400" />
            <p className="eyebrow !text-rose-300">
              Groupe live · Mariages — Fêtes — Cérémonies
            </p>
          </div>

          <h1 className="heading-hero mt-8 max-w-[1200px] text-white animate-fade-in-up">
            Des amis
            <br />
            et de la musique
            <br />
            <span className="italic font-normal text-rose-400">
              #rosechaud
            </span>
          </h1>

          <div
            className="mt-14 flex flex-col items-start justify-between gap-10 border-t border-white/15 pt-10 animate-fade-in-up md:flex-row md:items-end"
            style={{ animationDelay: "200ms", opacity: 0 }}
          >
            <p className="max-w-md text-base leading-relaxed text-white/75">
              On a 20 ans, on est huit potes musiciens et chanteuses, et on a
              qu&apos;une envie : tout donner sur scène. Rose Chaud est né de
              cette amitié et de cette passion dévorante pour la musique live.
              On revisite les classiques, on met l&apos;ambiance, et on kiffe
              autant que vous. Promis, votre soirée, on la rend inoubliable.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn-rose">
                Réserver une date
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/repertoire"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-all duration-300 hover:border-rose-400 hover:bg-rose-400 hover:text-ink-900"
              >
                Voir le répertoire
              </Link>
            </div>
          </div>
        </div>

        {/* Contrôles diapo */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8">
          <span className="badge !border-white/30 !text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            {slides[index].tag} · {slides[index].place}
          </span>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Photo ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-rose-400"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
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
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 transition hover:text-rose-400"
            >
              Galerie →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
