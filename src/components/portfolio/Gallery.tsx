"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type VideoMeta = {
  file: string;
  title: string;
};

type ResolvedVideo = VideoMeta & {
  driveId: string | null;
};

const featuredVideoMeta: VideoMeta[] = [
  { file: "Compilado Esquina D.mp4", title: "Compilado Esquina D" },
  { file: "Compilado Estimada.mp4", title: "Compilado Estimada" },
  { file: "Rita Lee - Ovelha Negra.mp4", title: "Rita Lee - Ovelha Negra" },
  { file: "Blitz - A Dois Passos do Paraiso.mp4", title: "Blitz - A Dois Passos do Paraiso" },
  { file: "Cassia Eller - Palavras ao Vento.mp4", title: "Cassia Eller - Palavras ao Vento" },
  { file: "Cidadão Quem - Dia especial.mp4", title: "Cidadão Quem - Dia especial" },
  { file: "Fagner - Espumas ao vento.mp4", title: "Fagner - Espumas ao vento" },
  { file: "Falamansa - Xote dos Milagres.mp4", title: "Falamansa - Xote dos Milagres" },
  { file: "Geraldo Azevedo - Dona da minha cabeça.mp4", title: "Geraldo Azevedo - Dona da minha cabeça" },
  { file: "Kid Abelha - Casinha de Sapê.mp4", title: "Kid Abelha - Casinha de Sapê" },
  { file: "Lulu Santos - Apenas mais uma de amor.mp4", title: "Lulu Santos - Apenas mais uma de amor" },
  { file: "Maskavo - Asas.mp4", title: "Maskavo - Asas" },
  { file: "Nando Reis - Por onde Andei.mp4", title: "Nando Reis - Por onde Andei" },
  { file: "Rastapé - Colo de Menina.mp4", title: "Rastapé - Colo de Menina" },
  { file: "Dazaranha - Vagabundo Confesso.mp4", title: "Dazaranha - Vagabundo Confesso" },
];

function normalizeFileName(name: string): string {
  return name.normalize("NFC").trim();
}

function buildDriveNameToIdMap(driveFiles: { id: string; name: string }[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const f of driveFiles) {
    const nfc = normalizeFileName(f.name);
    const nfd = f.name.normalize("NFD").trim();
    map.set(nfc, f.id);
    if (nfd !== nfc) {
      map.set(nfd, f.id);
    }
  }
  return map;
}

function resolveVideos(driveFiles: { id: string; name: string }[]): ResolvedVideo[] {
  const byName = buildDriveNameToIdMap(driveFiles);
  return featuredVideoMeta.map((meta) => {
    const nfc = normalizeFileName(meta.file);
    const nfd = meta.file.normalize("NFD").trim();
    const driveId = byName.get(nfc) ?? byName.get(nfd) ?? null;
    return { ...meta, driveId };
  });
}

function drivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/** Viewport lógico do iframe (16:9 interno do Drive); o cartão é 9:16 (1080×1920) para telemóvel. */
const DRIVE_EMBED_W = 640;
const DRIVE_EMBED_H = 360;
/** >1 amplia e recorta a UI do preview para preencher o retângulo 9:16. */
const DRIVE_EXTRA_ZOOM = 1.34;

/** Capas em `public/images/video-capas/` com o mesmo nome base do .mp4 (várias extensões). */
function coverImageCandidates(videoFile: string): string[] {
  const base = videoFile.replace(/\.mp4$/i, "");
  const bases = [base];
  if (base === "Nando Reis - Por onde Andei") bases.push("Nando Reis - Por onde Andei Final");
  const exts = ["jpg", "jpeg", "JPG", "JPEG", "png", "webp"];
  const out: string[] = [];
  for (const b of bases) {
    for (const e of exts) {
      out.push(`/images/video-capas/${encodeURIComponent(b)}.${e}`);
    }
  }
  return out;
}

function DrivePosterWhileLoading({ videoFile, show }: { videoFile: string; show: boolean }) {
  const urls = useMemo(() => coverImageCandidates(videoFile), [videoFile]);
  const [idx, setIdx] = useState(0);

  if (!show || idx >= urls.length) return null;

  return (
    <Image
      src={urls[idx]}
      alt=""
      fill
      sizes="280px"
      className="absolute inset-0 z-[1] object-cover"
      onError={() => setIdx((i) => i + 1)}
      aria-hidden
    />
  );
}

function DriveVideoFrame({
  driveId,
  videoFile,
  title,
  interactive,
}: {
  driveId: string | null;
  videoFile: string;
  title: string;
  interactive: boolean;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.45);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const update = () => {
      const cw = shell.clientWidth;
      const ch = shell.clientHeight;
      if (cw < 2 || ch < 2) return;
      const cover = Math.max(cw / DRIVE_EMBED_W, ch / DRIVE_EMBED_H);
      const s = Math.min(Math.max(cover * DRIVE_EXTRA_ZOOM, 1.22), 3.4);
      setScale(s);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(shell);
    return () => ro.disconnect();
  }, []);

  if (!driveId) {
    return (
      <div className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-2 bg-black/60 px-4 text-center">
        <p className="text-[0.72rem] leading-snug text-[#F3EDE5]/80">Arquivo não encontrado na pasta do Drive.</p>
        <p className="text-[0.65rem] text-[#F3EDE5]/50">Confira se o nome do arquivo no Drive coincide com a lista do site.</p>
      </div>
    );
  }

  return (
    <div ref={shellRef} className="relative aspect-[9/16] w-full overflow-hidden bg-black">
      <DrivePosterWhileLoading key={videoFile} videoFile={videoFile} show={Boolean(driveId) && !iframeLoaded} />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="relative shrink-0"
          style={{
            width: DRIVE_EMBED_W,
            height: DRIVE_EMBED_H,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <iframe
            title={title}
            src={drivePreviewUrl(driveId)}
            className="absolute inset-0 block h-full w-full border-0"
            width={DRIVE_EMBED_W}
            height={DRIVE_EMBED_H}
            allow="autoplay; encrypted-media; fullscreen"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            style={{ pointerEvents: interactive ? "auto" : "none" }}
          />
        </div>
      </div>
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
        const res = await fetch("/api/drive-gallery");
        const data: unknown = await res.json();

        if (cancelled) return;

        if (!res.ok) {
          const msg =
            typeof data === "object" && data !== null && "error" in data
              ? String((data as { error: string }).error)
              : "Não foi possível carregar a lista de vídeos do Google Drive.";
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
                      key={`${video.file}-${side}`}
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
                        <DriveVideoFrame driveId={video.driveId} videoFile={video.file} title={video.title} interactive={isCenter} />
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : mobileSlide ? (
              <div className="mx-auto max-w-[19.5rem] px-11">
                <article
                  key={mobileSlide.file}
                  className="rounded-[1.5rem] border border-[#F2E8DC]/20 bg-[#5E5D45]/88 p-6 transition-all duration-500"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <p className="min-w-0 text-[0.78rem] font-medium leading-snug tracking-[0.06em] text-[#F3EDE5]/90 line-clamp-3">
                      {mobileSlide.title}
                    </p>
                    <span className="shrink-0 text-[0.74rem] uppercase tracking-[0.12em] text-[#F3EDE5]/55">Ao vivo</span>
                  </div>

                  <div className="overflow-hidden rounded-2xl bg-[#000000]/35">
                    <DriveVideoFrame driveId={mobileSlide.driveId} videoFile={mobileSlide.file} title={mobileSlide.title} interactive />
                  </div>
                </article>
              </div>
            ) : null}

            <div className="mt-7 flex justify-center gap-2">
              {fetchState.status === "ready" &&
                fetchState.videos.map((video, idx) => (
                  <button
                    key={video.file}
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
