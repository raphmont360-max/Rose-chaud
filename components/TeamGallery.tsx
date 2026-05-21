import Image from "next/image";

const members = [
  { n: "01", name: "Camille", role: "Saxophoniste", image: "/team/camille.png" },
  { n: "02", name: "Raphaël", role: "Batteur", image: "/team/raphael.png" },
  { n: "03", name: "Basile", role: "Pianiste", image: "/team/basile.png" },
  { n: "04", name: "P-J", role: "Guitariste", image: "/team/pj.png" },
  { n: "05", name: "Joséphine", role: "Chanteuse", image: "/team/josephine.png" },
  { n: "06", name: "Lina", role: "Chanteuse", image: "/team/lina.png" },
  { n: "07", name: "Charlotte", role: "Chanteuse", image: "/team/charlotte.png" },
  { n: "08", name: "Alessia", role: "Chanteuse", image: "/team/alessia.png" },
];

export default function TeamGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {members.map((m) => (
        <figure
          key={m.n}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition-colors hover:border-rose-400/50"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-ink-800 via-rose-700/80 to-rose-400">
            {m.image ? (
              <>
                <Image
                  src={m.image}
                  alt={m.name ?? `Membre ${m.n}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(244,181,204,0.55),transparent_65%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(244,181,204,0.25),transparent_50%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
                  <span className="font-display text-4xl text-white/20 transition-colors group-hover:text-rose-300/50">
                    {m.n}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                    Photo à venir
                  </span>
                </div>
              </>
            )}
          </div>
          <figcaption className="border-t border-white/10 px-4 py-3">
            <p className="font-display text-lg text-white">
              {m.name ?? "Prénom"}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-rose-400">
              {m.role}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
