"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[color-mix(in_oklab,var(--card)_70%,var(--background)_30%)] to-transparent sm:w-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[color-mix(in_oklab,var(--card)_70%,var(--background)_30%)] to-transparent sm:w-10" />

      <div
        ref={trackRef}
        className="flex w-max items-center gap-x-6 py-2 will-change-transform sm:gap-x-8 sm:py-2.5 md:gap-x-10 md:py-3"
      >
        {loop.map((casa, i) => (
          <span key={`${casa}-${i}`} className="inline-flex shrink-0 items-center gap-6 sm:gap-8 md:gap-10">
            <span className="text-[1.0625rem] font-semibold tracking-wide text-[var(--foreground)] sm:text-[1.25rem] md:text-[1.5rem] md:leading-tight">
              {casa}
            </span>
            <span className="text-[1.0625rem] text-[var(--highlight)]/60 sm:text-[1.25rem] md:text-[1.5rem]" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Casas() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="casas" className="section-band-warm section-open">
      <div className="section-shell space-y-8 md:space-y-10">
        <div className="max-w-3xl space-y-2">
          <h2 className="type-title text-[var(--foreground)]">Restaurantes e Bares</h2>
          <p className="type-body text-[var(--foreground)]/85">
            Casas onde toco ou já toquei nesses seis anos de estrada.
          </p>
        </div>

        <div
          className="hidden md:grid md:grid-cols-6 md:gap-3"
          aria-label="Artes de divulgação"
        >
          {MEDIA_SLIDES.map((item) => (
            <div key={item.src} className="relative aspect-[9/16] overflow-hidden bg-[#c5d0ca]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 14vw, 45vw"
                quality={85}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Mobile: nomes estáticos — sem marquee */}
        <ul
          className="flex flex-wrap justify-center gap-x-2.5 gap-y-2 text-center md:hidden"
          aria-label="Casas onde toco ou já toquei"
        >
          {CASAS.map((casa, i) => (
            <li
              key={casa}
              className="inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold tracking-wide text-[var(--foreground)]"
            >
              {i > 0 ? (
                <span className="text-[var(--highlight)]/55" aria-hidden>
                  ·
                </span>
              ) : null}
              {casa}
            </li>
          ))}
        </ul>

        {/* Desktop: marquee */}
        <div
          className="hidden w-full min-w-0 flex-col justify-center gap-4 py-2 md:flex md:gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
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

        <ul className="sr-only">
          {CASAS.map((casa) => (
            <li key={casa}>{casa}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
