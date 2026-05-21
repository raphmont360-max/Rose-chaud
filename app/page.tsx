import Link from "next/link";
import { Suspense } from "react";
import FormulesPricing from "@/components/FormulesPricing";
import HeroSlideshow from "@/components/HeroSlideshow";
import Section from "@/components/Section";
import TeamGallery from "@/components/TeamGallery";

export default function HomePage() {
  return (
    <>
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative overflow-hidden bg-white pt-12 sm:pt-20">
        <div className="container-page relative">
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-rose-400" />
            <p className="eyebrow !text-ink-900">
              Groupe live · Mariages — Fêtes — Cérémonies
            </p>
          </div>

          <h1 className="heading-hero mt-8 max-w-[1200px] animate-fade-in-up">
            Des amis
            <br />
            et de la musique
            <br />
            <span className="italic font-normal text-rose-400">
              #rosechaud
            </span>
          </h1>

          <div
            className="mt-14 flex flex-col items-start justify-between gap-10 border-t border-ink-900/10 pt-10 animate-fade-in-up md:flex-row md:items-end"
            style={{ animationDelay: "200ms", opacity: 0 }}
          >
            <p className="max-w-md text-base leading-relaxed text-ink-400">
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
              <Link href="/repertoire" className="btn-secondary">
                Voir le répertoire
              </Link>
            </div>
          </div>
        </div>

        {/* Bande d'images / cartes décoratives */}
        <div className="container-page mt-20">
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-12 sm:col-span-7">
              <HeroSlideshow />
            </div>

            <div className="col-span-12 sm:col-span-5 flex flex-col gap-4 sm:gap-6">
              <div className="relative flex-1 overflow-hidden rounded-3xl bg-rose-400 p-8">
                <div className="flex h-full flex-col justify-between">
                  <p className="eyebrow !text-ink-900">Prochaine date</p>
                  <div>
                    <p className="font-display text-5xl text-ink-900">14.06</p>
                    <p className="mt-1 text-sm text-ink-900/70">
                      Domaine de Roussas · Drôme
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-3xl border border-ink-900/10 bg-bone p-8">
                <p className="eyebrow">Note moyenne</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="font-display text-5xl text-ink-900">4,9</p>
                  <p className="text-ink-400">/ 5</p>
                </div>
                <div className="mt-2 flex gap-0.5 text-rose-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-xs text-ink-400">87 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ L'ÉQUIPE — 8 photos ════════════════ */}
      <Section
        variant="dark"
        glow
        eyebrow="La team"
        title="On est qui juste ?"
      >
        <TeamGallery />
      </Section>

      {/* ════════════════ TÉMOIGNAGE PHARE ════════════════ */}
      <section className="relative overflow-hidden bg-white py-28 sm:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-rose-400/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-rose-400/10 blur-3xl"
        />

        <div className="container-page relative">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <svg width="60" height="50" viewBox="0 0 24 24" fill="currentColor" className="text-rose-400">
                <path d="M7 11h-2a4 4 0 0 1 4-4V5a6 6 0 0 0-6 6v5h6V11H7zm10 0h-2a4 4 0 0 1 4-4V5a6 6 0 0 0-6 6v5h6V11h-2z" />
              </svg>
            </div>
            <div className="lg:col-span-10">
              <p className="font-display text-3xl italic leading-snug text-ink-900 sm:text-4xl md:text-5xl">
                On cherchait LE groupe qui ferait pleurer nos mamans pendant la
                cérémonie ET danser nos amis jusqu&apos;à 4 h. Rose chaud a
                fait les deux. <span className="text-rose-400">Magique.</span>
              </p>
              <div className="mt-10 flex items-center gap-4 text-sm">
                <span className="h-px w-12 bg-rose-400" />
                <p className="uppercase tracking-[0.22em] text-ink-400">
                  Camille &amp; Antoine · Juin 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FORMULES ════════════════ */}
      <Section
        variant="dark"
        eyebrow="Formules"
        title="Trois manières de tomber amoureux."
        description={
          <>
            Ces tarifs pour un groupe en live ? Nos concurrents pensent
            qu&apos;on est fous. Vos invités pensent qu&apos;on est géniaux.
            <br />
            <span className="mt-3 inline-block font-display text-xl italic text-rose-400 sm:text-2xl">
              #RoseChaud
            </span>
          </>
        }
      >
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-3">
              {["Concert", "Signature", "Grand Bal"].map((name, i) => (
                <div
                  key={name}
                  className={`h-[480px] animate-pulse rounded-3xl ${
                    i === 1 ? "bg-white/20" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          }
        >
          <FormulesPricing onDark />
        </Suspense>
      </Section>

      {/* ════════════════ CTA FINAL ════════════════ */}
      <section className="relative overflow-hidden bg-white py-28 sm:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="text-stroke font-display text-[24vw] font-light italic leading-none text-rose-100 whitespace-nowrap">
            On y va ?
          </span>
        </div>

        <div className="container-page relative text-center">
          <p className="eyebrow">Votre date, notre passion</p>
          <h2 className="heading-display mx-auto mt-6 max-w-4xl text-balance">
            Et si on parlait de{" "}
            <span className="italic font-normal text-rose-500">
              votre mariage
            </span>{" "}
            ?
          </h2>
          <p className="lead mx-auto mt-7 max-w-2xl text-balance">
            Dites-nous tout : lieu, ambiance, coup de cœur musical.
            <br className="hidden sm:block" />
            Réponse personnalisée sous 48 h.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-rose">
              Réserver <span aria-hidden>→</span>
            </Link>
            <Link href="/galerie" className="btn-secondary">
              Voir nos prestations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
