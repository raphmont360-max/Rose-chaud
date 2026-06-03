import Link from "next/link";

export default function HomeHeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-[15%] -top-[25%] h-[min(80vw,640px)] w-[min(80vw,640px)] rounded-full bg-rose-300/50 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[min(60vw,480px)] w-[min(60vw,480px)] rounded-full bg-rose-400/35 blur-3xl" />
        <div className="absolute left-[40%] top-[35%] h-48 w-72 rounded-full bg-rose-200/60 blur-2xl" />
      </div>

      <div className="container-page relative z-10 flex min-h-[92vh] flex-col justify-between py-12 sm:py-16 lg:py-20">
        <div>
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-rose-500" />
            <p className="eyebrow">
              Groupe live · Mariages — Fêtes — Cérémonies
            </p>
          </div>

          <h1 className="heading-hero mt-8 max-w-[1200px] text-ink-900 animate-fade-in-up">
            Des amis
            <br />
            et de la musique
            <br />
            <span className="italic font-normal text-rose-500">#rosechaud</span>
          </h1>

          <div
            className="mt-14 flex flex-col items-start justify-between gap-10 border-t border-ink-900/10 pt-10 animate-fade-in-up md:flex-row md:items-end"
            style={{ animationDelay: "200ms", opacity: 0 }}
          >
            <p className="max-w-md text-base leading-relaxed text-ink-700">
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

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-ink-900/10 pt-8">
          <span className="badge">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Live · Mariages · Événements
          </span>
          <Link
            href="/galerie"
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-500 transition hover:text-rose-600"
          >
            Galerie →
          </Link>
        </div>
      </div>
    </section>
  );
}
