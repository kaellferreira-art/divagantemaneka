/**
 * Fallback quando o feed Atom (`/feeds/videos.xml`) falha (ex. 404).
 * A página HTML da playlist inclui `ytInitialData` com entradas `shortsLockupViewModel`.
 */

import type { PlaylistVideo } from "./youtube-playlist-types";

const MARKERS = ["var ytInitialData = ", "ytInitialData = "] as const;

/** Extrai o primeiro objeto JSON balanceado após `marker` (respeita strings JSON). */
function extractJsonObjectAfterMarker(html: string, marker: string): string | null {
  const idx = html.indexOf(marker);
  if (idx === -1) return null;
  let s = idx + marker.length;
  while (s < html.length && /\s/.test(html[s])) s++;
  if (html[s] !== "{") return null;

  let depth = 0;
  let inStr = false;
  let esc = false;
  const q = '"';

  for (let p = s; p < html.length; p++) {
    const c = html[p];
    if (esc) {
      esc = false;
      continue;
    }
    if (c === "\\" && inStr) {
      esc = true;
      continue;
    }
    if (!inStr) {
      if (c === q) {
        inStr = true;
        continue;
      }
      if (c === "{") depth++;
      if (c === "}") {
        depth--;
        if (depth === 0) return html.slice(s, p + 1);
      }
    } else if (c === q) {
      inStr = false;
    }
  }
  return null;
}

function extractYtInitialDataJson(html: string): string | null {
  for (const m of MARKERS) {
    const j = extractJsonObjectAfterMarker(html, m);
    if (j) return j;
  }
  return null;
}

function titleFromShortsLockup(m: Record<string, unknown>): string {
  const headline = m.headline;
  if (headline && typeof headline === "object") {
    const h = headline as Record<string, unknown>;
    if (typeof h.content === "string" && h.content.trim()) return h.content.trim();
    const runs = h.runs;
    if (Array.isArray(runs)) {
      const text = runs
        .map((r) => (r && typeof r === "object" && "text" in r ? String((r as { text?: string }).text ?? "") : ""))
        .join("");
      if (text.trim()) return text.trim();
    }
  }
  if (typeof m.accessibilityText === "string" && m.accessibilityText.trim()) {
    return m.accessibilityText.trim();
  }
  return "";
}

function videoIdFromShortsLockup(m: Record<string, unknown>): string | null {
  const onTap = m.onTap;
  if (onTap && typeof onTap === "object") {
    const cmd = (onTap as Record<string, unknown>).innertubeCommand;
    if (cmd && typeof cmd === "object") {
      const reel = (cmd as Record<string, unknown>).reelWatchEndpoint;
      if (reel && typeof reel === "object") {
        const id = (reel as Record<string, unknown>).videoId;
        if (typeof id === "string" && id.length === 11) return id;
      }
    }
  }
  if (typeof m.entityId === "string" && /^[\w-]{11}$/.test(m.entityId)) return m.entityId;
  return null;
}

function walkUnknown(obj: unknown, visit: (o: Record<string, unknown>) => void): void {
  if (obj === null || obj === undefined) return;
  if (Array.isArray(obj)) {
    for (const item of obj) walkUnknown(item, visit);
    return;
  }
  if (typeof obj !== "object") return;
  const o = obj as Record<string, unknown>;
  visit(o);
  for (const k of Object.keys(o)) walkUnknown(o[k], visit);
}

const YT_VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

function isValidVideoId(id: string): boolean {
  return YT_VIDEO_ID_RE.test(id.trim());
}

function titleFromPlaylistVideoRenderer(m: Record<string, unknown>): string {
  const title = m.title;
  if (title && typeof title === "object") {
    const t = title as Record<string, unknown>;
    if (typeof t.simpleText === "string" && t.simpleText.trim()) return t.simpleText.trim();
    const runs = t.runs;
    if (Array.isArray(runs)) {
      const text = runs
        .map((r) => (r && typeof r === "object" && "text" in r ? String((r as { text?: string }).text ?? "") : ""))
        .join("");
      if (text.trim()) return text.trim();
    }
  }
  return "";
}

/** Vídeos da playlist na ordem em que aparecem em `ytInitialData`. */
export function listVideosFromYtInitialData(data: unknown): PlaylistVideo[] {
  const out: PlaylistVideo[] = [];
  const seen = new Set<string>();

  walkUnknown(data, (o) => {
    const shorts = o.shortsLockupViewModel;
    if (shorts && typeof shorts === "object") {
      const rec = shorts as Record<string, unknown>;
      const id = videoIdFromShortsLockup(rec);
      const name = titleFromShortsLockup(rec);
      if (id && name && isValidVideoId(id) && !seen.has(id)) {
        seen.add(id);
        out.push({ id, name });
      }
      return;
    }

    const pv = o.playlistVideoRenderer;
    if (pv && typeof pv === "object") {
      const rec = pv as Record<string, unknown>;
      const id = typeof rec.videoId === "string" ? rec.videoId.trim() : "";
      const name = titleFromPlaylistVideoRenderer(rec);
      if (id && name && isValidVideoId(id) && !seen.has(id)) {
        seen.add(id);
        out.push({ id, name });
      }
    }
  });

  return out;
}

export async function fetchPlaylistViaPlaylistPage(playlistId: string): Promise<PlaylistVideo[] | null> {
  const url = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const html = await res.text();
    const jsonStr = extractYtInitialDataJson(html);
    if (!jsonStr) return null;
    const data: unknown = JSON.parse(jsonStr);
    const videos = listVideosFromYtInitialData(data);
    return videos.length ? videos : null;
  } catch {
    return null;
  }
}
