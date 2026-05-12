"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

const ABOUT_SLIDES = [
  {
    imageSrc: "/images/Especial Brasilidades.png",
    imageAlt: "Especial Brasilidades",
    heading: "Especial Brasilidades",
    eyebrow: "Release",
    paragraphs: [
      "O especial “Brasilidades” propõe uma viagem pela cultura brasileira, apresentando obras que deixaram sua marca na história.",
      "Uma viagem pelo Pop Rock, MPB, Samba, Reggae e Xote, passeando por canções antigas, com novos arranjos e interpretações, equilibrando emoção e groove!",
      "Espetáculo pensado para envolver, cantar junto, sentir e celebrar. Mais do que um show, uma experiência que conecta memória afetiva, identidade cultural e a força da música brasileira ao vivo.",
      "Duração: 1h40m ou 2h30m",
      "Classificação: Livre",
      "Formato: Trio/Quarteto",
    ],
  },
  {
    imageSrc: "/images/Forro da Cacaiada.png?v=2",
    imageAlt: "Forró da Cacaiada",
    heading: "Forró da Cacaiada",
    eyebrow: "Release",
    paragraphs: [
      "Pensa em um forró pra lá de arretado... Coza max linda!",
      "Junta a galera, convida teu par e bora dançar acochado.",
      "Um repertório que mistura clássicos do forró com outros clássicos, que não são forró, mas em versão forró. Não tem?",
      "Formação com Sanfoneiro, Cantor, Zabumbeiro e triangulista.",
      "Duração: 2h30m",
      "Classificação: Livre",
      "Formato: Quarteto",
    ],
  },
  {
    imageSrc: "/images/Nutrir e Florescer.png",
    imageAlt: "Nutrir e Florescer",
    heading: "Nutrir e Florescer",
    eyebrow: "Release",
    paragraphs: [
      "Um espetáculo para alimentar a alma e estimular o imaginário.",
      "Um convite para respirar fundo e se conectar, consigo, com o outro e com o momento presente.",
      "Um momento para refletir sobre sentimentos diversos e também conhecer algumas histórias.",
      "O repertório propõe uma viagem por diferentes ritmos e estilos, passeando pela Valsa, MPB, Jazz, Brega, Samba, Blues, Sertanejo e Pop Rock!",
      "Espetáculo pensado para envolver o público, com breves interações e conversas a respeito das temáticas, gerando conexão e senso pertencimento.",
      "Duração: 50m à 1h40m (ajustável)",
      "Classificação: Livre",
      "Formato: Solo a Quarteto",
    ],
    teaserUrl: "https://www.instagram.com/p/DSQIlBmiUdY/",
  },
] as const;

const RESTAURANTES_SECTION = {
  imageSrc: "/images/Kaell Ferreira.png?v=3",
  imageAlt: "Kaell Ferreira",
  title: "Repertórios",
  subtitle: "Formação solo (voz/violão) ou duo (percussão).",
  blocks: [
    {
      heading: "1. Brasil Soft",
      text: "Versões leves, adaptadas para harmonizar de forma perfeita com um café, almoço ou jantar!",
    },
    {
      heading: "2. HH Eclético",
      text: "Aquele típico repertório para embalar a noite! Diversos estilos musicais e muito groove.",
    },
    {
      heading: "3. Pop Rock",
      text: "Somente os clássicos da cena nacional! Engenheiros, Skank, Jota Quest, Cazuza, Cassia, Nando, Rita, Raul, entre outros.",
    },
    {
      heading: "4. Clássicos do Samba",
      text: "Samba, Samba Rock, Samba canção, Bossa e Pagode, tudo junto e misturado!",
    },
    {
      heading: "5. Boas Vibrações",
      text: "Perfeito para elevar as energias, se nutrindo com mensagens positivas! Reggae, Xote, Pop e MPB.",
    },
  ],
} as const;

export function About() {
  const [index, setIndex] = useState(0);
  const len = ABOUT_SLIDES.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);
  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);

  const slide = ABOUT_SLIDES[index];

  return (
    <>
      <section id="sobre" className="section-shell py-16 md:py-24">
        <div className="grid gap-7 rounded-[1.75rem] p-5 card-surface md:grid-cols-[0.88fr_1.12fr] md:items-center md:gap-10 md:p-8">
          <div className="order-2 relative mx-auto aspect-[9/16] w-full max-w-[18.8rem] overflow-hidden rounded-[1.5rem] bg-[#d8c7b7] shadow-[0_30px_70px_-50px_rgba(30,26,24,0.55)] sm:max-w-[20rem] md:max-w-[22rem]">
            <Image
              src={RESTAURANTES_SECTION.imageSrc}
              alt={RESTAURANTES_SECTION.imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-[50%_0%] transition-all duration-700 ease-out hover:scale-[1.012] hover:brightness-[0.98]"
            />
          </div>

          <div className="order-1 space-y-2.5 md:space-y-3">
            <h2 className="font-serif text-[1.85rem] leading-[1.08] text-[#1E1A18] sm:text-[2.2rem]">{RESTAURANTES_SECTION.title}</h2>
            <p className="max-w-2xl text-[0.92rem] font-medium leading-[1.58] text-[#1E1A18]/78 md:text-[0.98rem]">
              {RESTAURANTES_SECTION.subtitle}
            </p>
            {RESTAURANTES_SECTION.blocks.map((block) => (
              <div key={block.heading} className="space-y-0.5 rounded-xl border border-[#1E1A18]/8 bg-white/30 px-3 py-2">
                <h3 className="max-w-2xl text-[0.91rem] font-bold leading-[1.42] text-[#1E1A18]/90 md:text-[0.95rem]">
                  {block.heading}
                </h3>
                <p className="max-w-2xl text-[0.9rem] leading-[1.42] text-[#1E1A18]/72 md:text-[0.93rem]">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="grid gap-7 rounded-[1.75rem] border border-[#F2E8DC]/30 bg-[radial-gradient(circle_at_50%_15%,rgba(151,147,117,0.9),rgba(132,130,101,0.96)_58%,rgba(119,119,91,1)_100%)] p-5 shadow-[0_14px_36px_-28px_rgba(30,26,24,0.45)] md:grid-cols-[0.88fr_1.12fr] md:items-center md:gap-10 md:p-8">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[18.8rem] overflow-hidden rounded-[1.5rem] bg-[#d8c7b7] shadow-[0_30px_70px_-50px_rgba(30,26,24,0.55)] sm:max-w-[20rem] md:max-w-[22rem]">
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-top transition-all duration-700 ease-out hover:scale-[1.012] hover:brightness-[0.98]"
            />

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

          <div className="space-y-2.5 md:space-y-3">
            <p className="font-sans text-[0.66rem] uppercase tracking-[0.24em] text-[#F2E8DC]/80">Especiais</p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#F2E8DC]/78">{slide.eyebrow}</p>
            <h2 className="font-serif text-[1.85rem] leading-[1.08] text-[#F2E8DC] sm:text-[2.2rem]">{slide.heading}</h2>
            {slide.paragraphs.map((text) => (
              <p key={text} className="max-w-2xl text-[0.9rem] leading-[1.46] text-[#F2E8DC]/86 md:text-[0.94rem]">
                {text}
              </p>
            ))}
            {"teaserUrl" in slide ? (
              <a
                href={slide.teaserUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-1 text-[0.95rem] font-semibold text-[#F2E8DC] transition-colors hover:text-[#F8F2EA]"
              >
                <Image src="/icons/instagram.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                Teaser
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
