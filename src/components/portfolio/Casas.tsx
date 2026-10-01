"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const CASAS = [
  "Estimada",
  "Esquina D",
  "SESC Cacupé",
  "Pátio Milano",
  "Coco Bambu",
  "Jurerê Beach Village",
  "Quintal Lagoa",
  "TopMarket Floripa",
  "Multi Open Shopping",
  "K-Platz",
  "BeWiki",
  "SpotMarkt",
  "Catamarã",
  "Las Lenas",
  "PullBeer",
  "Koxixos",
  "Consagrado",
  "Forneria do Porto",
  "Trusta Pizza",
  "Iate Clube Veleiros da Ilha",
  "Viva Trindade",
  "Ratones Craft Beer",
  "Imbuia",
  "Bário Passeio Sapiens",
  "Rancho do Tchesco",
  "Açougue do Aurino",
  "Praia do Sonho Pub",
  "Jardim das Bruxas",
  "Refúgio Rio Tavares",
  "Bertol Craft Beer",
  "Boteco Zé Mané",
  "Capitão Gourmet",
] as const;

const MEDIA_SLIDES = [
  { src: "/images/casas-catamara.png", alt: "Arte de divulgação — Catamarã" },
  { src: "/images/casas-the-ranch.png", alt: "Arte de divulgação — The Ranch Capoeiras" },
  { src: "/images/casas-estimada.jpeg", alt: "Arte de divulgação — Estimada" },
  { src: "/images/casas-boteco-ze-mane.jpeg", alt: "Arte de divulgação — Boteco Zé Mané" },
  { src: "/images/casas-sesc-cacupe.jpeg", alt: "Arte de divulgação — SESC Cacupé" },
  { src: "/images/casas-aurino.jpeg", alt: "Arte de divulgação — Aurino Boteco & Brasa" },
] as const;

const ROWS = [
  { items: CASAS.slice(0, 6), speed: 0.26, reverse: false },
  { items: CASAS.slice(6, 11), speed: 0.38, reverse: true },
  { items: CASAS.slice(11, 17), speed: 0.3, reverse: false },
  { items: CASAS.slice(17, 22), speed: 0.42, reverse: true },
  { items: CASAS.slice(22, 27), speed: 0.28, reverse: false },
  { items: CASAS.slice(27), speed: 0.36, reverse: true },
] as const;

function CasasMarquee({
  items,
  speed,
  reverse,
  paused,
}: {
  items: readonly string[];
  speed: number;
  reverse: boolean;
  paused: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let offset = 0;
    const direction = reverse ? 1 : -1;

    const tick = () => {
      if (!paused) {
        offset += direction * speed;
        const half = track.scrollWidth / 2;
        if (half > 0) {
          if (!reverse && Math.abs(offset) >= half) offset = 0;
          if (reverse && offset >= half) offset = 0;
        }
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [paused, reverse, speed]);

  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[color-mix(in_oklab,var(--card)_88%,white_12%)] to-transparent sm:w-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[color-mix(in_oklab,var(--card)_88%,white_12%)] to-transparent sm:w-10" />

      <div ref={trackRef} className="flex w-max items-center gap-x-6 py-2 will-change-transform sm:gap-x-8 sm:py-2.5 md:gap-x-10 md:py-3">
        {loop.map((casa, i) => (
          <span key={`${casa}-${i}`} className="inline-flex shrink-0 items-center gap-6 sm:gap-8 md:gap-10">
            <span className="text-[1.0625rem] font-semibold tracking-wide text-[#1E1A18] sm:text-[1.25rem] md:text-[1.5rem] md:leading-tight">
              {casa}
            </span>
            <span className="text-[1.0625rem] text-[#8B4030]/55 sm:text-[1.25rem] md:text-[1.5rem]" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function CasasMediaCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const len = MEDIA_SLIDES.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, 5500);
    return () => window.clearInterval(id);
  }, [next, paused]);

  return (
    <div
      className="relative aspect-[9/16] w-full max-w-[15.5rem] shrink-0 overflow-hidden rounded-[1.5rem] bg-[#d8c7b7] shadow-[0_30px_70px_-50px_rgba(30,26,24,0.55)] sm:max-w-[17rem] md:max-w-[18.5rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
        const dx = endX - touchStartX.current;
        touchStartX.current = null;
        if (dx > 48) prev();
        else if (dx < -48) next();
      }}
    >
      {MEDIA_SLIDES.map((item, i) => (
        <div
          key={item.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 768px) 28vw, 80vw"
            quality={90}
            priority={i === 0}
            className="object-cover object-center"
          />
        </div>
      ))}

      <button
        type="button"
        aria-label="Arte anterior"
        onClick={prev}
        className="absolute left-2.5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-lg text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Próxima arte"
        onClick={next}
        className="absolute right-2.5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-lg text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5 px-4">
        {MEDIA_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para a arte ${i + 1} de ${len}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-[#F2E8DC]" : "w-2 bg-[#F2E8DC]/45 hover:bg-[#F2E8DC]/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Casas() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="casas" className="section-shell py-16 md:py-24">
      <div className="space-y-8 rounded-[1.75rem] p-5 card-surface md:space-y-10 md:p-8">
        <div className="max-w-3xl space-y-2">
          <h2 className="type-title text-[#1E1A18]">Restaurantes, Bares e Pubs</h2>
          <p className="type-body text-[#1E1A18]/85">
            Casas onde toco ou já toquei nesses seis anos de estrada.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-8 lg:gap-12">
          <CasasMediaCarousel />

          <div
            className="flex w-full min-w-0 flex-1 flex-col justify-center gap-4 py-2 sm:gap-5 md:gap-6 md:py-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {ROWS.map((row, i) => (
              <CasasMarquee
                key={i}
                items={row.items}
                speed={row.speed}
                reverse={row.reverse}
                paused={paused}
              />
            ))}
          </div>
        </div>

        <ul className="sr-only">
          {CASAS.map((casa) => (
            <li key={casa}>{casa}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
