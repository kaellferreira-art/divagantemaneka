import Image from "next/image";

import { HeroVideo } from "./HeroVideo";
import { WHATSAPP_URL } from "@/lib/contact";

const HERO_BG = {
  src: `/images/${encodeURIComponent("Dobra 3.JPG")}`,
  alt: "",
} as const;

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-28">
      <Image
        src={HERO_BG.src}
        alt={HERO_BG.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_48%] scale-110 blur-[3px] brightness-[0.65] md:blur-0 md:brightness-100"
        aria-hidden
      />

      {/* Mobile: fundo vira textura/noite — prioriza a capa do vídeo */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 80% 20%, rgba(212, 160, 74, 0.16), transparent 55%),
            linear-gradient(180deg, rgba(8, 12, 11, 0.82) 0%, rgba(10, 16, 14, 0.9) 50%, rgba(8, 12, 11, 0.94) 100%)
          `,
        }}
      />

      {/* Desktop: Dobra 3 mais legível (lugar) + facho de palco */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 85% 15%, rgba(212, 160, 74, 0.2), transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(14, 107, 99, 0.14), transparent 50%),
            linear-gradient(90deg, rgba(8, 12, 11, 0.78) 0%, rgba(8, 12, 11, 0.55) 42%, rgba(8, 12, 11, 0.62) 100%),
            linear-gradient(180deg, rgba(8, 12, 11, 0.45) 0%, rgba(10, 16, 14, 0.55) 100%)
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay md:opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-shell relative z-10 grid gap-8 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-14">
        <div className="order-2 space-y-5 text-center md:order-1 md:space-y-7 md:text-left">
          <div className="space-y-3 md:space-y-4">
            <p className="type-display mx-auto max-w-[14ch] text-[var(--cream)] md:mx-0">
              Kaell Ferreira
            </p>
            <h1 className="type-lead mx-auto max-w-xl text-[var(--cream)]/95 md:mx-0">
              Música ao vivo para restaurantes, bares e eventos em Florianópolis.
            </h1>
          </div>

          <p className="type-body mx-auto max-w-xl text-[var(--cream)]/85 md:mx-0">
            Mais de 600 apresentações em 6 anos atuando na Grande Florianópolis — solo, duo ou banda,
            com repertório direcionado e sonorização inclusa.
          </p>

          <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mx-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-cta-primary w-full sm:w-fit"
            >
              Pedir orçamento
            </a>
            <a href="#ao-vivo" className="btn-cta btn-cta-on-stage w-full sm:w-fit">
              Ouvir ao vivo
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
