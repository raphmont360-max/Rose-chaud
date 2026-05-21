import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
};

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  // Le PNG officiel est sur fond noir : on l'utilise tel quel pour la version "light"
  // (footer, sections sombres). Pour la "dark" (navbar sur fond blanc),
  // on reconstitue le mark en texte + barre verticale, dans le style du logo.

  if (variant === "light") {
    const maxH =
      size === "lg" ? 180 : size === "sm" ? 110 : 140;

    return (
      <Link
        href="/"
        aria-label="Rose chaud — accueil"
        className="inline-flex items-center transition-opacity duration-200 hover:opacity-80"
      >
        <Image
          src="/logo.png"
          alt="Rose chaud"
          width={300}
          height={300}
          priority
          className="h-auto w-auto"
          style={{ maxHeight: maxH }}
        />
      </Link>
    );
  }

  const wordSize =
    size === "lg"
      ? "text-4xl"
      : size === "sm"
      ? "text-xl"
      : "text-2xl sm:text-[1.65rem]";

  return (
    <Link
      href="/"
      aria-label="Rose chaud — accueil"
      className="group inline-flex items-stretch gap-3"
    >
      {/* La barre verticale rose, signature du logo */}
      <span
        aria-hidden
        className="block w-0.5 bg-rose-400 transition-all duration-300 group-hover:bg-ink-900"
      />
      <span className="flex flex-col leading-[0.95]">
        <span
          className={`font-display font-medium uppercase tracking-[0.04em] text-ink-900 ${wordSize}`}
        >
          Rose
        </span>
        <span
          className={`font-display font-medium uppercase tracking-[0.04em] text-ink-900 ${wordSize}`}
        >
          Chaud
        </span>
      </span>
    </Link>
  );
}
