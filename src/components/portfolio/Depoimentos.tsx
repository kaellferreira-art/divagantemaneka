"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const GOOGLE_MAPS_REVIEWS_URL =
  "https://www.google.com/maps/place/Kaell+Ferreira+M%C3%BAsica+ao+Vivo/@-27.5820945,-48.5887708,17z/data=!3m1!4b1!4m6!3m5!1s0x952749bb41531a91:0xca755d530aff68b5!8m2!3d-27.5820945!4d-48.5887708!16s%2Fg%2F11p1cx0v11";

const DEPOIMENTOS = [
  {
    quote:
      "Super recomendo o trabalho do Kaell, som de muita qualidade, e repertório bem diversificado. Tocou no nosso chá de bebê no dia 25/10/2026, e os convidados elogiaram bastante. Antes da apresentação, me perguntou qual de seus repertórios eu tinha mais interesse. Se colocou a disposição para entender a logística, o clima do evento, assim como as possibilidades do ambiente.\n\nJá conheço o trabalho dele a alguns anos e mais uma vez fiquei muito feliz com o que foi entregue.",
    name: "Matheus Odilon de Jesus",
    context: "Chá de bebê — Florianópolis",
    images: [
      {
        src: "/images/Chá de bebê.webp",
        alt: "Kaell Ferreira tocando no chá de bebê de Matheus Odilon de Jesus",
        objectPosition: "50% 18%",
      },
    ],
  },
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
  {
    quote:
      "Excelente profissional, sempre comprometido com o estabelecimento e com os clientes, o Pub Praia do Sonho agradece seu comprometimento.",
    name: "Daniel Baldo Claramax",
    context: "Responsável · Praia do Sonho Pub — Praia do Sonho",
    images: [],
    video: "/images/Daniel Baldo.mp4",
  },
  {
    quote:
      "Recentemente contratei o Kaell para tocar na minha festa de aniversário. Além de muito atencioso, cuidadoso com os convidados e fez um som da hora. Uma vibe incrivel. Super recomendo.",
    name: "Roberto Silvestre",
    context: "Aniversário — Florianópolis",
    images: [],
    video: "/images/Roberto Silvestre.mp4",
  },
  {
    quote:
      "Foi excelente! Trabalho, dedicação, atenção, alta qualidade em inúmeros pontos. Super recomendo, já me atendeu em vários eventos.",
    name: "Charles Sobrosa",
    context: "Eventos diversos — Florianópolis",
    images: [],
    video: "/images/Charles Sobrosa.mp4",
  },
  {
    quote:
      "Tive a oportunidade de ouvir o Kaell em algumas apresentações e me conectei muito com o repertório musical! Amo \"Brasilidades\", que valoriza toda a riqueza cultural do nosso país. Admiro a leveza com que expressa sua arte e a forma como interage com o público, sempre genuína e atenciosa.\n\nTambém ouvi as músicas autorais e me encantei pelas temáticas que atravessam as letras, conduzido por uma melodia suave e cativante!",
    name: "Mairla Costa",
    context: "Bares e Restaurantes — Florianópolis",
    images: [],
    video: "/images/Mairla Costa.mp4",
  },
  {
    quote:
      "Kaell se apresentou no nosso chá de bebê e foi total sucesso. Todos amaram o repertório! Profissional sério e comprometido com os horários estipulados. Obrigada Kaell!",
    name: "Natybas",
    context: "Chá de Bebê — Florianópolis",
    images: [],
    video: "/images/Natybas.mp4",
  },
  {
    quote:
      "Já fui a diversos shows do Kaell, o cara é uma simpatia em pessoa, toca muito, sempre com ótimos equipamentos e uma qualidade de som diferenciada! Recomendo muito!",
    name: "Mateus Vieira",
    context: "Bares e Restaurantes — Florianópolis",
    images: [],
    video: "/images/Vieira.mp4",
  },
  {
    quote:
      "Um artista completo: talentoso, carismático e com um repertório eclético e muito bem produzido. É sempre um prazer apreciar o trabalho do Kaell",
    name: "Entre Sonhos Produções",
    context: "Eventos diversos — Florianópolis",
    images: [],
    video: "/images/Entre Sonho Produções.mp4",
  },
  {
    quote: "Pontual com repercussão ótima. Sempre que precisaremos iremos chamá-lo",
    name: "Kimberly Hoffmeister",
    context: "Aniversário — Florianópolis",
    images: [],
    video: "/images/Kimberly.mp4",
  },
  {
    quote:
      "Constantemente sou chamado para tocar com outros músicos, porém preciso dizer que tocar com ele é diferente. O Kaell tem um capricho, uma organização e vontade de tornar o show um momento único que é invejável.\nAlém de ser um ótimo músico é um cara muito gente boa, good vibe, que faz torna qualquer evento ainda mais especial, despertando muitos sorrisos dos que estão presentes. Tem equipamentos de qualidade (sempre instrumentos e som top). Como músico que o acompanha em muitos shows, eu posso dizer que VALE A PENA! Música boa e alegria garantidas!",
    name: "Will Guimarães",
    context: "Músico — Florianópolis",
    images: [],
    video: "/images/Will Guimarães.mp4",
  },
  {
    quote:
      "Kaell já abrilhantou algumas festas da minha família e grupo de amigos!\nMúsico excelente, com um ótimo repertório!\nMuito bom profissional!",
    name: "Sandra Andreia Vieira Cardoso",
    context: "Aniversário — Florianópolis",
    images: [],
  },
] as const;

type DepoimentoImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

function mediaSrc(path: string) {
  const parts = path.split("/");
  const file = parts.pop() ?? path;
  return [...parts, encodeURIComponent(file)].join("/");
}

function DepoimentoVideo({
  src,
  title,
  active,
  onPlayingChange,
}: {
  src: string;
  title: string;
  active: boolean;
  onPlayingChange?: (playing: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!active) {
      el.pause();
      onPlayingChange?.(false);
    }
  }, [active, onPlayingChange]);

  return (
    <div
      className="depoimento-video-frame relative mx-auto overflow-hidden rounded-[1.35rem] bg-[#1E1A18] shadow-[0_20px_50px_-40px_rgba(30,26,24,0.5)] md:mx-0 md:rounded-[1.5rem]"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        controls
        playsInline
        preload="metadata"
        title={title}
        onPlay={() => onPlayingChange?.(true)}
        onPause={() => onPlayingChange?.(false)}
        onEnded={() => onPlayingChange?.(false)}
      >
        <source src={mediaSrc(src)} type="video/mp4" />
      </video>
    </div>
  );
}

function DepoimentoImageCarousel({
  images,
  active,
}: {
  images: readonly DepoimentoImage[];
  active: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const len = images.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (!active || paused || len < 2) return;
    const id = window.setInterval(next, 5000);
    return () => window.clearInterval(id);
  }, [active, next, paused, len]);

  return (
    <div
      className="group relative aspect-[3/2] w-full overflow-hidden rounded-[1.15rem] bg-[#d8c7b7] shadow-[0_20px_50px_-40px_rgba(30,26,24,0.5)] md:rounded-[1.25rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        e.stopPropagation();
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        if (touchStartX.current == null || len < 2) return;
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
            sizes="(min-width: 768px) 40vw, 92vw"
            quality={85}
            priority={active && i === 0}
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
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-lg text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:left-3"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/40 bg-[#1E1A18]/45 text-lg text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#1E1A18]/65 md:right-3"
          >
            ›
          </button>

          <div className="carousel-dots absolute bottom-3 left-0 right-0 z-30">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para a foto ${i + 1} de ${len}`}
                aria-current={i === index}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`carousel-dot ${
                  i === index ? "bg-[#F2E8DC]" : "bg-[#F2E8DC]/45 hover:bg-[#F2E8DC]/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function GoogleReviewsLink() {
  return (
    <a
      href={GOOGLE_MAPS_REVIEWS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Ver avaliações 5 estrelas no Google Meu Negócio"
      className="group relative flex w-full min-h-12 items-center gap-3 overflow-hidden border border-[var(--line)] bg-[var(--cream)] px-3 py-2.5 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--highlight)]/45 active:translate-y-0 sm:w-auto sm:max-w-md sm:gap-4 sm:px-5 sm:py-3.5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--highlight)] via-[var(--highlight-strong)] to-[var(--highlight)] opacity-90"
      />

      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-[inset_0_0_0_1px_rgba(30,26,24,0.08)] sm:h-12 sm:w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-6 w-6 sm:h-[1.85rem] sm:w-[1.85rem]"
          aria-hidden="true"
        >
          <path
            fill="#FFC107"
            d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7 12.9 19.6C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.1H42V20H24v8h11.3c-1.1 3.1-3.5 5.5-6.5 6.9l.1.1 6.2 5.2C36.8 41.4 44 36 44 24c0-1.3-.1-2.6-.4-3.9z"
          />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-fraunces)] text-base font-bold leading-none text-[var(--foreground)] sm:text-xl">
            5,0
          </span>
          <span className="flex items-center gap-0.5 text-[var(--highlight)]" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="text-[0.95rem] leading-none sm:text-[1.15rem]">
                ★
              </span>
            ))}
          </span>
        </span>
        <span         className="mt-0.5 block text-[0.78rem] font-semibold leading-snug text-[var(--foreground)] sm:mt-1 sm:text-sm">
          Ver avaliações no Google
        </span>
      </span>

      <span
        aria-hidden="true"
        className="shrink-0 pr-0.5 text-lg text-[var(--highlight-strong)] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
      >
        ›
      </span>
    </a>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--cream)] text-xl text-[var(--foreground)] transition-colors hover:border-[var(--highlight)]/50 hover:text-[var(--highlight-strong)] md:h-12 md:w-12"
    >
      {children}
    </button>
  );
}

function DepoimentoCopy({
  name,
  context,
  quote,
}: {
  name: string;
  context: string;
  quote: string;
}) {
  return (
    <div className="flex flex-col space-y-3 md:min-h-[14rem] md:justify-center md:space-y-4">
      <div className="space-y-0.5">
        <p className="type-label text-[var(--foreground)]">{name}</p>
        <p className="type-caption font-normal text-[var(--foreground)]/75">{context}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-0.5 text-[var(--highlight)]" aria-label="5 de 5 estrelas">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} aria-hidden="true" className="text-[1rem] leading-none sm:text-[1.15rem]">
              ★
            </span>
          ))}
        </span>
        <span className="type-caption font-normal text-[var(--foreground)]/65">5,0</span>
      </div>
      <blockquote className="border-l-2 border-[var(--highlight)]/55 pl-3 md:pl-4">
        <p className="whitespace-pre-line text-[0.875rem] leading-relaxed text-[var(--foreground)] sm:text-[0.9375rem] md:text-[1.0625rem] md:leading-[1.65]">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
    </div>
  );
}

function DepoimentoCard({
  item,
  active,
}: {
  item: (typeof DEPOIMENTOS)[number];
  active: boolean;
}) {
  const hasVideo = "video" in item && Boolean(item.video);
  const hasImages = item.images.length > 0;

  return (
    <div
      className={`grid gap-4 sm:gap-5 md:gap-10 ${
        hasVideo
          ? "md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-center"
          : hasImages
            ? "md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-start"
            : "md:grid-cols-1 md:max-w-3xl"
      }`}
    >
      <div className="order-1 md:order-2">
        <DepoimentoCopy name={item.name} context={item.context} quote={item.quote} />
      </div>

      {hasVideo ? (
        <div className="order-2 md:order-1">
          <DepoimentoVideo src={item.video!} title={`Depoimento de ${item.name}`} active={active} />
        </div>
      ) : hasImages ? (
        <div className="order-2 md:order-1">
          <DepoimentoImageCarousel images={item.images} active={active} />
        </div>
      ) : null}
    </div>
  );
}

export function Depoimentos() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchMoved = useRef(false);
  const len = DEPOIMENTOS.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);

  const item = DEPOIMENTOS[index];
  const featured = DEPOIMENTOS[0];
  const hasVideo = "video" in item && Boolean(item.video);

  return (
    <section id="depoimentos" className="section-band-warm section-open">
      <div className="section-shell space-y-6 md:space-y-10">
        <div className="flex flex-col gap-3.5 sm:gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
          <h2 className="type-title text-center text-[var(--foreground)] md:text-left">
            Depoimentos
          </h2>
          <GoogleReviewsLink />
        </div>

        {/* Mobile: 1 destaque + Google (já no topo) */}
        <div className="md:hidden">
          <DepoimentoCard item={featured} active />
        </div>

        {/* Desktop: carrossel completo */}
        <div
          className="hidden space-y-8 md:block"
          onTouchStart={(e) => {
            if (hasVideo) return;
            touchStartX.current = e.touches[0]?.clientX ?? null;
            touchMoved.current = false;
          }}
          onTouchMove={(e) => {
            if (hasVideo || touchStartX.current == null) return;
            const x = e.touches[0]?.clientX ?? touchStartX.current;
            if (Math.abs(x - touchStartX.current) > 14) touchMoved.current = true;
          }}
          onTouchEnd={(e) => {
            if (hasVideo || touchStartX.current == null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
            const dx = endX - touchStartX.current;
            touchStartX.current = null;
            if (!touchMoved.current) return;
            if (dx > 56) prev();
            else if (dx < -56) next();
          }}
        >
          <div key={`${item.name}-${item.context}`} className="animate-[depoimentoFade_520ms_ease-out]">
            <DepoimentoCard item={item} active />
          </div>

          <div className="flex items-center justify-center gap-5">
            <NavButton label="Depoimento anterior" onClick={prev}>
              ‹
            </NavButton>

            <div className="flex min-w-0 flex-col items-center gap-1.5">
              <p className="type-caption font-semibold text-[var(--foreground)]/70">
                {index + 1} / {len}
              </p>
              <div className="depoimento-dots-scroll carousel-dots static max-w-full overflow-x-auto px-1">
                {DEPOIMENTOS.map((d, i) => (
                  <button
                    key={`${d.name}-${d.context}`}
                    type="button"
                    aria-label={`Ir para o depoimento ${i + 1} de ${len}`}
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

            <NavButton label="Próximo depoimento" onClick={next}>
              ›
            </NavButton>
          </div>
        </div>
      </div>
    </section>
  );
}
