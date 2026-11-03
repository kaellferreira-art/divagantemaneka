"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

const HERO_VIDEO_ID = "AbyqIjfsfto";
const HERO_POSTER = {
  src: "/images/MCF-0512.JPG",
  alt: "Kaell Ferreira — apresentação ao vivo",
} as const;

function watchEmbedUrl(videoId: string) {
  const u = new URL(`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`);
  u.searchParams.set("autoplay", "1");
  u.searchParams.set("rel", "0");
  u.searchParams.set("modestbranding", "1");
  u.searchParams.set("playsinline", "1");
  u.searchParams.set("iv_load_policy", "3");
  return u.toString();
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function HeroYouTubePlayer({ videoId, title }: { videoId: string; title: string }) {
  const [ready, setReady] = useState(false);

  return (
    <div className="absolute inset-0 z-40 overflow-hidden rounded-[inherit] bg-black">
      <iframe
        title={title}
        src={watchEmbedUrl(videoId)}
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

export function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  const openVideo = useCallback(() => setPlaying(true), []);

  return (
    <div className="media-frame-hero group relative mx-auto overflow-hidden bg-black shadow-[0_28px_60px_-28px_rgba(0,0,0,0.85)] ring-1 ring-[var(--cream)]/15">
      {!playing ? (
        <>
          <Image
            src={HERO_POSTER.src}
            alt={HERO_POSTER.alt}
            fill
            priority
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover object-[50%_28%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          <button
            type="button"
            aria-label="Assistir vídeo"
            onClick={openVideo}
            className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/15 transition-[background-color] duration-300 hover:bg-black/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--highlight)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[var(--highlight)]/55 bg-black/55 text-[var(--cream)] shadow-[0_0_28px_-4px_rgba(212,160,74,0.55)] backdrop-blur-md transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95 md:h-16 md:w-16">
              <PlayIcon className="ml-0.5 h-7 w-7 md:h-8 md:w-8" />
            </span>
          </button>
        </>
      ) : (
        <HeroYouTubePlayer
          key={HERO_VIDEO_ID}
          videoId={HERO_VIDEO_ID}
          title="Kaell Ferreira — apresentação ao vivo"
        />
      )}
    </div>
  );
}
