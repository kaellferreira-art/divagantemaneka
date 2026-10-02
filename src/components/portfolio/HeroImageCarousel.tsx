"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const HERO_IMAGES = [
  { src: "/images/Foto 1.jpg", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 2.jpg", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 3.JPG", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 5.jpg", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 6.JPG", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 7.JPG", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 8.JPG", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 9.JPG", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 10.JPG", alt: "Kaell Ferreira — apresentação ao vivo" },
  { src: "/images/Foto 11.JPG", alt: "Kaell Ferreira — apresentação ao vivo" },
] as const;

export function HeroImageCarousel() {
  const [images, setImages] = useState(() => [...HERO_IMAGES]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const len = images.length;

  const next = useCallback(() => {
    if (len < 1) return;
    setIndex((i) => (i + 1) % len);
  }, [len]);
  const prev = useCallback(() => {
    if (len < 1) return;
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  useEffect(() => {
    if (paused || len < 2) return;
    const id = window.setInterval(next, 6500);
    return () => window.clearInterval(id);
  }, [next, paused, len]);

  useEffect(() => {
    if (len === 0) return;
    if (index >= len) setIndex(0);
  }, [index, len]);

  const removeBroken = useCallback((src: string) => {
    setImages((prev) => prev.filter((img) => img.src !== src));
  }, []);

  if (len === 0) {
    return (
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[21rem] overflow-hidden rounded-[2.1rem] bg-[#d8c7b7] sm:max-w-[23rem] md:max-w-[24rem] lg:max-w-[26rem]" />
    );
  }

  return (
    <div
      className="group relative mx-auto aspect-[9/16] w-full max-w-[21rem] overflow-hidden rounded-[2.1rem] bg-[#d8c7b7] shadow-[0_35px_65px_-45px_rgba(30,26,24,0.55)] sm:max-w-[23rem] md:max-w-[24rem] lg:max-w-[26rem]"
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
      {images.map((img, i) => (
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
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-[0.98]"
            onError={() => removeBroken(img.src)}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-[#1E1A18]/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[#1E1A18]/35 to-transparent" />

      <button
        type="button"
        aria-label="Foto anterior"
        onClick={prev}
        className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:left-4 md:h-11 md:w-11"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Próxima foto"
        onClick={next}
        className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:right-4 md:h-11 md:w-11"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 px-4">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para a foto ${i + 1} de ${len}`}
            aria-current={i === index ? true : undefined}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-[#F2E8DC]" : "w-2 bg-[#F2E8DC]/45 hover:bg-[#F2E8DC]/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
