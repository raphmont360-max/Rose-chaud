import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  align?: "left" | "center";
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "light" | "dark";
  glow?: boolean;
};

export default function Section({
  eyebrow,
  title,
  description,
  align = "left",
  children,
  className = "",
  id,
  variant = "light",
  glow = false,
}: SectionProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const bg =
    variant === "dark"
      ? "bg-ink-900 text-white"
      : "bg-white text-ink-900";

  return (
    <section id={id} className={`relative overflow-hidden py-24 sm:py-32 ${bg} ${className}`}>
      {variant === "dark" && glow && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-rose-400/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-rose-400/10 blur-3xl"
          />
        </>
      )}
      <div className="container-page relative">
        {(eyebrow || title || description) && (
          <div className={`max-w-3xl ${alignClass}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2
                className={`heading-section mt-5 text-balance ${
                  variant === "dark" ? "text-white" : "text-ink-900"
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`lead mt-6 max-w-2xl text-balance ${
                  align === "center" ? "mx-auto" : ""
                } ${variant === "dark" ? "!text-white/60" : ""}`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        <div className={eyebrow || title ? "mt-16 sm:mt-20" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}
