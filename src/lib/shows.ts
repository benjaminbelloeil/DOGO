/**
 * Datos compartidos de los programas de DOGO: los usan las tarjetas de la
 * portada (features.tsx) y las páginas de detalle (/programas/[slug]).
 *
 * Las clases de Tailwind viven acá como strings literales para que el
 * compilador las detecte; cada programa trae su propio acento de color.
 */

export type Show = {
  slug: string;
  name: string;
  tagline: string;
  /** Bajada corta de la tarjeta de portada. */
  description: string;
  /** Párrafos largos para la página del programa. */
  about: string[];
  /** Temas que definen al programa, como chips. */
  chips: string[];
  schedule: string;
  days: string;
  hours: string;
  format: string;
  /** Las caras del programa; vacío si todavía no tenemos las fotos del equipo. */
  voices: { name: string; image: string }[];
  /** Canal de YouTube con los programas completos. */
  youtube: string;
  instagram: string;
  /** WhatsApp propio del programa (link wa.me), si tiene. */
  whatsapp?: string;
  logo: string;
  bgWord: string;
  panelClass: string;
  wordClass: string;
  accentClass: string;
  /** Botón sólido del programa (fondo + hover). */
  accentButtonClass: string;
  /** Mismo tono que panelClass, para que la ola continúe el fondo. */
  waveFill: string;
  wordSizeClass: string;
  /** La palabra gigante a escala afiche en la página de detalle. */
  posterWordSizeClass: string;
};

export const shows: Show[] = [
  {
    slug: "ya-lo-sabia",
    name: "Ya lo Sabía",
    tagline: "Magazine de actualidad y humor",
    description:
      "Entrevistas, panel y la mirada filosa sobre lo que pasa en San Nicolás. Buena onda e información para arrancar el día.",
    about: [
      "Ya lo Sabía es el magazine de las mañanas de DOGO: dos horas en vivo con la información que importa, entrevistas a los protagonistas de la ciudad y un panel que no se guarda nada.",
      "La actualidad de San Nicolás contada con humor y sin vueltas — lo que se comenta en la calle, primero al aire. Un programa para arrancar el día informado y con buena onda.",
    ],
    chips: ["Actualidad local", "Entrevistas", "Panel en vivo", "Humor"],
    schedule: "Lun a Vie · 10–12 h",
    days: "Lunes a viernes",
    hours: "10:00 – 12:00 h",
    format: "Magazine en vivo",
    voices: [
      { name: "Luca", image: "/team/luca-v5.png" },
      { name: "Diego «El Indio»", image: "/team/diego-v5.png" },
      { name: "Dolores", image: "/team/dolores.png" },
    ],
    youtube: "https://www.youtube.com/@dogostreaming",
    instagram: "https://www.instagram.com/dogostreaming",
    // El WhatsApp de DOGO Streaming para info del programa y de la audiencia.
    whatsapp: `https://wa.me/5493364009374?text=${encodeURIComponent(
      "¡Hola DOGO! 👋 Quiero info sobre Ya lo Sabía.",
    )}`,
    logo: "/shows/ya-lo-sabia.png",
    bgWord: "¡Ya lo Sabía!",
    panelClass: "bg-grape/[0.05]",
    wordClass: "text-grape/[0.08]",
    accentClass: "text-grape",
    accentButtonClass: "bg-grape hover:bg-grape-deep",
    waveFill: "rgba(80, 31, 128, 0.05)",
    wordSizeClass: "text-[5.5rem] sm:text-[7rem] lg:text-[8rem]",
    // Escala con el viewport (con tope) para que la frase entre completa en
    // el panel del afiche sin cortarse en los bordes.
    posterWordSizeClass: "text-[15vw] md:text-[min(7.6vw,8.25rem)]",
  },
  {
    slug: "hoja-de-ruta",
    name: "Hoja de Ruta",
    tagline: "Periodismo independiente desde 2010",
    description:
      "Entrevistas políticas y actualidad, con la impronta de siempre: periodismo independiente. Un clásico de la radio nicoleña, renovado para el streaming.",
    about: [
      "Hoja de Ruta vuelve renovado: el clásico de entrevistas políticas y actualidad de San Nicolás se suma al streaming y a las redes para conectar con un público nuevo, siempre con la misma impronta — hacer periodismo independiente.",
      "Nació en 2010, cuando la inolvidable Marita Marti confió el horario de «Los Elegidos de Marita» — sábados de 10 a 12 en una de las FM más escuchadas de la ciudad — a un programa de buen contenido, entrevistas y actualidad. Pasó por varias radios, cerró sus últimos cinco años en la mismísima Radio San Nicolás y hoy retoma el desafío radial en DOGO.",
    ],
    chips: [
      "Entrevistas políticas",
      "Actualidad",
      "Periodismo independiente",
      "Desde 2010",
    ],
    schedule: "Sábados · 10–12 h",
    days: "Sábados",
    hours: "10:00 – 12:00 h",
    format: "Entrevistas y actualidad",
    voices: [
      { name: "Diego Jannicelli", image: "/team/diego-jannicelli.png" },
      { name: "Silvina Caletrio", image: "/team/silvina-caletrio.png" },
    ],
    youtube: "https://www.youtube.com/@hojaderutasn",
    instagram: "https://www.instagram.com/hojaderutasn",
    whatsapp: `https://wa.me/5493364312481?text=${encodeURIComponent(
      "¡Hola Hoja de Ruta! 👋 Quiero ponerme en contacto con el programa.",
    )}`,
    logo: "/shows/hoja-de-ruta.png",
    bgWord: "Hoja de Ruta",
    panelClass: "bg-orange-600/[0.05]",
    wordClass: "text-orange-600/[0.07]",
    accentClass: "text-orange-600",
    accentButtonClass: "bg-orange-600 hover:bg-orange-700",
    waveFill: "rgba(234, 88, 12, 0.05)",
    wordSizeClass: "text-[4rem] sm:text-[5.25rem] lg:text-[6.25rem]",
    // "Hoja de Ruta" es más ancho por em que "¡Ya lo Sabía!": tope más chico.
    posterWordSizeClass: "text-[12vw] md:text-[min(6vw,6.5rem)]",
  },
];

export function getShow(slug: string): Show | undefined {
  return shows.find((s) => s.slug === slug);
}
