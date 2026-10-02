"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const REPERTORIOS_IMAGES = [
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

export function RepertoriosImageCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const len = REPERTORIOS_IMAGES.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, 5500);
    return () => window.clearInterval(id);
  }, [next, paused]);

  return (
    <div
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-[#d8c7b7] shadow-[0_30px_70px_-50px_rgba(30,26,24,0.55)]"
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
      {REPERTORIOS_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 900px, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.012] group-hover:brightness-[0.98]"
          />
        </div>
      ))}

      <button
        type="button"
        aria-label="Foto anterior"
        onClick={prev}
        className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:left-4"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Próxima foto"
        onClick={next}
        className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:right-4"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5 px-4 sm:bottom-4 sm:gap-2">
        {REPERTORIOS_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para a foto ${i + 1} de ${len}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-[#F2E8DC] sm:w-7" : "w-2 bg-[#F2E8DC]/45 hover:bg-[#F2E8DC]/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
