import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { CacheEntry, YouTubeCache } from "./types";

interface YouTubeCacheState {
  youtubeCache: YouTubeCache;

  // Actions
  getCacheEntry: (url: string) => CacheEntry | null;
  setCacheEntry: (url: string, entry: CacheEntry) => void;
  clearExpiredCache: () => void;
}

export const useYouTubeCacheStore = create<YouTubeCacheState>()(
  subscribeWithSelector((set, get) => ({
    youtubeCache: {},

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
  }))
);
