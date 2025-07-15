"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ProcessedVideo } from "@/types";
import { useAppStore } from "@/stores/app-store";

interface VideoData {
  videoId: string | null;
  youtubeId: string | null;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  duration: string;
  views: string;
  rating: number;
  channelTitle: string;
}

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
  videoData: VideoData;
}

export function WatchProvider({ children, videoData }: WatchProviderProps) {
  const {
    watchedVideos,
    markVideoAsWatched,
    isVideoBookmarked,
    toggleBookmark,
  } = useAppStore();
  const [loading, setLoading] = useState(true);

  const {
    videoId,
    youtubeId,
    title,
    description,
    language,
    difficulty,
    duration,
    views,
    rating,
    channelTitle,
  } = videoData;

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
