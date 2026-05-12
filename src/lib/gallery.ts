export type GalleryVideoMeta = {
  title: string;
  keywords: string[];
};

export const featuredVideoMeta: GalleryVideoMeta[] = [
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

export type ResolvedGalleryVideo = GalleryVideoMeta & {
  youtubeId: string | null;
};

function foldText(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function resolveVideos(files: { id: string; name: string }[]): ResolvedGalleryVideo[] {
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
