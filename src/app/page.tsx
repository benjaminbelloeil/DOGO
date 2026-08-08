import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site";
import { faqs } from "@/lib/faqs";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { LiveSocial } from "@/components/site/live-social";
import { HowItWorks } from "@/components/site/how-it-works";
import { Features } from "@/components/site/features";
import { Testimonials } from "@/components/site/testimonials";
import { Blogs } from "@/components/site/blogs";
import { Studio } from "@/components/site/studio";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { RadioPlayer } from "@/components/site/radio-player";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Ficha de la emisora para Google: quién es DOGO, dónde está y sus redes.
// Ayuda a que la marca aparezca bien ante búsquedas como "dogo streaming".
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RadioStation",
  name: "DOGO Streaming",
  alternateName: ["DOGO Stream", "DOGO"],
  url: SITE_URL,
  logo: `${SITE_URL}/brand/dogo-mascot.png`,
  image: `${SITE_URL}/hero/hero-poster.jpg`,
  description:
    "La señal de San Nicolás de los Arroyos: entrevistas, humor y actualidad en vivo de lunes a viernes por FM 99.9 y streaming.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Nicolás de los Arroyos",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [
    "https://www.youtube.com/@dogostreaming",
    "https://www.instagram.com/dogostreaming",
    "https://www.tiktok.com/@dogo.streaming",
    "https://www.twitch.tv/dogostreaming",
  ],
};

// Las preguntas frecuentes como datos estructurados: candidatas a resultados
// enriquecidos y otra fuente sobre la marca para los buscadores.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="bg-neutral-100 pb-12">
        <Hero />
        <LiveSocial />
        <Studio />
        <Blogs />
        <Testimonials />
        <Features />
        <HowItWorks />
        <Cta />
        <Faq />
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
}
