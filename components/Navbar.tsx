"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/repertoire", label: "Répertoire" },
  { href: "/galerie", label: "Galerie" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-ink-900 text-white transition-all duration-300 ${
        scrolled ? "border-b border-white/10 shadow-2xl shadow-black/40" : ""
      }`}
    >
      <div className="container-page flex h-28 items-center justify-between">
        <Logo variant="light" size="sm" />

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-200 ${
                  active
                    ? "text-rose-300"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose-300" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-900 transition-all duration-300 hover:bg-white"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-300 text-ink-900 transition hover:bg-white md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-900 md:hidden">
          <nav className="container-page flex flex-col gap-1 py-5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-4 font-display text-2xl transition ${
                    active
                      ? "bg-rose-300 text-ink-900"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-900" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-rose-300 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-900 transition hover:bg-white"
            >
              Réserver une date
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
