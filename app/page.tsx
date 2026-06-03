import Link from "next/link";
import { Suspense } from "react";
import FormulesPricing from "@/components/FormulesPricing";
import HomeHeroSection from "@/components/HomeHeroSection";
import Section from "@/components/Section";
import TeamGallery from "@/components/TeamGallery";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />

      {/* ════════════════ L'ÉQUIPE — 8 photos ════════════════ */}
      <Section
        variant="dark"
        eyebrow="La team"
        title="Qui sommes-nous ?"
      >
        <TeamGallery />
      </Section>

      {/* ════════════════ FORMULES ════════════════ */}
      <Section
        variant="dark"
        glow
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
