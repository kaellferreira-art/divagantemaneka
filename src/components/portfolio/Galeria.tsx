"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const LANDSCAPE = [
  { src: "/images/MCF-0287.JPG", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/MCF-0340.JPG", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/MCF-0328.JPG", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/MCF-0561.JPG", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/florecer-80.jpg", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/florecer-66.jpg", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/florecer-51.jpg", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/florecer-107.jpg", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/florecer-116.jpg", alt: "Kaell Ferreira em apresentação ao vivo" },
  { src: "/images/florecer-106.jpg", alt: "Kaell Ferreira em apresentação ao vivo" },
] as const;

const MOBILE_GRID = LANDSCAPE.slice(0, 4);

export function Galeria() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const len = LANDSCAPE.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);

  const current = LANDSCAPE[index];

  return (
    <section id="galeria" className="section-band-warm section-open">
      <div className="section-shell space-y-6 md:space-y-8">
        <h2 className="type-title text-[var(--foreground)]">Galeria</h2>

        {/* Mobile: grade estática */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:hidden">
          {MOBILE_GRID.map((img, i) => (
            <div key={img.src} className="relative aspect-video overflow-hidden bg-[#c5d0ca]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="45vw"
                className="object-cover object-center"
                priority={i < 2}
              />
            </div>
          ))}
        </div>

        {/* Desktop: carrossel */}
        <div className="hidden space-y-6 md:block">
          <div className="flex items-end justify-end">
            <p className="type-caption font-semibold text-[var(--foreground)]/55">
              {index + 1} / {len}
            </p>
          </div>

          <div
            className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden bg-[#c5d0ca]"
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
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 896px) 56rem, 92vw"
              className="object-cover object-center"
              priority={index === 0}
            />

            <button
              type="button"
              aria-label="Foto anterior"
              onClick={prev}
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[var(--cream)]/40 bg-[var(--foreground)]/45 text-lg text-[var(--cream)] backdrop-blur-sm transition-colors hover:bg-[var(--foreground)]/65"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Próxima foto"
              onClick={next}
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[var(--cream)]/40 bg-[var(--foreground)]/45 text-lg text-[var(--cream)] backdrop-blur-sm transition-colors hover:bg-[var(--foreground)]/65"
            >
              ›
            </button>
          </div>

          <div className="carousel-dots static max-w-full overflow-x-auto px-1">
            {LANDSCAPE.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Ir para a foto ${i + 1} de ${len}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`carousel-dot shrink-0 ${
                  i === index
                    ? "bg-[var(--highlight)]"
                    : "bg-[var(--foreground)]/25 hover:bg-[var(--foreground)]/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
