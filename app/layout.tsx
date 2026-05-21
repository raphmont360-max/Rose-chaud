import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rose chaud — Groupe live pour mariages",
    template: "%s · Rose chaud",
  },
  description:
    "Rose chaud, groupe de musique live pour mariages et événements. Une ambiance électrique, élégante et inoubliable du oui jusqu'au dernier rappel.",
  keywords: [
    "groupe de musique mariage",
    "musique live mariage",
    "Rose chaud",
    "orchestre mariage",
    "groupe live événement",
  ],
  openGraph: {
    title: "Rose chaud — Groupe live pour mariages",
    description:
      "Une ambiance électrique, élégante et inoubliable du oui jusqu'au dernier rappel.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
