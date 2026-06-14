export const metadata = {
  title: "Ana Mercedes y José Luis | Nuestra Boda",
  description: "Acompáñanos a celebrar nuestro matrimonio.",

  openGraph: {
    title: "Ana Mercedes y José Luis | Nuestra Boda",
    description: "Acompáñanos a celebrar nuestro matrimonio.",
    url: "https://tu-dominio.vercel.app/invitaciones/anamercedesyjoseluis",
    siteName: "Invitación de Boda",
    images: [
      {
        url: "https://emmy-webgi-art-nextjs.vercel.app/img/invitaciones/anamercedesyjoseluis/anamercedesyjoseluislink.jpg",
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
    description: "Acompáñanos a celebrar nuestro matrimonio.",
    images: [
      "https://emmy-webgi-art-nextjs.vercel.app/img/invitaciones/anamercedesyjoseluis/anamercedesyjoseluislink.jpg",
    ],
  },
};

export default function Layout({ children }) {
  return children;
}