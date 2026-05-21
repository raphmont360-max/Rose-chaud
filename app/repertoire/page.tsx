import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Répertoire",
  description:
    "Exemples de titres joués en live par Rose chaud pour vos mariages — classiques, pop, soul et bien plus. Écoutez la playlist Spotify.",
};

const SPOTIFY_PLAYLIST_URL =
  "https://open.spotify.com/playlist/61ANwsJP48QHtTp4DTiEJP?si=Vv32WmxFSU2XOXltjSvAMQ";

const weddingExamples = [
  { title: "The Winner Takes It All", artist: "ABBA" },
  { title: "When I Was Your Man", artist: "Bruno Mars" },
  { title: "I Will Survive", artist: "Gloria Gaynor" },
  { title: "Hopelessly Devoted to You", artist: "Grease" },
  { title: "J'irai où tu iras", artist: "Céline Dion" },
];

export default function RepertoirePage() {
  return (
    <>
      <PageHeader
        eyebrow="Répertoire"
        title="Quelques titres qu'on adore jouer."
        description="Pour vos mariages et vos fêtes, voici un aperçu de classiques qu'on reprend souvent — arrangés et joués 100 % en live."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Mariages · Exemples</p>
          <h2 className="heading-section mt-4">Des classiques, en live</h2>
          <p className="lead mt-5 text-balance">
            Quelques exemples de notre répertoire. Vous connaissez un tube ? On
            le joue probablement déjà. Une chanson vraiment spéciale ? On peut
            l&apos;apprendre exceptionnellement pour vous.
          </p>

          <ul className="mt-12 border-t border-ink-900/10">
            {weddingExamples.map((song, i) => (
              <li
                key={`${song.title}-${song.artist}`}
                className="row-hover group cursor-default border-b border-ink-900/10 transition-colors"
              >
                <div className="flex items-center gap-6 px-2 py-5 transition-colors group-hover:text-white">
                  <span className="w-8 font-display text-sm text-ink-200 transition-colors group-hover:text-ink-900">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-2xl leading-tight">
                      {song.title}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-400 transition-colors group-hover:text-ink-900/70">
                      {song.artist}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-3xl border border-ink-900/10 bg-bone p-8 sm:p-10">
            <p className="lead text-balance">
              Toujours pas convaincu ? Envie d&apos;en voir plus ? Venez sur
              notre playlist Spotify pour en découvrir plus.
            </p>
            <a
              href={SPOTIFY_PLAYLIST_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1DB954] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#1ed760]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Rose chaud 🌹 — Playlist Spotify
            </a>
          </div>
        </div>
      </Section>

      <section className="bg-ink-900 py-24 text-white sm:py-32">
        <div className="container-page text-center">
          <p className="eyebrow">Sur-mesure</p>
          <h3 className="heading-display mx-auto mt-6 max-w-3xl text-white text-balance">
            Votre titre n&apos;est pas dans la liste ?
          </h3>
          <p className="lead mx-auto mt-6 max-w-2xl !text-white/70 text-balance">
            Vous avez un titre coup de cœur qu&apos;on ne joue pas encore ? Ça
            tombe bien, on adore les défis. On peut l&apos;apprendre et
            l&apos;arranger pour vous. Nos options de personnalisation sont
            détaillées dans nos tarifs.
          </p>
          <a href="/contact" className="btn-rose mt-10">
            Proposer un titre <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </>
  );
}
