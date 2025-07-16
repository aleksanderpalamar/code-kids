import { calculateUserLevel } from "@/lib/level-system";

export const videoActions = (set: any, get: any) => ({
  markVideoAsWatched: (videoId: string) => {
    const { watchedVideos } = get();
    if (!watchedVideos.includes(videoId)) {
      const newWatchedVideos = [...watchedVideos, videoId];

      // Calcular novo nível usando o sistema de pontuação
      const newUserLevel = calculateUserLevel(
        newWatchedVideos.length,
        get().userStats.projectsCreated,
        get().userStats.projectsExecuted
      );

      set({
        watchedVideos: newWatchedVideos,
        userStats: {
          ...get().userStats,
          videosWatched: newWatchedVideos.length,
          level: newUserLevel.currentLevel,
        },
      });
    }
  },

  toggleBookmark: (videoId: string) => {
    const { bookmarkedVideos } = get();
    const isBookmarked = bookmarkedVideos.includes(videoId);

    if (isBookmarked) {
      set({
        bookmarkedVideos: bookmarkedVideos.filter(
          (id: string) => id !== videoId
        ),
      });
    } else {
      set({
        bookmarkedVideos: [...bookmarkedVideos, videoId],
      });
    }
  },

  isVideoWatched: (videoId: string) => {
    return get().watchedVideos.includes(videoId);
  },

  isVideoBookmarked: (videoId: string) => {
    return get().bookmarkedVideos.includes(videoId);
  },
});
