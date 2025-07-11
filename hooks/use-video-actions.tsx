"use client"

import { useRouter } from "next/navigation";
import { useVideos } from "@/components/videos/videos-context";

export function useVideoActions() {
  const router = useRouter();
  const { filteredVideos, watchedVideos, setWatchedVideos } = useVideos();

  const handleWatchVideo = (videoId: string, youtubeId: string) => {
    // Get video data to pass via URL
    const videoData = filteredVideos.find(v => v.id === videoId);
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
        channelTitle: videoData.channelTitle
      });
      
      // Navigate to internal watch page
      router.push(`/videos/watch?${params.toString()}`);
    }

    const newWatchedVideos = [...watchedVideos, videoId];
    setWatchedVideos(newWatchedVideos);
    localStorage.setItem("watchedVideos", JSON.stringify(newWatchedVideos));

    // Update user stats
    const stats = JSON.parse(
      localStorage.getItem("userStats") || '{"projectsCreated": 0, "videosWatched": 0, "level": 1}',
    );
    stats.videosWatched = newWatchedVideos.length;
    stats.level = Math.floor(newWatchedVideos.length / 5) + 1;
    localStorage.setItem("userStats", JSON.stringify(stats));
  };

  return {
    handleWatchVideo,
  };
}
