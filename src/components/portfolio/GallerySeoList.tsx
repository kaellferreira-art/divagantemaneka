import { featuredVideoMeta } from "@/lib/gallery";
import {
  DEFAULT_PIN_COMPILADO_ESQUINA_D,
  DEFAULT_PIN_COMPILADO_ESTIMADA,
  YOUTUBE_PLAYLIST_ID,
} from "@/lib/youtube-playlist-config";

const playlistUrl = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`;

const pinWatchUrlByTitle: Record<string, string> = {
  "Compilado Esquina D": `https://www.youtube.com/watch?v=${DEFAULT_PIN_COMPILADO_ESQUINA_D}`,
  "Compilado Estimada": `https://www.youtube.com/watch?v=${DEFAULT_PIN_COMPILADO_ESTIMADA}`,
};

/** Lista textual + links no HTML inicial para crawl (a galeria interativa carrega via JS). */
export function GallerySeoList() {
  return (
    <nav className="sr-only" aria-label="Registros ao vivo no YouTube">
      <ul>
        {featuredVideoMeta.map((v) => (
          <li key={v.title}>
            <a href={pinWatchUrlByTitle[v.title] ?? playlistUrl}>{v.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
