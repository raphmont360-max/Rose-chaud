import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Photos et vidéos live du groupe Rose chaud — découvrez l'ambiance de nos mariages et événements.",
};

const photos = [
  { aspect: "aspect-[3/4]", color: "from-rose-300 via-rose-400 to-ink-900", label: "Cérémonie sous les arbres", place: "Château de Vaux" },
  { aspect: "aspect-[4/3]", color: "from-rose-400 via-rose-500 to-ink-800", label: "Vin d'honneur au coucher du soleil", place: "Mas Provençal" },
  { aspect: "aspect-square", color: "from-ink-900 via-rose-700 to-rose-400", label: "Premier slow", place: "Domaine de Roussas" },
  { aspect: "aspect-[3/4]", color: "from-rose-200 via-rose-400 to-ink-900", label: "Quartet acoustique", place: "Villa Côte d'Azur" },
  { aspect: "aspect-[4/3]", color: "from-ink-800 via-ink-900 to-rose-500", label: "Soirée dansante", place: "Bastide en Provence" },
  { aspect: "aspect-square", color: "from-rose-500 via-rose-700 to-ink-900", label: "Cuivres en feu", place: "Manoir en Bretagne" },
  { aspect: "aspect-[3/4]", color: "from-rose-400 via-ink-800 to-ink-900", label: "Bis à minuit", place: "Domaine du Luberon" },
  { aspect: "aspect-[4/3]", color: "from-rose-300 via-rose-500 to-ink-900", label: "Public en délire", place: "Château de Vaux" },
];

const videos = [
  {
    title: "Showreel 2024",
    duration: "2:14",
    description: "Un condensé de notre saison : émotions, danse, sourires.",
  },
  {
    title: "Cérémonie · Château de Vaux",
    duration: "3:42",
    description: "Version acoustique d'« A Thousand Years » pour l'entrée des mariés.",
  },
  {
    title: "Soirée · Roussas",
    duration: "1:58",
    description: "Set funk · « September » à 1 h du matin, ambiance garantie.",
  },
];

export default function GaleriePage() {
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title={
          <>
            Rose Chaud en live.
            <br />
            Nos moments en image.
          </>
        }
      />

      {/* ════════════════ VIDÉOS ════════════════ */}
      <Section
        eyebrow="En vidéo"
        title="Voir et entendre le groupe."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {videos.map((v, i) => (
            <article
              key={v.title}
              className="group relative overflow-hidden rounded-3xl bg-ink-900 transition-all hover:-translate-y-2"
            >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-ink-800 via-rose-700 to-rose-400">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,92,132,0.5),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-ink-900 shadow-2xl transition-transform group-hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-4 right-4 rounded-full bg-ink-900/70 px-3 py-1.5 text-xs text-white backdrop-blur">
                  {v.duration}
                </span>
                <span className="absolute left-4 top-4 font-display text-4xl text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-6 text-white">
                <h3 className="font-display text-2xl">{v.title}</h3>
                <p className="mt-2 text-sm text-white/60">{v.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ════════════════ PHOTOS (mosaïque) ════════════════ */}
      <Section
        className="bg-bone"
        eyebrow="En photos"
        title="L'atmosphère Rose chaud."
      >
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {photos.map((p, i) => (
            <figure
              key={i}
              className="group relative break-inside-avoid overflow-hidden rounded-3xl transition-all hover:-translate-y-1"
            >
              <div
                className={`${p.aspect} w-full bg-gradient-to-br ${p.color} transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-rose-400">
                  {p.place}
                </p>
                <p className="mt-2 font-display text-2xl italic text-white">
                  {p.label}
                </p>
              </figcaption>
              <span className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all group-hover:opacity-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
