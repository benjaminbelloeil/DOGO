import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for headings — a bold, chunky, rounded sans that echoes the
// playful "Ya lo Sabía" lettering of the DOGO programs.
const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DOGO Streaming — Entrevistas, humor y actualidad por FM 99.9",
  description:
    "La señal de San Nicolás de los Arroyos. Entrevistas, humor y actualidad en vivo de lunes a viernes por FM 99.9.",
  applicationName: "DOGO Streaming",
  keywords: [
    "DOGO Streaming",
    "DOGO Stream",
    "DOGO",
    "radio San Nicolás",
    "FM 99.9",
    "streaming San Nicolás de los Arroyos",
    "Ya lo Sabía",
    "Hoja de Ruta",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DOGO Streaming",
    locale: "es_AR",
    title: "DOGO Streaming — El streaming de San Nicolás",
    description:
      "Entrevistas, humor y actualidad en vivo de lunes a viernes por FM 99.9 y YouTube, desde San Nicolás de los Arroyos.",
    images: [{ url: "/hero/hero-poster.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DOGO Streaming — El streaming de San Nicolás",
    description:
      "Entrevistas, humor y actualidad en vivo por FM 99.9 y YouTube.",
    images: ["/hero/hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {/* Google Analytics 4 en todo el sitio. Sin el ID configurado (dev, por
          ejemplo) no se carga nada. */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
