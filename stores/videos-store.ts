import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { ProcessedVideo } from "@/types";
import { UserStats } from "./types";
import { calculateUserLevel } from "@/lib/level-system";

interface VideosState {
  videos: ProcessedVideo[];
  filteredVideos: ProcessedVideo[];
  watchedVideos: string[];
  bookmarkedVideos: string[];

  // Actions
  setVideos: (videos: ProcessedVideo[]) => void;
  setFilteredVideos: (videos: ProcessedVideo[]) => void;
  markVideoAsWatched: (
    videoId: string,
    userStats: UserStats,
    updateUserStats: (stats: Partial<UserStats>) => void
  ) => void;
  toggleBookmark: (videoId: string) => void;
  isVideoWatched: (videoId: string) => boolean;
  isVideoBookmarked: (videoId: string) => boolean;
}

export const useVideosStore = create<VideosState>()(
  subscribeWithSelector((set, get) => ({
    videos: [],
    filteredVideos: [],
    watchedVideos: [],
    bookmarkedVideos: [],

    setVideos: (videos) => set({ videos }),

    setFilteredVideos: (filteredVideos) => set({ filteredVideos }),

    markVideoAsWatched: (videoId, userStats, updateUserStats) => {
      const { watchedVideos } = get();
      if (!watchedVideos.includes(videoId)) {
        const newWatchedVideos = [...watchedVideos, videoId];

        // Calcular novo nível usando o sistema de pontuação
        const newUserLevel = calculateUserLevel(
          newWatchedVideos.length,
          userStats.projectsCreated,
          userStats.projectsExecuted
        );

        set({ watchedVideos: newWatchedVideos });

        updateUserStats({
          videosWatched: newWatchedVideos.length,
          level: newUserLevel.currentLevel,
        });
      }
    },

    toggleBookmark: (videoId) => {
      const { bookmarkedVideos } = get();
      const isBookmarked = bookmarkedVideos.includes(videoId);

      if (isBookmarked) {
        set({
          bookmarkedVideos: bookmarkedVideos.filter((id) => id !== videoId),
        });
      } else {
        set({
          bookmarkedVideos: [...bookmarkedVideos, videoId],
        });
      }
    },

    isVideoWatched: (videoId) => {
      return get().watchedVideos.includes(videoId);
    },

    isVideoBookmarked: (videoId) => {
      return get().bookmarkedVideos.includes(videoId);
    },
  }))
);
