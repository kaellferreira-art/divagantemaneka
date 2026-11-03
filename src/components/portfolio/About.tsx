"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { WHATSAPP_URL } from "@/lib/contact";

const ABOUT_SLIDES = [
  {
    imageSrc: "/images/Especial Brasilidades.png",
    imageAlt: "Brasilidades",
    heading: "Brasilidades",
    youtubeId: "2bkpl87MPoU",
    paragraphs: [
      "Uma viagem pela cultura brasileira!",
      "Repertório eclético, que passeia pela MPB, Pop Rock, Samba e Xote — canções antigas com novos arranjos e interpretações, equilibrando emoção e groove.",
      "Visitamos a obra de Zé Ramalho, Belchior, Zeca Baleiro, Lulu Santos, Djavan, Luiz Gonzaga, Falamansa, Almir Guineto, Zeca Pagodinho, entre outros grandes artistas.",
      "Proposta pensada para envolver, cantar junto e celebrar: Memória afetiva, identidade e a força da música brasileira ao vivo.",
    ],
    details: ["Duração: 1h40 ou 2h30", "Classificação: Livre", "Formato: Trio à Quinteto"],
  },
  {
    imageSrc: "/images/Release Forró da Cacaiada.png",
    imageAlt: "Forró da Cacaiada",
    heading: "Forró da Cacaiada",
    youtubeId: "cssHJ3k9o4M",
    paragraphs: [
      "Pensa em um forró pra lá de arretado... Coza max linda! Junta a galera, convida teu par e bora dançar acochado.",
      "O projeto mistura o que a galera já ama com surpresa boa — clássicos vestidos de forró, no balanço certo.",
      "Formação tradicional: Sanfoneiro, Cantor, Zabumbeiro e Triangulista.",
      "Se a proposta é arretar a pista, a Cacaiada resolve.",
    ],
    details: ["Duração: 1h40 ou 2h30", "Classificação: Livre", "Formato: Quarteto"],
  },
  {
    imageSrc: "/images/Nutrir e Florescer.png",
    imageAlt: "Nutrir e Florescer",
    heading: "Nutrir e Florescer",
    youtubeId: "D4k8N94bl2Y",
    paragraphs: [
      "Repertório versátil com canções autorais de Divagante ManéKa e interpretações de Zé Ramalho, Chico César, Belchior, Raul Seixas, entre outras referências do projeto.",
      "MPB, Jazz, Samba Rock, Pop, Folk, Blues... aqui bebemos de todas as fontes, nos embriagamos de música!",
      "Através de poesias e histórias cantadas falamos sobre: autocuidado, afetos, memória e gratidão.",
      "Experiência imersiva, com breves interações e diálogos — um espaço de pausa, reflexão e troca positiva.",
    ],
    details: ["Duração: 50m à 1h40 (ajustável)", "Classificação: Livre", "Formato: Solo a Quinteto"],
    teaserUrl: "https://www.instagram.com/p/DSQIlBmiUdY/",
  },
] as const;

function youtubeEmbedUrl(videoId: string): string {
  const u = new URL(`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`);
  u.searchParams.set("rel", "0");
  u.searchParams.set("modestbranding", "1");
  u.searchParams.set("playsinline", "1");
  u.searchParams.set("iv_load_policy", "3");
  u.searchParams.set("autoplay", "1");
  return u.toString();
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

export function About() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const slide = ABOUT_SLIDES[index];
  const youtubeId = "youtubeId" in slide ? slide.youtubeId : null;

  useEffect(() => {
    setPlaying(false);
  }, [index]);

  return (
      <section id="especiais" className="section-band-stage">
        <div className="section-shell section-open space-y-8 md:space-y-10">
          <div className="space-y-4">
            <h2 className="type-title text-[var(--cream)]">Especiais</h2>
            <div
              role="tablist"
              aria-label="Espetáculos especiais"
              className="flex flex-wrap gap-2 border-b border-[var(--cream)]/20 pb-3"
            >
              {ABOUT_SLIDES.map((item, i) => (
                <button
                  key={item.heading}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className={`rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                    i === index
                      ? "bg-[var(--cream)] text-[var(--stage)]"
                      : "text-[var(--cream)]/80 hover:bg-[var(--cream)]/10 hover:text-[var(--cream)]"
                  }`}
                >
                  {item.heading}
                </button>
              ))}
            </div>
          </div>

          <div
            role="tabpanel"
            className="grid gap-8 md:grid-cols-[0.88fr_1.12fr] md:items-start md:gap-12"
          >
            <div className="media-frame-special relative mx-auto overflow-hidden bg-[#2a3d37]">
              {!playing ? (
                <>
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top"
                  />
                  {youtubeId ? (
                    <button
                      type="button"
                      aria-label={`Assistir: ${slide.heading}`}
                      onClick={() => setPlaying(true)}
                      className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-gradient-to-b from-black/20 via-black/30 to-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cream)]/55"
                    >
                      <span className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[var(--cream)]/50 bg-[#121816]/55 text-[var(--cream)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16">
                        <PlayIcon className="ml-0.5 h-7 w-7 md:h-8 md:w-8" />
                      </span>
                    </button>
                  ) : null}
                </>
              ) : youtubeId ? (
                <iframe
                  title={slide.heading}
                  src={youtubeEmbedUrl(youtubeId)}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : null}
            </div>

            <div className="flex flex-col justify-between gap-6 md:min-h-full md:gap-8">
              <div className="space-y-4 md:space-y-5">
                <h3 className="type-subtitle text-[var(--cream)]">{slide.heading}</h3>
                {slide.paragraphs.map((text) => (
                  <p
                    key={text}
                    className="max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--cream)]/92 md:text-[1.0625rem] md:leading-[1.65]"
                  >
                    {text}
                  </p>
                ))}
              </div>

              <div className="space-y-4">
                <ul className="space-y-1.5 type-caption font-normal text-[var(--cream)]/80">
                  {slide.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  {"teaserUrl" in slide ? (
                    <a
                      href={slide.teaserUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-label inline-flex items-center gap-2 text-[var(--cream)] transition-colors hover:text-white"
                    >
                      <Image
                        src="/icons/instagram.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                      Teaser
                    </a>
                  ) : null}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-label text-[var(--cream)] underline decoration-[var(--cream)]/40 underline-offset-4 transition-colors hover:decoration-[var(--cream)]"
                  >
                    Agendar este especial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
