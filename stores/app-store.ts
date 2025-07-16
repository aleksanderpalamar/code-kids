import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProcessedVideo } from "@/types";
import { Project, UserStats, CacheEntry, YouTubeCache } from "./types";
import { projectActions } from "./project-actions";
import { videoActions } from "./video-actions";
import { youtubeCacheActions } from "./youtube-cache-actions";
import { userStatsActions } from "./user-stats-actions";
import { uiActions } from "./ui-actions";
import { migrationActions } from "./migration-actions";

// Re-export types for backward compatibility
export type { Project, UserStats, CacheEntry, YouTubeCache } from "./types";

interface AppState {
  // State
  videos: ProcessedVideo[];
  filteredVideos: ProcessedVideo[];
  watchedVideos: string[];
  bookmarkedVideos: string[];
  projects: Project[];
  youtubeCache: YouTubeCache;
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedLanguage: string;
  selectedDifficulty: string;
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
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  getCacheEntry: (url: string) => CacheEntry | null;
  setCacheEntry: (url: string, entry: CacheEntry) => void;
  clearExpiredCache: () => void;
  markVideoAsWatched: (videoId: string) => void;
  toggleBookmark: (videoId: string) => void;
  isVideoWatched: (videoId: string) => boolean;
  isVideoBookmarked: (videoId: string) => boolean;
  recordSuccessfulExecution: () => void;
  syncUserStatsFromLocalStorage: () => void;
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
      projects: [],
      youtubeCache: {},
      loading: true,
      searchLoading: false,
      error: null,
      searchTerm: "",
      selectedLanguage: "all",
      selectedDifficulty: "all",
      userStats: {
        projectsCreated: 0,
        videosWatched: 0,
        projectsExecuted: 0,
        level: 1,
      },

      // Actions from separated modules
      ...uiActions(set),
      ...videoActions(set, get),
      ...projectActions(set, get),
      ...youtubeCacheActions(set, get),
      ...userStatsActions(set, get),
      ...migrationActions(set, get),
    }),
    {
      name: "code-kids-storage",
      partialize: (state) => ({
        watchedVideos: state.watchedVideos,
        bookmarkedVideos: state.bookmarkedVideos,
        userStats: state.userStats,
        projects: state.projects,
        youtubeCache: state.youtubeCache,
      }),
    }
  )
);
