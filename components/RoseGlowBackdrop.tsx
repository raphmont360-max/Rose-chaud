/** Taches rose douces sur fond noir — réutilisable Section, PageHeader, etc. */
export default function RoseGlowBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Halo principal — coin haut droit */}
      <div
        className="absolute -right-[12%] -top-[20%] h-[min(75vw,560px)] w-[min(75vw,560px)] rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(238,157,185,0.38) 0%, rgba(244,181,204,0.16) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Haut gauche */}
      <div
        className="absolute -left-[5%] -top-[8%] h-[min(50vw,380px)] w-[min(45vw,340px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,181,204,0.26) 0%, transparent 68%)",
          filter: "blur(55px)",
        }}
      />

      {/* Centre — derrière le contenu */}
      <div
        className="absolute left-[38%] top-[28%] h-[200px] w-[340px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(229,138,171,0.2) 0%, transparent 70%)",
          filter: "blur(65px)",
        }}
      />

      {/* Accent chaud — milieu droit */}
      <div
        className="absolute right-[8%] top-[35%] h-[220px] w-[280px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(229,138,171,0.3) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Milieu gauche */}
      <div
        className="absolute left-[12%] top-[48%] h-[160px] w-[200px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(238,157,185,0.22) 0%, transparent 65%)",
          filter: "blur(45px)",
        }}
      />

      {/* Grande tache bas gauche */}
      <div
        className="absolute -bottom-[18%] -left-[8%] h-[min(60vw,440px)] w-[min(65vw,480px)] rounded-[45%]"
        style={{
          background:
            "radial-gradient(ellipse at 40% 60%, rgba(244,181,204,0.24) 0%, rgba(196,106,139,0.1) 50%, transparent 72%)",
          filter: "blur(70px)",
          transform: "rotate(-8deg)",
        }}
      />

      {/* Bas droite */}
      <div
        className="absolute -bottom-[10%] -right-[5%] h-[min(45vw,320px)] w-[min(50vw,360px)] rounded-[40%]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(238,157,185,0.2) 0%, rgba(196,106,139,0.06) 55%, transparent 75%)",
          filter: "blur(65px)",
          transform: "rotate(12deg)",
        }}
      />

      {/* Petite lueur bas centre */}
      <div
        className="absolute bottom-[5%] left-[42%] h-[180px] w-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(238,157,185,0.2) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      {/* Petites taches éparses */}
      <div
        className="absolute right-[28%] top-[12%] h-[100px] w-[140px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(253,244,248,0.15) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />
      <div
        className="absolute left-[55%] top-[62%] h-[90px] w-[110px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244,181,204,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute left-[22%] top-[22%] h-[70px] w-[90px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(229,138,171,0.16) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute right-[42%] bottom-[28%] h-[120px] w-[100px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(238,157,185,0.14) 0%, transparent 70%)",
          filter: "blur(38px)",
        }}
      />

      {/* Filament vertical — gauche */}
      <div
        className="absolute left-[5%] top-[15%] h-[45%] w-[120px] rounded-full"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(244,181,204,0.14) 40%, rgba(229,138,171,0.1) 70%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* Filament diagonal — droite */}
      <div
        className="absolute right-[18%] top-[8%] h-[55%] w-[80px] rounded-full"
        style={{
          background:
            "linear-gradient(165deg, transparent 0%, rgba(244,181,204,0.1) 50%, transparent 100%)",
          filter: "blur(35px)",
          transform: "rotate(15deg)",
        }}
      />

      {/* Brume globale */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(253,244,248,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_80%_100%,rgba(244,181,204,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_15%_50%,rgba(244,181,204,0.06),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_30%_at_65%_35%,rgba(238,157,185,0.07),transparent_50%)]" />
    </div>
  );
}
