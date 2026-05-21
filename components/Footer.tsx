import Link from "next/link";
import Logo from "./Logo";
import SocialLink from "./SocialLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      {/* Gigantic wordmark in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-0 right-0 flex justify-center overflow-hidden"
      >
        <span className="font-display text-[28vw] font-light italic leading-none text-stroke text-white/[0.06] whitespace-nowrap">
          Rose chaud
        </span>
      </div>

      <div className="container-page relative">
        <div className="grid gap-14 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" size="lg" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Des amis et de la musique.{" "}
              <span className="italic text-rose-300">#rosechaud</span>. Pour vos
              mariages, célébrations, anniversaires, évènements etc…
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                {
                  label: "Instagram",
                  webUrl: "https://www.instagram.com/rosechaud.musique/",
                  appUrl: "instagram://user?username=rosechaud.musique",
                },
                {
                  label: "Facebook",
                  webUrl:
                    "https://www.facebook.com/share/1agd63DCJi/?mibextid=wwXIfr",
                  appUrl:
                    "fb://facewebmodal/f?href=https://www.facebook.com/share/1agd63DCJi/",
                },
                {
                  label: "TikTok",
                  webUrl: "https://tiktok.com",
                },
              ].map((s) => (
                <SocialLink
                  key={s.label}
                  label={s.label}
                  webUrl={s.webUrl}
                  appUrl={s.appUrl}
                  className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/80 transition hover:border-rose-400 hover:bg-rose-400 hover:text-ink-900"
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow">Navigation</h4>
            <ul className="mt-5 space-y-3 font-display text-xl">
              {[
                ["/", "Accueil"],
                ["/repertoire", "Répertoire"],
                ["/galerie", "Galerie"],
                ["/temoignages", "Témoignages"],
                ["/tarifs", "Tarifs"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-white/80 transition hover:text-rose-400"
                  >
                    <span className="h-px w-0 bg-rose-400 transition-all duration-300 group-hover:w-6" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="eyebrow">Contact</h4>
            <ul className="mt-5 space-y-3 font-display text-xl">
              <li>
                <a
                  href="mailto:contact.rosechaud@gmail.com"
                  className="text-white/80 transition hover:text-rose-400"
                >
                  contact.rosechaud@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+32493999800"
                  className="text-white/80 transition hover:text-rose-400"
                >
                  +32 493 99 98 00
                </a>
                <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-rose-400/80">
                  BE
                </span>
              </li>
              <li>
                <a
                  href="tel:+33658210371"
                  className="text-white/80 transition hover:text-rose-400"
                >
                  +33 6 58 21 03 71
                </a>
                <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-rose-400/80">
                  FR
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-white/50">
              Disponible partout en Belgique · Nord de la France sur demande.
            </p>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
            <p>© {year} Rose chaud - Tous droits réservés.</p>
            <p className="font-display italic text-rose-400/80">#RoseChaud</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
