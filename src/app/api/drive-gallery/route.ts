import { NextResponse } from "next/server";

const DEFAULT_FOLDER_ID = "1yJ_llKAEzym8aeM-ck2zb7uE2acqYAlz";

type DriveFile = { id: string; name: string };

/**
 * Lista ficheiros .mp4 de uma pasta do Drive **pública** (link “qualquer pessoa com o link”),
 * sem API key: obtém o HTML da vista de pasta e extrai pares (id, nome).
 * Se o Google alterar o formato da página, isto pode falhar — nesse caso convém voltar à API oficial.
 */
function parsePublicDriveFolderHtml(html: string): DriveFile[] {
  const pairRe = /&quot;([a-zA-Z0-9_-]{25,40})&quot;\],null,null,null,&quot;video\/mp4&quot;/g;
  const items: DriveFile[] = [];
  let m: RegExpExecArray | null;
  while ((m = pairRe.exec(html)) !== null) {
    const id = m[1];
    const after = html.slice(m.index + m[0].length, m.index + m[0].length + 5000);
    const nameMatch = after.match(/&quot;([^&]+?\.mp4)&quot;/);
    if (nameMatch) {
      items.push({ id, name: nameMatch[1] });
    }
  }
  const seen = new Set<string>();
  return items.filter((row) => {
    if (seen.has(row.id)) return false;
    seen.add(row.id);
    return true;
  });
}

export async function GET() {
  const folderId = process.env.GOOGLE_DRIVE_VIDEO_FOLDER_ID ?? DEFAULT_FOLDER_ID;
  const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;

  try {
    const res = await fetch(folderUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Não foi possível abrir a pasta do Google Drive.",
          code: "drive_page_error",
          status: res.status,
        },
        { status: 502 },
      );
    }

    const html = await res.text();
    const files = parsePublicDriveFolderHtml(html);

    if (!files.length) {
      return NextResponse.json(
        {
          error:
            "Não foi possível ler a lista de vídeos na página do Drive. O layout da página pode ter mudado — contacte quem mantém o site.",
          code: "drive_parse_empty",
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
      { error: "Erro de rede ao aceder ao Google Drive.", code: "drive_fetch_failed" },
      { status: 502 },
    );
  }
}
