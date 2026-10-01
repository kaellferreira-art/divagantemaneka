"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const DEPOIMENTOS = [
  {
    quote:
      "Kaell tocou nas primeiras horas do meu almoço de aniversário. Como era o momento de receber os convidados, tirar fotos, abrir presentes, conversar e, em seguida almoçar, preparou um repertório específico para esse primeiro momento. Atendeu 100% minhas expectativas... aliás, como já o conheço de longa data, aprecio e confio demais no seu trabalho. Tenho certeza que, para qualquer evento e local, Kaell tem uma proposta que atende o desejo de quem o contrata. Sempre que possível frequento os lugares onde ele se apresenta e o indico com certeza!!",
    name: "Tania Fiorini",
    context: "Aniversário — Florianópolis",
    images: [
      { src: "/images/Taninha.jpg", alt: "Tania Fiorini no almoço de aniversário com Kaell Ferreira" },
      { src: "/images/Taninha 2.jpg", alt: "Momento do aniversário com apresentação de Kaell Ferreira" },
    ],
  },
  {
    quote: "Você foi impecável no momento mais especial de nossas vidas.",
    name: "Renato e Camila",
    context: "Casamento — Florianópolis",
    images: [
      {
        src: "/images/depoimento-renato-camila.jpeg",
        alt: "Renato e Camila no casamento com Kaell Ferreira",
        objectPosition: "50% 28%",
      },
    ],
  },
] as const;

function DepoimentoImageCarousel({
  images,
}: {
  images: readonly { src: string; alt: string; objectPosition?: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const len = images.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);

  useEffect(() => {
    if (paused || len < 2) return;
    const id = window.setInterval(next, 5000);
    return () => window.clearInterval(id);
  }, [next, paused, len]);

  return (
    <div
      className="group relative aspect-[3/2] w-full overflow-hidden rounded-[1.25rem] bg-[#d8c7b7] shadow-[0_20px_50px_-40px_rgba(30,26,24,0.5)]"
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
      {images.map((image, i) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 36vw, 92vw"
            quality={92}
            priority={i === 0}
            className="object-cover"
            style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
          />
        </div>
      ))}

      {len > 1 ? (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={prev}
            className="absolute left-2.5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-lg text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:left-3"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={next}
            className="absolute right-2.5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-lg text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:right-3"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5 px-4">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para a foto ${i + 1} de ${len}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#F2E8DC]" : "w-2 bg-[#F2E8DC]/45 hover:bg-[#F2E8DC]/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function Depoimentos() {
  return (
    <section id="depoimentos" className="section-shell py-16 md:py-24">
      <div className="space-y-8 md:space-y-10">
        <div className="max-w-2xl">
          <h2 className="type-title text-[#1E1A18]">Depoimentos</h2>
        </div>

        <ul className="space-y-12 md:space-y-14">
          {DEPOIMENTOS.map((item) => (
            <li
              key={`${item.name}-${item.context}`}
              className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-10"
            >
              <DepoimentoImageCarousel images={item.images} />

              <div className="space-y-4">
                <blockquote className="border-l-2 border-[#8B4030]/45 pl-4">
                  <p className="text-[0.9375rem] leading-relaxed text-[#1E1A18] md:text-[1.0625rem] md:leading-[1.65]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="space-y-0.5 pl-4">
                  <p className="type-label text-[#1E1A18]">{item.name}</p>
                  <p className="type-caption font-normal text-[#1E1A18]/75">{item.context}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
