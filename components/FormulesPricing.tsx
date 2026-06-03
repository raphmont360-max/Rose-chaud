"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const FORMULES = [
  {
    name: "Concert",
    price: "1 000 €",
    tag: "le classico",
    features: [
      "Saxophone / piano / guitare / batterie / chanteuse(s)",
      "2 h de live",
      "Déplacement jusqu'à 150 km FREE",
      "+ options",
    ],
  },
  {
    name: "Signature",
    price: "1 450 €",
    tag: "Le plus demandé",
    features: [
      "Saxophone / piano / guitare / batterie / chanteuse(s)",
      "3 h de live",
      "Déplacement jusqu'à 150 km FREE",
      "1 musique personnalisée",
      "+ options",
    ],
  },
  {
    name: "Grand Bal",
    price: "1 900 €",
    tag: "L'expérience complète",
    features: [
      "Saxophone / piano / guitare / batterie / chanteuse(s)",
      "4 h de live",
      "Déplacement jusqu'à 150 km FREE",
      "2 musiques personnalisées",
      "+ options",
    ],
  },
] as const;

type FormulaName = (typeof FORMULES)[number]["name"];

const VALID: FormulaName[] = ["Concert", "Signature", "Grand Bal"];

function parseFormule(value: string | null): FormulaName {
  if (value && VALID.includes(value as FormulaName)) {
    return value as FormulaName;
  }
  return "Signature";
}

function isRoseHighlight(feat: string) {
  return (
    feat === "2 h de live" ||
    feat === "3 h de live" ||
    feat === "4 h de live" ||
    feat === "+ options"
  );
}

type FormulesPricingProps = {
  /** Section sur fond noir : cartes inversées (sélection = blanc) */
  onDark?: boolean;
};

export default function FormulesPricing({ onDark = false }: FormulesPricingProps) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<FormulaName>(() =>
    parseFormule(searchParams.get("formule"))
  );

  const select = useCallback((name: FormulaName) => {
    setActive(name);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {FORMULES.map((f) => {
        const featured = active === f.name;
        const roseCard = onDark && featured;
        const whiteCard = onDark && !featured;

        return (
          <article
            key={f.name}
            role="button"
            tabIndex={0}
            onClick={() => select(f.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                select(f.name);
              }
            }}
            className={`relative flex cursor-pointer flex-col rounded-3xl p-8 sm:p-10 ${
              roseCard
                ? "border-2 border-rose-400 bg-rose-400 text-white"
                : whiteCard
                ? "border border-ink-900/10 bg-white text-ink-900 transition-[transform,box-shadow] duration-200 hover:-translate-y-2 hover:shadow-hard"
                : featured
                ? "bg-ink-900 text-white shadow-warm"
                : "border border-ink-900/10 bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-2 hover:shadow-hard"
            }`}
          >
            {featured && f.name === "Signature" && (
              <span
                className={`absolute -top-3 right-8 inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] ${
                  onDark
                    ? "bg-ink-900 text-white"
                    : "bg-rose-400 text-ink-900"
                }`}
              >
                ★ Populaire
              </span>
            )}

            <p
              className={`text-[11px] font-medium uppercase tracking-[0.22em] ${
                roseCard
                  ? "text-ink-900/70"
                  : whiteCard
                  ? "text-rose-500"
                  : featured
                  ? "text-rose-400"
                  : "text-rose-500"
              }`}
            >
              {f.tag}
            </p>
            <h3
              className={`mt-4 font-display text-5xl ${
                roseCard || (featured && !onDark)
                  ? "text-white"
                  : "text-ink-900"
              }`}
            >
              {f.name}
            </h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span
                className={`text-xs ${
                  roseCard
                    ? "text-white/50"
                    : whiteCard || (!featured && !onDark)
                    ? "text-ink-400"
                    : "text-white/50"
                }`}
              >
                à partir de
              </span>
              <span
                className={`font-display text-2xl ${
                  roseCard
                    ? "text-white"
                    : whiteCard
                    ? "text-ink-900"
                    : featured
                    ? "text-rose-400"
                    : "text-ink-900"
                }`}
              >
                {f.price}
              </span>
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {f.features.map((feat) => {
                const roseHighlight = isRoseHighlight(feat);
                return (
                  <li
                    key={feat}
                    className={`flex items-start gap-3 text-sm ${
                      roseCard
                        ? roseHighlight
                          ? "text-ink-900"
                          : "text-white"
                        : roseHighlight
                        ? whiteCard
                          ? "text-rose-500"
                          : featured
                          ? "text-rose-400"
                          : "text-rose-500"
                        : whiteCard
                        ? "text-ink-700"
                        : featured
                        ? "text-white/85"
                        : "text-ink-700"
                    }`}
                  >
                    <span
                      className={`mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                        roseCard
                          ? roseHighlight
                            ? "bg-ink-900"
                            : "bg-white"
                          : roseHighlight || (featured && !onDark)
                          ? "bg-rose-400"
                          : "bg-ink-900"
                      }`}
                    />
                    {feat}
                  </li>
                );
              })}
            </ul>

            <Link
              href={`/contact?formule=${encodeURIComponent(f.name)}`}
              onClick={(e) => {
                e.stopPropagation();
                select(f.name);
              }}
              className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-150 ${
                roseCard
                  ? "bg-ink-900 text-white hover:bg-white hover:text-ink-900"
                  : whiteCard || (!featured && !onDark)
                  ? "border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white"
                  : "bg-rose-400 text-ink-900 hover:bg-white"
              }`}
            >
              Réserver <span aria-hidden>→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
