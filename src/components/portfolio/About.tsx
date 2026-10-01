"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { WHATSAPP_URL } from "@/lib/contact";
import { RepertoriosImageCarousel } from "./RepertoriosImageCarousel";

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

const REPERTORIOS_SECTION = {
  title: "Repertórios",
  blocks: [
    {
      heading: "1. Brasil Soft",
      text: "Interpretações adaptadas para harmonizar com um café, almoço ou jantar! Trilha sonora perfeita para se nutrir.",
    },
    {
      heading: "2. Happy Hour",
      text: "Para cantar junto e curtir aquele balanço! Ideal para bares e confraternizações, transitando entre trilha ambiente e atração principal.",
    },
  ],
  notes: [
    {
      label: "Estilos musicais:",
      text: "MPB, Pop, Pop Rock, Samba, Samba Rock, Pagode, Forró e Reggae.",
    },
  ],
  closing: "Direcionamento do repertório de acordo com sua preferência!",
} as const;

export function About() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const len = ABOUT_SLIDES.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);
  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);

  const slide = ABOUT_SLIDES[index];
  const youtubeId = "youtubeId" in slide ? slide.youtubeId : null;

  useEffect(() => {
    setPlaying(false);
  }, [index]);

  return (
    <>
      <section id="sobre" className="section-shell py-16 md:py-24">
        <div className="space-y-8 rounded-[1.75rem] p-5 card-surface md:space-y-10 md:p-8">
          <div className="space-y-5 md:space-y-6">
            <h2 className="type-title text-[#1E1A18]">{REPERTORIOS_SECTION.title}</h2>

            <div className="space-y-4 md:space-y-5">
              {REPERTORIOS_SECTION.blocks.map((block) => (
                <div key={block.heading} className="space-y-1">
                  <h3 className="type-subtitle text-[#1E1A18]">{block.heading}</h3>
                  <p className="type-body text-[#1E1A18]">{block.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              {REPERTORIOS_SECTION.notes.map((note) => (
                <p key={note.label} className="type-body text-[#1E1A18]">
                  <strong className="font-bold">{note.label}</strong> {note.text}
                </p>
              ))}
              <p className="type-body text-[#1E1A18]">{REPERTORIOS_SECTION.closing}</p>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-cta-primary w-fit"
            >
              Direcione seu Repertório
            </a>
          </div>

          <RepertoriosImageCarousel />
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-7 rounded-[1.75rem] border border-[#F2E8DC]/30 bg-[radial-gradient(circle_at_50%_15%,rgba(151,147,117,0.9),rgba(132,130,101,0.96)_58%,rgba(119,119,91,1)_100%)] p-5 shadow-[0_14px_36px_-28px_rgba(30,26,24,0.45)] md:grid-cols-[0.88fr_1.12fr] md:items-stretch md:gap-10 md:p-8">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[18.8rem] overflow-hidden rounded-[1.5rem] bg-[#d8c7b7] shadow-[0_30px_70px_-50px_rgba(30,26,24,0.55)] sm:max-w-[20rem] md:max-w-[22rem]">
            {!playing ? (
              <>
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top transition-all duration-700 ease-out hover:scale-[1.012] hover:brightness-[0.98]"
                />
                {youtubeId ? (
                  <button
                    type="button"
                    aria-label={`Assistir: ${slide.heading}`}
                    onClick={() => setPlaying(true)}
                    className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-gradient-to-b from-black/20 via-black/30 to-black/40 transition-[background-color] duration-300 hover:from-black/30 hover:via-black/40 hover:to-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2E8DC]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#77775B]"
                  >
                    <span className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[#F2E8DC]/50 bg-[#1E1A18]/55 text-[#F2E8DC] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95 md:h-16 md:w-16">
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

            <button
              type="button"
              aria-label="Conteúdo anterior"
              onClick={prev}
              className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:h-11 md:w-11"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Próximo conteúdo"
              onClick={next}
              className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:h-11 md:w-11"
            >
              ›
            </button>
          </div>

          <div className="flex flex-col justify-between gap-6 md:h-full md:gap-8 md:py-1">
            <div className="space-y-5 md:space-y-6">
              <div className="space-y-1.5 md:space-y-2">
                <h2 className="type-title text-[#FFF8F0]">Especiais</h2>
                <h3 className="type-subtitle text-[#FFF8F0]">{slide.heading}</h3>
              </div>

              <div className="space-y-3.5 md:space-y-4">
                {slide.paragraphs.map((text) => (
                  <p
                    key={text}
                    className="max-w-2xl text-[0.9375rem] leading-relaxed text-[#FFF8F0] md:text-[1.0625rem] md:leading-[1.65]"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-5 md:space-y-6">
              <ul className="space-y-1.5 type-caption font-normal text-[#FFF8F0]/90">
                {slide.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              <div className="flex flex-wrap items-end justify-between gap-3">
                {"teaserUrl" in slide ? (
                  <a
                    href={slide.teaserUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-label inline-flex items-center gap-2 text-[#FFF8F0] transition-colors hover:text-white"
                  >
                    <Image src="/icons/instagram.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                    Teaser
                  </a>
                ) : (
                  <span aria-hidden className="hidden sm:block" />
                )}

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta btn-cta-primary w-fit"
                >
                  Agende seu Especial
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
