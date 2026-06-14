export const metadata = {
  title: "Ana Mercedes y José Luis | Nuestra Boda",
  description: "Con inmensa alegría en nuestros corazones, queremos compartir contigo el inicio de una nueva etapa y celebrar juntos este día tan especial.",

  openGraph: {
    title: "Ana Mercedes y José Luis | Nuestra Boda",
    description: "Con inmensa alegría en nuestros corazones, queremos compartir contigo el inicio de una nueva etapa y celebrar juntos este día tan especial.",
    url: "https://emmywebgiart.vercel.app/invitaciones/anamercedesyjoseluis",
    siteName: "Invitación de Boda",
    images: [
      {
        url: "https://emmywebgiart.vercel.app/img/invitaciones/anamercedesyjoseluis/anamercedesyjoseluislink.jpg",
        width: 1200,
        height: 630,
        alt: "Ana Mercedes y José Luis",
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ana Mercedes y José Luis | Nos Casamos",
    description: "Con inmensa alegría en nuestros corazones, queremos compartir contigo el inicio de una nueva etapa y celebrar juntos este día tan especial.",
    images: [
      "https://emmywebgiart.vercel.app/img/invitaciones/anamercedesyjoseluis/anamercedesyjoseluislink.jpg",
    ],
  },
};

export default function Layout({ children }) {
  return children;
}