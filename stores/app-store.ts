import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProcessedVideo } from "@/types";
import { calculateUserLevel, calculateTotalPoints } from "@/lib/level-system";

export interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: string;
  lastModified: string;
}

interface UserStats {
  projectsCreated: number;
  videosWatched: number;
  projectsExecuted: number;
  level: number;
}

interface CacheEntry {
  data: any;
  timestamp: number;
  etag?: string;
}

interface YouTubeCache {
  [url: string]: CacheEntry;
}

interface AppState {
  // Videos state
  videos: ProcessedVideo[];
  filteredVideos: ProcessedVideo[];
  watchedVideos: string[];
  bookmarkedVideos: string[];

  // Projects state
  projects: Project[];

  // YouTube Cache state
  youtubeCache: YouTubeCache;

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

  // Project actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;

  // YouTube Cache actions
  getCacheEntry: (url: string) => CacheEntry | null;
  setCacheEntry: (url: string, entry: CacheEntry) => void;
  clearExpiredCache: () => void;

  // Video actions
  markVideoAsWatched: (videoId: string) => void;
  toggleBookmark: (videoId: string) => void;
  isVideoWatched: (videoId: string) => boolean;
  isVideoBookmarked: (videoId: string) => boolean;

  // Project execution actions
  recordSuccessfulExecution: () => void;

  // User stats actions
  syncUserStatsFromLocalStorage: () => void;

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

      // Project actions
      setProjects: (projects) => {
        const newUserLevel = calculateUserLevel(
          get().userStats.videosWatched,
          projects.length,
          get().userStats.projectsExecuted
        );

        set({
          projects,
          userStats: {
            ...get().userStats,
            projectsCreated: projects.length,
            level: newUserLevel.currentLevel,
          },
        });
      },

      addProject: (project) => {
        set((state) => {
          const newProjects = [...state.projects, project];
          const newUserLevel = calculateUserLevel(
            state.userStats.videosWatched,
            newProjects.length,
            state.userStats.projectsExecuted
          );

          return {
            projects: newProjects,
            userStats: {
              ...state.userStats,
              projectsCreated: newProjects.length,
              level: newUserLevel.currentLevel,
            },
          };
        });
      },

      updateProject: (updatedProject) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === updatedProject.id ? updatedProject : p
          ),
        }));
      },

      deleteProject: (projectId) => {
        set((state) => {
          const newProjects = state.projects.filter((p) => p.id !== projectId);
          const newUserLevel = calculateUserLevel(
            state.userStats.videosWatched,
            newProjects.length,
            state.userStats.projectsExecuted
          );

          return {
            projects: newProjects,
            userStats: {
              ...state.userStats,
              projectsCreated: newProjects.length,
              level: newUserLevel.currentLevel,
            },
          };
        });
      },

      // YouTube Cache actions
      getCacheEntry: (url) => {
        const { youtubeCache } = get();
        return youtubeCache[url] || null;
      },

      setCacheEntry: (url, entry) => {
        set((state) => ({
          youtubeCache: {
            ...state.youtubeCache,
            [url]: entry,
          },
        }));
      },

      clearExpiredCache: () => {
        const TTL = 1000 * 60 * 60; // 1 hora
        const now = Date.now();

        set((state) => {
          const newCache: YouTubeCache = {};
          Object.entries(state.youtubeCache).forEach(([url, entry]) => {
            if (now - entry.timestamp < TTL) {
              newCache[url] = entry;
            }
          });
          return { youtubeCache: newCache };
        });
      },

      markVideoAsWatched: (videoId) => {
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

      // Registrar execução bem-sucedida de código
      recordSuccessfulExecution: () => {
        console.log("🔍 recordSuccessfulExecution chamado");
        set((state) => {
          console.log("🔍 Estado anterior:", state.userStats);
          const newExecutionCount = state.userStats.projectsExecuted + 1;

          // Calcular novo nível
          const newUserLevel = calculateUserLevel(
            state.userStats.videosWatched,
            state.userStats.projectsCreated,
            newExecutionCount
          );

          const newState = {
            userStats: {
              ...state.userStats,
              projectsExecuted: newExecutionCount,
              level: newUserLevel.currentLevel,
            },
          };

          console.log("🔍 Novo estado:", newState.userStats);
          return newState;
        });
      },

      resetFilters: () =>
        set({
          searchTerm: "",
          selectedLanguage: "all",
          selectedDifficulty: "all",
        }),

      syncUserStatsFromLocalStorage: () => {
        // Migrar projetos do localStorage antigo "codeProjects" para o store
        const savedProjects = localStorage.getItem("codeProjects");
        if (savedProjects) {
          try {
            const parsedProjects = JSON.parse(savedProjects);
            // Atualizar projetos no store
            set((state) => ({
              projects: parsedProjects,
              userStats: {
                ...state.userStats,
                projectsCreated: parsedProjects.length,
              },
            }));

            // Remover a chave antiga do localStorage após a migração
            localStorage.removeItem("codeProjects");
          } catch (error) {
            console.error("Erro ao migrar projetos:", error);
          }
        }

        // Migrar cache do YouTube do localStorage antigo para o store
        const migratedCache: YouTubeCache = {};
        const keysToRemove: string[] = [];

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith("yt:cache:")) {
            const url = key.replace("yt:cache:", "");
            const cacheData = localStorage.getItem(key);
            const timestampKey = `yt:timestamp${url}`;
            const etagKey = `yt:etag:${url}`;

            const timestamp = localStorage.getItem(timestampKey);
            const etag = localStorage.getItem(etagKey);

            if (cacheData && timestamp) {
              try {
                migratedCache[url] = {
                  data: JSON.parse(cacheData),
                  timestamp: parseInt(timestamp),
                  etag: etag || undefined,
                };

                // Marcar para remoção
                keysToRemove.push(key, timestampKey, etagKey);
              } catch (error) {
                console.warn("Erro ao migrar cache:", key, error);
                keysToRemove.push(key, timestampKey, etagKey);
              }
            }
          }
        }

        // Atualizar cache no store se houver dados migrados
        if (Object.keys(migratedCache).length > 0) {
          set((state) => ({
            youtubeCache: { ...state.youtubeCache, ...migratedCache },
          }));
        }

        // Remover chaves antigas do localStorage
        keysToRemove.forEach((key) => {
          if (key) localStorage.removeItem(key);
        });

        // Sincronizar outras estatísticas do localStorage "userStats"
        const savedStats = localStorage.getItem("userStats");
        if (savedStats) {
          try {
            const stats = JSON.parse(savedStats);
            set((state) => ({
              userStats: {
                ...state.userStats,
                videosWatched:
                  stats.videosWatched || state.userStats.videosWatched,
                level: stats.level || state.userStats.level,
              },
            }));

            // Remover userStats antigo do localStorage
            localStorage.removeItem("userStats");
          } catch (error) {
            console.error("Erro ao migrar estatísticas:", error);
          }
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "code-kids-storage", // nome da chave no localStorage
      partialize: (state) => ({
        watchedVideos: state.watchedVideos,
        bookmarkedVideos: state.bookmarkedVideos,
        userStats: state.userStats,
        projects: state.projects, // Agora os projetos são persistidos aqui
        youtubeCache: state.youtubeCache, // Cache do YouTube também persistido aqui
      }), // apenas persiste dados importantes
    }
  )
);
