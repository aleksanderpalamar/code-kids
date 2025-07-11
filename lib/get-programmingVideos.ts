import { ProcessedVideo } from "@/types";
import { searchBrazilianProgrammingVideos } from "./youtube-api";

export const getProgrammingVideos = async (language?: string): Promise<ProcessedVideo[]> => {
  // Usar termo específico para a linguagem se fornecida
  try {
    const query = language && language !== "all" ? `${language} programming` : "programação tutorial";
    const videos = await searchBrazilianProgrammingVideos(query);
    
    if (language && language !== "all") {
      return videos.filter(v => v.language.toLowerCase() === language.toLowerCase());
    }
    return videos;
  } catch (error) {
    // Sempre retornar lista vazia para que o frontend possa mostrar uma mensagem amigável
    console.error("❌ Erro ao buscar vídeos por linguagem:", error);
    return [];
  }
};