import { NextResponse } from "next/server";

const DEFAULT_PLAYLIST_ID = "PLSlPvkuCbGCS2w5I4G_3oqVFVOicWjwpf";

type Video = { id: string; name: string };

/**
 * Lê o feed Atom público de uma playlist do YouTube (não exige API key e funciona
 * com playlists não listadas). Devolve o ID do vídeo + título.
 * Limite: até ~15 itens mais recentes da playlist.
 */
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

export async function GET() {
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID ?? DEFAULT_PLAYLIST_ID;
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`;

  try {
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Não foi possível abrir a playlist do YouTube.",
          code: "youtube_feed_error",
          status: res.status,
        },
        { status: 502 },
      );
    }

    const xml = await res.text();
    const files = parseYouTubePlaylistAtom(xml);

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
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
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
