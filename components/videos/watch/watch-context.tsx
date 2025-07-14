"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { ProcessedVideo } from "@/types";
import { useAppStore } from "@/stores/app-store";

interface WatchContextType {
  video: ProcessedVideo | null;
  watchedVideos: string[];
  isBookmarked: boolean;
  loading: boolean;
  setWatchedVideos: (videos: string[]) => void;
  setIsBookmarked: (isBookmarked: boolean) => void;
  markVideoAsWatched: (videoId: string) => void;
}

const WatchContext = createContext<WatchContextType | undefined>(undefined);

export function useWatchContext() {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error("useWatchContext must be used within a WatchProvider");
  }
  return context;
}

interface WatchProviderProps {
  children: ReactNode;
}

export function WatchProvider({ children }: WatchProviderProps) {
  const searchParams = useSearchParams();
  const {
    watchedVideos,
    markVideoAsWatched,
    isVideoBookmarked,
    toggleBookmark,
  } = useAppStore();
  const [loading, setLoading] = useState(true);

  const videoId = searchParams.get("id");
  const youtubeId = searchParams.get("youtubeId");
  const title = searchParams.get("title") || "Vídeo Educativo";
  const description =
    searchParams.get("description") ||
    "Aprenda programação com este vídeo incrível!";
  const language = searchParams.get("language") || "Geral";
  const difficulty = searchParams.get("difficulty") || "Iniciante";
  const duration = searchParams.get("duration") || "N/A";
  const views = searchParams.get("views") || "0";
  const rating = parseFloat(searchParams.get("rating") || "5.0");
  const channelTitle = searchParams.get("channelTitle") || "Canal Educativo";

  const video: ProcessedVideo | null = videoId
    ? {
        id: videoId,
        title,
        description,
        language,
        difficulty: difficulty as "Iniciante" | "Intermediário" | "Avançado",
        duration,
        views,
        rating,
        channelTitle,
        youtubeId: youtubeId || "",
        thumbnail: "",
        publishedAt: "",
      }
    : null;

  const isBookmarked = videoId ? isVideoBookmarked(videoId) : false;

  const setIsBookmarked = (bookmarked: boolean) => {
    if (videoId) {
      if (bookmarked !== isBookmarked) {
        toggleBookmark(videoId);
      }
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [videoId]);

  useEffect(() => {
    // Mark video as watched when component mounts
    if (videoId && !watchedVideos.includes(videoId)) {
      markVideoAsWatched(videoId);
    }
  }, [videoId, watchedVideos, markVideoAsWatched]);

  return (
    <WatchContext.Provider
      value={{
        video,
        watchedVideos,
        isBookmarked,
        loading,
        setWatchedVideos: () => {}, // Função vazia pois não é mais usada
        setIsBookmarked,
        markVideoAsWatched,
      }}
    >
      {children}
    </WatchContext.Provider>
  );
}
