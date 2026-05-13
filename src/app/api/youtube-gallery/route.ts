import { NextResponse } from "next/server";

import { fetchPlaylistViaPlaylistPage } from "@/lib/youtube-playlist-page";
import {
  DEFAULT_PIN_COMPILADO_ESQUINA_D,
  DEFAULT_PIN_COMPILADO_ESTIMADA,
  YOUTUBE_PLAYLIST_ID as DEFAULT_PLAYLIST_ID,
} from "@/lib/youtube-playlist-config";

/**
 * Playlist: `YOUTUBE_PLAYLIST_ID` (env opcional; senão usa o default do site).
 * Ordem: YouTube Data API v3 (se `YOUTUBE_API_KEY`) → feed Atom → página HTML da playlist
 * (`ytInitialData`, Shorts / vídeos normais). O feed Atom costuma falhar (404); o HTML é o fallback estável.
 * Pins por defeito nos dois compilados; env `YOUTUBE_PIN_*` substitui os IDs.
 */

type Video = { id: string; name: string };

/** Feed Atom (pode devolver 404 ou ~15 itens; mantido como tentativa leve antes do HTML). */
function parseYouTubePlaylistAtom(xml: string): Video[] {
  const out: Video[] = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(xml)) !== null) {
    const block = m[1];
    const idMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/);
    if (idMatch && titleMatch) {
      const id = idMatch[1].trim();
      const name = decodeXmlEntities(titleMatch[1].trim().replace(/<!\[CDATA\[|\]\]>/g, ""));
      if (id && name) out.push({ id, name });
    }
  }
  return out;
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

const YT_VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

function isValidVideoId(id: string): boolean {
  return YT_VIDEO_ID_RE.test(id.trim());
}

/** Vídeos garantidos pelo servidor (pins por defeito + override opcional por env). */
function readPinnedVideos(): Video[] {
  const out: Video[] = [];
  const esquina = process.env.YOUTUBE_PIN_COMPILADO_ESQUINA_D?.trim() || DEFAULT_PIN_COMPILADO_ESQUINA_D;
  if (isValidVideoId(esquina)) {
    out.push({ id: esquina.trim(), name: "Compilado Esquina D" });
  }
  const estimada = process.env.YOUTUBE_PIN_COMPILADO_ESTIMADA?.trim() || DEFAULT_PIN_COMPILADO_ESTIMADA;
  if (isValidVideoId(estimada)) {
    out.push({ id: estimada.trim(), name: "Compilado Estimada" });
  }
  return out;
}

/** Primeira ocorrência de cada `id` vence (pins primeiro). */
function mergeByIdPreferFirst(primary: Video[], secondary: Video[]): Video[] {
  const seen = new Set<string>();
  const out: Video[] = [];
  for (const v of primary) {
    const id = v.id.trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({ id, name: v.name });
  }
  for (const v of secondary) {
    const id = v.id.trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({ id, name: v.name });
  }
  return out;
}

type PlaylistItemsPage = {
  items?: Array<{
    snippet?: { title?: string; resourceId?: { videoId?: string } };
  }>;
  nextPageToken?: string;
};

async function fetchPlaylistViaDataApi(playlistId: string, apiKey: string): Promise<Video[] | null> {
  const videos: Video[] = [];
  let pageToken: string | undefined;

  try {
    for (let guard = 0; guard < 40; guard++) {
      const u = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      u.searchParams.set("part", "snippet");
      u.searchParams.set("playlistId", playlistId);
      u.searchParams.set("maxResults", "50");
      u.searchParams.set("key", apiKey);
      if (pageToken) u.searchParams.set("pageToken", pageToken);

      const res = await fetch(u.toString(), { cache: "no-store" });
      if (!res.ok) return null;

      const data = (await res.json()) as PlaylistItemsPage;
      const items = data.items ?? [];
      for (const it of items) {
        const id = it.snippet?.resourceId?.videoId?.trim();
        const name = it.snippet?.title?.trim();
        if (id && name && isValidVideoId(id)) videos.push({ id, name });
      }
      pageToken = data.nextPageToken;
      if (!pageToken) break;
    }
    return videos.length ? videos : null;
  } catch {
    return null;
  }
}

async function fetchPlaylistViaAtom(playlistId: string): Promise<{ ok: true; videos: Video[] } | { ok: false; status: number }> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`;
  const res = await fetch(feedUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    cache: "no-store",
  });
  if (!res.ok) return { ok: false, status: res.status };
  const xml = await res.text();
  return { ok: true, videos: parseYouTubePlaylistAtom(xml) };
}

export async function GET() {
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID ?? DEFAULT_PLAYLIST_ID;
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  const pinned = readPinnedVideos();

  try {
    let fromSource: Video[] = [];

    if (apiKey) {
      const viaApi = await fetchPlaylistViaDataApi(playlistId, apiKey);
      if (viaApi?.length) fromSource = viaApi;
    }

    if (!fromSource.length) {
      const atom = await fetchPlaylistViaAtom(playlistId);
      if (atom.ok && atom.videos.length > 0) {
        fromSource = atom.videos;
      } else {
        const fromPage = await fetchPlaylistViaPlaylistPage(playlistId);
        if (fromPage?.length) {
          fromSource = fromPage;
        } else if (!atom.ok) {
          return NextResponse.json(
            {
              error: "Não foi possível abrir a playlist do YouTube (feed e página indisponíveis).",
              code: "youtube_feed_error",
              status: atom.status,
            },
            { status: 502 },
          );
        } else {
          return NextResponse.json(
            {
              error: "A playlist está vazia ou o formato da página mudou.",
              code: "youtube_parse_empty",
            },
            { status: 502 },
          );
        }
      }
    }

    const files = mergeByIdPreferFirst(pinned, fromSource);

    if (!files.length) {
      return NextResponse.json(
        {
          error: "A playlist está vazia ou o feed mudou de formato.",
          code: "youtube_parse_empty",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { files },
      {
        headers: {
          "Cache-Control": "private, no-store, max-age=0, must-revalidate",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Erro de rede ao aceder ao YouTube.", code: "youtube_fetch_failed" },
      { status: 502 },
    );
  }
}
