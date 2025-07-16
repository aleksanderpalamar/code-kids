import { ProcessedVideo } from "@/types";
import { searchVideosFromPlaylists } from "./youtube-api";

/**
 * Busca vídeos de programação filtrados por linguagem
 * @param language - Linguagem específica para filtrar (opcional)
 * @returns Promise com array de vídeos processados
 */
export const getProgrammingVideos = async (
  language?: string
): Promise<ProcessedVideo[]> => {
  try {
    // Buscar vídeos das playlists
    const videos = await searchVideosFromPlaylists();

    // Filtrar por linguagem se especificada
    if (language && language !== "all") {
      const filteredVideos = videos.filter(
        (v) => v.language.toLowerCase() === language.toLowerCase()
      );

      console.log(
        `🎯 Filtrados ${filteredVideos.length} vídeos para linguagem: ${language}`
      );
      return filteredVideos;
    }

    console.log(`✅ Retornando ${videos.length} vídeos de todas as linguagens`);
    return videos;
  } catch (error) {
    console.error("❌ Erro ao buscar vídeos por linguagem:", error);
    return [];
  }
};
