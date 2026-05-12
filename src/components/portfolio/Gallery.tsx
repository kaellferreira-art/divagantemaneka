"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type VideoMeta = {
  /** Nome de apresentação no cartão e base da capa local em `public/images/video-capas/`. */
  title: string;
  /**
   * Termos para casar com o título do vídeo no YouTube (case e acento-insensíveis).
   * Cobre tanto títulos "limpos" (`Artista - Música`) como uploads de Shorts com hashtags.
   */
  keywords: string[];
};

type ResolvedVideo = VideoMeta & {
  youtubeId: string | null;
};

const featuredVideoMeta: VideoMeta[] = [
  {
    title: "Compilado Esquina D",
    keywords: ["compilado esquina d", "compilado esquina", "esquina d", "esquinad", "esquina d."],
  },
  { title: "Compilado Estimada", keywords: ["compilado estimada", "compilado estim", "estimada"] },
  { title: "Rita Lee - Ovelha Negra", keywords: ["rita lee", "ritalee", "ovelha negra"] },
  { title: "Blitz - A Dois Passos do Paraiso", keywords: ["blitz", "dois passos", "paraiso"] },
  { title: "Cassia Eller - Palavras ao Vento", keywords: ["cassia eller", "cassiaeller", "palavras ao vento"] },
  { title: "Cidadão Quem - Dia especial", keywords: ["cidadao quem", "dia especial", "diaespecial"] },
  { title: "Fagner - Espumas ao vento", keywords: ["fagner", "espumas ao vento"] },
  { title: "Falamansa - Xote dos Milagres", keywords: ["falamansa", "xote dos milagres"] },
  {
    title: "Geraldo Azevedo - Dona da minha cabeça",
    keywords: ["geraldo azevedo", "geraldoazevedo", "dona da minha cabeca", "donadaminhacabeca"],
  },
  { title: "Kid Abelha - Casinha de Sapê", keywords: ["kid abelha", "kidabelha", "casinha de sape"] },
  {
    title: "Lulu Santos - Apenas mais uma de amor",
    keywords: ["lulu santos", "lulusantos", "apenas mais uma", "pois que seja fraqueza"],
  },
  { title: "Maskavo - Asas", keywords: ["maskavo"] },
  { title: "Nando Reis - Por onde Andei", keywords: ["nando reis", "nandoreis", "por onde andei"] },
  { title: "Rastapé - Colo de Menina", keywords: ["rastape", "colo de menina"] },
  { title: "Dazaranha - Vagabundo Confesso", keywords: ["dazaranha", "vagabundo confesso"] },
];

function foldText(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function resolveVideos(files: { id: string; name: string }[]): ResolvedVideo[] {
  const folded = files.map((f) => ({ id: f.id, fold: foldText(f.name) }));
  const taken = new Set<string>();

  return featuredVideoMeta.map((meta) => {
    const foldedKeywords = meta.keywords.map(foldText).filter(Boolean);
    let bestId: string | null = null;
    let bestScore = 0;

    for (const f of folded) {
      if (taken.has(f.id)) continue;
      let score = 0;
      for (const kw of foldedKeywords) {
        if (f.fold.includes(kw)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestId = f.id;
      }
    }

    if (bestId) taken.add(bestId);
    return { ...meta, youtubeId: bestId };
  });
}

function youtubeEmbedUrl(videoId: string, autoplay: boolean): string {
  const u = new URL(`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`);
  u.searchParams.set("rel", "0");
  u.searchParams.set("modestbranding", "1");
  u.searchParams.set("playsinline", "1");
  u.searchParams.set("iv_load_policy", "3");
  if (autoplay) u.searchParams.set("autoplay", "1");
  return u.toString();
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

/** Extensões por base: evita 404 a tentar .jpg antes de .jpeg nos “Compilado …”. */
function extensionsForCoverBase(base: string): string[] {
  if (base === "Compilado Esquina D" || base === "Compilado Estimada") {
    return ["jpeg", "jpg", "JPG", "JPEG", "png", "webp"];
  }
  return ["jpg", "jpeg", "JPG", "JPEG", "png", "webp"];
}

/** Capas em `public/images/video-capas/` com o mesmo nome base do título do vídeo. */
function coverImageCandidates(title: string): string[] {
  const bases = [title];
  if (title === "Nando Reis - Por onde Andei") bases.push("Nando Reis - Por onde Andei Final");
  const out: string[] = [];
  for (const b of bases) {
    for (const e of extensionsForCoverBase(b)) {
      out.push(`/images/video-capas/${encodeURIComponent(b)}.${e}`);
    }
  }
  return out;
}

function PosterWhileLoading({
  title,
  show,
  priority,
}: {
  title: string;
  show: boolean;
  priority?: boolean;
}) {
  const urls = useMemo(() => coverImageCandidates(title), [title]);
  const [idx, setIdx] = useState(0);

  if (!show || idx >= urls.length) return null;

  return (
    <Image
      src={urls[idx]}
      alt=""
      fill
      sizes="(max-width: 1024px) 280px, 280px"
      priority={priority}
      className="pointer-events-none absolute inset-0 z-[1] object-cover"
      onError={() => setIdx((i) => i + 1)}
      aria-hidden
    />
  );
}

function YouTubeIframe({ videoId, title }: { videoId: string; title: string }) {
  const [ready, setReady] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-black">
      <iframe
        title={title}
        src={youtubeEmbedUrl(videoId, true)}
        className={`absolute inset-0 block h-full w-full border-0 transition-opacity duration-200 ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="eager"
        onLoad={() => setReady(true)}
      />
    </div>
  );
}

function VideoCardPlayer({
  youtubeId,
  title,
  interactive,
}: {
  youtubeId: string | null;
  title: string;
  interactive: boolean;
}) {
  /** Só após clique no cartão interativo é que o iframe carrega e a capa some. */
  const [revealed, setRevealed] = useState(false);

  if (!youtubeId) {
    return (
      <div className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-2 bg-black/60 px-4 text-center">
        <p className="text-[0.72rem] leading-snug text-[#F3EDE5]/80">Vídeo ainda não encontrado na playlist do YouTube.</p>
        <p className="text-[0.65rem] leading-snug text-[#F3EDE5]/50">
          O feed público do YouTube só envia cerca de 15 vídeos; fora disso o site não os vê. Defina{" "}
          <span className="font-mono text-[#F3EDE5]/65">YOUTUBE_API_KEY</span> no servidor (lista completa) ou os pins{" "}
          <span className="font-mono text-[#F3EDE5]/65">YOUTUBE_PIN_*</span> para estes compilados.
        </p>
      </div>
    );
  }

  const loadIframe = revealed && interactive;
  const showPoster = !revealed;
  const showPlayControl = interactive && !revealed;

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[inherit] bg-[#0a0a08] shadow-[inset_0_0_0_1px_rgba(242,232,220,0.06)]">
      <PosterWhileLoading
        key={title}
        title={title}
        show={showPoster}
        priority={interactive && showPoster}
      />
      {showPlayControl ? (
        <button
          type="button"
          className="group absolute inset-0 z-[2] flex cursor-pointer items-center justify-center bg-gradient-to-b from-black/25 via-black/35 to-black/45 transition-[background-color,backdrop-filter] duration-300 hover:from-black/35 hover:via-black/45 hover:to-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EDE5]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a2920]"
          aria-label={`Assistir: ${title}`}
          onClick={() => setRevealed(true)}
        >
          <span className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[#F2E8DC]/50 bg-[#5E5D45]/90 text-[#F3EDE5] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95 md:h-16 md:w-16">
            <PlayIcon className="ml-0.5 h-7 w-7 md:h-8 md:w-8" />
          </span>
        </button>
      ) : null}
      {loadIframe ? <YouTubeIframe key={youtubeId} videoId={youtubeId} title={title} /> : null}
    </div>
  );
}

function useItemsPerPage(): number {
  const [n, setN] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setN(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return n;
}

type GalleryFetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; videos: ResolvedVideo[] };

export function Gallery() {
  const itemsPerPage = useItemsPerPage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fetchState, setFetchState] = useState<GalleryFetchState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/youtube-gallery", { cache: "no-store" });
        const data: unknown = await res.json();

        if (cancelled) return;

        if (!res.ok) {
          const msg =
            typeof data === "object" && data !== null && "error" in data
              ? String((data as { error: string }).error)
              : "Não foi possível carregar a lista de vídeos do YouTube.";
          setFetchState({ status: "error", message: msg });
          return;
        }

        if (
          typeof data !== "object" ||
          data === null ||
          !("files" in data) ||
          !Array.isArray((data as { files: unknown }).files)
        ) {
          setFetchState({ status: "error", message: "Resposta inválida do servidor ao listar vídeos." });
          return;
        }

        const files = (data as { files: { id: string; name: string }[] }).files;
        setFetchState({ status: "ready", videos: resolveVideos(files) });
      } catch {
        if (!cancelled) {
          setFetchState({ status: "error", message: "Erro de rede ao carregar os vídeos. Tente novamente mais tarde." });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const videos = fetchState.status === "ready" ? fetchState.videos : null;
  const len = videos?.length ?? featuredVideoMeta.length;

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + len) % len), [len]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % len), [len]);

  const desktopSlides = useMemo(() => {
    if (!videos?.length) return null;
    const list = videos;
    const at = (offset: number) => list[(activeIndex + offset + len) % len];
    return [at(-1), at(0), at(1)] as const;
  }, [videos, activeIndex, len]);

  const mobileSlide = videos ? videos[activeIndex] : null;
  const isDesktop = itemsPerPage === 3;

  return (
    <section
      id="obras"
      className="section-shell rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_15%,rgba(151,147,117,0.92),rgba(132,130,101,0.97)_58%,rgba(119,119,91,1)_100%)] py-16 md:py-20"
    >
      <div className="mb-9 text-center md:mb-12">
        <h2 className="font-serif text-[2rem] leading-tight text-[#F3EDE5] sm:text-[2.5rem]">Registros ao vivo</h2>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {fetchState.status === "loading" ? (
          <div className="mx-auto flex min-h-[22rem] max-w-md flex-col items-center justify-center gap-3 px-6 text-center md:min-h-[38rem]">
            <p className="text-sm text-[#F3EDE5]/85">Carregando vídeos…</p>
          </div>
        ) : fetchState.status === "error" ? (
          <div className="mx-auto flex min-h-[22rem] max-w-lg flex-col items-center justify-center gap-3 px-6 text-center md:min-h-[38rem]">
            <p className="text-sm leading-relaxed text-[#F3EDE5]/90">{fetchState.message}</p>
          </div>
        ) : (
          <>
            <button
              type="button"
              aria-label="Vídeos anteriores"
              onClick={prev}
              className="absolute left-1 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/35 bg-[#6E6B4F]/70 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#6E6B4F]/90 md:left-6 md:h-11 md:w-11"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Próximos vídeos"
              onClick={next}
              className="absolute right-1 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#F2E8DC]/35 bg-[#6E6B4F]/70 text-xl text-[#F2E8DC] backdrop-blur-sm transition-colors hover:bg-[#6E6B4F]/90 md:right-6 md:h-11 md:w-11"
            >
              ›
            </button>

            {isDesktop && desktopSlides ? (
              <div className="relative mx-auto h-[38rem] w-full max-w-4xl overflow-hidden">
                {desktopSlides.map((video, idx) => {
                  const isCenter = idx === 1;
                  const side = idx === 0 ? "left" : idx === 2 ? "right" : "center";
                  return (
                    <article
                      key={`${video.title}-${side}`}
                      className={`absolute top-1/2 w-[17.5rem] -translate-y-1/2 rounded-[1.65rem] border border-[#F2E8DC]/20 bg-[#5E5D45]/88 p-4 transition-all duration-500 ease-out ${
                        isCenter
                          ? "left-1/2 z-20 -translate-x-1/2 scale-[1.02] shadow-[0_34px_68px_-24px_rgba(0,0,0,0.92)]"
                          : side === "left"
                            ? "left-1/2 z-10 -translate-x-[98%] scale-[0.8] opacity-28 blur-[1.8px]"
                            : "left-1/2 z-10 -translate-x-[2%] scale-[0.8] opacity-28 blur-[1.8px]"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <p className="min-w-0 text-[0.76rem] font-semibold leading-snug tracking-[0.05em] text-[#F3EDE5]/90 line-clamp-2">
                          {video.title}
                        </p>
                        <span className="shrink-0 text-[0.66rem] uppercase tracking-[0.12em] text-[#F3EDE5]/55">Ao vivo</span>
                      </div>
                      <div className="overflow-hidden rounded-[1.15rem] bg-[#000000]/35">
                        <VideoCardPlayer youtubeId={video.youtubeId} title={video.title} interactive={isCenter} />
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : mobileSlide ? (
              <div className="mx-auto max-w-[19.5rem] px-11">
                <article
                  key={mobileSlide.title}
                  className="rounded-[1.5rem] border border-[#F2E8DC]/20 bg-[#5E5D45]/88 p-6 transition-all duration-500"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <p className="min-w-0 text-[0.78rem] font-medium leading-snug tracking-[0.06em] text-[#F3EDE5]/90 line-clamp-3">
                      {mobileSlide.title}
                    </p>
                    <span className="shrink-0 text-[0.74rem] uppercase tracking-[0.12em] text-[#F3EDE5]/55">Ao vivo</span>
                  </div>

                  <div className="overflow-hidden rounded-2xl bg-[#000000]/35">
                    <VideoCardPlayer youtubeId={mobileSlide.youtubeId} title={mobileSlide.title} interactive />
                  </div>
                </article>
              </div>
            ) : null}

            <div className="mt-7 flex justify-center gap-2">
              {fetchState.status === "ready" &&
                fetchState.videos.map((video, idx) => (
                  <button
                    key={video.title}
                    type="button"
                    aria-label={`Ir para o vídeo ${idx + 1}`}
                    aria-current={idx === activeIndex}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "w-7 bg-[#F3EDE5]" : "w-2 bg-[#F3EDE5]/35 hover:bg-[#F3EDE5]/60"
                    }`}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
