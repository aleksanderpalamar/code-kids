import { searchBrazilianProgrammingVideos } from "@/lib/youtube-api";
import { NextResponse } from "next/server";

/**
 * Endpoint da API para buscar vídeos do YouTube das playlists configuradas
 */
export async function GET() {
  try {
    console.log("🎬 API: Iniciando busca de vídeos das playlists");
    const videos = await searchBrazilianProgrammingVideos();

    console.log(`✅ API: Retornando ${videos.length} vídeos`);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("❌ API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
