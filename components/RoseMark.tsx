import Image from "next/image";

type RoseMarkProps = {
  className?: string;
  size?: number;
  opacity?: number; // entre 0 et 100
};

// Rose officielle Rose Chaud (PNG fournie par le client).
// On contrôle l'opacité via une prop pour pouvoir l'utiliser en filigrane
// sur fond clair comme sur fond sombre.
export default function RoseMark({
  className = "",
  size = 200,
  opacity = 100,
}: RoseMarkProps) {
  return (
    <Image
      src="/rose.png"
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={className}
      style={{ opacity: opacity / 100 }}
    />
  );
}
