type MarqueeProps = {
  items: string[];
  variant?: "light" | "dark" | "rose";
  speed?: "slow" | "normal";
};

export default function Marquee({
  items,
  variant = "light",
  speed = "normal",
}: MarqueeProps) {
  const bg =
    variant === "dark"
      ? "bg-ink-900 text-white border-y border-white/10"
      : variant === "rose"
      ? "bg-rose-400 text-ink-900"
      : "bg-white text-ink-900 border-y border-ink-900/10";

  const animation = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";

  // Double pour assurer la boucle infinie sans coupure
  const full = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${bg}`}>
      <div className={`flex w-max ${animation} py-5`}>
        {full.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 px-8 font-display text-3xl italic sm:text-4xl md:text-5xl"
          >
            {item}
            <span
              aria-hidden
              className="inline-block h-2 w-2 rotate-45 bg-current opacity-80"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
