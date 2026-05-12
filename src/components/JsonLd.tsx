import { getSiteUrl } from "@/lib/site-url";
import { YOUTUBE_CHANNEL_URL } from "@/lib/youtube-playlist-config";

const DESCRIPTION =
  "Kaell Ferreira — músico em Florianópolis (SC). Música ao vivo para restaurantes, bares, eventos corporativos e privados: voz e violão, duo ou banda. Espetáculos Brasilidades, Forró da Cacaiada e Nutrir e Florescer.";

export function JsonLd() {
  const siteUrl = getSiteUrl();
  const imageUrl = `${siteUrl}/images/Kaell%20Ferreira.png`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kaell Ferreira",
    url: siteUrl,
    image: imageUrl,
    jobTitle: "Músico",
    email: "kaellferreira@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Florianópolis",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    sameAs: ["https://www.instagram.com/brkaell/", YOUTUBE_CHANNEL_URL],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kaell Ferreira",
    url: siteUrl,
    description: DESCRIPTION,
    inLanguage: "pt-BR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([person, website]),
      }}
    />
  );
}
