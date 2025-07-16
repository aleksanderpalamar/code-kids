import { CacheEntry, YouTubeCache } from "./types";

export const youtubeCacheActions = (set: any, get: any) => ({
  getCacheEntry: (url: string): CacheEntry | null => {
    const { youtubeCache } = get();
    return youtubeCache[url] || null;
  },

  setCacheEntry: (url: string, entry: CacheEntry) => {
    set((state: any) => ({
      youtubeCache: {
        ...state.youtubeCache,
        [url]: entry,
      },
    }));
  },

  clearExpiredCache: () => {
    const TTL = 1000 * 60 * 60; // 1 hora
    const now = Date.now();

    set((state: any) => {
      const newCache: YouTubeCache = {};
      Object.entries(state.youtubeCache).forEach(([url, entry]) => {
        const cacheEntry = entry as CacheEntry;
        if (now - cacheEntry.timestamp < TTL) {
          newCache[url] = cacheEntry;
        }
      });
      return { youtubeCache: newCache };
    });
  },
});
