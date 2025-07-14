"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/app-store";

export function useVideoActions() {
  const router = useRouter();
  const { filteredVideos, markVideoAsWatched } = useAppStore();

  const handleWatchVideo = (videoId: string, youtubeId: string) => {
    // Get video data to pass via URL
    const videoData = filteredVideos.find((v) => v.id === videoId);
    if (videoData) {
      const params = new URLSearchParams({
        id: videoId,
        youtubeId: youtubeId,
        title: videoData.title,
        description: videoData.description,
        language: videoData.language,
        difficulty: videoData.difficulty,
        duration: videoData.duration,
        views: videoData.views,
        rating: videoData.rating.toString(),
        channelTitle: videoData.channelTitle,
      });

      // Navigate to internal watch page
      router.push(`/videos/watch?${params.toString()}`);
    }

    // Marcar o vídeo como assistido usando o Zustand
    markVideoAsWatched(videoId);
  };

  return {
    handleWatchVideo,
  };
}
