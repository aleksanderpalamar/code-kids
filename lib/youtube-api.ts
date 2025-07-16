import { ProcessedVideo, VideoDetails } from "@/types";
import formatDuration from "./format-duration";
import detectLanguage from "./detect-language";
import detectDifficulty from "./detect-difficulty";
import formatViews from "./format-views";
import fetchWithZustandCache from "./fetch-with-zustand-cache";
import { saveVideosToIndexedDB, getVideosFromIndexedDB } from "@/lib/indexeddb";
import {
  getValidPlaylists,
  buildPlaylistItemsUrl,
  buildVideoDetailsUrl,
  getPlaylistsInfo,
} from "./playlist-utils";

/**
 * Interface para item de playlist retornado pela API do YouTube
 */
interface PlaylistItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
  };
}

/**
 * Interface para vídeo retornado pela API do YouTube
 */
interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high?: { url: string };
      medium?: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

/**
 * Processa um vídeo do YouTube em formato interno
 * @param video - Dados do vídeo da API do YouTube
 * @returns Vídeo processado no formato interno
 */
function processYouTubeVideo(video: YouTubeVideo): ProcessedVideo {
  return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description || "Vídeo de programação",
    thumbnail:
      video.snippet.thumbnails.high?.url ||
      video.snippet.thumbnails.medium?.url ||
      "",
    duration: formatDuration(video.contentDetails.duration),
    language: detectLanguage(video.snippet.title),
    difficulty: detectDifficulty(video.snippet.title),
    youtubeId: video.id,
    views: formatViews(parseInt(video.statistics.viewCount || "0")),
    rating: 4.5,
    channelTitle: video.snippet.channelTitle,
    publishedAt: video.snippet.publishedAt,
  };
}

/**
 * Busca vídeos de uma playlist específica
 * @param playlistId - ID da playlist
 * @param apiKey - Chave da API do YouTube
 * @returns Promise com array de vídeos da playlist
 */
async function fetchVideosFromPlaylist(
  playlistId: string,
  apiKey: string
): Promise<ProcessedVideo[]> {
  try {
    console.log(`🔍 Buscando vídeos da playlist: ${playlistId}`);

    // Buscar itens da playlist
    const playlistUrl = buildPlaylistItemsUrl(playlistId, apiKey);
    const playlistData = await fetchWithZustandCache(playlistUrl);

    if (!playlistData.items || playlistData.items.length === 0) {
      console.warn(`⚠️ Nenhum vídeo encontrado na playlist: ${playlistId}`);
      return [];
    }

    // Extrair IDs dos vídeos
    const videoIds = playlistData.items
      .map((item: PlaylistItem) => item.snippet.resourceId.videoId)
      .filter((id: string) => id) // Filtrar IDs inválidos
      .join(",");

    if (!videoIds) {
      console.warn(`⚠️ Nenhum ID de vídeo válido na playlist: ${playlistId}`);
      return [];
    }

    // Buscar detalhes dos vídeos
    const detailsUrl = buildVideoDetailsUrl(videoIds, apiKey);
    const detailsData = await fetchWithZustandCache(detailsUrl);

    if (!detailsData.items) {
      console.warn(
        `⚠️ Nenhum detalhe de vídeo encontrado para playlist: ${playlistId}`
      );
      return [];
    }

    // Processar vídeos
    const videos = detailsData.items.map((video: YouTubeVideo) =>
      processYouTubeVideo(video)
    );

    console.log(
      `✅ Encontrados ${videos.length} vídeos na playlist: ${playlistId}`
    );
    return videos;
  } catch (error) {
    console.error(`❌ Erro ao buscar playlist ${playlistId}:`, error);
    return [];
  }
}

/**
 * Filtra vídeos por termo de busca
 * @param videos - Array de vídeos para filtrar
 * @param searchTerm - Termo de busca
 * @returns Array de vídeos filtrados
 */
function filterVideosBySearchTerm(
  videos: ProcessedVideo[],
  searchTerm: string
): ProcessedVideo[] {
  if (!searchTerm.trim()) {
    return videos;
  }

  const searchTermLower = searchTerm.toLowerCase();
  return videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTermLower) ||
      video.description.toLowerCase().includes(searchTermLower) ||
      video.language.toLowerCase().includes(searchTermLower) ||
      video.difficulty.toLowerCase().includes(searchTermLower) ||
      video.channelTitle.toLowerCase().includes(searchTermLower)
  );
}

/**
 * Embaralha e limita o número de vídeos
 * @param videos - Array de vídeos
 * @param maxResults - Número máximo de vídeos (padrão: 20)
 * @returns Array de vídeos embaralhados e limitados
 */
function shuffleAndLimitVideos(
  videos: ProcessedVideo[],
  maxResults: number = 20
): ProcessedVideo[] {
  return videos.sort(() => Math.random() - 0.5).slice(0, maxResults);
}

/**
 * Busca vídeos de playlists específicas do YouTube
 * @param searchTerm - Termo de busca opcional para filtrar vídeos das playlists
 * @returns Promise com array de vídeos processados
 */
export async function searchVideosFromPlaylists(
  searchTerm: string = ""
): Promise<ProcessedVideo[]> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;

  if (!apiKey) {
    console.log("⚠️ API key não encontrada - retornando dados offline");
    const fallback = await getVideosFromIndexedDB();
    return fallback;
  }

  try {
    const cleanApiKey = apiKey.replace(/["']/g, "").trim();
    const validPlaylists = getValidPlaylists();

    // Log informações sobre as playlists
    const playlistsInfo = getPlaylistsInfo();
    console.log(
      `� Playlists configuradas: ${playlistsInfo.total}, válidas: ${playlistsInfo.valid}`
    );

    if (playlistsInfo.invalid.length > 0) {
      console.warn(
        "⚠️ Playlists inválidas encontradas:",
        playlistsInfo.invalid
      );
    }

    if (validPlaylists.length === 0) {
      console.error("❌ Nenhuma playlist válida configurada");
      const fallback = await getVideosFromIndexedDB();
      return fallback;
    }

    const allVideos: ProcessedVideo[] = [];

    // Buscar vídeos de cada playlist
    for (const playlistId of validPlaylists) {
      const playlistVideos = await fetchVideosFromPlaylist(
        playlistId,
        cleanApiKey
      );
      allVideos.push(...playlistVideos);
    }

    if (allVideos.length === 0) {
      console.warn("⚠️ Nenhum vídeo encontrado em nenhuma playlist");
      const fallback = await getVideosFromIndexedDB();
      return fallback;
    }

    // Filtrar por termo de busca se fornecido
    const filteredVideos = filterVideosBySearchTerm(allVideos, searchTerm);

    console.log(
      `🔍 Vídeos encontrados: ${allVideos.length}, após filtro: ${filteredVideos.length}`
    );

    // Embaralhar e limitar
    const finalVideos = shuffleAndLimitVideos(filteredVideos);

    // Salvar no cache offline
    if (finalVideos.length > 0) {
      await saveVideosToIndexedDB(finalVideos);
    }

    console.log(`✅ Retornando ${finalVideos.length} vídeos das playlists`);
    return finalVideos;
  } catch (error) {
    console.error("❌ Erro ao buscar vídeos das playlists:", error);
    const fallback = await getVideosFromIndexedDB();
    if (fallback.length) {
      console.warn("⚠️ Usando dados offline do IndexedDB");
      return fallback;
    }
    return [];
  }
}

/**
 * Função mantida para compatibilidade com código existente
 * Agora redireciona para a nova implementação baseada em playlists
 * @param searchTerm - Termo de busca opcional
 * @returns Promise com array de vídeos processados
 */
export async function searchBrazilianProgrammingVideos(
  searchTerm: string = ""
): Promise<ProcessedVideo[]> {
  return searchVideosFromPlaylists(searchTerm);
}

export const searchProgrammingVideos = searchBrazilianProgrammingVideos;
