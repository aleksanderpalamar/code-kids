import { YouTubeCache } from "./types";

export const migrationActions = (set: any, get: any) => ({
  syncUserStatsFromLocalStorage: () => {
    // Migrar projetos do localStorage antigo "codeProjects" para o store
    const savedProjects = localStorage.getItem("codeProjects");
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        // Atualizar projetos no store
        set((state: any) => ({
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
      set((state: any) => ({
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
        set((state: any) => ({
          userStats: {
            ...state.userStats,
            videosWatched: stats.videosWatched || state.userStats.videosWatched,
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
});
