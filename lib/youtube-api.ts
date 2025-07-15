import { ProcessedVideo, VideoDetails } from "@/types";
import formatDuration from "./format-duration";
import detectLanguage from "./detect-language";
import detectDifficulty from "./detect-difficulty";
import formatViews from "./format-views";
import { CHANNELS } from "@/data/channels";
import fetchWithZustandCache from "./fetch-with-zustand-cache";
import { saveVideosToIndexedDB, getVideosFromIndexedDB } from "@/lib/indexeddb";

export async function searchBrazilianProgrammingVideos(
  searchTerm: string = "programação"
): Promise<ProcessedVideo[]> {
  let apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;
  if (!apiKey) {
    console.log("⚠️ API key não encontrada - retornando lista vazia");
    return [];
  }

  try {
    apiKey = apiKey.replace(/["']/g, "").trim();

    const query =
      searchTerm === "programação"
        ? "programação devs brasileiro"
        : `${searchTerm} programação`;

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&maxResults=50&type=video&key=${apiKey}&order=relevance&regionCode=BR&relevanceLanguage=pt`;

    console.log("🔍 Buscando vídeos com ETag:", query);

    const searchData = await fetchWithZustandCache(searchUrl);

    const filteredItems = searchData.items.filter((item: any) =>
      CHANNELS.some((channel) =>
        item.snippet.channelTitle.toLowerCase().includes(channel.toLowerCase())
      )
    );

    if (filteredItems.length === 0) {
      console.log("⚠️ Nenhum vídeo encontrado dos canais especificados");
      return [];
    }

    const shuffledVideos = filteredItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
    const videoIds = shuffledVideos
      .map((item: any) => item.id.videoId)
      .join(",");

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
    const detailsData = await fetchWithZustandCache(detailsUrl);

    const videoDetails = new Map<string, VideoDetails>(
      detailsData.items.map((item: any) => [
        item.id,
        {
          duration: formatDuration(item.contentDetails.duration),
          views: formatViews(parseInt(item.statistics.viewCount)),
        },
      ])
    );

    const processedVideos = shuffledVideos.map((item: any) => {
      const details = videoDetails.get(item.id.videoId) || {
        duration: "N/A",
        views: "N/A",
      };
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description || "Vídeo de programação",
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url,
        duration: details.duration,
        language: detectLanguage(item.snippet.title),
        difficulty: detectDifficulty(item.snippet.title),
        youtubeId: item.id.videoId,
        views: details.views,
        rating: 4.5,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      };
    });

    await saveVideosToIndexedDB(processedVideos);
    return processedVideos;
  } catch (error) {
    console.error("❌ Erro ao buscar vídeos:", error);
    const fallback = await getVideosFromIndexedDB();
    if (fallback.length) {
      console.warn("⚠️ Usando dados offline do IndexedDB");
      return fallback;
    }
    return [];
  }
}

export const searchProgrammingVideos = searchBrazilianProgrammingVideos;
