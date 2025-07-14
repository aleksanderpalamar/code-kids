import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProcessedVideo } from "@/types";

interface UserStats {
  projectsCreated: number;
  videosWatched: number;
  level: number;
}

interface AppState {
  // Videos state
  videos: ProcessedVideo[];
  filteredVideos: ProcessedVideo[];
  watchedVideos: string[];
  bookmarkedVideos: string[];

  // UI state
  loading: boolean;
  searchLoading: boolean;
  error: string | null;

  // Filters
  searchTerm: string;
  selectedLanguage: string;
  selectedDifficulty: string;

  // User stats
  userStats: UserStats;

  // Actions
  setVideos: (videos: ProcessedVideo[]) => void;
  setFilteredVideos: (videos: ProcessedVideo[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setSelectedLanguage: (language: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;

  // Video actions
  markVideoAsWatched: (videoId: string) => void;
  toggleBookmark: (videoId: string) => void;
  isVideoWatched: (videoId: string) => boolean;
  isVideoBookmarked: (videoId: string) => boolean;

  // Reset actions
  resetFilters: () => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      videos: [],
      filteredVideos: [],
      watchedVideos: [],
      bookmarkedVideos: [],

      loading: true,
      searchLoading: false,
      error: null,

      searchTerm: "",
      selectedLanguage: "all",
      selectedDifficulty: "all",

      userStats: {
        projectsCreated: 0,
        videosWatched: 0,
        level: 1,
      },

      // Actions
      setVideos: (videos) => set({ videos }),

      setFilteredVideos: (filteredVideos) => set({ filteredVideos }),

      setLoading: (loading) => set({ loading }),

      setSearchLoading: (searchLoading) => set({ searchLoading }),

      setError: (error) => set({ error }),

      setSearchTerm: (searchTerm) => set({ searchTerm }),

      setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),

      setSelectedDifficulty: (selectedDifficulty) =>
        set({ selectedDifficulty }),

      markVideoAsWatched: (videoId) => {
        const { watchedVideos } = get();
        if (!watchedVideos.includes(videoId)) {
          const newWatchedVideos = [...watchedVideos, videoId];
          const newUserStats = {
            ...get().userStats,
            videosWatched: newWatchedVideos.length,
            level: Math.floor(newWatchedVideos.length / 5) + 1,
          };

          set({
            watchedVideos: newWatchedVideos,
            userStats: newUserStats,
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

      resetFilters: () =>
        set({
          searchTerm: "",
          selectedLanguage: "all",
          selectedDifficulty: "all",
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "code-kids-storage", // nome da chave no localStorage
      partialize: (state) => ({
        watchedVideos: state.watchedVideos,
        bookmarkedVideos: state.bookmarkedVideos,
        userStats: state.userStats,
      }), // apenas persiste dados importantes
    }
  )
);
